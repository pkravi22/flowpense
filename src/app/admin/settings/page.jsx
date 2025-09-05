// app/wallet/page.js
export default async function WalletPage() {
  // Simulate fetching wallet "balance" from API
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/12", {
    cache: "no-store", // ensures fresh fetch
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wallet data 🚨");
  }

  const data = await res.json();
  console.log(data);

  return (
    <div>
      <h1>Wallet Dashboard</h1>
      <p>
        <b>Balance:</b> $5000
      </p>
      <p>
        <b>Latest Transaction (mocked from API):</b>
      </p>
      <p>{data.title}</p>
    </div>
  );
}
