import React from "react";
import List from "./List";

function ProductListPc() {
  return (
    <List
      title="Pc"
      apiEndpoint="https://web-back-end-1.onrender.com/api/v1/products/filter?category=pc"
    />
  );
}

export default ProductListPc;
