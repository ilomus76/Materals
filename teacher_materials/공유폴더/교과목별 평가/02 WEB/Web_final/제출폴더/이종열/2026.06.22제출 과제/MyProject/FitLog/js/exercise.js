// 운동 추가
const exerciseInput = document.getElementById("exerciseInput");
const exerciseList = document.getElementById("exerciseList");
const exerciseTime = document.getElementById("exerciseTime");
const completedExerciseList = document.getElementById("completedExerciseList");

function createExerciseItem(exercise){
    
    const li = document.createElement("li");
    const span = document.createElement("span");
    const timerText = document.createElement("span");
    const startBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const modifyBtn = document.createElement("button");
    const buttonGroup = document.createElement("div");
    const minutes = exercise.time;
    const seconds = "00";

    span.textContent = `${exercise.name} (${exercise.time}분)`;
    timerText.textContent = `남은시간 : ${minutes}:${seconds}`;

    startBtn.textContent = "▶ 시작"
    modifyBtn.textContent = "수정";
    deleteBtn.textContent = "삭제";

    startBtn.classList.add("start_btn");
    deleteBtn.classList.add("delete_btn");
    modifyBtn.classList.add("modify_btn");
    buttonGroup.classList.add("button_group");

    buttonGroup.appendChild(startBtn);

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    if(
        currentUser &&
        currentUser.name === exercise.user_name
    ){
        buttonGroup.appendChild(modifyBtn);
        buttonGroup.appendChild(deleteBtn);
    }

    li.appendChild(span);
    li.appendChild(timerText);
    li.appendChild(buttonGroup);
    
    exerciseList.appendChild(li);

    let isRunning = false;
    let remainTime = exercise.time * 60;
    let timerId = null;

    startBtn.onclick = function(){
        if(isRunning){
            isRunning = false;
            clearInterval(timerId);
            startBtn.textContent = "▶ 시작";
        }else{
            isRunning = true;
            startBtn.textContent = "❚❚ 정지";
            timerId = setInterval(function(){
                remainTime--;

                const minutes = Math.floor(remainTime / 60);
                const seconds = String(remainTime % 60).padStart(2, "0");

                timerText.textContent = `남은시간 : ${minutes}:${seconds}`;

                if(remainTime <= 0){

                    fetch("/FitLog/php/complete_exercise.php",{

                        method:"POST",

                        headers:{
                            "Content-Type":
                            "application/x-www-form-urlencoded"
                        },
                        body:"id=" + exercise.id
                    })
                    .then(function(response){

                        return response.json();

                    })
                    .then(function(result){

                        if(result.success){

                            loadExercises();
                            loadCompletedExercises();
                        }
                    });

                    clearInterval(timerId);
                    isRunning = false;
                    timerText.textContent = "✅ 운동 완료!"
                    startBtn.style.display = "none"
                    modifyBtn.style.display = "none"

                    li.remove();

                    alert(exercise.name + " 운동 완료!");
                }
            }, 1000);
        }
    };

    // 운동 삭제 기능
    deleteBtn.onclick = function(){

        if(
            !confirm(
                exercise.name +
                " 운동을 삭제하시겠습니까?"
            )
        ){
            return;
        }

        fetch("/FitLog/php/delete_exercise.php",{
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/x-www-form-urlencoded"
                },

                body:
                "id=" + exercise.id
            }
        )
        .then(function(response){

            return response.json();

        })
        .then(function(result){

            if(result.success){

                alert("삭제 완료");

                li.remove();

                loadExercises();
                loadCompletedExercises();
            }else{

                alert("삭제 실패");
            }
        });
    }

    // 운동 수정 기능
    modifyBtn.onclick = function(){

        const newName =
        prompt("새 운동명을 입력하세요",exercise.name);

        if(newName === null) return;

        const timeInput = prompt("새 운동시간을 입력하세요",exercise.time);

        if(timeInput === null) return;

        const newTime = Number(timeInput);

        if(newName.trim() === ""){
            alert("운동명을 입력해주세요.");
            return;
        }

        if(newTime <= 0){
            alert("올바른 시간을 입력해주세요.");
            return;
        }

        fetch("/FitLog/php/update_exercise.php",{
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/x-www-form-urlencoded"
                },

                body:
                "id=" + exercise.id +
                "&exercise_name=" +
                encodeURIComponent(newName) +
                "&exercise_time=" +
                newTime
            }
        )
        .then(function(response){

            return response.json();

        })
        .then(function(result){

            if(result.success){

                alert("수정 완료");

                loadExercises();
                loadCompletedExercises();
            }else{

                alert("수정 실패");
            }
        });
    }
    }


// 운동 추가 함수
function addExercise(){

    const text = exerciseInput.value.trim();
    const time = Number(exerciseTime.value);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(text === ""){
        alert('운동을 추가해주세요');
        return;
    }

    if(time <= 0){
        alert("운동 시간을 추가해주세요.");
        return;
    }

    fetch("../FitLog/php/save_exercise.php",{

        method:"POST",

        headers:{
            "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body:"exercise_name=" + encodeURIComponent(text) + "&exercise_time=" + time + "&user_name=" + encodeURIComponent(currentUser.name)
    })

    .then(function(response){
        return response.json();
    })

    .then(function(result){

        if(result.success){

            alert("운동 추가 완료");
            location.reload();

        }else{

            alert("운동 추가 실패");
        }
    });
}

// 완료한 운동 여기
function loadExercises(){

    const currentUser =
    JSON.parse(
        localStorage.getItem("currentUser")
    );

    fetch(
        "/FitLog/php/load_exercises.php?user_name=" +
        encodeURIComponent(currentUser.name)
    )
    .then(function(response){

        return response.json();

    })
    .then(function(exercises){

        exerciseList.innerHTML = "";

        let totalCount = 0;
        let totalTime = 0;

        exercises.forEach(function(item){

            totalCount++;
            totalTime += Number(
                item.exercise_time

            );
            createExerciseItem({

                id:item.id,
                name:item.exercise_name,
                time:item.exercise_time,
                user_name:item.user_name

            });
        });
        exerciseCount.textContent =
        totalCount + "개";

        workoutTime.textContent =
        totalTime + "분";
    });
}

const exerciseCount = document.getElementById("exerciseCount");

const workoutTime = document.getElementById("todayWorkoutTime");

function addCompletedExercise(exercise){
    const li = document.createElement("li");

    li.textContent = `✅ ${exercise.name} (${exercise.time}분)`;
    completedExerciseList.appendChild(li);
}

function loadCompletedExercises(){

    const currentUser =
    JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

    fetch(
    "/FitLog/php/load_completed_exercises.php?user_name="
    +
    encodeURIComponent(
        currentUser.name
    )
    )

    .then(function(response){return response.json();})
    .then(function(exercises){

        completedExerciseList.innerHTML = "";

        exercises.forEach(function(item){

            addCompletedExercise({

                name:item.exercise_name,
                time:item.exercise_time

            });
        });
    });
}

loadExercises();
loadCompletedExercises();