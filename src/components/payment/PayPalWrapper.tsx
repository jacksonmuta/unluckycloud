import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalWrapperProps {
  onSuccess: () => void;
  totalPrice: number;
}

export const PayPalWrapper = ({ onSuccess, totalPrice }: PayPalWrapperProps) => {
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture",
  };

  // Skip rendering if total is 0 to avoid API errors from PayPal
  if (totalPrice <= 0) return null;

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="space-y-4">
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", color: "black" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: totalPrice.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              await actions.order.capture();
              onSuccess();
            }
          }}
        />
        <p className="text-[10px] text-muted-foreground text-center">
          Secure checkout via PayPal
        </p>
      </div>
    </PayPalScriptProvider>
  );
};
