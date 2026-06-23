const boardCount = document.getElementById("todayBoardCount");
const logoutBtn = document.getElementById("logoutBtn");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const welcomeText = document.getElementById("welcomeText");

// 로그아웃 기능
if(logoutBtn){
    logoutBtn.addEventListener("click", function(){
        localStorage.removeItem("currentUser");
        alert("로그아웃 되었습니다.");
        location.href = "./index.html";
    });
}

// 대쉬보드
function updatedBoardCount(){

    fetch("./php/load_posts.php")
    .then(function(response){
        return response.json();
    })
    .then(function(posts){

        if(boardCount){
            boardCount.textContent =
            posts.length + "개";
        }

    })
    .catch(function(error){
        console.error(error);
    });

}

// 로그인 완료시
function updateAuthUI(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(currentUser){
        welcomeText.textContent = `${currentUser.name}님 FitLog에 오신 걸 환영합니다!`;

        if(loginBtn){
            loginBtn.style.display = "none";
        }
        if(signupBtn){
            signupBtn.style.display = "none";
        }
        
        if(logoutBtn){
            logoutBtn.style.display = "inline-block";
        }
    }else{
        welcomeText.textContent = "FitLog에 오신 걸 환영합니다!"

        if(loginBtn){
            loginBtn.style.display = "inline-block";
        }
        if(signupBtn){
            signupBtn.style.display = "inline-block";
        }
        
        if(logoutBtn){
            logoutBtn.style.display = "none";
        }
    }
}

updatedBoardCount();
updateAuthUI();
