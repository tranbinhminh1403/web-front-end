import React from 'react';
import List from './List';

function ProductsListMouse() {
    return <List title="Chuột" apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=mouse" />;
}

export default ProductsListMouse;
