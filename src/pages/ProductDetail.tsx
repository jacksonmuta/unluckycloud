import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-xs text-muted-foreground">Product not found.</p>
        <Link to="/shop" className="text-xs text-foreground mt-4 inline-block underline">Back to Shop</Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, quantity);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 mb-10">
          <ArrowLeft className="w-3 h-3" /> Back
        </Link>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Image */}
          <div className="bg-card rounded-sm overflow-hidden aspect-square">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" width={800} height={800} />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-sm tracking-[0.12em] uppercase text-foreground font-medium mb-4">{product.name}</h1>
            <p className="text-sm text-foreground mb-8">${product.price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-10">{product.description}</p>

            {/* Size */}
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">Size</p>
              <div className="flex gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-10 h-10 text-xs rounded-sm border transition-all duration-300 ${
                      selectedSize === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs text-foreground w-6 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className="w-full py-3.5 text-xs tracking-[0.15em] uppercase bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {selectedSize ? "Add to Cart" : "Select a Size"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
