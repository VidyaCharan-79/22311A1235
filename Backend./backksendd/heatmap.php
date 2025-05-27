<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$dummyCorrelation = [
    "AAPL" => ["AAPL" => 1.0, "GOOG" => 0.8, "MSFT" => 0.6],
    "GOOG" => ["AAPL" => 0.8, "GOOG" => 1.0, "MSFT" => 0.7],
    "MSFT" => ["AAPL" => 0.6, "GOOG" => 0.7, "MSFT" => 1.0]
];

echo json_encode($dummyCorrelation);
?>
