import React from 'react';
import List from './List';

function ProductsListKeyboard() {
    return <List title="Bàn phím" apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=keyboard" />;
}

export default ProductsListKeyboard;
