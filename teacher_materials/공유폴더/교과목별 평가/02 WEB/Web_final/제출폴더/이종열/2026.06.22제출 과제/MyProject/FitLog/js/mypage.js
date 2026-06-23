const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileImage = document.getElementById("profileImage");
const myBoardCount = document.getElementById("myBoardCount");
const completionRate = document.getElementById("completionRate");
const myExerciseCount = document.getElementById("myExerciseCount");
const myExerciseTime = document.getElementById("myExerciseTime");
const myCompletedCount = document.getElementById("myCompletedCount");
const myCompletedTime = document.getElementById("myCompletedTime");
const logoutBtn = document.getElementById("logoutBtn");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// 로그아웃 기능
if(logoutBtn){
    logoutBtn.addEventListener("click", function(){
        localStorage.removeItem("currentUser");
        alert("로그아웃 되었습니다.");
        location.href = "../index.html";
    });
}

if(!currentUser){
    alert("로그인 후 이용 가능합니다.");
    location.href = "../pages/login.html";
}else{
    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;

    if(
    currentUser.profile_image
    &&
    currentUser.profile_image !== ""
    ){
        profileImage.src =
        "../uploads/"
        +
        currentUser.profile_image;
    }

}

fetch(
"/FitLog/php/mypage_stats.php?user_name="
+
encodeURIComponent(
    currentUser.name
)
)

.then(function(response){

    return response.json();

})

.then(function(data){

    myBoardCount.textContent = data.board_count;
    myExerciseCount.textContent = data.exercise_count + "개";
    myExerciseTime.textContent = data.exercise_time + "분";
    myCompletedCount.textContent = data.completed_count + "개";
    myCompletedTime.textContent = data.completed_time + "분";
    completionRate.textContent = data.completion_rate + "%";

})
.catch(function(error){

    console.error(error);

});

