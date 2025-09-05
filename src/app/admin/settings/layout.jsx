// app/wallet/layout.js
export default function WalletLayout({ children }) {
  return (
    <div style={{ border: "2px solid green", padding: "20px" }}>
      <h2>💰 Wallet Section</h2>
      <nav>
        <a href="/admin/wallet">Overview</a> |{" "}
        <a href="/wallet/transactions">Transactions</a>
      </nav>
      <hr />
      {children}
    </div>
  );
}
