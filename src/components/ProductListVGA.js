import React from 'react';
import List from './List';

function ProductListComponent() {
    return <List title="VGA" apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=vga" />;
}

export default ProductListComponent;
