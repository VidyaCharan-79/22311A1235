<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$sampleData = [
    'AAPL' => [
        ['price' => 145.32, 'lastUpdatedAt' => '2025-05-27T08:10:00Z'],
        ['price' => 147.85, 'lastUpdatedAt' => '2025-05-27T08:20:00Z'],
        ['price' => 149.75, 'lastUpdatedAt' => '2025-05-27T08:30:00Z'],
        ['price' => 151.00, 'lastUpdatedAt' => '2025-05-27T08:40:00Z']
    ],
    'GOOG' => [
        ['price' => 2735.45, 'lastUpdatedAt' => '2025-05-27T08:10:00Z'],
        ['price' => 2740.10, 'lastUpdatedAt' => '2025-05-27T08:20:00Z'],
        ['price' => 2755.25, 'lastUpdatedAt' => '2025-05-27T08:30:00Z'],
        ['price' => 2760.55, 'lastUpdatedAt' => '2025-05-27T08:40:00Z']
    ]
];

$ticker = $_GET['ticker'] ?? '';
$minutes = intval($_GET['minutes'] ?? 30);
$aggregation = $_GET['aggregation'] ?? 'average';

if (!$ticker || !isset($sampleData[$ticker])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing ticker']);
    exit;
}


$now = strtotime('2025-05-27T08:45:00Z'); 
$cutoff = $now - ($minutes * 60);

$filtered = array_filter($sampleData[$ticker], function ($entry) use ($cutoff) {
    return strtotime($entry['lastUpdatedAt']) >= $cutoff;
});

$prices = array_column($filtered, 'price');
$average = count($prices) > 0 ? array_sum($prices) / count($prices) : 0;

$response = [
    'averageStockPrice' => round($average, 2),
    'priceHistory' => array_values($filtered)
];

echo json_encode($response);
?>
