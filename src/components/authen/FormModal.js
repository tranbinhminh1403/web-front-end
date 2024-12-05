import React, { useState } from 'react';
import { Tabs } from 'antd';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const FormModal = ({ handleLoginSuccess, handleCancel }) => {
  const [activeTabKey, setActiveTabKey] = useState('1');

  const handleRegisterSuccess = () => {
    setActiveTabKey('1');
  };

  const items = [
    {
      key: '1',
      label: `Đăng Nhập`,
      children: <LoginForm onLoginSuccess={handleLoginSuccess} />,
    },
    {
      key: '2',
      label: `Đăng Ký`,
      children: <RegisterForm onRegisterSuccess={handleRegisterSuccess} />,
    }
  ]
  return (
    <div>
        <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} items={items} />
    </div>
  )
}

export default FormModal