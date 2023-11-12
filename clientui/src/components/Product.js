import React from "react";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Link to={`/products/${product?.id}`}>
      <div className="flex flex-col justify-start items-center gap-4 w-full max-w-[350px] min-w-[350px] min-h-[350px] max-h-[350px] border border-blue-400 border-medium p-4 rounded hover:bg-blue-100 transition-all	">
        <img
          style={{ height: "200px", width: "auto" }}
          src={product?.image}
          alt={product?.name}
        />
        <h3 className="text-blue-600 underline hover:text-blue-900">
          {product?.title}
        </h3>
      </div>
    </Link>
  );
}

export default Product;
