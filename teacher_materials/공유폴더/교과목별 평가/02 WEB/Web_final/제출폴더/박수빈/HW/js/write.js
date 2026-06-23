(function(){

const user = sessionStorage.getItem("loginUser");


if(!user){

    alert("로그인이 필요합니다.");

    location.href="login.html";

}


document
.getElementById("writeForm")
.addEventListener("submit",function(e){

    e.preventDefault();


    let title =
    document.getElementById("title").value;


    let book =
    document.getElementById("book").value;


    let password =
    document.getElementById("password").value;


    let content =
    document.getElementById("content").value;


    let posts =
    JSON.parse(localStorage.getItem("posts")) || [];


    let post={

        no: posts.length+1,
        user:user,
        title:title,
        book:book,
        password:password,
        content:content,
        date:new Date().toLocaleDateString()

    };


    posts.push(post);


    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );


    alert("저장되었습니다.");

    loadPage("record.html");

});


})();