import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group animate-fade-up">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-card rounded-sm aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs tracking-[0.08em] uppercase text-foreground font-medium">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground ml-4 shrink-0">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
