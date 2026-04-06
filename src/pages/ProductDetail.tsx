import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/shop" className="text-primary mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="rounded-xl overflow-hidden bg-card aspect-[3/4]">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" width={800} height={1024} />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-sm text-primary font-medium mb-2 uppercase tracking-wider">{product.category}</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
          <p className="text-2xl font-display font-semibold text-foreground mb-6">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          {/* Colors */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-2">Color</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <span key={c} className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm">{c}</span>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-2">Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <Button
                  key={s}
                  variant={selectedSize === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(s)}
                  className={selectedSize === s ? "bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-sm font-medium text-foreground mb-2">Quantity</p>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="border-border text-foreground">
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-foreground font-medium w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} className="border-border text-foreground">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleAdd}
            disabled={!selectedSize}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            {selectedSize ? "Add to Cart" : "Select a Size"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
