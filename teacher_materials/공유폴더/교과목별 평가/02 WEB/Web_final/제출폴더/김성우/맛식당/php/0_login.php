<?php
session_start();
header("Content-Type:text/html; charset=utf-8");

$user_id = $_POST['user_id'] ?? '';
$user_pw = $_POST['user_pw'] ?? '';

if($user_id == '' || $user_pw == ''){
    echo "<script>
        alert('아이디와 비밀번호를 모두 입력해주세요.');
        history.back();
    </script>";
    exit;
}

$db = mysqli_connect('localhost', 'clmam10', 'a1s2d3f4!', 'clmam10');
mysqli_query($db, "set names utf8");

if(!$db){
    echo "<script>
        alert('DB 연결 실패');
        history.back();
    </script>";
    exit;
}

$sql = "SELECT * FROM project_users WHERE user_id = ?";
$stmt = mysqli_prepare($db, $sql);
mysqli_stmt_bind_param($stmt, "s", $user_id);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);
$user = mysqli_fetch_assoc($result);

if(!$user){
    echo "<script>
        alert('존재하지 않는 회원입니다.');
        history.back();
    </script>";
    exit;
}

if($user['user_pw'] !== $user_pw){
    echo "<script>
        alert('비밀번호가 일치하지 않습니다.');
        history.back();
    </script>";
    exit;
}

$_SESSION['user_no'] = $user['no'];
$_SESSION['user_id'] = $user['user_id'];
$_SESSION['profile_img'] = $user['profile_img'];

echo "<script>
    alert('로그인 성공');
    location.href='../php/0_1_login.php';
</script>";

mysqli_close($db);
?>