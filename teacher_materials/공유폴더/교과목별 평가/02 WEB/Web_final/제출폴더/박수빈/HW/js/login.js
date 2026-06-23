document
.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;

    let user =
    JSON.parse(localStorage.getItem("user"));

    if(
        user &&
        email === user.email &&
        pw === user.password
    ){

        sessionStorage.setItem(
            "loginUser",
            email
        );

        alert("로그인 성공!");

        location.href = "hw.html";

    }
    else{

        alert("이메일 또는 비밀번호가 틀렸습니다.");

    }
});
