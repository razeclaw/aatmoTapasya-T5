import React from 'react';

interface EsewaButtonProps {
  amount: number;
  productId: string;
  productName: string;
}

export default function EsewaButton({ amount, productId, productName }: EsewaButtonProps) {
  const handlePayment = () => {
    // eSewa test environment configuration
    const path = "https://uat.esewa.com.np/epay/main";
    const params = {
      amt: amount,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: amount,
      pid: productId,
      scd: "EPAYTEST", // Merchant code for test environment
      su: `${window.location.origin}/success`, // Success URL
      fu: `${window.location.origin}/failure` // Failure URL
    };

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key as keyof typeof params].toString());
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
    >
      Pay with eSewa
    </button>
  );
}