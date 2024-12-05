import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ProductsCard } from './ProductsCard';

function List({ title, apiEndpoint }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [sortOrder, setSortOrder] = useState('none'); 

    useEffect(() => {
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.data);
                } else {
                    console.error('Error: Data fetch was not successful', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [apiEndpoint]);

    // Hàm sắp xếp sản phẩm
    const sortProducts = (order) => {
        const sortedProducts = [...products];
        if (order === 'asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (order === 'desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
    };

    // Xử lý khi thay đổi thứ tự sắp xếp
    const handleSortChange = (event) => {
        const order = event.target.value;
        setSortOrder(order);
        sortProducts(order);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const getPageNumbers = () => {
        const visiblePages = 5;
        const pages = [];

        const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        const endPage = Math.min(totalPages, startPage + visiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div>
            <div className="mb-4 mt-20">
                <Navbar />
            </div>
            <div className=" flex text-sm font-bold text-gray-500 mt-36 mb-12 ml-24 cursor-pointer">
                <Link to={`/`}> <p>Trang chủ /&nbsp;</p></Link>  
                <div className="text-red-600">{title}</div>
            </div>
            <div className=" mx-auto lg:mx-24 p-4">
                <div className="bg-white lg:p-8 p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <select
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="border rounded p-2"
                        >
                            <option value="none">Sắp xếp theo</option>
                            <option value="asc">Giá: Tăng dần</option>
                            <option value="desc">Giá: Giảm dần</option>
                        </select>
                    </div>
                    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-4">
                        {currentProducts.map((product) => (
                            <Link
                                to={`/productdetail/${product.product_id}`}
                                key={product.product_id}
                                className="product-card p-4 rounded-lg shadow hover:shadow-lg"
                            >
                                <ProductsCard product={product} />
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                        <ul className="flex space-x-2">
                            <li>
                                <button
                                    className={`px-3 py-1 h-8 rounded-md ${currentPage === 1 ? 'bg-gray-200' : 'bg-gray-100'}`}
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    <img className="rotate-180" src="/arrow.svg" alt="" />
                                </button>
                            </li>
                            {getPageNumbers().map((number) => (
                                <li
                                    key={number}
                                    className={`cursor-pointer px-3 rounded-md py-1 ${
                                        currentPage === number ? 'bg-red-500 text-white' : 'bg-gray-100'
                                    }`}
                                    onClick={() => handlePageChange(number)}
                                >
                                    {number}
                                </li>
                            ))}
                            <li>
                                <button
                                    className={`px-3 py-1 h-8 rounded-md ${currentPage === totalPages ? 'bg-gray-200' : 'bg-gray-100'}`}
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    <img src="/arrow.svg" alt="" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default List;
