import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-up">
        <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some hoodies to get started.</p>
        <Link to="/shop">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Shop Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-4 rounded-xl bg-card border border-border animate-fade-up">
            <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-24 object-cover rounded-lg" loading="lazy" />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-medium text-foreground text-sm">{item.product.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>
              <p className="text-sm font-medium text-foreground mt-1">${item.product.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button onClick={() => removeItem(item.product.id, item.size)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="p-1 text-muted-foreground hover:text-foreground">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm text-foreground w-5 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="p-1 text-muted-foreground hover:text-foreground">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-xl bg-card border border-border">
        <div className="flex justify-between items-center mb-6">
          <span className="text-muted-foreground">Total</span>
          <span className="font-display text-2xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
        </div>
        {isAuthenticated ? (
          <Link to="/checkout">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">Proceed to Checkout</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">Login to Checkout</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
