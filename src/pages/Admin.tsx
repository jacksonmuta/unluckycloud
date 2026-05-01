import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { products as initialProducts, Product } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, X } from "lucide-react";
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
//bouy
  const resetForm = () => { setForm({ name: "", price: "", description: "", sizes: "S,M,L,XL" }); setEditing(null); setShowForm(false); };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price.toString(), description: p.description, sizes: p.sizes.join(",") });
    setShowForm(true);
  };

  const handleDelete = (id: string) => { setProductList((prev) => prev.filter((p) => p.id !== id)); toast({ title: "Product deleted" }); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setProductList((prev) => prev.map((p) => p.id === editing.id ? { ...p, name: form.name, price: parseFloat(form.price), description: form.description, sizes: form.sizes.split(",").map((s) => s.trim()) } : p));
      toast({ title: "Product updated" });
    } else {
      const newProduct: Product = { id: Date.now().toString(), name: form.name, price: parseFloat(form.price), description: form.description, images: [initialProducts[0].images[0]], sizes: form.sizes.split(",").map((s) => s.trim()), colors: ["Black"], category: "cloud", featured: false };
      setProductList((prev) => [...prev, newProduct]);
      toast({ title: "Product added" });
    }
    resetForm();
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-sm tracking-[0.15em] uppercase text-foreground font-medium">Admin</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="text-xs tracking-[0.15em] uppercase px-4 py-2 bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors flex items-center gap-2">
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>

      {showForm && (
        <div className="mb-10 p-6 border border-border/50 rounded-sm animate-fade-up">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{editing ? "Edit Product" : "New Product"}</p>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSave} className="space-y-3">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
            <Input placeholder="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
            <Input placeholder="Sizes (comma-separated)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
            <button type="submit" className="text-xs tracking-[0.15em] uppercase px-5 py-2.5 bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors">
              {editing ? "Update" : "Add"}
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {productList.map((p) => (
          <div key={p.id} className="flex items-center gap-4 py-4 border-b border-border/50">
            <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded-sm bg-card" loading="lazy" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs tracking-[0.05em] uppercase text-foreground font-medium truncate">{p.name}</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">${p.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
