import React from 'react';
import List from './List';

function ProductsListScreen() {
    return <List title="Màn hình" apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=screen" />;
}

export default ProductsListScreen;
