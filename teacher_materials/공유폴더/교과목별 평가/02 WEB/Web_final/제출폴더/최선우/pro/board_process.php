<?php
session_start();

if (isset($_GET['action']) && $_GET['action'] === 'get_profile') {
    $profile_img = (isset($_SESSION['user_profile']) && $_SESSION['user_profile'] != '') ? $_SESSION['user_profile'] : 'default_profile.png';
    $profile_src = ($profile_img === 'default_profile.png') ? "./default_profile.png" : "./uploads/" . $profile_img;
    $login_user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '';
    echo json_encode([
        "profile_src" => $profile_src,
        "login_user_id" => $login_user_id
    ]);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

$db = mysqli_connect('localhost', 'tjsdn7124', 'a1s2d3f4!', 'tjsdn7124');
if (!$db) {
    die(json_encode(["error" => "DB 연결 실패: " . mysqli_connect_error()]));
}
mysqli_set_charset($db, "utf8mb4");

$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

if ($action === 'list') {
    $sql = "SELECT * FROM board ORDER BY no DESC";
    $result = mysqli_query($db, $sql);
    $posts = [];
    while($row = mysqli_fetch_assoc($result)) {
        $posts[] = $row;
    }
    echo json_encode($posts);
}

elseif ($action === 'insert') {
    $title = mysqli_real_escape_string($db, $_POST['title']);
    $writer = mysqli_real_escape_string($db, $_POST['writer']);
    $content = mysqli_real_escape_string($db, $_POST['content']);

    $sql = "INSERT INTO board (title, writer, content) VALUES ('$title', '$writer', '$content')";
    if (mysqli_query($db, $sql)) {
        echo "success";
    } else {
        echo "error: " . mysqli_error($db);
    }
} 

elseif ($action === 'view') {
    $no = isset($_GET['no']) ? (int)$_GET['no'] : 0;
    
    mysqli_query($db, "UPDATE board SET hits = hits + 1 WHERE no = $no");

    $sql = "SELECT * FROM board WHERE no = $no";
    $result = mysqli_query($db, $sql);
    $row = mysqli_fetch_assoc($result);

    if ($row) {
        $row['login_user'] = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '';
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "게시글을 찾을 수 없습니다."]);
    }
} 

elseif ($action === 'update') {
    if (!isset($_SESSION['user_id'])) {
        echo "로그인이 필요한 서비스입니다.";
        exit;
    }

    $no = isset($_POST['no']) ? (int)$_POST['no'] : 0;
    $title = mysqli_real_escape_string($db, $_POST['title']);
    $content = mysqli_real_escape_string($db, $_POST['content']);

    $check_sql = "SELECT writer FROM board WHERE no = $no";
    $check_res = mysqli_query($db, $check_sql);
    $post = mysqli_fetch_assoc($check_res);

    if (!$post) {
        echo "존재하지 않는 게시글입니다.";
        exit;
    }

    if ($_SESSION['user_id'] !== $post['writer']) {
        echo "본인이 작성한 글만 수정할 수 있습니다.";
        exit;
    }

    $sql = "UPDATE board SET title = '$title', content = '$content' WHERE no = $no";
    if (mysqli_query($db, $sql)) {
        echo "success";
    } else {
        echo "error: " . mysqli_error($db);
    }
} 

elseif ($action === 'delete') {
    if (!isset($_SESSION['user_id'])) {
        echo "로그인이 필요한 서비스입니다.";
        exit;
    }

    $no = isset($_POST['no']) ? (int)$_POST['no'] : 0;

    $check_sql = "SELECT writer FROM board WHERE no = $no";
    $check_res = mysqli_query($db, $check_sql);
    $post = mysqli_fetch_assoc($check_res);

    if (!$post) {
        echo "존재하지 않는 게시글입니다.";
        exit;
    }

    if ($_SESSION['user_id'] !== $post['writer']) {
        echo "본인이 작성한 글만 삭제할 수 있습니다.";
        exit;
    }

    $sql = "DELETE FROM board WHERE no = $no";
    if (mysqli_query($db, $sql)) {
        echo "success";
    } else {
        echo "error: " . mysqli_error($db);
    }
}

mysqli_close($db);
?>