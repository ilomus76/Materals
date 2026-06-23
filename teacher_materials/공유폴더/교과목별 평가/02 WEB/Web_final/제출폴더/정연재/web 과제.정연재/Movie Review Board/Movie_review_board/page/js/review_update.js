const no =
    new URLSearchParams(location.search).get("no");

fetch("../../php/review_board/view.php?no="+no)
.then(response => response.json())
.then(data => {

    document.getElementById("movie_title").value
        = data.movie_title;

    document.getElementById("review_title").value
        = data.review_title;

    document.getElementById("review_content").value
        = data.review_content;

});

function updateReview(){

    const no =
        new URLSearchParams(location.search).get("no");

    const movie_title =
        document.getElementById("movie_title").value;

    const review_title =
        document.getElementById("review_title").value;

    const review_content =
        document.getElementById("review_content").value;

    fetch("../../php/review_board/update.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:
            "no="+encodeURIComponent(no)+
            "&movie_title="+encodeURIComponent(movie_title)+
            "&review_title="+encodeURIComponent(review_title)+
            "&review_content="+encodeURIComponent(review_content)
    })
    .then(response => response.text())
    .then(data => {

        if(data.trim()=="success"){

            alert("수정 완료");

            location.href=
                "./review_view.html?no="+no;

        }else{

            alert("수정 실패");

        }

    });

}