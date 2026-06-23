const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

loginForm.addEventListener("submit", function(event){
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if(email === ""){
        alert("이메일을 입력해주세요.");
        return;
    }

    if(password === ""){
        alert("비밀번호를 입력해주세요.");
        return;
    }

    console.log(email);
    console.log(password);
    console.log("fetch 시작");

    fetch("../php/login.php",{
        method:"POST",

        headers:{"Content-Type":"application/x-www-form-urlencoded"},

        body:`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })

    
    // 콘솔 확인
    // .then(function(response){
    // console.log("응답 받음");
    //     return response.text();
    // })
    // .then(function(result){
    //     console.log(result);
    // })
    // .catch(function(error){
    //     console.error(error);
    // });

    // 로그인 기능
    .then(function(response){
        return response.json();
    })
    .then(function(result){

        if(!result.success){
            alert("이메일 또는 비밀번호가 일치하지 않습니다.");
            return;
        }

        localStorage.setItem(
            "currentUser",
        JSON.stringify({
            name: result.name,
            email: result.email,
            profile_image:
            result.profile_image
        })
        );

        alert("로그인 성공!");

        location.href = "../index.html";
    });

});

