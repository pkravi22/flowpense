// app/wallet/error.js
"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col justify-center items-center my-auto">
      <h2> Wallet Error</h2>
      <p>{error.message}</p>
      <button>Refresh Again</button>
    </div>
  );
}
