<?php
    session_start();

    $user_id = $_SESSION['user_id'] ?? '';
    $profile_img = $_SESSION['profile_img'] ?? '';

    if($user_id == ''){
        echo "<script>
            alert('로그인이 필요합니다');
            location.href='../html/0_login.html';
        </script>";
        exit;
    }

    if($profile_img == ''){
        $profile_img = '../source/img/profile_default.png';
    }

    $no = $_GET['no'] ?? '';

    if($no == ''){
        echo "<script>
            alert('잘못된 접근입니다');
            history.back();
        </script>";
        exit;
    }

    $db = mysqli_connect('localhost', 'clmam10', 'a1s2d3f4!', 'clmam10');

    if(!$db){
        echo "<script>
            alert('DB 연결 실패');
            history.back();
        </script>";
        exit;
    }

    mysqli_query($db, "set names utf8");

    $view_sql = "UPDATE project_posts SET views = views + 1 WHERE no = ?";
    $view_stmt = mysqli_prepare($db, $view_sql);
    mysqli_stmt_bind_param($view_stmt, "i", $no);
    mysqli_stmt_execute($view_stmt);

    $sql = "SELECT 
            p.*,
            u.profile_img AS writer_profile_img
        FROM project_posts p
        LEFT JOIN project_users u
        ON p.user_no = u.no
        WHERE p.no = ?";

    $stmt = mysqli_prepare($db, $sql);

    mysqli_stmt_bind_param($stmt, "i", $no);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);
    $post = mysqli_fetch_array($result, MYSQLI_ASSOC);

    if(!$post){
        echo "<script>
            alert('존재하지 않는 게시글입니다');
            history.back();
        </script>";
        exit;
    }

    $like_sql = "SELECT no
             FROM project_likes
             WHERE post_no = ?
             AND user_no = ?";

    $like_stmt = mysqli_prepare($db, $like_sql);
    mysqli_stmt_bind_param($like_stmt, "ii", $no, $_SESSION['user_no']);
    mysqli_stmt_execute($like_stmt);

    $like_result = mysqli_stmt_get_result($like_stmt);
    $is_liked = mysqli_num_rows($like_result) > 0;

    $comment_sql = "
                SELECT
                    c.*,
                    u.profile_img
                FROM project_comments c
                LEFT JOIN project_users u
                ON c.user_no = u.no
                WHERE c.post_no = ?
                ORDER BY c.no DESC
            ";

    $comment_stmt = mysqli_prepare($db, $comment_sql);
    mysqli_stmt_bind_param($comment_stmt, "i", $no);
    mysqli_stmt_execute($comment_stmt);

    $comment_result = mysqli_stmt_get_result($comment_stmt);

    $count_sql = "SELECT COUNT(*) AS cnt 
                FROM project_comments 
                WHERE post_no = ?";

    $count_stmt = mysqli_prepare($db, $count_sql);
    mysqli_stmt_bind_param($count_stmt, "i", $no);
    mysqli_stmt_execute($count_stmt);

    $count_result = mysqli_stmt_get_result($count_stmt);
    $count_row = mysqli_fetch_array($count_result, MYSQLI_ASSOC);
    $comment_count = $count_row['cnt'];
?>


<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>맛식당!2_1</title>
    <link rel="stylesheet" href="../css/common.css">
    <link rel="stylesheet" href="../css/2_1_content.css">
</head>
<body>

    <div id="wrap">
        <header>
            <button id="back_btn" onclick="history.back()"> ❮ </button>

            <img id="logo" src="../source/img/logo_b.png" alt="logo">

            <button id="profile_btn" onclick="location.href='./4_personal_info.php'" ><img src="<?= $profile_img ?>" alt="profile"></button>
        </header>

        <main>
            <div id="content">
                <img src="<?= $post['food_img'] ?>" alt="food_img">

                <div id="content-text">
                    <h1><?= $post['food_name'] ?></h1>
                    <h4><?= $post['restaurant_name'] ?></h4>

                    <div id="writer_info">
                        <button onclick="location.href='./4_3_user_profile.php?user_no=<?= $post['user_no'] ?>'">
                            <img 
                                src="<?= $post['writer_profile_img'] ?: '../source/img/profile_default.png' ?>" 
                                alt="writer_profile"
                            >
                        </button>

                        <span><?= $post['user_id'] ?></span>
                    </div>

                    <div id="reaction">
                        <button id="like_btn" onclick="location.replace('./like_post.php?no=<?= $post['no'] ?>')">
                            <img 
                            src="<?= $is_liked ? '../source/img/heart.png' : '../source/img/heart_none.png' ?>" 
                            alt="heart">
                        </button>
                        <p><?= $post['likes'] ?></p>

                        <img src="../source/img/views.png" alt="views">
                        <p><?= $post['views'] ?></p>
                    </div>

                    <span>이 식당, 이런 점이 맛식당!</span>
                    <h2>"<?= $post['review'] ?>"</h2>
                </div>

                <div id="buttons">
                    <button id="edit_btn" onclick="location.href='./2_3_edit.php?no=<?= $post['no'] ?>'">수정하기</button>
                    <button onclick="location.href='./3_map.php?no=<?= $post['no'] ?>'">지도에서 보기</button>
                </div>
            </div>
            <!-- 다 이제 데이터 받아서 변동 있게 만들어야.. 아이고 -->
        </main>

        <div id="comments">
            <div id="comment_top">
                <strong>나도 한줄평</strong>
                <p><?= $comment_count ?></p>
            </div>

            <?php while($comment = mysqli_fetch_array($comment_result, MYSQLI_ASSOC)){ ?>
                <div class="comment">
                    <button onclick="location.href='./4_3_user_profile.php?user_no=<?= $comment['user_no'] ?>'">
                        <img
                        src="<?= $comment['profile_img'] ?: '../source/img/profile_default.png' ?>"
                        alt="profile_img">
                    </button>

                    <p><?= $comment['user_id'] ?></p>
                    <p><?= $comment['comment'] ?></p>

                    <?php if($comment['user_no'] == $_SESSION['user_no']){ ?>
                        <button 
                            class="comment_delete_btn"
                            onclick="deleteComment(<?= $comment['no'] ?>, <?= $post['no'] ?>)">
                            삭제
                        </button>
                    <?php } ?>
                </div>
            <?php } ?>
        </div>

        <form id="write_text" action="./insert_comment.php" method="post">
            <input type="hidden" name="post_no" value="<?= $post['no'] ?>">
            <input type="text" name="comment" placeholder="나의 한줄평을 입력해 주세요!">
            <button type="submit">등록</button>
        </form>


    </div>

    <script>
        function deleteComment(commentNo, postNo){
            if(confirm('댓글을 삭제하시겠습니까?')){
                location.href = './delete_comment.php?comment_no=' + commentNo + '&post_no=' + postNo;
                
            }
        }

    </script>
    
</body>
</html>