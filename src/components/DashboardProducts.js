import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  notification,
  Col,
  Slider,
  Radio,
  Space,
  Row,
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { formatCash } from "../utils/formatCash";

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [priceRange, setPriceRange] = useState([200000, 80000000]);

  useEffect(() => {
    fetchProducts();
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

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://web-back-end-1.onrender.com/api/v1/products/filter?category=${category}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&name=${name}`
      );
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const isAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      notification.error({ message: "Không tìm thấy token" });
      return false;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken.role === "admin";
  };

  const handleAddOrUpdate = async (values) => {
    if (!isAdmin()) {
      notification.error({
        message: "Bạn không có quyền thực hiện hành động này",
      });
      return;
    }

    const token = localStorage.getItem("token");
    const payload = {
      productName: values.product_name,
      price: values.price,
      stock: values.stock,
      img: values.img,
      specs: values.specs,
      discount: values.discount,
      categoryName: values.category_name,
    };

    console.log("Payload:", payload);

    try {
      const url = editingProduct
        ? `https://web-back-end-1.onrender.com/api/v1/products/admin/update/${editingProduct.product_id}`
        : "https://web-back-end-1.onrender.com/api/v1/products/admin/add";

      const method = editingProduct ? "put" : "post";

      const response = await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        notification.success({ message: "Lưu thành công" });
        fetchProducts();
        setIsModalVisible(false);
        setEditingProduct(null);
        form.resetFields();
      } else {
        notification.error({ message: "Lưu thất bại" });
      }
    } catch (error) {
      console.error("Error saving product:", error);
      notification.error({
        message: "Lưu thất bại",
        description:
          error.response?.data?.message || "An unexpected error occurred",
      });
    }
  };

  const handleDelete = (productId) => {
    if (!isAdmin()) {
      notification.error({
        message: "Bạn không có quyền thực hiện hành động này",
      });
      return;
    }

    Modal.confirm({
      title: "Bạn có chắc chắn muốn xoá sản phẩm này?",
      onOk: async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.delete(
            `https://web-back-end-1.onrender.com/api/v1/products/admin/delete/${productId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data.success) {
            notification.success({ message: "Xoá thành công" });
            fetchProducts();
          } else {
            notification.error({ message: "Xoá thất bại" });
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          notification.error({
            message: "Xoá thất bại",
            description:
              error.response?.data?.message || "An unexpected error occurred",
          });
        }
      },
      onCancel() {
        console.log("Delete action canceled");
      },
    });
  };

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "product_name", key: "name", render: (text) => (
      <div style={{  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {text}
      </div>
    ) },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <span >
          {formatCash(text)}
        </span>
      ),
    },
    { title: "Giảm giá", dataIndex: "discount", key: "discount", render: (text) => (
      <span>{text}%</span>
    ) },
    { title: "Số lượng", dataIndex: "stock", key: "stock" },
    { title: "Loại sản phẩm", dataIndex: "category_name", key: "category" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="primary" variant="contained"
            onClick={() => {
              setEditingProduct(record);
              setIsModalVisible(true);
            }}
          >
            Chỉnh sửa
          </Button>
          <Button onClick={() => handleDelete(record.product_id)} >
            Xoá
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mt-10 mb-5">
        Quản lý sản phẩm
      </h2>
      {/* filter */}
      <Row style={{ marginTop: 30, marginBottom: 30 }}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div >
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
        <Col xl={12} style={{  marginTop: 30 }}>
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
            <Space direction="vertical">
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
            <Space direction="vertical">
              <Radio value="cpu" style={{ fontSize: 16, fontWeight: "bold" }}>
                CPU
              </Radio>
              <Radio value="case" style={{ fontSize: 16, fontWeight: "bold" }}>
                Case
              </Radio>
              <Radio
                value="screen"
                style={{ fontSize: 16, fontWeight: "bold" }}
              >
                Màn hình
              </Radio>
            </Space>
            <Space direction="vertical">
              <Radio
                value="keyboard"
                style={{ fontSize: 16, fontWeight: "bold" }}
              >
                Bàn phím
              </Radio>
              <Radio value="mouse" style={{ fontSize: 16, fontWeight: "bold" }}>
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
        <Col span={12} style={{  marginTop: 30 }}>
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
            <h1 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
              Giá từ: {formatCash(priceRange[0])} VNĐ
            </h1>
            <h1 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
              Giá đến: {formatCash(priceRange[1])} VNĐ
            </h1>
          </div>
        </Col>
        <Col span={24} style={{ marginTop: 50}}>
          <Button
            type="primary"
            onClick={fetchProducts}
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

      <Button style={{ marginBottom: 20 }} onClick={() => setIsModalVisible(true)}>
        Thêm sản phẩm
      </Button>
      <Table columns={columns} dataSource={products} rowKey="product_id" />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={handleAddOrUpdate}
          initialValues={editingProduct}
        >
          <Form.Item
            name="product_name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="stock" label="Số lượng">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="img" label="Ảnh">
            <Input />
          </Form.Item>
          <Form.Item name="specs" label="Thông số">
            <Input />
          </Form.Item>
          <Form.Item name="discount" label="Giảm giá">
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="category_name"
            label="Loại sản phẩm"
            initialValue={editingProduct?.category_name}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardProducts;
