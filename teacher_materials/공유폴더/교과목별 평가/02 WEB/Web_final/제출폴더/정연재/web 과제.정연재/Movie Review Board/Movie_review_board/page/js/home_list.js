fetch("../../php/member/login_check.php")
.then(response => response.text())
.then(data => {

    console.log("로그인체크 결과:", data);

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

        if(data=="success"){

            location.reload();

        }

    });

}