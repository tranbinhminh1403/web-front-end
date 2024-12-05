import React from "react";
import List from "./List";

function ProductListLaptop() {
  return (
    <List
      title="Laptop"
      apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=laptop"
    />
  );
}

export default ProductListLaptop;
