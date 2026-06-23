//로그인 사용 후 사용가능 기능
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    alert("로그인 후 이용 가능합니다.");
    location.href = "./login.html";
}else{
    console.log("로그인 사용자:", currentUser.name);
}

// 운동 게시판 글 작성
const recordInput = document.getElementById("recordInput");
const titleInput = document.getElementById("titleInput");

function record(){
    const text = recordInput.value.trim();

    const title = titleInput.value.trim();

    if(text === ""){
        alert('기록을 입력해주세요');
        return;
    }

    if(title === ""){
        alert('제목을 입력해주세요.');
        return;
    }

    // fetch 연결 부분
    fetch("../php/save_post.php", {
        method: "POST",

        headers: {
            "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body:`title=${encodeURIComponent(title)}`+`&content=${encodeURIComponent(text)}`+`&writer=${encodeURIComponent(currentUser.name)}`
    })
    .then(function(response){
        return response.text();
    })
    .then(function(result){

        if(result === "success"){
            alert("게시글 등록 완료!");
            location.href = "./board.html";
        }else{
            alert("게시글 등록 실패");
        }

    })

    .catch(function(error){

        console.error(error);

        alert("서버 연결 중 오류가 발생했습니다.");

    });
}
