import React from 'react';
import List from './List';

function ProductsListHeadphone() {
    return <List title="Tai nghe" apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=headphone" />;
}

export default ProductsListHeadphone;
