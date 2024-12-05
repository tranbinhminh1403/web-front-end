import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { ProductsCard } from "./ProductsCard";
import Footer from "./Footer";
import { Button, Col, Input, Radio, Row, Slider, Space } from "antd";
import { formatCash } from "../utils/formatCash";
import { LoadingOutlined } from "@ant-design/icons";

const Filter = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [priceRange, setPriceRange] = useState([200000, 80000000]);

  useEffect(() => {
    // Fetch all products initially
    fetch("https://web-back-end-1.onrender.com/api/v1/products/filter")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Error: Data fetch was not successful", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onPriceChange = (value) => {
    setPriceRange(value);
  };

  const handleSearch = () => {
    const query = `https://web-back-end-1.onrender.com/api/v1/products/filter?category=${category}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&name=${name}`;
    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Error: Data fetch was not successful", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const visiblePages = 5;
    const pages = [];

    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: 80 }}>
        <div className="mb-4 mt-20">
          <Navbar />
        </div>

        {/* filter */}
        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div style={{ padding: "0 10% " }}>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                  color: "#DC2626",
                }}
              >
                Tên sản phẩm
              </h1>
              <Input
                placeholder="Tên sản phẩm"
                value={name}
                onChange={onNameChange}
              />
            </div>
          </Col>
          <Col xl={12} style={{ padding: "0 10%", marginTop: 30 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
                color: "#DC2626",
              }}
            >
              Loại sản phẩm
            </h1>
            <Radio.Group
              buttonStyle="solid"
              onChange={onCategoryChange}
              value={category}
            >
              <Radio value="" style={{ fontSize: 16, fontWeight: "bold" }}>
                Tất cả
              </Radio>
              <Space style={{marginLeft: 10}} direction="vertical">
                <Radio
                  value="laptop"
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  Laptop
                </Radio>
                <Radio value="pc" style={{ fontSize: 16, fontWeight: "bold" }}>
                  PC
                </Radio>
                <Radio value="vga" style={{ fontSize: 16, fontWeight: "bold" }}>
                  VGA
                </Radio>
              </Space>
              <Space style={{marginLeft: 10}} direction="vertical">
                <Radio value="cpu" style={{ fontSize: 16, fontWeight: "bold" }}>
                  CPU
                </Radio>
                <Radio
                  value="case"
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  Case
                </Radio>
                <Radio
                  value="screen"
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  Màn hình
                </Radio>
              </Space>
              <Space style={{marginLeft: 10}} direction="vertical">
                <Radio
                  value="keyboard"
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  Bàn phím
                </Radio>
                <Radio
                  value="mouse"
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  Chuột
                </Radio>
                <Radio
                  value="headphone"
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  Tai nghe
                </Radio>
              </Space>
            </Radio.Group>
          </Col>
          <Col span={12} style={{ padding: "0 10%", marginTop: 30 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
                color: "#DC2626",
              }}
            >
              Tầm Giá
            </h1>
            <Slider
              style={{ width: "80%" }}
              range
              min={200000}
              max={80000000}
              defaultValue={priceRange}
              onChange={onPriceChange}
            />
            <div style={{ marginTop: 20 }}>
              <h1
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
              >
                Giá từ: {formatCash(priceRange[0])} VNĐ
              </h1>
              <h1
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
              >
                Giá đến: {formatCash(priceRange[1])} VNĐ
              </h1>
            </div>
          </Col>
          <Col span={24} style={{ marginTop: 50, padding: "0 10%" }}>
            <Button
              type="primary"
              onClick={handleSearch}
              style={{
                width: "100%",
                height: 50,
                fontSize: 16,
                fontWeight: "bold",
                backgroundColor: "#DC2626",
              }}
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
        {products.length === 0 ? (  
          <div className="flex justify-center items-center h-screen">
            <LoadingOutlined style={{ fontSize: 50, color: "#DC2626" }} />
          </div>
        ) : (
          <div className="container mx-auto p-4">
            <div className="bg-white p-4 ">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Tất cả sản phẩm</h1>
            </div>
            <div className="flex justify-between items-center mb-4"></div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 gap-2">
              {currentProducts.map((product) => (
                <Link
                  to={`/productdetail/${product.product_id}`}
                  key={product.product_id}
                  className="product-card bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg"
                >
                  <ProductsCard product={product} />
                </Link>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <ul className="flex space-x-2">
                <li>
                  <button
                    className={`px-3 py-1 h-8 rounded-md ${
                      currentPage === 1 ? "bg-gray-200" : "bg-gray-100"
                    }`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <img className="rotate-180" src="/arrow.svg" alt="" />
                  </button>
                </li>
                {getPageNumbers().map((number) => (
                  <li
                    key={number}
                    className={`cursor-pointer px-3 rounded-md py-1 ${
                      currentPage === number
                        ? "bg-red-500 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </li>
                ))}
                <li>
                  <button
                    className={`px-3 py-1 h-8 rounded-md ${
                      currentPage === totalPages ? "bg-gray-200" : "bg-gray-100"
                    }`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <img src="/arrow.svg" alt="" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Filter;
