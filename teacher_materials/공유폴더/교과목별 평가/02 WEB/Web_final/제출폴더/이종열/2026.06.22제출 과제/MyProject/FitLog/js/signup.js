const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const passwordCheckInput = document.getElementById("passwordCheckInput");
const profileImage = document.getElementById("profileImage");

signupForm.addEventListener("submit",function(event){
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;

    if(name === ""){
        alert("이름을 입력해주세요.")
        return;
    }

    if(email === ""){
        alert("이메일을 입력해주세요.")
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        alert("올바른 이메일 형식을 입력해주세요.")
        return;
    }

    if(password === ""){
        alert("비밀번호를 확인해주세요.")
        return;
    }

    if(password !== passwordCheck){
        alert("비밀번호가 일치하지 않습니다.")
        return;
    }

    // fetch 사용 기능 회원가입 기능
    const formData =
    new FormData();

    formData.append(
    "name",
    name
    );

    formData.append(
    "email",
    email
    );

    formData.append(
    "password",
    password
    );

    if(profileImage.files[0]){
        formData.append(
            "profile_image",
            profileImage.files[0]
        );
    }

    fetch(
    "../php/signup.php",
    {
        method:"POST",
        body:formData
    }
    )
    .then(function(response){
        return response.text();
    })
    .then(function(result){

    if(result === "duplicate"){
        alert("이미 가입된 이메일입니다.");
        return;
    }

    if(result === "success"){
        alert("회원가입 완료!");

        location.href = "./login.html";
        return;
    }

    alert("회원가입 실패");
    });

// console.log(JSON.parse(localStorage.getItem("users")));
});