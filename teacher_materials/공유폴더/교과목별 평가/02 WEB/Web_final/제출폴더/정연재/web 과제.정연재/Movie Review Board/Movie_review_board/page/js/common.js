fetch("../../php/member/login_check.php")
.then(response => response.text())
.then(data => {

    if(data!=""){

        document.getElementById("client_menu").innerHTML=
        `
        <a href="../MyPage/mypage.html">${data}님</a>
        <a href="#" onclick="logout()">로그아웃</a>
        `;

    }

});

function logout(){

    fetch("../../php/member/logout.php")
    .then(response => response.text())
    .then(data => {

        if(data.trim()=="success"){

            location.reload();

        }

    });

}

function searchMovie(){

    const keyword =
        document.getElementById("movie_keyword").value;

    if(keyword.trim()==""){

        alert("영화 제목을 입력하세요.");
        return;

    }

    if(keyword=="군체"){

        location.href =
        "../IntroPage/movie_intro.html";

    }else{

        alert("등록된 영화가 없습니다.");

    }

    location.href =
        "../IntroPage/movie_intro.html?movie_title="
        + encodeURIComponent(keyword);

}