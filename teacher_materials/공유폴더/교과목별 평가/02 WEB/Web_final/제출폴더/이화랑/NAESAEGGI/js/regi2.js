function loadPreview(input){
    if(input.files && input.files[0]){
        var reader = new FileReader();

        reader.onload = function(e){
            document.getElementById('preview').src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }else{
        document.getElementById('preview').src = './image/nopet.png';
    }
}

function check(){
    var petname = document.getElementById('petname').value;
    var type = document.getElementById('type').value;
    var imgData = document.getElementById('preview').src;
    var ownerId = sessionStorage.getItem('id');

    if(petname === ''){
        alert('내새끼 이름을 입력해주세요');
        document.getElementById('petname').focus();
        return;
    }

    var data = {
        petname:petname,
        type:type,
        image:imgData,
        owner_id:ownerId
        
    };

    var jsonData = JSON.stringify(data);


    fetch('./content/backend/regi2.php',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:jsonData
    })
    .then(function(res){
        return res.text();
    })
    .then(function(text){
        if(text.trim() === "내새끼 정보를 입력했습니다"){
            alert('정보가 저장되었습니다');
            window.location.href='./index.html';
        }else{
            alert(text);
        }
    })
    .catch(function(error){
        console.error('Error:',error);
        alert('통신에러가 발생했습니다');
    });
}

