let isCheckedID = false;

function checkID(){

    const user_id = document.getElementById('user_id').value;

    if(user_id==""){
        alert("아이디를 입력하세요.");
        return;
    }

    fetch("../../php/member/check_id.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:"user_id="+encodeURIComponent(user_id)
    })
    .then(response => response.text())
    .then(data => {

    if(data.trim()=="success"){

        document.getElementById("id_msg").innerText =
        "사용 가능한 아이디입니다.";

        isCheckedID = true;

    }else{

        document.getElementById("id_msg").innerText =
        "이미 사용중인 아이디입니다.";

        isCheckedID = false;

    }

});
}

let isValid = true;

function join(){

    const user_id = document.getElementById("user_id").value;
    const user_pw = document.getElementById("user_pw").value;
    const user_pw_check = document.getElementById("user_pw_check").value;
    const user_email = document.getElementById("user_email").value;
    const birth = document.getElementById("birth").value;
    const user_nickname = document.getElementById("user_nickname").value;

    const user_gender =
        document.querySelector(
            'input[name="user_gender"]:checked'
        )?.value;

    console.log(user_id);
    console.log(user_pw);
    console.log(user_email);
    console.log(birth);
    console.log(user_gender);
    console.log(user_nickname);

    let isValid = true;

    // 아이디 검사
    const idRegex =
    /^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,20}$/;

    if(!idRegex.test(user_id)){

        document.getElementById("id_msg").innerText =
        "아이디는 5~20자의 영문 소문자, 숫자, 특수문자만 가능합니다.";

        isValid = false;

    }else{

        document.getElementById("id_msg").innerText = "";

    }

    // 비밀번호 검사
    const pwRegex =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{5,20}$/;

    if(!pwRegex.test(user_pw)){

        document.getElementById("pw_msg").innerText =
        "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.";

        isValid = false;

    }else{

        document.getElementById("pw_msg").innerText = "";

    }

    // 비밀번호 확인
    if(user_pw != user_pw_check){

        document.getElementById("pw_check_msg").innerText =
        "비밀번호가 일치하지 않습니다.";

        isValid = false;

    }else{

        document.getElementById("pw_check_msg").innerText = "";

    }
    // 이메일 검사
    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(user_email)){

        document.getElementById("email_msg").innerText =
        "올바른 이메일 형식이 아닙니다.";

        isValid = false;

    }else{

        document.getElementById("email_msg").innerText = "";

    }

    // 생년월일 검사
    if(birth==""){

        document.getElementById("birth_msg").innerText =
        "생년월일을 입력하세요.";

        isValid = false;

    }else{

        document.getElementById("birth_msg").innerText = "";

    }

    // 성별 검사
    if(!user_gender){

        document.getElementById("gender_msg").innerText =
        "성별을 선택하세요.";

        isValid = false;

    }else{

        document.getElementById("gender_msg").innerText = "";

    }

    // 닉네임 검사
    if(user_nickname==""){

        document.getElementById("nickname_msg").innerText =
        "닉네임을 입력하세요.";

        isValid = false;

    }else{

        document.getElementById("nickname_msg").innerText = "";

    }

    // 아이디 중복확인 검사
    if(!isCheckedID){

        document.getElementById("id_msg").innerText =
        "아이디 중복확인을 해주세요.";

        return;

    }

    if(!isValid){
        return;
    }

    fetch("../../php/member/join.php",{
    method:"POST",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    },
    body:
        "user_id="+encodeURIComponent(user_id)+
        "&user_pw="+encodeURIComponent(user_pw)+
        "&user_email="+encodeURIComponent(user_email)+
        "&birth="+encodeURIComponent(birth)+
        "&user_gender="+encodeURIComponent(user_gender)+
        "&user_nickname="+encodeURIComponent(user_nickname)
})
.then(response => response.text())
.then(data => {

    if(data=="success"){
        alert("회원가입 완료");
    }else{
        alert("회원가입 실패");
    }

});
}

document.getElementById("user_id")
.addEventListener("input", function(){

    isCheckedID = false;

});