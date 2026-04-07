import React from "react";

function ProductCard({ product, handleEdit, deleteProduct }) {
  const isLowStock = product.quantity <= product.minStock;

  return (
    <div className={`product-card ${isLowStock ? "low-stock" : ""}`}>
      <h4>{product.name}</h4>
      <p>Category: {product.category}</p>
      <p>Price: ₹{product.price}</p>
      <p>Quantity: {product.quantity}</p>

      {isLowStock && <p style={{ color: "red" }}>⚠️ LOW STOCK</p>}

      <div className="actions">
        <button onClick={() => handleEdit(product)}>Edit</button>
        <button onClick={() => deleteProduct(product._id)}>Delete</button>
      </div>
    </div>
  );
}

export default ProductCard;