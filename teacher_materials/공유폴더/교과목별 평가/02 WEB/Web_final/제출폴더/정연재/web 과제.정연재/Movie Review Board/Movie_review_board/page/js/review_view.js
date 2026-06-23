const no =
    new URLSearchParams(location.search).get("no");

fetch("../../php/review_board/view.php?no="+no)
.then(response => response.json())
.then(data => {

    document.getElementById("review_title").innerText
        = data.review_title;

    document.getElementById("user_id").innerText
        = data.user_id;

    document.getElementById("review_date").innerText
        = data.review_date.substring(0,10);

    document.getElementById("movie_title").innerText
        = data.movie_title;

    document.getElementById("hits").innerText
        = data.hits;

    document.getElementById("review_content").innerText
        = data.review_content;

    // 현재 로그인한 사용자 확인
    fetch("../../php/member/login_check.php")
    .then(response => response.text())
    .then(login_user_id => {

        console.log("로그인 사용자:", login_user_id);
        console.log("게시글 작성자:", data.user_id);

         if(login_user_id != data.user_id){

            document.getElementById("update_btn_wrap")
                .style.display = "none";

            document.getElementById("delete_btn_wrap")
                .style.display = "none";

        }

    });
    

});

function deleteReview(){

    if(!confirm("정말 삭제하시겠습니까?")){
        return;
    }

    const no =
        new URLSearchParams(location.search).get("no");

    fetch("../../php/review_board/delete.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"no="+encodeURIComponent(no)
    })
    .then(response => response.text())
    .then(data => {

        console.log(data);

        if(data.trim()=="success"){
            alert("삭제되었습니다.");
            location.href="./review_board.html"
        }else{
            alert("삭제 실패");
        }

    });
}