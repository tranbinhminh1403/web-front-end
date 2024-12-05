import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { Col, Row } from "antd";
import { formatCash } from "../utils/formatCash";

const DashboardOverall = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartData, setChartData] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [mostSoldProduct, setMostSoldProduct] = useState({});
  const [highestIncomeProduct, setHighestIncomeProduct] = useState({});
  const [mostSoldCategory, setMostSoldCategory] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://web-back-end-1.onrender.com/api/v1/products/list");
        const products = response.data.data;

        // Count products by category
        const categoryCounts = products.reduce((acc, product) => {
          const category = product.category_name;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category]++;
          return acc;
        }, {});

        // Find most sold category
        const mostSoldCategory = Object.entries(categoryCounts).reduce((max, [category, count]) => {
          return count > max.count ? { category, count } : max;
        }, { category: '', count: 0 });

        // Prepare data for Chart.js
        const data = {
          labels: Object.keys(categoryCounts),
          datasets: [
            {
              data: Object.values(categoryCounts),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#220066",
                "#FF7700",
                "#00FF77",
              ],
            },
          ],
        };

        setChartData(data);

        // Set state or log these values
        console.log("Most Sold Category:", mostSoldCategory);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchUserCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("https://web-back-end-1.onrender.com/api/v1/auth/admin/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setTotalUsers(response.data.data.length);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchTotalProductsSold = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("https://web-back-end-1.onrender.com/api/v1/cart/admin/total-paid-items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const products = response.data.data;

          const totalSold = products.reduce((acc, product) => {
            return acc + parseInt(product.totalQuantitySold, 10);
          }, 0);
          setTotalProductsSold(totalSold);

          const totalIncome = products.reduce((acc, product) => {
            const quantity = parseInt(product.totalQuantitySold, 10);
            const price = parseFloat(product.price);
            const discount = product.discount / 100;
            const discountedPrice = price * (1 - discount);
            return acc + (quantity * discountedPrice);
          }, 0);
          setTotalIncome(totalIncome);

          // Calculate most sold quantity product
          const mostSoldProduct = products.reduce((max, product) => {
            const quantity = parseInt(product.totalQuantitySold, 10);
            return quantity > max.quantity ? { name: product.product_name, quantity } : max;
          }, { name: '', quantity: 0 });
          setMostSoldProduct(mostSoldProduct);

          // Calculate highest income product
          const highestIncomeProduct = products.reduce((max, product) => {
            const quantity = parseInt(product.totalQuantitySold, 10);
            const price = parseFloat(product.price);
            const discount = product.discount / 100;
            const income = quantity * price * (1 - discount);
            return income > max.income ? { name: product.product_name, income } : max;
          }, { name: '', income: 0 });
          setHighestIncomeProduct(highestIncomeProduct);
        } else {
          console.error("Failed to fetch total sold items");
        }
      } catch (error) {
        console.error("Error fetching total sold items:", error);
      }
    };

    fetchData();
    fetchUserCount();
    fetchTotalProductsSold();
  }, []);

  useEffect(() => {
    if (chartData.labels) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(chartRef.current, {
        type: "doughnut",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  return (
    <div style={{marginBottom: 50}}>
      <h2 className="text-center text-2xl font-bold mt-10 mb-5">
        Thống kê sản phẩm
      </h2>
      <Row>
        <Col xl={12} lg={12} md={12} sm={24} xs={24} style={{ marginTop: 10 }}>
          <div
            style={{
              margin: "10px 10px",
              position: "relative",
              borderRadius: 10,
              backgroundColor: "#fff",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
              padding: "5%",
            }}
          >
            <canvas ref={chartRef} />
          </div>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24} style={{ marginTop: 10 }}>
            <div
            style={{
              margin: "10px 10px",
              position: "relative",
              borderRadius: 10,
              backgroundColor: "#fff",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 42,
            }}
          >
            <div>
                <h1 className="text-2xl font-bold">Tổng số người dùng:</h1>
                <h1 className="text-4xl text-red-500">{totalUsers}</h1>
            </div>
            <div>
                <h1 className="text-2xl font-bold">Tổng số sản phẩm đã bán:</h1>
                <h1 className="text-4xl text-blue-500">{totalProductsSold}</h1>
            </div>
            <div>
                <h1 className="text-2xl font-bold">Tổng số doanh thu:</h1>
                <h1 className="text-4xl text-green-500">{formatCash(totalIncome)}</h1>
            </div>
          </div>
        </Col>
      </Row>
      <Row             
        style={{
          margin: "10px 10px",
          position: "relative",
          borderRadius: 10,
          backgroundColor: "#fff",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          padding: "5%",
      }}>
        <Col span={24} style={{display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            <h1 className="text-4xl font-bold text-blue-500">Sản phẩm bán chạy nhất</h1>
            <h1 className="text-4xl text-500">{mostSoldProduct.name}</h1>
            <h1 className="text-4xl text-red-500">{mostSoldProduct.quantity}</h1>
        </Col>
        <Col span={24} style={{display: "flex", flexDirection: "column", gap: 10}}>
            <h1 className="text-4xl font-bold text-blue-500">Sản phẩm có doanh thu cao nhất</h1>
                <h1 className="text-4xl text-500">{highestIncomeProduct.name}</h1>
                <h1 className="text-4xl text-green-500">{formatCash(highestIncomeProduct.income)}</h1>
            </Col>

      </Row>
        
    </div>
  );
};

export default DashboardOverall;
