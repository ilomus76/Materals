<?php
session_start();

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user_no'])) {
    echo json_encode([
        'success' => true,
        'is_login' => false,
        'user' => null
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'success' => true,
    'is_login' => true,
    'user' => [
        'no' => $_SESSION['user_no'],
        'login_id' => $_SESSION['login_id'],
        'nickname' => $_SESSION['nickname']
    ]
], JSON_UNESCAPED_UNICODE);
?>