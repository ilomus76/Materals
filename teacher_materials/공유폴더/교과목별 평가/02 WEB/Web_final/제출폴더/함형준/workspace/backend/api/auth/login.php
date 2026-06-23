<?php
session_start();

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../config/db.php';

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

$login_id = trim($data['login_id'] ?? '');
$password = trim($data['password'] ?? '');

if ($login_id === '' || $password === '') {
    echo json_encode([
        'success' => false,
        'message' => '아이디와 비밀번호를 입력해주세요.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "SELECT * FROM omechu_users WHERE login_id = '$login_id' AND status = 'active' LIMIT 1";
$result = mysqli_query($db, $sql);

if (!$result || mysqli_num_rows($result) === 0) {
    echo json_encode([
        'success' => false,
        'message' => '아이디 또는 비밀번호가 올바르지 않아요.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$user = mysqli_fetch_assoc($result);

if (!password_verify($password, $user['password_hash'])) {
    echo json_encode([
        'success' => false,
        'message' => '아이디 또는 비밀번호가 올바르지 않아요.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 세션 저장
$_SESSION['user_no'] = $user['no'];
$_SESSION['login_id'] = $user['login_id'];
$_SESSION['nickname'] = $user['nickname'];

echo json_encode([
    'success' => true,
    'message' => '로그인 성공!',
    'user' => [
        'no' => $user['no'],
        'login_id' => $user['login_id'],
        'nickname' => $user['nickname'],
        'email' => $user['email']
    ]
], JSON_UNESCAPED_UNICODE);

mysqli_close($db);
?>