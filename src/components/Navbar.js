import React, { useState, useEffect } from "react";
import "../css/button.css";
import { Button, Modal } from "antd";
import FormModal from "./authen/FormModal";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import AlertMess from "./AlertMess";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State quản lý dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleCartClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      navigate("/cart");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleCancel();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="fixed top-0 w-full z-10 bg-red-600 max-h-18">
      <div className="p-4 max-h-18">
        <div className="lg:mx-20 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/laptopicon.svg"
                className="h-10 w-10 mr-2"
                alt="logo"
              />
              
            </Link>
            <span className="font-bold text-white hidden lg:block cursor-pointer">BUY PC 
              <p className="text-xs font-light">.com</p>
            </span>
          </div>

          <div className="relative sm:-translate-x-20 md:-translate-x-36 lg:hidden">
            <button
              onClick={toggleDropdown}
              className="text-white px-4 py-2 bg-red-700 rounded hover:bg-red-800 focus:outline-none"
            >
              Danh mục
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white rounded shadow-lg w-96 p-4 z-20">
                <ul className="space-y-10 py-4 w-40">
  <li className="relative flex items-center justify-between">
    <Link
      to="/productlist"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/all.svg" alt="" />
      <i className="laptop mr-2"></i> Tất cả sản phẩm
    </Link>
  </li>
  <li className="flex items-center justify-between">
    <Link
      to="/productlist/laptop"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/lap.svg" alt="" />
      <i className="gamepad mr-2"></i> Laptop
    </Link>
  </li>
  <li className="flex items-center justify-between">
    <Link
      to="/productlist/pc"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/pc.svg" alt="" />
      <i className="desktop mr-2"></i> PC
    </Link>
  </li>
  <li className="flex items-center justify-between">
    <Link
      to="/productlist/vga"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/comp.svg" alt="" />
      <i className="gamepad mr-2"></i> VGA
    </Link>
  </li>
  <li className="flex items-center justify-between">
    <Link
      to="/productlist/cpu"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/comp.svg" alt="" />
      <i className="gamepad mr-2"></i> CPU
    </Link>
  </li>
  <li className="flex items-center justify-between">
    <Link
      to="/productlist/case"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/case.svg" alt="" />
      <i className="gamepad mr-2"></i> Case
    </Link>
  </li>
  <li className="flex items-center justify-between">
    <Link
      to="/productlist/screen"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/screen.svg" alt="" />
      <i className="gamepad mr-2"></i> Màn hình
    </Link>
  </li>
  <li className="flex items-center justify-between">
    <Link
      to="/productlist/keyboard"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/acs.svg" alt="" />
      <i className="gamepad mr-2"></i> Bàn phím
    </Link>
  </li>
  <li className="flex items-center justify-between">
    <Link
      to="/productlist/mouse"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/mouse.svg" alt="" />
      <i className="gamepad mr-2"></i> Chuột
    </Link>
  </li>
  <li className="flex items-center justify-between">
    <Link
      to="/productlist/headphone"
      className="flex items-center hover:font-bold hover:text-red-600"
    >
      <img src="/sup.svg" alt="" />
      <i className="gamepad mr-2"></i> Tai nghe
    </Link>
  </li>
</ul>

              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 text-white mt-4 md:mt-0">
            <Link to="/filter">
              <SearchOutlined />
            </Link>
            <div className="flex items-center" onClick={handleCartClick}>
              <span className="text-sm mr-1">Giỏ hàng</span>
            </div>
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#B91C1C",
                      borderRadius: 0,
                      padding: "8px 16px",
                    }}
                  >
                    Profile
                  </Button>
                </Link>

                <Button
                  style={{
                    color: "white",
                    backgroundColor: "#B91C1C",
                    borderRadius: 0,
                    padding: "8px 16px",
                  }}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#B91C1C",
                  borderRadius: 0,
                  padding: "8px 16px",
                }}
                onClick={showModal}
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal footer={null} open={isModalOpen} onCancel={handleCancel}>
        <FormModal
          handleLoginSuccess={handleLoginSuccess}
          handleCancel={handleCancel}
        />
      </Modal>

      {showAlert && <AlertMess message="Please log in to view your cart." />}
    </div>
  );
}

export default Navbar;
