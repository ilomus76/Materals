// 운동 게시판
const postList = document.getElementById("postList");

const searchBoard = document.getElementById("searchBoard");

fetch("../php/load_posts.php")
.then(function(response){
    return response.json();
})
.then(function(posts){

    postList.innerHTML = "";

    posts.forEach(function(post){
        createPostItem(post);

        if(posts.length === 0){

            postList.innerHTML =
            `
            <div class="empty_post">
                아직 작성된 게시글이 없습니다.
            </div>
            `;

            return;
        }
    });
})
.catch(function(error){

    console.error(error);

    postList.innerHTML =
    `
    <div class="empty_post">
        게시글을 불러오지 못했습니다.
    </div>
    `;

});

searchBoard.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        searchPosts();
    }

});

function goWritePage(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(!currentUser){
        alert("로그인 후 이용 가능합니다.");
        location.href = "./login.html";
        return;
    }

    location.href = "./write.html";
}

function searchPosts(){
    const keyword =
        searchBoard.value.trim();

    fetch("../php/search_posts.php?keyword=" + encodeURIComponent(keyword))
    .then(function(response){
        return response.json();
    })
    .then(function(posts){

        postList.innerHTML = "";

        posts.forEach(function(post){
            createPostItem(post);
        });
    })
    .catch(function(error){

    console.error(error);

    alert("검색 중 오류가 발생했습니다.");

    });
}

function createPostItem(postData){
    // textarea 내용 읽기
    const post = document.createElement("div"); 
    const writer = document.createElement("h3");
    const title = document.createElement("h3");
    const content = document.createElement("p");
    const modifyBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const buttonGroup = document.createElement("div");

    writer.textContent = `작성자 : ${postData.writer}`;
    title.textContent = postData.title;
    content.textContent = postData.content;

    modifyBtn.textContent = "수정"; 
    deleteBtn.textContent = "삭제";

    modifyBtn.classList.add("modify_btn");
    deleteBtn.classList.add("delete_btn");
    post.classList.add("post_card");
    buttonGroup.classList.add("button_group");
    writer.classList.add("post_author");
    title.classList.add("post_title");
    content.classList.add("post_content");

    //게시글 수정 기능
    modifyBtn.onclick = function(){

        const newTitle =
            prompt("새 제목", postData.title);

        if(newTitle === null) return;

        const newContent =
            prompt("새 내용", postData.content);

        if(newContent === null) return;

        fetch("../php/update_post.php",{

            method:"POST",

            headers:{
            "Content-Type":
            "application/x-www-form-urlencoded"
            },

            body:"id=" + postData.id +"&title=" + encodeURIComponent(newTitle) + "&content=" + encodeURIComponent(newContent)
        })

        .then(function(response){
            return response.json();
        })

        .then(function(result){

            if(result.success){

                alert("수정 완료");
                location.reload();

            }else{

                alert("수정 실패");
            }
        });
    };

    // 게시글 삭제 기능
    deleteBtn.onclick = function(){

        if(!confirm("정말 삭제하시겠습니까?")){
            return;
        }

        fetch("../php/delete_post.php",{

            method:"POST",

            headers:{
                "Content-Type":
                "application/x-www-form-urlencoded"
            },
            body:"id=" + postData.id
        })
        .then(function(response){
            return response.json();
        })

        .then(function(result){
            if(result.success){

                alert("삭제 완료");
                location.reload();

            }else{

                alert("삭제 실패");
            }
        });
    };

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(!currentUser || currentUser.name !== postData.writer){
        modifyBtn.style.display = "none";
        deleteBtn.style.display = "none";
    }

    buttonGroup.appendChild(modifyBtn);
    buttonGroup.appendChild(deleteBtn);

    post.appendChild(writer);
    post.appendChild(title);
    post.appendChild(content);
    post.appendChild(buttonGroup);

    postList.appendChild(post);
}
