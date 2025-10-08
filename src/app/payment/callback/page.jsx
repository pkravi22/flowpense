"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("Verifying payment...");

  const reference = searchParams.get("reference"); // Paystack sends this

  //   useEffect(() => {
  //     if (!reference) return;

  //     const verifyPayment = async () => {
  //       try {
  //         const res = await fetch("/api/verify-payment", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ reference }),
  //         });
  //         const data = await res.json();

  //         if (data.verified) {
  //           setStatusMessage("Payment Successful!");
  //           setTimeout(() => router.push("/payment/success"), 2000);
  //         } else {
  //           setStatusMessage("Payment verification failed.");
  //           setTimeout(() => router.push("/payment/failure"), 2000);
  //         }
  //       } catch (err) {
  //         setStatusMessage("Error verifying payment. Try again.");
  //         setTimeout(() => router.push("/payment/failure"), 2000);
  //       }
  //     };

  //     verifyPayment();
  //   }, [reference]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg">
        {reference ? "Fund added successfully" : "Payment failed"}
      </p>
    </div>
  );
}
