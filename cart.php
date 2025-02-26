<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// 🔹 Termék hozzáadása
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'], $data['nev'], $data['ar'])) {
        $_SESSION['cart'][] = [
            'id' => htmlspecialchars($data['id']),
            'nev' => htmlspecialchars($data['nev']),
            'ar' => (int) $data['ar']
        ];
        echo json_encode(["success" => "Termék hozzáadva a kosárhoz."]);
    } else {
        echo json_encode(["error" => "Hibás vagy hiányzó termékadatok."]);
    }
    exit;
}

// 🔹 Kosár tartalmának lekérése
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($_SESSION['cart']);
    exit;
}

// 🔹 Termék törlése a kosárból
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        echo json_encode(["error" => "Hiányzó termék ID."]);
        exit;
    }

    $_SESSION['cart'] = array_values(array_filter($_SESSION['cart'], function ($item) use ($data) {
        return $item['id'] !== $data['id'];
    }));

    echo json_encode(["success" => "Termék törölve a kosárból."]);
    exit;
}


echo json_encode(["error" => "Érvénytelen kérés."]);
exit;
?>


