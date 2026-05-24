import { useEffect, useMemo, useState } from "react";
import { addToCart, getProductDetail } from "./services/productApi";
import type { Product, Variant } from "./types";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function uniqueValues<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function App() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedColor, setSelectedColor] = useState<Variant["color"]>("Forest");
  const [selectedCapacity, setSelectedCapacity] = useState<Variant["capacity"]>("18L");
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState("");
  const [cartError, setCartError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getProductDetail("PACK-001")
      .then((response) => {
        if (isMounted) {
          setProduct(response);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoadError("We could not load this product. Please refresh the page and try again.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedVariant = useMemo(() => {
    return product?.variants.find(
      (variant) => variant.color === selectedColor && variant.capacity === selectedCapacity
    );
  }, [product, selectedCapacity, selectedColor]);

  const colors = useMemo(
    () => uniqueValues(product?.variants.map((variant) => variant.color) ?? []),
    [product]
  );

  const capacities = useMemo(
    () => uniqueValues(product?.variants.map((variant) => variant.capacity) ?? []),
    [product]
  );

  const stock = selectedVariant?.stock ?? 0;
  const isOutOfStock = stock === 0;
  const canAddToCart = Boolean(selectedVariant) && !isOutOfStock && !isAdding;

  useEffect(() => {
    setQuantity(1);
    setCartMessage("");
    setCartError("");
  }, [selectedColor, selectedCapacity]);

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) {
      return;
    }

    setIsAdding(true);
    setCartMessage("");
    setCartError("");

    const response = await addToCart({
      productId: product.productId,
      skuId: selectedVariant.skuId,
      quantity
    });

    if (response.success && typeof response.cartCount === "number") {
      setCartCount(response.cartCount);
      setCartMessage(`${quantity} item${quantity > 1 ? "s" : ""} added to cart.`);
    } else {
      setCartError(response.message ?? "We could not add this item to cart.");
    }

    setIsAdding(false);
  };

  if (isLoading) {
    return (
      <main className="page-shell">
        <section className="status-panel" aria-live="polite">
          <div className="loader" />
          <h1>Loading product</h1>
          <p>Fetching the latest price and stock details.</p>
        </section>
      </main>
    );
  }

  if (loadError || !product) {
    return (
      <main className="page-shell">
        <section className="status-panel error-state" role="alert">
          <span className="status-icon">!</span>
          <h1>Product unavailable</h1>
          <p>{loadError}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <header className="top-bar">
        <div>
          <span className="eyebrow">Product detail</span>
          <h1>{product.name}</h1>
        </div>
        <div className="cart-pill" aria-label={`${cartCount} items in cart`}>
          <span aria-hidden="true">Cart</span>
          <strong>{cartCount}</strong>
        </div>
      </header>

      <section className="product-layout">
        <div className="media-column">
          <img className="product-image" src={product.images[0]} alt={product.name} />
        </div>

        <div className="details-column">
          <div className="price-row">
            <p className="price">{currencyFormatter.format(selectedVariant?.price ?? 0)}</p>
            <span className={isOutOfStock ? "stock-badge out" : "stock-badge"}>
              {isOutOfStock ? "Out of stock" : `${stock} in stock`}
            </span>
          </div>

          <p className="description">{product.description}</p>

          <section className="option-group" aria-labelledby="color-options">
            <h2 id="color-options">Color</h2>
            <div className="option-list">
              {colors.map((color) => (
                <button
                  className={`option-button ${selectedColor === color ? "selected" : ""}`}
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                >
                  <span className={`swatch swatch-${color.toLowerCase()}`} />
                  {color}
                </button>
              ))}
            </div>
          </section>

          <section className="option-group" aria-labelledby="capacity-options">
            <h2 id="capacity-options">Capacity</h2>
            <div className="option-list">
              {capacities.map((capacity) => (
                <button
                  className={`option-button ${selectedCapacity === capacity ? "selected" : ""}`}
                  key={capacity}
                  type="button"
                  onClick={() => setSelectedCapacity(capacity)}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </section>

          <section className="purchase-row" aria-label="Purchase controls">
            <div className="quantity-control">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                disabled={quantity === 1 || isOutOfStock}
              >
                -
              </button>
              <output aria-label="Selected quantity">{quantity}</output>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((current) => Math.min(stock, current + 1))}
                disabled={quantity >= stock || isOutOfStock}
              >
                +
              </button>
            </div>

            <button
              className="add-button"
              type="button"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
            >
              {isAdding ? "Adding..." : "Add to cart"}
            </button>
          </section>

          <div className="feedback-region" aria-live="polite">
            {cartMessage && <p className="feedback success">{cartMessage}</p>}
            {cartError && <p className="feedback error">{cartError}</p>}
            {isOutOfStock && (
              <p className="feedback muted">Choose another color or capacity to continue.</p>
            )}
          </div>

          <dl className="sku-summary">
            <div>
              <dt>Selected SKU</dt>
              <dd>{selectedVariant?.skuId}</dd>
            </div>
            <div>
              <dt>Max quantity</dt>
              <dd>{isOutOfStock ? "Unavailable" : stock}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}

export default App;
