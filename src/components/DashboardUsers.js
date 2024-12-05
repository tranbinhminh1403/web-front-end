import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, notification } from 'antd';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [emailFilter, setEmailFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [emailFilter, addressFilter, phoneFilter]);

  const fetchUsers = async () => {
    if (!isAdmin()) {
      notification.error({ message: "Bạn không có quyền thực hiện hành động này" });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://web-back-end-1.onrender.com/api/v1/auth/admin/all-users?email=${emailFilter}&address=${addressFilter}&phone=${phoneFilter}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      notification.error({ message: "Không tìm thấy token" });
      return false;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken.role === 'admin';
  };

  const handleDelete = (userId) => {
    if (!isAdmin()) {
      notification.error({ message: "Bạn không có quyền thực hiện hành động này" });
      return;
    }

    Modal.confirm({
      title: "Bạn có chắc chắn muốn xoá người dùng này?",
      onOk: async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.delete(`https://web-back-end-1.onrender.com/api/v1/auth/admin/delete-user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success) {
            notification.success({ message: "Xoá thành công" });
            fetchUsers();
          } else {
            notification.error({ message: "Xoá thất bại" });
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          notification.error({
            message: "Xoá thất bại",
            description: error.response?.data?.message || "An unexpected error occurred",
          });
        }
      },
      onCancel() {
        console.log('Delete action canceled');
      },
    });
  };

  const columns = [
    { title: 'ID', dataIndex: 'user_id', key: 'id' },
    { title: 'Tên người dùng', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={() => { setSelectedUser(record); setIsModalVisible(true); }}>Xem</Button>
          <Button onClick={() => handleDelete(record.user_id)}>Xoá</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mt-10 mb-5">Quản lý người dùng</h2>
      <div style={{ marginBottom: 20 }}>
        <Input placeholder="Lọc theo Email" value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)} style={{ width: 200, marginRight: 10 }} />
        <Input placeholder="Lọc theo Địa chỉ" value={addressFilter} onChange={(e) => setAddressFilter(e.target.value)} style={{ width: 200, marginRight: 10 }} />
        <Input placeholder="Lọc theo Số điện thoại" value={phoneFilter} onChange={(e) => setPhoneFilter(e.target.value)} style={{ width: 200 }} />
      </div>
      <Table columns={columns} dataSource={users} rowKey="user_id" />

      <Modal
        title="Chi tiết người dùng"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p><strong>ID:</strong> {selectedUser.user_id}</p>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Địa chỉ:</strong> {selectedUser.address}</p>
            <p><strong>Số điện thoại:</strong> {selectedUser.phone}</p>
            <h3>Giỏ hàng:</h3>
            {selectedUser.carts.map(cart => (
              <div key={cart.cart_id}>
                <p><strong>ID Giỏ hàng:</strong> {cart.cart_id}</p>
                <p><strong>Tên sản phẩm:</strong> {cart.product.product_name}</p>
                <p><strong>Số lượng:</strong> {cart.quantity}</p>
                <p><strong>Trạng thái:</strong> {cart.status}</p>
                <p><strong>Giá:</strong> {cart.product.price}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardUsers;
