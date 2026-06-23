<?php


    session_start();
    header('Content-Type:text/html; charset=utf-8');

    if(!isset($_SESSION['user_no'])){
        echo "
            <script>
                alert('로그인이 필요합니다.');
                location.href='../index.html';
            </script>
        ";
        exit;
        }

    $db = mysqli_connect('localhost','monster2026aix','a1s2d3f4!','monster2026aix');

    mysqli_query($db, 'set names utf8');

    $no = $_GET['no'];

    $hit_sql = "UPDATE mbca_board SET hits = hits + 1 WHERE no='$no'";
    mysqli_query($db, $hit_sql);
    
    $sql = "SELECT* FROM mbca_board WHERE no='$no'";

    $result = mysqli_query($db, $sql);

    $row = mysqli_fetch_array($result);
    
    if(!$row){
    echo "존재하지 않는 게시글입니다.";
    exit;
}
?>


<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상세글보기</title>
    <link rel="stylesheet" href="../css/view.css">
</head>
<body>

    <div class="main_wrap">

        <header>
            <h2>상세글 보기</h2>

            <nav class="main_nav">
                <a href="./mypage.php">MY</a>
                <a href="../backend/logout.php">로그아웃</a>
            </nav>
        </header>

        <div class="view_section">

            <div class="view_select">
                <span><?php echo $row['category'];?></span>
                
            </div>

            <div class="view_name_date">
                <p>작성자 : <?php echo $row['user_no'];?></p>
                <p>작성일 : <?php echo $row['time'];?></p>
                <p>조회수 : <?php echo $row['hits'];?></p>
            </div>

            <div class="view_title">
                <h2>제목</h2>
                <p><?php echo $row['title']; ?></p>
            </div>

            <div class="view_content">
                <h2>글 내용</h2>
                <p><?php echo $row['content']; ?></p>
            </div>

            <div class="view_file">
                <?php if($row['board_img'] != ''){ ?>
                <img src="../uploads/board/<?php echo $row['board_img']; ?>" alt="게시글 이미지">
                <?php }; ?>
            </div>
            <form class="view_comment">
                <input type="text" placeholder="댓글을 입력하세요">
                <button type="button"
                        onclick="alert('댓글 기능은 아직 구현되지 않았습니다.')">
                    등록
                </button>
            </form>

            <p class="noact">등록된 댓글이 없으며 등록되지 않습니다 미구현</p>

            <div class="view_btn_box">

                <?php if($_SESSION['user_no'] == $row['user_no']){ ?>
                    <a href="./edit.php?no=<?php echo $row['no']; ?>">수정</a>
                    <a href="../backend/delete.php?no=<?php echo $row['no']; ?>" onclick="return confirm('정말 삭제하시겠습니까?');">삭제</a>
                <?php } ?>

                <a href="./board.php">목록으로</a>
            </div>

        </div>

    </div>

</body>
</html>