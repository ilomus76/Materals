let img1 =
document.getElementById("img1");


let fileInput =
document.getElementById("in1");



img1.onclick=function(){

    fileInput.click();

}




fileInput.onchange=function(){


    let file=fileInput.files[0];


    if(file){

        let reader=new FileReader();


        reader.onload=function(){

            img1.src=reader.result;

        }


        reader.readAsDataURL(file);

    }

}

document
.getElementById("btn1")
.onclick=function(){

let nickname =
document.getElementById("nickname").value;

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;

if(!nickname || !email || !password){

    alert("모든 정보를 입력하세요.");

    return;

}


let user={

    nickname:nickname,

    email:email,

    password:password,

    img:img1.src

};

localStorage.setItem(
    "user",
    JSON.stringify(user)
);

alert("회원가입 완료!");

location.href="login.html";

}