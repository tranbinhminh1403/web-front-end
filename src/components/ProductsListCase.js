import React from 'react';
import List from './List';

function ProductsListCase() {
    return <List title="Thùng case" apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=case" />;
}

export default ProductsListCase;
