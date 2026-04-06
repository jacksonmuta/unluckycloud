import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Minus, Plus, X } from "lucide-react";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center animate-fade-up">
        <h1 className="text-sm tracking-[0.15em] uppercase text-foreground font-medium mb-3">Your cart is empty</h1>
        <p className="text-xs text-muted-foreground mb-8">Add something to get started.</p>
        <Link to="/shop" className="text-xs tracking-[0.15em] uppercase px-6 py-3 bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-sm tracking-[0.15em] uppercase text-foreground font-medium mb-10">Cart</h1>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex gap-5 pb-6 border-b border-border/50 animate-fade-up">
            <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-sm bg-card" loading="lazy" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs tracking-[0.08em] uppercase text-foreground font-medium">{item.product.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-1">Size: {item.size}</p>
                </div>
                <button onClick={() => removeItem(item.product.id, item.size)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="text-muted-foreground hover:text-foreground">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs text-foreground w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="text-muted-foreground hover:text-foreground">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-border/50">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs text-muted-foreground uppercase tracking-[0.1em]">Total</span>
          <span className="text-sm text-foreground font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        {isAuthenticated ? (
          <Link to="/checkout" className="block w-full text-center py-3.5 text-xs tracking-[0.15em] uppercase bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors">
            Checkout
          </Link>
        ) : (
          <Link to="/login" className="block w-full text-center py-3.5 text-xs tracking-[0.15em] uppercase bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors">
            Login to Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
