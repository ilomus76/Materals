let post =
JSON.parse(localStorage.getItem("editPost"));

document.getElementById("title").value =
post.title;

document.getElementById("book").value =
post.book;

document.getElementById("content").value =
post.content;

document
.getElementById("editForm")
.addEventListener("submit",function(e){

e.preventDefault();

let posts =
JSON.parse(localStorage.getItem("posts"));

let index =
posts.findIndex(
p=>p.id===post.id
);

posts[index].title =
document.getElementById("title").value;

posts[index].book =
document.getElementById("book").value;

posts[index].content =
document.getElementById("content").value;

localStorage.setItem(
"posts",
JSON.stringify(posts)
);

alert("수정 완료!");

loadPage("record.html");

});