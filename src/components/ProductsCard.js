import React from "react";
import { formatCash } from "../utils/formatCash";

export const ProductsCard = ({ product }) => {
  return (
    <div
      className="flex flex-col"
      style={{
        maxWidth: "300px", // Đặt chiều rộng tối đa
        aspectRatio: "3/6", // Đặt tỉ lệ chiều rộng / chiều cao
      }}
    >
      {/* Hình ảnh sản phẩm */}
      <img
        src={product.img}
        alt={`Image of ${product.product_name}`}
        className=" object-cover"
        style={{
          width: "100%",
          height: "45%",
          objectFit: "cover",
        }}
      />

      {/* Tên sản phẩm */}
      <h2
        className="mt-2 text-xs lg:text-sm xl:text-base font-semibold "
        style={{
          height: "25%", 
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {product.product_name}
      </h2>

      {/* Giá sản phẩm */}
      <div
        className="mt-2 flex flex-col "
        style={{ height: "15%" }} // Chiếm 15% chiều cao thẻ
      >
        {product.discount > 0 ? (
          <div className="text-gray-400 text-sm line-through">
            {formatCash(product.price)}
          </div>
        ) : (
          <div style={{ height: "1em" }}></div>
        )}
        <span className="text-red-500 lg:text-lg text-xs font-bold">
          {formatCash((product.price / 100) * (100 - product.discount))}
        </span>
      </div>

      {/* Trạng thái hàng */}
      <div className=" pt-2 ">
        {product.stock > 0 ? (
          <span className="text-green-500 text-xs lg:block hidden ">Còn hàng</span>
        ) : (
          <span className="text-red-500 text-md ">HẾT HÀNG</span>
        )}
      </div>
    </div>
  );
};
