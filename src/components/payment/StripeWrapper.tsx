import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

interface StripeCheckoutFormProps {
  onSuccess: () => void;
  totalPrice: number;
}

const StripeCheckoutForm = ({ onSuccess, totalPrice }: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    // Normally you would confirm the payment here:
    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: { return_url: window.location.href },
    // });
    
    // Simulating a successful flow since we're pending a real backend:
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMessage && <div className="text-destructive text-xs">{errorMessage}</div>}
      <button 
        type="submit" 
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-3.5 text-xs tracking-[0.15em] uppercase bg-foreground text-background rounded-sm hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
      </button>
      <p className="text-[10px] text-muted-foreground text-center">
        Powered by Stripe (Supports Card, CashApp Pay, Apple Pay)
      </p>
    </form>
  );
};

export const StripeWrapper = ({ onSuccess, totalPrice }: StripeCheckoutFormProps) => {
  const amountToCharge = Math.max(Math.round(totalPrice * 100), 50); // Minimum 50 cents

  // We use the deferred mode for PaymentElement which allows UI to render without a clientSecret
  const options = {
    mode: 'payment' as const,
    amount: amountToCharge,
    currency: 'usd',
    appearance: { theme: 'night' as const },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckoutForm onSuccess={onSuccess} totalPrice={totalPrice} />
    </Elements>
  );
};
