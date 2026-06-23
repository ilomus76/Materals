function writeReview(){

    const movie_title =
        document.getElementById("movie_title").value;

    const review_title =
        document.getElementById("review_title").value;

    const review_content =
        document.getElementById("review_content").value;

    console.log(movie_title);
    console.log(review_title);
    console.log(review_content);

    fetch("../../php/review_board/write.php",{
    method:"POST",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    },
    body:
        "movie_title="+encodeURIComponent(movie_title)+
        "&review_title="+encodeURIComponent(review_title)+
        "&review_content="+encodeURIComponent(review_content)
    })
    .then(response => response.text())
    .then(data => {

    if(data.trim()=="success"){

        alert("리뷰가 등록되었습니다.");

        location.href="../ReviewPage/review_board.html";

    }else{

        alert("등록 실패");

    }

});
}