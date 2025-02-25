<?php

require_once 'config.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT id, nev, kep, ar FROM termekek");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
} catch (PDOException $e) {
    echo json_encode(["error" => "Hiba a termékek lekérésekor: " . $e->getMessage()]);
}
exit; 