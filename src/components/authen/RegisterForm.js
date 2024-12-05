import { Button, Form, Input, Alert, notification } from "antd";
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ onRegisterSuccess }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const onFinish = async (values) => {
    console.log("Form Values:", values);

    if (values.password !== values.passwordAgain) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://web-back-end-1.onrender.com/api/v1/auth/register", {
        username: values.username,
        password: values.password,
        email: values.email,
      });
      notification.success({
        message: 'Đăng ký thành công',
        description: 'Bạn đã đăng ký thành công. Vui lòng đăng nhập.',
      });

      if (response.data.success) {
        onRegisterSuccess();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration");
    }
  };

  return (
    <div>
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Nhập tên người dùng" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Nhập email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="passwordAgain"
          rules={[{ required: true, message: "Nhập lại mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
