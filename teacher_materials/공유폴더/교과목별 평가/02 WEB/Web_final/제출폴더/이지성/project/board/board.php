<?php

    session_start();

    header('Content-Type:text/html; charset=utf-8');
    
    if(!isset($_SESSION['user_no'])){
        echo "
            <script>
            alert('로그인이 필요합니다.');
            location.href='../index.html';
                </script>";
            exit;
            }    

    $db = mysqli_connect('localhost','monster2026aix','a1s2d3f4!','monster2026aix');
    mysqli_query($db, 'set names utf8');

    $keyword = $_GET['keyword'] ?? '';
    $category = $_GET['category'] ?? '';

    if($keyword == '' && $category == ''){
        $sql = "SELECT * FROM mbca_board ORDER BY no DESC";

    }else if($keyword != '' && $category == ''){
        $sql = "SELECT * FROM mbca_board WHERE title LIKE '%$keyword%' ORDER BY no DESC";

    }else if($keyword == '' && $category != ''){
        $sql = "SELECT * FROM mbca_board WHERE category='$category' ORDER BY no DESC";

    }else{
        $sql = "SELECT * FROM mbca_board WHERE title LIKE '%$keyword%' AND category='$category' ORDER BY no DESC";
    }

        $result = mysqli_query($db, $sql);

?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MBCA 학습 문의 게시판</title>
    <link rel="stylesheet" href="../css/board.css">
</head>
<body>

    <div class="main_wrap">

        <header class="main_header">
            <h1>MBCA<br> 
            <span>학습 문의 게시판</span>
            </h1>
            

            <nav class="main_nav">
                <span><?php echo $_SESSION['user_id'].'님 환영합니다'; ?></span>
                <a href="./mypage.php">MY</a>
                <a href="../backend/logout.php">로그아웃</a>
            </nav>
        </header>

        <section class="intro_box">
            <h2>학습 중 막힌 부분을 질문해보세요.</h2>
            <p>HTML, CSS, JavaScript, PHP, DB, Git 관련 질문을 공유할 수 있습니다.</p>
            <a href="./write.php" class="write_btn">글쓰기</a>
        </section>

        <section class="category_box">
            <a href="./board.php">전체</a>
            <a href="./board.php?category=html_css">HTML/CSS</a>
            <a href="./board.php?category=javascript">JavaScript</a>
            <a href="./board.php?category=php">PHP</a>
            <a href="./board.php?category=db">DB</a>
            <a href="./board.php?category=git">Git</a>
            <a href="./board.php?category=etc">기타</a>
        </section>

            <form class="search_box" action="./board.php" method="get">
                <input type="hidden" name="category" value="<?php echo $category; ?>">

                <select>
                    <option>제목</option>
                </select>

                <input type="text" name="keyword" placeholder="검색어를 입력하세요" value="<?php echo $keyword; ?>">

                <button type="submit">검색</button>
            </form>

        <section class="board_area">
            <h2>등록된 질문</h2>

           <ul class="board_list">
                <?php if(mysqli_num_rows($result) == 0){ ?>
                    <li> <h2>검색 결과가 없습니다.</h2></li>
                <?php } ?>
                <?php while($row = mysqli_fetch_array($result)){ ?>
                    <li> 
                        <a href="./view.php?no=<?php echo $row['no']; ?>">
                            <span class="no">No.<?php echo $row['no']; ?></span>
                            <span class="category"><?php echo $row['category']; ?></span>
                            <strong><?php echo $row['title']; ?></strong>
                            <!-- <span class="status waiting"><?php echo $row['status']; ?></span> -->
                            <span class="hit">조회수 <?php echo $row['hits']; ?></span>
                            
                        </a>
                    </li>
                <?php } ?>
            </ul>
        </section>

    </div>

</body>
</html>