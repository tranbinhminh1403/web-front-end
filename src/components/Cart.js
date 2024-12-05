import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, notification } from "antd";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { formatCash } from "../utils/formatCash";
import AlertMess from "./AlertMess";
import { DeleteFilled } from "@ant-design/icons";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page
      return;
    }

    // Fetch cart items
    fetch("https://web-back-end-1.onrender.com/api/v1/cart", {
      headers: {
        "Authorization": `Bearer ${token}` // Include token in headers
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCartItems(data.data);
        } else {
          console.error("Error fetching cart data", data);
        }
      })
      .catch((error) => console.error("Error:", error));

    // Fetch user data
    fetch("https://web-back-end-1.onrender.com/api/v1/auth/get-user", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data);
        } else {
          console.error("Error fetching user data", data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, [navigate]);

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/profile');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formatCurrency = (amount) =>
    parseFloat(amount).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const totalAmount = cartItems.reduce(
    (total, item) => total + parseFloat(item.price / 100) * (100 - item.discount) * item.quantity,
    0
  );

  const handlePaid = () => {
    if (!user || !user.address || !user.phone) {
      setIsModalVisible(true);
      return;
    }

    if (cartItems.length === 0) {
      notification.warning({
        message: 'Cart is Empty',
        description: 'There are no items in your cart to pay for.',
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("https://web-back-end-1.onrender.com/api/v1/cart/update-status", {
      method: 'PUT', // Use PUT method
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    })
    .then(data => {
      if (data.message === 'All cart items updated to paid status successfully') {
        console.log("Cart status updated successfully");
        setCartItems([]); // Clear the cart
        notification.success({
          message: 'Giao dịch thành công',
          description: 'Đơn hàng của bạn đã được giao dịch thành công.',
        });
      } else {
        console.error("Failed to update cart status", data);
      }
    })
    .catch(error => {
      console.error("Error updating cart status:", error);
    });
  };

  const handleDelete = (cartItemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch(`https://web-back-end-1.onrender.com/api/v1/cart/delete/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Cart item deleted successfully") {
        // Remove the deleted item from the cartItems state
        setCartItems(cartItems.filter(item => item.cart_item_id !== cartItemId));
        console.log("Item deleted successfully");
      } else {
        console.error("Failed to delete item", data);
      }
    })
    .catch(error => {
      console.error("Error deleting item:", error);
    });
  };

  const handleRowClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  return (
    <div className=" my-36" >
      <Modal
        title="Thông báo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Vui lòng cập nhật địa chỉ và số điện thoại liên hệ</p>
      </Modal>
      <div >
        { cartItems.length === 0 ? (
          <div className="text-center text-gray-500">
            <h2 className="text-2xl font-semibold">Giỏ hàng của bạn trống</h2>
            <p className="text-lg">Hãy mua sản phẩm để có thể đặt hàng</p>
            <Link to="/" className="text-blue-500 text-xl inline-block">
             Mua thêm sản phẩm khác
          </Link>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg lg:mx-36 mx-8  shadow-lg  ">
            <Link to="/" className="text-blue-500 text-lg mb-4 inline-block">
              &lt; Mua thêm sản phẩm khác
            </Link>
            <div className=" p-4">
              {cartItems.map((item) => (
                <div
                  className="flex items-center mb-8 cursor-pointer"
                  key={item.cart_item_id}
                  onClick={() => handleRowClick(item.product_id)}
                >
                  <img
                    src={item.img}
                    alt={`Ảnh ${item.product_name}`}
                    className="w-24 h-24 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.product_name}</h2>
                    {item.discount > 0 && (
                      <div className="text-gray-400 line-through">
                        {formatCash(item.price)}
                      </div>
                    )}
                    <div className="text-red-500 font-bold text-3xl">
                      {formatCash((item.price / 100) * (100 - item.discount))}
                    </div>
                    <div className="text-gray-400">
                      Số lượng: {item.quantity}
                    </div>
                  </div>
                  <div>
                    <DeleteFilled className="text-red-500 text-2xl" onClick={(e) => { e.stopPropagation(); handleDelete(item.cart_item_id); }} />
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Tổng tiền:</span>
                  <span className="text-red-500 text-lg font-semibold">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
                <button onClick={handlePaid} className="bg-red-500 text-white py-3 w-full rounded-lg font-semibold">
                  ĐẶT HÀNG NGAY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
