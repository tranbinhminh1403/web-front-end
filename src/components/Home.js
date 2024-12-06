import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { formatCash } from "../utils/formatCash";
import { ProductsCard } from "./ProductsCard";
import { LoadingOutlined } from "@ant-design/icons";

function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsPC, setProductsPC] = useState([]);
  const [productsVGA, setProductsVGA] = useState([]);
  const [numProducts, setNumProducts] = useState(5); // State to manage number of products displayed

  useEffect(() => {
    const updateNumProducts = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setNumProducts(5);
      } else if (width > 992) {
        setNumProducts(4);
      } else if (width > 768) {
        setNumProducts(3);
      } else {
        setNumProducts(2);
      }
    };

    updateNumProducts(); // Initial call to set the number of products
    window.addEventListener("resize", updateNumProducts); // Add event listener for window resize

    return () => window.removeEventListener("resize", updateNumProducts); // Cleanup event listener
  }, []);

  useEffect(() => {
    fetch(`https://web-back-end-1.onrender.com/api/v1/products/filter?category=laptop`)
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

  useEffect(() => {
    fetch(`https://web-back-end-1.onrender.com/api/v1/products/filter?category=pc`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProductsPC(data.data);
        } else {
          console.error("Error: Data fetch was not successful", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`https://web-back-end-1.onrender.com/api/v1/products/filter?category=vga`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProductsVGA(data.data);
        } else {
          console.error("Error: Data fetch was not successful", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const rndInt = randomIntFromInterval(0, 10);

  return (
    <div>
      <div className="mb-4 mt-20">
        <Navbar />
      </div>
      <div className="lg:mx-20">
        <div className="flex ">
          <div className="w-1/5 bg-gray-100 p-4 mr-4 hidden lg:block">
          <ul className="xl:space-y-11 lg:space-y-6 py-2 w-40">
            <li className="relative flex items-center justify-between">
              <Link
                to="/productlist"
                className="flex items-center hover:font-bold hover:text-red-600"
              >
                <img src="/all.svg" alt="" />
                <i className="laptop mr-2"></i> Tất cả sản phẩm
              </Link>
            </li>
            <li className="flex items-center justify-between ">
              <Link
                to="/productlist/laptop"
                className="flex items-center hover:font-bold hover:text-red-600"
              >
                <img src="/lap.svg" alt="" />
                <i className="gamepad mr-2"></i> Laptop
              </Link>
            </li>
            <li className="flex items-center justify-between hover:font-bold hover:text-red-600">
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
          <div className="lg:w-4/5 w-full ">
            <div className="flex ">
              <div className="w-full cursor-pointer">
                <img src="nvidiabaner.jpg" alt="" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="">
                <img src="Screen Shot 2024-11-22 at 07.13.05.png" alt="" />
              </div>
              <div className="">
                <img src="b.png" alt="Laptop" />
              </div>
              <div className="">
                <img src="c.png" alt="Laptop" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" mt-8">
            <div>
              <img src="/qc1.png" alt="" />
            </div>
            <div className="bg-white p-4 ">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Laptop bán chạy</h1>
              </div>
              {products.length > 0 ? (
              <div className={`grid grid-cols-5 lg:gap-3 gap-1`}>
                {products.slice(0, 5).map((product) => (
                  <Link
                    to={`/productdetail/${product.product_id}`}
                    key={product.product_id}
                  >
                    <div
                      key={product.product_id}
                      className="product-card p-4 rounded-lg shadow hover:shadow-lg"
                    >
                      <ProductsCard product={product} />
                    </div>
                  </Link>
                ))}
              </div>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <LoadingOutlined style={{ color: "#DC2626" }} />
                </div>
              )}
            </div>
          </div>
          <div className=" mt-8">
          <div>
              <img src="/qc2.png" alt="" />
            </div>
            <div className="bg-white p-4 ">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">PC bán chạy</h1>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4"></div>
              </div>

             
              {productsPC.length > 0 ? (
              <div className={`grid grid-cols-5 lg:gap-3 gap-1`}>
                {productsPC.slice(0, 5).map((product) => (
                  <Link
                    to={`/productdetail/${product.product_id}`}
                    key={product.product_id}
                  >
                    <div
                      key={product.product_id}
                      className="product-card p-4 rounded-lg shadow hover:shadow-lg"
                    >
                      <ProductsCard product={product} />
                    </div>
                  </Link>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <LoadingOutlined style={{ color: "#DC2626" }} />
                </div>
              )}
            </div>
          </div>
          <div className=" mt-8 mb-12">
            <div className="bg-white p-4 ">
      
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Linh kiện bán chạy</h1>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4"></div>
              </div>

              
              {productsVGA.length > 0 ? (
              <div className={`grid grid-cols-5 lg:gap-3 gap-1`}>
                {productsVGA.slice(0, 5).map((product) => (
                  <Link
                    to={`/productdetail/${product.product_id}`}
                    key={product.product_id}
                  >
                    <div
                      key={product.product_id}
                      className="product-card p-4 rounded-lg shadow hover:shadow-lg"
                    >
                      <ProductsCard product={product} />
                    </div>
                  </Link>
                ))}
              </div>
              ) : (
                <div className="flex justify-center items-center h-screen">
                  <LoadingOutlined style={{ color: "#DC2626" }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
