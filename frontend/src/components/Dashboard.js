import React from "react";

function Dashboard({ products }) {
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.quantity <= p.minStock).length;

  return (
    <div className="dashboard">
      <div className="card">
        <h3>Total Products</h3>
        <p>{totalProducts}</p>
      </div>

      <div className="card">
        <h3>Low Stock</h3>
        <p>{lowStock}</p>
      </div>
    </div>
  );
}

export default Dashboard;