import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./AddProduct.css";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteReview,
} from "../services/productService.js";

const EMPTY_PRODUCT = {
  name: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
  badge: "",
  image: "",
  description: "",
  notes: { top: "", heart: "", base: "" },
  size: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState(EMPTY_PRODUCT);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [adminBrand, setAdminBrand] = useState("All");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const loadProducts = () => {
    setLoading(true);
    return getAllProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err?.message || "Could not load products."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    // If opened with ?edit=<id>, load that product into the form
    const editId = searchParams.get("edit");
    if (!editId) return;
    getProductById(editId).then((p) => {
      if (p) {
        setProduct({ ...EMPTY_PRODUCT, ...p });
        setEditing(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("notes.")) {
      const key = name.split(".")[1];
      setProduct((p) => ({ ...p, notes: { ...p.notes, [key]: value } }));
      return;
    }
    if (name === "badge" && value === "Out of Stock") {
      // Keep stock in sync so the badge and the number don't contradict each other
      setProduct((p) => ({ ...p, badge: value, stock: 0 }));
      return;
    }

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProduct((p) => ({ ...p, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setProduct(EMPTY_PRODUCT);
    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const cleaned = { ...product, price: Number(product.price || 0), stock: Number(product.stock || 0) };
    // ensure gender field for compatibility with pages that filter by gender
    cleaned.gender = (cleaned.category || cleaned.gender || "").toString().toLowerCase();

    setSaving(true);
    try {
      if (editing && cleaned.id) {
        await updateProduct(cleaned.id, cleaned);
        alert("Product updated successfully");
        await loadProducts();
        navigate(`/detail/${cleaned.id}`);
      } else {
        await createProduct(cleaned);
        alert("Product added successfully");
        await loadProducts();
      }
      resetForm();
    } catch (err) {
      setError(err?.message || "Could not save this product.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (p) => {
    setProduct({ ...EMPTY_PRODUCT, ...p });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      alert(err?.message || "Could not delete this product.");
    }
  };

  const [viewReviewsId, setViewReviewsId] = useState(null);

  const handleDeleteReview = async (productId, reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await deleteReview(productId, reviewId);
      await loadProducts();
    } catch (err) {
      alert(err?.message || "Could not delete this review.");
    }
  };

  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  const visibleProducts = products.filter((p) => {
    if (adminBrand !== "All" && p.brand !== adminBrand) return false;
    if (!adminSearch) return true;
    const term = adminSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      (p.brand && p.brand.toLowerCase().includes(term)) ||
      (p.description && p.description.toLowerCase().includes(term))
    );
  });

  return (
    <div className="add-product-page">
      <div className="container">
        <div className="form-wrapper">
          <h1 className="page-title">
            Add New Product ✨
          </h1>

          <p className="page-subtitle">
            Create and manage products for your store.
          </p>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                className="form-control"
                value={product.brand}
                onChange={handleChange}
                placeholder="e.g. Chanel, Dior"
                required
              />
            </div>

            <div className="mb-3">
              <label>Badge</label>
              <select
                name="badge"
                className="form-select"
                value={product.badge}
                onChange={handleChange}
              >
                <option value="">None</option>
                <option value="New">New</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Category</label>
              <select
                name="category"
                className="form-select"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Category
                </option>
                <option value="Female">
                  Female
                </option>
                <option value="Male">
                  Male
                </option>
                <option value="Accessories">
                  Accessories
                </option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Price ($)</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  value={product.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                className="form-control"
                value={product.image}
                onChange={handleChange}
                placeholder="Paste image URL or use the Upload button below"
              />

              <div style={{marginTop:8}}>
                <label style={{fontSize:13, color:'#666'}}>Or upload an image from your device</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
              </div>

              {product.image && (
                <div style={{marginTop:12}}>
                  <label style={{fontSize:13, color:'#333', display:'block', marginBottom:6}}>Image preview</label>
                  <div style={{maxWidth:320, border:'1px solid #ddd', borderRadius:8, overflow:'hidden'}}>
                    <img
                      src={product.image}
                      alt="Selected product"
                      style={{width:'100%', height:'auto', display:'block', objectFit:'cover'}}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label>Description</label>
              <textarea
                rows="5"
                name="description"
                className="form-control"
                value={product.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Fragrance Notes</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                <input
                  type="text"
                  name="notes.top"
                  className="form-control"
                  value={product.notes.top}
                  onChange={handleChange}
                  placeholder="Top notes (e.g. Bergamot, Citrus)"
                />
                <input
                  type="text"
                  name="notes.heart"
                  className="form-control"
                  value={product.notes.heart}
                  onChange={handleChange}
                  placeholder="Heart notes (e.g. Jasmine, Rose)"
                />
                <input
                  type="text"
                  name="notes.base"
                  className="form-control"
                  value={product.notes.base}
                  onChange={handleChange}
                  placeholder="Base notes (e.g. Musk, Amber)"
                />
                <input
                  type="text"
                  name="size"
                  className="form-control"
                  value={product.size}
                  onChange={handleChange}
                  placeholder="Size (e.g. 50 ml)"
                />
              </div>
            </div>

            <button
              type="submit"
              className="add-product-btn"
              disabled={saving}
            >
              {saving ? "Saving…" : editing ? "Save Changes" : "Add Product"}
            </button>
            {editing && (
              <button type="button" className="add-product-btn" style={{marginLeft:12, background:'#ccc', color:'#333'}} onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="container mt-4">
        <h2 style={{marginTop:24}}>Manage Products</h2>
        <div className="product-controls" style={{display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
          <input
            placeholder="Search products..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            className="form-control"
            style={{maxWidth:360}}
          />
          <select className="form-select" value={adminBrand} onChange={(e) => setAdminBrand(e.target.value)} style={{maxWidth:220}}>
            <option value="All">All Brands</option>
            {brands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading products…</p>
        ) : (
          <div className="product-list">
            {visibleProducts.map((p) => (
              <div key={p.id} className="product-row">
                <div style={{display:'flex', gap:12, alignItems:'center'}}>
                  <img src={p.image} alt={p.name} style={{width:72, height:72, objectFit:'cover', borderRadius:8}}/>
                  <div>
                    <strong>{p.name}</strong>
                    <div style={{fontSize:13, color:'#666'}}>{p.brand || p.category} · ${p.price}</div>
                  </div>
                </div>
                <div>
                  <button onClick={() => handleEdit(p)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="delete-btn">Delete</button>
                      <button onClick={() => setViewReviewsId(viewReviewsId === p.id ? null : p.id)} className="edit-btn" style={{marginLeft:8}}>{viewReviewsId === p.id ? 'Hide Reviews' : 'Manage Reviews'}</button>
                </div>
              </div>
            ))}
          </div>
        )}

            {viewReviewsId && (
              <div style={{marginTop:16}}>
                <h3>Reviews for product</h3>
                {(products.find(p=>p.id===viewReviewsId)?.reviews || []).length === 0 ? (
                  <p>No reviews yet</p>
                ) : (
                  <div style={{display:'grid', gap:10}}>
                    {(products.find(p=>p.id===viewReviewsId)?.reviews || []).map(r => (
                      <div key={r.id} style={{padding:10, background:'#fff', borderRadius:8, boxShadow:'0 6px 18px rgba(0,0,0,0.04)'}}>
                        <div style={{color:'#ffb400'}}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                        <div style={{fontSize:12, color:'#888', marginTop:6}}>{new Date(r.date).toLocaleString()}</div>
                        <div style={{marginTop:8}}>
                          <button onClick={() => handleDeleteReview(viewReviewsId, r.id)} className="delete-btn">Delete Review</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
      </div>
    </div>
  );
};

export default AddProduct;
