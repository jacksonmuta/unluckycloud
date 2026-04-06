import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { products as initialProducts, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", description: "", sizes: "S,M,L,XL" });

  if (!user?.isAdmin) return <Navigate to="/login" replace />;

  const resetForm = () => {
    setForm({ name: "", price: "", description: "", sizes: "S,M,L,XL" });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price.toString(), description: p.description, sizes: p.sizes.join(",") });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Product deleted" });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setProductList((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? { ...p, name: form.name, price: parseFloat(form.price), description: form.description, sizes: form.sizes.split(",").map((s) => s.trim()) }
            : p
        )
      );
      toast({ title: "Product updated" });
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        images: [initialProducts[0].images[0]],
        sizes: form.sizes.split(",").map((s) => s.trim()),
        colors: ["Black"],
        category: "essentials",
        featured: false,
      };
      setProductList((prev) => [...prev, newProduct]);
      toast({ title: "Product added" });
    }
    resetForm();
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Admin Panel</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-xl bg-card border border-border animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">{editing ? "Edit Product" : "New Product"}</h2>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <Input placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
            <Input placeholder="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
            <Input placeholder="Sizes (comma-separated)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">{editing ? "Update" : "Add"}</Button>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {productList.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
            <img src={p.images[0]} alt={p.name} className="w-14 h-14 object-cover rounded-lg" loading="lazy" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground text-sm truncate">{p.name}</h3>
              <p className="text-xs text-muted-foreground">${p.price.toFixed(2)} · {p.sizes.join(", ")}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => handleEdit(p)} className="border-border text-muted-foreground hover:text-foreground">
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleDelete(p.id)} className="border-border text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
