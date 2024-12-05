import React from 'react';
import List from './List';

function ProductListAcessory() {
    return <List title="Phụ kiện" apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=accessories" />;
}

export default ProductListAcessory;
