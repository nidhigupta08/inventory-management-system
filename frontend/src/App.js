import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// ✅ IMPORT COMPONENTS
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CategoryChart from "./components/CategoryChart";
import StockChart from "./components/StockChart";
import SearchFilter from "./components/SearchFilter";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    minStock: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatCategory = (text) => {
    if (!text) return "";

    const lower = text.toLowerCase();

    if (lower.includes("cloth")) return "Clothing";
    if (lower.includes("skin")) return "Skincare";
    if (lower.includes("groc")) return "Grocery";
    if (lower.includes("elect")) return "Electronics";

    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      minStock: product.minStock
    });

    setEditingId(product._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const category = form.category.trim();
    const price = Number(form.price);
    const quantity = Number(form.quantity);
    const minStock = Number(form.minStock);

    if (!name) {
      setError("Name is required");
      return;
    }

    if (!category) {
      setError("Category is required");
      return;
    }

    if (price <= 0 || quantity < 0 || minStock < 0) {
      setError("Enter valid numeric values");
      return;
    }

    try {
      setLoading(true);

      const formattedData = {
        name,
        category: formatCategory(category),
        price,
        quantity,
        minStock
      };

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          formattedData
        );
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          formattedData
        );
      }

      setForm({ name: "", category: "", price: "", quantity: "", minStock: "" });
      setError("");
      fetchProducts();

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "" || p.category === filter)
  );

  const categoryData = Object.values(
    products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { category: product.category, count: 0 };
      }
      acc[product.category].count += 1;
      return acc;
    }, {})
  );

  const stockData = products.map((p) => ({
    name: p.name,
    quantity: p.quantity
  }));

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h2>Inventory Management System</h2>

        <Dashboard products={products} />

        <CategoryChart data={categoryData} />

        <StockChart data={stockData} />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <ProductForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          loading={loading}
          editingId={editingId}
          error={error}
        />

        <ProductList
          products={filteredProducts}
          handleEdit={handleEdit}
          deleteProduct={deleteProduct}
        />
      </div>
    </div>
  );
}

export default App;