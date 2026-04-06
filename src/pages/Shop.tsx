import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SIZE_OPTIONS = ["All", "S", "M", "L", "XL", "XXL"];
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name" },
];

const Shop = () => {
  const [sizeFilter, setSizeFilter] = useState("All");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = sizeFilter === "All" ? products : products.filter((p) => p.sizes.includes(sizeFilter));
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [sizeFilter, sort]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Shop</h1>
      <p className="text-muted-foreground mb-8">All hoodies · {filtered.length} products</p>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <div className="flex gap-2">
          {SIZE_OPTIONS.map((s) => (
            <Button
              key={s}
              variant={sizeFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setSizeFilter(s)}
              className={sizeFilter === s ? "bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}
            >
              {s}
            </Button>
          ))}
        </div>
        <div className="ml-auto">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44 bg-card border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-20">No products match your filters.</p>
      )}
    </div>
  );
};

export default Shop;
