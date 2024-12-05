import React, { useState, useEffect } from 'react';
import { Input, Button, Form, notification } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState({ email: false, address: false, phone: false });
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      notification.error({ message: "Please log in to view your profile." });
      return;
    }

    fetch("https://web-back-end-1.onrender.com/api/v1/auth/get-user", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUserData(data.data);
        } else {
          notification.error({ message: "Failed to fetch user data" });
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        notification.error({ message: "Error fetching user data" });
      });
  }, []);

  const handleEditClick = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSaveClick = (field) => {
    const fieldsToValidate = [field];
    if (showPasswordFields) {
      fieldsToValidate.push('password', 'confirmPassword');
    }

    form.validateFields(fieldsToValidate).then(values => {
      if (showPasswordFields && values.password !== values.confirmPassword) {
        notification.error({ message: "Passwords do not match" });
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        notification.error({ message: "Please log in to update your profile." });
        return;
      }

      const decodedToken = jwtDecode(token);
      console.log("Decoded token:", decodedToken);

      const userId = decodedToken.id;
      if (!userId) {
        console.error("User ID not found in token");
        notification.error({ message: "User ID not found in token" });
        return;
      }

      const updateData = { userId, [field]: values[field] };
      if (showPasswordFields) {
        updateData.newPassword = values.password;
      }

      console.log("Request payload:", updateData);

      fetch(`https://web-back-end-1.onrender.com/api/v1/auth/update-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setUserData({ ...userData, [field]: values[field] });
            setEditMode({ ...editMode, [field]: false });
            setShowPasswordFields(false);
            notification.success({ message: "User info updated successfully" });
          } else {
            notification.error({ message: "Failed to update user info" });
          }
        })
        .catch(error => {
          console.error("Error updating user info:", error);
          notification.error({ message: "Error updating user info" });
        });
    });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center mt-10 mb-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4">Thông tin của bạn</h1>

      <Form form={form} layout="vertical">
        <h2 className="text-lg font-bold mb-2">Tên đăng nhập</h2>
        <Form.Item  className="text-lg font-bold">
          <Input value={userData.username} disabled />
        </Form.Item>

        <h2 className="text-lg font-bold mb-2">Email</h2>
        <Form.Item  name="email" initialValue={userData.email || "Chưa cung cấp"}>
          {editMode.email ? (
            <Input suffix={<SaveOutlined onClick={() => handleSaveClick('email')} />} />
          ) : (
            <div>
              {userData.email || "Chưa cung cấp"} <EditOutlined onClick={() => handleEditClick('email')} />
            </div>
          )}
        </Form.Item>

        <h2 className="text-lg font-bold mb-2">Địa chỉ</h2>
        <Form.Item  name="address" initialValue={userData.address || "Chưa cung cấp"}>
          {editMode.address ? (
            <Input suffix={<SaveOutlined onClick={() => handleSaveClick('address')} />} />
          ) : (
            <div>
              {userData.address || "Chưa cung cấp"} <EditOutlined onClick={() => handleEditClick('address')} />
            </div>
          )}
        </Form.Item>

        <h2 className="text-lg font-bold mb-2">Số điện thoại</h2>
        <Form.Item  name="phone" initialValue={userData.phone || "Chưa cung cấp"}>
          {editMode.phone ? (
            <Input suffix={<SaveOutlined onClick={() => handleSaveClick('phone')} />} />
          ) : (
            <div>
              {userData.phone || "Chưa cung cấp"} <EditOutlined onClick={() => handleEditClick('phone')} />
            </div>
          )}
        </Form.Item>
        <Button onClick={() => setShowPasswordFields(!showPasswordFields)}>
          {showPasswordFields ? "Hủy" : "Thay đổi mật khẩu"}
        </Button>
        {showPasswordFields && (
          <> 
            <h2 className="text-lg font-bold mb-2">Mật khẩu</h2>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password />
            </Form.Item>

            <h2 className="text-lg font-bold mb-2">Nhập lại mật khẩu</h2>
            <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password!' }]}>
              <Input.Password />
            </Form.Item>
            <Button onClick={() => handleSaveClick('password')}>Thay đổi</Button>
          </>
        )}
        </Form>
      </div>
    </div>
  );
};

export default UserInfo;