import React from "react";

function ProductForm({
  form,
  setForm,
  handleSubmit,
  loading,
  editingId,
  error
}) {
  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <input
          type="number"
          placeholder="Min Stock"
          value={form.minStock}
          onChange={(e) => setForm({ ...form, minStock: e.target.value })}
        />

        <button disabled={loading}>
          {loading
            ? "Loading..."
            : editingId
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>
    </>
  );
}

export default ProductForm;