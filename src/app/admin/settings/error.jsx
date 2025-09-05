// app/wallet/error.js
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>⚠️ Wallet Error</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>🔄 Try Again</button>
    </div>
  );
}
