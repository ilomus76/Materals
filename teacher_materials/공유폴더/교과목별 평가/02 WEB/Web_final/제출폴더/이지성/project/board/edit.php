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
    
    $sql = "SELECT * FROM mbca_board WHERE no='$no'";

    $result = mysqli_query($db, $sql);

    $row = mysqli_fetch_array($result);
    
    if(!$row){
        echo "존재하지 않는 게시글입니다.";
        exit;   
    }

    if($_SESSION['user_no'] != $row['user_no']){
        echo "
        <script>
            alert('수정 권한이 없습니다.');
            location.href='./board.php';
        </script>
        ";
        exit;
    }
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>수정</title>
    <link rel="stylesheet" href="../css/write.css">
</head>
<body>
    <div class="main_wrap">

        <header class="main_header">
            <h1>MBCA 학습 문의 게시판</h1>

            <nav class="main_nav">
                <a href="./mypage.php">MY</a>
                <a href="../backend/logout.php">로그아웃</a>
            </nav>
        </header>

        <form action="../backend/update.php" method="post" class="write_form" enctype="multipart/form-data">
            <input type="hidden" name="no" value="<?php echo $row['no']; ?>">
            <input type="hidden" name="old_img" value="<?php echo $row['board_img']; ?>">

            <div class="write_form_top">
                <h2>글수정</h2>
                <a href="./board.php">목록으로</a>
            </div>

            <div class="form_group">
                <p>카테고리</p>
                <select name="category">
                    <option value="">선택</option>
                    <option value="html_css">HTML/CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="php">PHP</option>
                    <option value="db">DB</option>
                    <option value="git">Git</option>
                    <option value="etc">기타</option>
                </select>
            </div>

            <div class="form_group">
                <p>제목</p>
                <input type="text" name="title" value="<?php echo $row['title']; ?>">               
            </div>

            <div class="form_group">
                <p>내용</p>
                <textarea name="content"><?php echo $row['content']; ?></textarea>
            </div>

            <div class="form_group">
                <p>첨부이미지</p>
                <?php if($row['board_img'] != ''){ ?>
                <img src="../uploads/board/<?php echo $row['board_img']; ?>" alt="게시글 이미지">
                <?php } ?>                
                <input type="file" name="board_img">
            </div>

            <div class="write_btnbox">
                <a href="./view.php?no=<?php echo $row['no']; ?>">취소</a>
                <button type="submit">수정</button>
            </div>

        </form>

    </div>
</body>
</html>