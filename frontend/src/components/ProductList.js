import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, handleEdit, deleteProduct }) {
  return (
    <>
      <h3>Product List</h3>

      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          handleEdit={handleEdit}
          deleteProduct={deleteProduct}
        />
      ))}
    </>
  );
}

export default ProductList;