<?php
session_start();

$db=mysqli_connect('localhost','tjsdn7124','a1s2d3f4!','tjsdn7124');

if (!$db) {
    die("DB 연결 실패: " . mysqli_connect_error());
}

$id=$_POST['loginid'];
$pw=$_POST['loginpw'];

$sql= "SELECT * FROM login WHERE user_id = '$id'";
$result = mysqli_query($db, $sql);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);

    if ($row['user_pw'] == $pw) {
        $_SESSION['user_profile'] = $row['profile_img'];
        $_SESSION['user_id'] = $row['user_id'];

        echo "<script>
                alert('" . $row['user_id'] . "님 환영합니다!');
                location.href = 'https://tjsdn7124.dothome.co.kr/index/c.html';
              </script>";
    } else {
        echo "<script>
                alert('비밀번호가 일치하지 않습니다.');
                history.back();
              </script>";
    }
} else {
    $profile_name = (isset($_FILES['profile']['name']) && $_FILES['profile']['error'] === 0) ? time() . '_' . $_FILES['profile']['name'] : 'default_profile.png';

    if($profile_name !== 'default_profile.png') {
        if(!is_dir("./uploads")){
            mkdir("./uploads", 0777, true);
        }
        
        move_uploaded_file($_FILES['profile']['tmp_name'], "./uploads/" . $profile_name);
    }

    $insert_sql = "INSERT INTO login (user_id, user_pw, profile_img) VALUES ('$id', '$pw', '$profile_name')";
    $insert_result = mysqli_query($db, $insert_sql);

    if ($insert_result) {
        $_SESSION['user_profile'] = $profile_name;
        $_SESSION['user_id'] = $id;

        echo "<script>
                alert('회원가입이 완료되었습니다. 자동으로 로그인됩니다.');
                location.href = 'https://tjsdn7124.dothome.co.kr/index/c.html';
              </script>";
    } 
}

mysqli_close($db);
?>