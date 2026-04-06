import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Shop = () => {
  const [sizeFilter, setSizeFilter] = useState("All");
  const SIZE_OPTIONS = ["All", "S", "M", "L", "XL", "XXL"];

  const filtered = useMemo(() => {
    return sizeFilter === "All" ? products : products.filter((p) => p.sizes.includes(sizeFilter));
  }, [sizeFilter]);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-sm tracking-[0.15em] uppercase text-foreground font-medium mb-2">Shop</h1>
        <p className="text-xs text-muted-foreground mb-12">{filtered.length} products</p>

        {/* Size filter */}
        <div className="flex gap-3 mb-12">
          {SIZE_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSizeFilter(s)}
              className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm transition-all duration-300 ${
                sizeFilter === s
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20 text-xs">No products match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
