import React, { useState } from 'react';

function StockPage() {
  const [ticker, setTicker] = useState('AAPL');
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState(null);

  const fetchStock = async () => {
    try {
      const response = await fetch(`http://localhost/Backksendd/stock.php?ticker=${ticker}&minutes=${minutes}&aggregation=average`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Average Stock Price</h2>
      <input value={ticker} onChange={e => setTicker(e.target.value.toUpperCase())} placeholder="Ticker" />
      <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="Minutes" />
      <button onClick={fetchStock}>Get Average</button>

      {data && (
        <div style={{ marginTop: '20px' }}>
          <h3>Average: ${data.averageStockPrice}</h3>
          <ul>
            {data.priceHistory.map((entry, idx) => (
              <li key={idx}>
                Price: ${entry.price} | Time: {new Date(entry.lastUpdatedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StockPage;
