<?php
header("Content-Type:text/html; charset=utf-8");

$found_pw = '';
$message = '';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $user_id = $_POST['user_id'] ?? '';

    if($user_id == ''){
        $message = '아이디를 입력해주세요.';
    }else{
        $db = mysqli_connect('localhost', 'clmam10', 'a1s2d3f4!', 'clmam10');

        if(!$db){
            $message = 'DB 연결 실패';
        }else{
            mysqli_query($db, "set names utf8");

            $sql = "SELECT user_pw FROM project_users WHERE user_id = ?";
            $stmt = mysqli_prepare($db, $sql);
            mysqli_stmt_bind_param($stmt, "s", $user_id);
            mysqli_stmt_execute($stmt);

            $result = mysqli_stmt_get_result($stmt);
            $user = mysqli_fetch_array($result, MYSQLI_ASSOC);

            if($user){
                $found_pw = $user['user_pw'];
            }else{
                $message = '존재하지 않는 아이디입니다.';
            }

            mysqli_close($db);
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>비밀번호 찾기</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/0_3_find_pw.css">
    
</head>
<body>
    <div id="wrap">

         <header>
            <button onclick="location.href='../html/0_login.html'"> ❮ </button>

            <img src="../source/img/logo_b.png" alt="logo_b">
        </header>
        <main>
        <h1>비밀번호 찾기</h1>

        <form action="./0_3_find_pw.php" method="post">
            <input type="text" name="user_id" placeholder="아이디를 입력하세요">
            <button type="submit">비밀번호 찾기</button>
        </form>

        <div id="find_pw">
        <?php if($found_pw != ''){ ?>
            <p>비밀번호는 <strong><?= $found_pw ?></strong> 입니다.</p>
        <?php } ?>

        <?php if($message != ''){ ?>
            <p><?= $message ?></p>
        <?php } ?>
        </div>

        </main>

    </div>
</body>
</html>