import React, { useEffect, useState } from 'react';

function CorrelationHeatmap() {
  const [correlation, setCorrelation] = useState({});

  useEffect(() => {
    fetch("http://localhost/Backksendd/heatmap.php")
      .then(res => res.json())
      .then(data => setCorrelation(data))
      .catch(err => alert("Error loading heatmap data"));
  }, []);

  const stocks = Object.keys(correlation);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Correlation Heatmap</h2>
      {stocks.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th></th>
              {stocks.map(s => <th key={s}>{s}</th>)}
            </tr>
          </thead>
          <tbody>
            {stocks.map(row => (
              <tr key={row}>
                <td><strong>{row}</strong></td>
                {stocks.map(col => (
                  <td key={col} style={{
                    backgroundColor: `rgba(0, 0, 255, ${correlation[row][col]})`,
                    color: '#fff'
                  }}>
                    {correlation[row][col].toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default CorrelationHeatmap;
