import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Wallet, DollarSign, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PAYMENT_METHODS = [
  { id: "stripe", label: "Credit Card", icon: CreditCard },
  { id: "paypal", label: "PayPal", icon: Wallet },
  { id: "cashapp", label: "Cash App", icon: DollarSign },
];

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [payment, setPayment] = useState("stripe");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    toast({ title: "Order placed!", description: "Your hoodies are on the way." });
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-up">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Order Confirmed</h1>
        <p className="text-muted-foreground">Thank you for shopping with unlucky.cloud</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Shipping */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-4">Shipping</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="First Name" required className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
            <Input placeholder="Last Name" required className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
            <Input placeholder="Address" required className="col-span-2 bg-card border-border text-foreground placeholder:text-muted-foreground" />
            <Input placeholder="City" required className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
            <Input placeholder="ZIP Code" required className="bg-card border-border text-foreground placeholder:text-muted-foreground" />
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-4">Payment</h2>
          <div className="grid grid-cols-3 gap-3">
            {PAYMENT_METHODS.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setPayment(m.id)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  payment === m.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                <m.icon className="w-5 h-5 mx-auto mb-2" />
                <span className="text-xs font-medium">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.product.name} ({item.size}) × {item.quantity}</span>
                <span className="text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 flex justify-between">
            <span className="font-medium text-foreground">Total</span>
            <span className="font-display text-xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
