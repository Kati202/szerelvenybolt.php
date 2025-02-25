<?php
session_start();
header('Content-Type: application/json');

// Kosárba helyezés
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'], $data['nev'], $data['ar'])) {
        // Ha a termék adatai (ID, név, ár) megvannak, hozzáadjuk őket a kosárhoz
        $_SESSION['cart'][] = [
            'id' => $data['id'],
            'nev' => $data['nev'],
            'ar' => $data['ar']
        ];
        echo json_encode(["success" => "Termék hozzáadva a kosárhoz."]);
    } else {
        echo json_encode(["error" => "Hiányzó termék ID, név vagy ár."]);
    }
}
// Kosár adatainak betöltése
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $cartItems = $_SESSION['cart'] ?? [];
    echo json_encode($cartItems);
}
// Kosár törlése
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $_SESSION['cart'] = []; // Kosár kiürítése
    echo json_encode(["success" => "A kosár kiürítve."]);
}
