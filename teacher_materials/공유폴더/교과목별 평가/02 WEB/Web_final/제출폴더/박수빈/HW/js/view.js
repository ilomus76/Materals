let params =
new URLSearchParams(location.search);


let no =
params.get("no");



let posts =
JSON.parse(localStorage.getItem("posts")) || [];



let post =
posts.find(p=>p.no==no);



document.getElementById("title")
.innerHTML=post.title;


document.getElementById("book")
.innerHTML=post.book;


document.getElementById("content")
.value=post.content;





function editPost(){


let user =
sessionStorage.getItem("loginUser");



if(!user){


alert("수정하려면 로그인이 필요합니다.");


location.href="login.html";


return;


}



// 본인 글인지 확인

if(user !== post.user){


alert("본인이 작성한 글만 수정할 수 있습니다.");

return;


}



location.href =
"edit.html?no="+no;


}