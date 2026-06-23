function register(){
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

    var pwReg = /^[a-z].{3,}$/;
    if (!pwReg.test(pw)){
        alert('비밀번호는 영어소문자로 시작하는 4자 이상이어야 합니다');
        document.getElementById('in_pw').focus();
        return;
    }

    var data = {
        id:id,
        pw:pw
    }

    var jsonData = JSON.stringify(data);

    fetch('./content/backend/regi.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:jsonData
    })
    .then(function(res){
        return res.text();
    })
    .then(function(text){
        alert(text);
        if(text === "회원가입에 성공하였습니다"){
            sessionStorage.setItem('id',id);
            window.location.href='./regi2.html';
        }
    })

}