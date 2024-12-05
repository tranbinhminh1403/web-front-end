import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { formatCash } from "../utils/formatCash";
import formatSpecs from "../utils/formatSpecs";
import Footer from "./Footer";
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://web-back-end-1.onrender.com/api/v1/products/detail/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setProduct(data.data[0]);
        } else {
          console.error("Product not found or API error");
        }
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );

    fetch("https://web-back-end-1.onrender.com/api/v1/products/list")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          // Lấy ngẫu nhiên 3 sản phẩm
          const shuffled = data.data.sort(() => 0.5 - Math.random());
          setSimilarProducts(shuffled.slice(0, 3));
        } else {
          console.error("Error fetching similar products");
        }
      })
      .catch((error) =>
        console.error("Error fetching similar products:", error)
      );
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      notification.error({
        message: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
      });
      return;
    }

    fetch("https://web-back-end-1.onrender.com/api/v1/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success || data.message === "Product added to cart") {
          navigate("/cart");
        } else {
          console.error("Error adding to cart", data);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  if (!product) {
    return <div><LoadingOutlined style={{ fontSize: 50, color: "#DC2626" }} /></div>;
  }

  const formattedSpecs = formatSpecs(product.specs);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row mt-10">
          <div className="w-full md:w-1/2">
            <img src={product.img} className="w-full rounded-lg mb-4" />
          </div>

          <div className="w-full md:w-1/2 pl-4">
            <h1 className="text-2xl font-bold mb-2">{product.product_name}</h1>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 text-lg">
                <i className="fas fa-star"></i> 5.0
              </span>
              <a href="#" className="text-blue-500 ml-2">
                Xem đánh giá
              </a>
            </div>

            <div className="bg-yellow-100 p-2 rounded-lg mb-4">
              {product.discount > 0 && (
                <p className="text-gray-500 line-through">
                  {formatCash(product.price)}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-red-500 font-bold text-3xl">
                  {formatCash((product.price / 100) * (100 - product.discount))}
                </span>
              </div>
            </div>
            {product.stock > 0 ? (
              <div style={{ marginBottom: 20 }} className="flex items-center">
                <button
                  className="border border-gray-300 rounded px-2 py-1"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-gray-300"
                />
                <button
                  className="border border-gray-300 rounded px-2 py-1"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            ) : (
              <></>
            )}
            {product.stock > 0 ? (
              <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg w-full mb-4"
                onClick={handleAddToCart}
              >
                MUA NGAY
              </button>
            ) : (
              <button className="bg-gray-300 text-white font-bold py-2 px-4 rounded-lg w-full mb-4">
                HẾT HÀNG
              </button>
            )}
            <div className="space-y-4">
              <h2 className="text-lg font-bold mb-2">Thông tin chung</h2>
              {product.discount > 0 && (
                <p>
                  <span className="font-bold">Khuyến mãi:</span> Giảm{" "}
                  {product.discount}%
                </p>
              )}
              <p>
                <span className="font-bold">Tình trạng:</span> Mới và Fullbox
                100%
              </p>
              <p>
                <span className="font-bold">Bảo hành:</span> 24 Tháng
              </p>
              {product.stock > 0 ? (
                <p>
                  <span className="font-bold">Trạng thái:</span> Còn hàng
                </p>
              ) : (
                <p>
                  <span className="font-bold">Trạng thái:</span> Hết hàng
                </p>
              )}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 20 }} className="flex justify-center">
          <div className=" md:w-full bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Thông tin sản phẩm</h1>
            <h2 className="text-xl font-bold mb-2">Thông số kỹ thuật</h2>
            <table className="w-full text-left border-collapse">
              <tbody>
                {Object.entries(formattedSpecs).map(([key, value]) => (
                  <tr className="border-b" key={key}>
                    <td className="py-2 font-semibold">{key}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/3 ml-4 hidden md:block">
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-xl font-bold mb-2">Sản phẩm tương tự</h2>
              {similarProducts.map((similarProduct) => (
                <div key={similarProduct.id}>
                  <div className="flex items-center mb-4">
                    <img
                      src={similarProduct.img}
                      alt="img"
                      className="w-16 h-16 mr-4"
                    />
                    <div>
                      <div className="font-semibold">
                        {similarProduct.product_name}
                      </div>
                      <p className="text-red-500 font-bold">
                        {formatCash(similarProduct.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
