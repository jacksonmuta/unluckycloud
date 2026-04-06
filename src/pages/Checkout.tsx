import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StripeWrapper } from "@/components/payment/StripeWrapper";
import { PayPalWrapper } from "@/components/payment/PayPalWrapper";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");

  const [shippingDetails, setShippingDetails] = useState({
    firstName: "", lastName: "", address: "", city: "", zip: ""
  });

  const handlePaymentSuccess = () => {
    setSubmitted(true);
    clearCart();
    toast({ title: "Order placed", description: "Your hoodies are on the way." });
  };

  const updateShipping = (field: string, value: string) => {
    setShippingDetails(prev => ({ ...prev, [field]: value }));
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
      <div className="space-y-8">
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-4">Shipping</p>
          <div className="grid grid-cols-2 gap-3">
            <Input 
              placeholder="First Name" 
              value={shippingDetails.firstName}
              onChange={(e) => updateShipping("firstName", e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" 
            />
            <Input 
              placeholder="Last Name" 
              value={shippingDetails.lastName}
              onChange={(e) => updateShipping("lastName", e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" 
            />
            <Input 
              placeholder="Address" 
              value={shippingDetails.address}
              onChange={(e) => updateShipping("address", e.target.value)}
              className="col-span-2 bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" 
            />
            <Input 
              placeholder="City" 
              value={shippingDetails.city}
              onChange={(e) => updateShipping("city", e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" 
            />
            <Input 
              placeholder="ZIP" 
              value={shippingDetails.zip}
              onChange={(e) => updateShipping("zip", e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground text-xs rounded-sm" 
            />
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

        <div className="border-t border-border/50 pt-6 space-y-6">
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">Payment Method</p>
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => setPaymentMethod("stripe")}
              className={`flex-1 py-3 text-xs border rounded-sm transition-colors ${paymentMethod === 'stripe' ? 'border-foreground bg-foreground/5 font-medium' : 'border-border text-muted-foreground hover:border-foreground/50'}`}
            >
              Card / CashApp
            </button>
            <button 
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`flex-1 py-3 text-xs border rounded-sm transition-colors ${paymentMethod === 'paypal' ? 'border-foreground bg-foreground/5 font-medium' : 'border-border text-muted-foreground hover:border-foreground/50'}`}
            >
              PayPal
            </button>
          </div>

          <div className="pt-2">
            {paymentMethod === "stripe" && (
              <StripeWrapper onSuccess={handlePaymentSuccess} totalPrice={totalPrice} />
            )}
            {paymentMethod === "paypal" && (
              <PayPalWrapper onSuccess={handlePaymentSuccess} totalPrice={totalPrice} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
