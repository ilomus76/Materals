function login(){

    const user_id =
        document.getElementById("user_id").value;

    const user_pw =
        document.getElementById("user_pw").value;

    console.log(user_id);
    console.log(user_pw);

    fetch("../../php/member/login.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:
            "user_id="+encodeURIComponent(user_id)+
            "&user_pw="+encodeURIComponent(user_pw)
    })
    .then(response => response.text())
    .then(data => {
        if(data=="success"){
            location.href =
            "../HomePage/home_list.html";
        }else{
            alert("아이디 또는 비밀번호가 틀립니다.");

        }

});
}