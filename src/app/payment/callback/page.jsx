"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentCallback() {
  const router = useRouter();
  const [reference, setReference] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Verifying payment...");

  //   useEffect(() => {
  //     // ✅ This runs only on the client, safe for Vercel build
  //     const params = new URLSearchParams(window.location.search);
  //     const ref = params.get("reference");
  //     setReference(ref);

  //     if (!ref) {
  //       setStatusMessage("Payment failed");
  //       return;
  //     }

  //     // Simulate verification
  //     const verifyPayment = async () => {
  //       try {
  //         const res = await fetch("/api/verify-payment", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ reference: ref }),
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
  //   }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg">{statusMessage}</p>
    </div>
  );
}
