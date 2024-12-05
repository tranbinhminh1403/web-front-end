import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatCash } from '../utils/formatCash';
import Navbar from './Navbar';
import { ProductsCard } from './ProductsCard';
import Footer from './Footer';

import List from './List';

function ProductList() {
    return <List title="Tất cả sản phẩm" apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/list" />;
}

export default ProductList;
