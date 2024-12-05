import React from 'react';
import List from './List';

function ProductListCPU() {
    return <List title="Cpu" apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=cpu" />;
}

export default ProductListCPU;
