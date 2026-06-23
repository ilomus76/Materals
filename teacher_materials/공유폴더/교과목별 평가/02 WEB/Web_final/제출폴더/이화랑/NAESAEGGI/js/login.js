function login(){
    window.event.preventDefault();

    var id = document.getElementById('in_id').value;
    var pw = document.getElementById('in_pw').value;

    if(id === ''){
        alert('아이디를 입력해주세요');
        document.getElementById('in_id').focus();
        return;
    }

    if(pw === ''){
        alert('비밀번호를 입력해주세요');
        document.getElementById('in_pw').focus();
        return;
    }

    var data = {
        id:id,
        pw:pw
    }

    var jsonData = JSON.stringify(data);



    fetch('./content/backend/login.php',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:jsonData
    })
    .then(function(res){
        return res.text();
    })
    .then(function(text){
        alert(text);
        if(text === "로그인에 성공하였습니다"){
            sessionStorage.setItem('id',id);
            window.location.href = './index.html';
        }
    })

}

window.onload = function(){
    document.getElementById('in_id').addEventListener('keyup', function(event){
        if(event.key === 'Enter'){
            document.getElementById('in_pw').focus();
        }
    });

    document.getElementById('in_pw').addEventListener('keyup', function(event){
        if(event.key === 'Enter'){
            document.getElementById('btn_login').click();
        }
    });
};