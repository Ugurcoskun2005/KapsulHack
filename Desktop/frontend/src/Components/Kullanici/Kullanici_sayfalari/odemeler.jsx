import React, { useState } from "react";

const PaymentPage = () => {
  const [amount, setAmount] = useState(1000); // Ödeme miktarını belirleyelim (örneğin 100 TL)
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = () => {
    // Ödeme yapılınca bu fonksiyon çalışacak
    setPaymentStatus("Ödeme Başarılı!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center", backgroundColor: "#f1f1f1" }}>
      <h1>Aidat Ödeme Sayfası</h1>
      <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "20px", width: "300px" }}>
        <h3 style={{ fontSize: "1.5em", color: "#333", marginBottom: "15px" }}>Aidat Miktarı: {amount} TL</h3>
        <button
          onClick={handlePayment}
          style={{
            backgroundColor: "#3b5998", // Facebook mavi rengi
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.2em",
            cursor: "pointer",
            transition: "all 0.3s ease",
            width: "100%",
          }}
        >
          Öde
        </button>
      </div>
      {paymentStatus && <p style={{ color: "green", fontSize: "1.2em" }}>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentPage;
