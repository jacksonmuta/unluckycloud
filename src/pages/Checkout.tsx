import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    toast({ title: "Order placed", description: "Your hoodies are on the way." });
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-6 py-20 text-center animate-fade-up">
        <CheckCircle className="w-10 h-10 text-success mx-auto mb-4" />
        <h1 className="text-sm tracking-[0.15em] uppercase text-foreground font-medium mb-2">Order Confirmed</h1>
        <p className="text-xs text-muted-foreground">Thank you for shopping with unlucky.cloud</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-xs text-muted-foreground">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-lg">
      <h1 className="text-sm tracking-[0.15em] uppercase text-foreground font-medium mb-10">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-4">Shipping</p>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="First Name" required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
            <Input placeholder="Last Name" required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
            <Input placeholder="Address" required className="col-span-2 bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
            <Input placeholder="City" required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
            <Input placeholder="ZIP" required className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" />
          </div>
        </div>

        <div className="border-t border-border/50 pt-6">
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{item.product.name} ({item.size}) × {item.quantity}</span>
                <span className="text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border/50 pt-3 flex justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-[0.1em]">Total</span>
            <span className="text-sm text-foreground font-medium">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button type="submit" className="w-full py-3.5 text-xs tracking-[0.15em] uppercase bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
