fetch("../../php/member/getProfile.php")
.then(response => response.text())
.then(data => {

    if(data.trim() != ""){

        document.getElementById("profile_img").src =
        "../../image/" + data;

    }else{

        document.getElementById("profile_img").src =
        "../../image/default_profile.png";

    }

});

const profileImg =
    document.getElementById("profile_img");

const profileFile =
    document.getElementById("profile_file");

profileImg.addEventListener("click",function(){

    profileFile.click();

});

profileFile.addEventListener("change",function(){

    const file = profileFile.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(){

        profileImg.src = reader.result;

    }

    reader.readAsDataURL(file);

});

function uploadProfile(){

    const file =
        document.getElementById("profile_file").files[0];

    if(!file){

        alert("이미지를 선택하세요");
        return;

    }

    let formData = new FormData();

    formData.append("img", file);

    fetch("../../php/member/profileUpload.php",{
        method:"POST",
        body:formData
    })
    .then(response => response.text())
    .then(data => {

        if(data.trim()=="success"){

            alert("프로필 저장 완료");
            location.reload();

        }else{

            alert(data);

        }

    });

}