import { useEffect, useState } from "react";
import { PRODUCTS_URL } from "./productApi.js";

export default function Products({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        setStatus("loading");
        setError("");

        const response = await fetch(PRODUCTS_URL);

        if (!response.ok) {
          throw new Error("Unable to load products");
        }

        const data = await response.json();

        if (!ignore) {
          setProducts(data.products || []);
          setStatus("ready");
        }
      } catch (fetchError) {
        if (!ignore) {
          setProducts([]);
          setError(fetchError.message);
          setStatus("error");
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="products-page" aria-label="Products">
      <div className="products-header">
        <div>
          <p className="eyebrow">DummyJSON</p>
          <h2>Products</h2>
        </div>
        <span className="products-count">{products.length} items</span>
      </div>

      {status === "loading" && <p className="empty-state">Loading products...</p>}
      {status === "error" && <p className="empty-state">{error}</p>}

      {status === "ready" && (
        <div className="products-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div className="product-card-body">
                <div>
                  <p className="product-category">{product.category}</p>
                  <h3>{product.title}</h3>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <span>${product.price}</span>
                  <span>{product.rating} rating</span>
                </div>
                <button
                  className="add-cart-btn"
                  type="button"
                  onClick={() => onAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
