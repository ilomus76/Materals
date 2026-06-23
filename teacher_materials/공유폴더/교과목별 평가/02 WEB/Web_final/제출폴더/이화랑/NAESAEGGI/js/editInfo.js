window.onload = function(){
    var myId = sessionStorage.getItem('id');
    document.getElementById('in_id').value = myId;
}


function updateInfo(){
    var myId = document.getElementById('in_id').value;
    var newPw = document.getElementById('in_pw').value;

    if(newPw === ''){
        alert('비밀번호를 입력해주세요');
        document.getElementById('in_pw').focus();
        return;
    }

    var newPwReg = /^[a-z].{3,}$/;
    if (!newPwReg.test(newPw)){
        alert('비밀번호는 영어소문자로 시작하는 4자 이상이어야 합니다');
        document.getElementById('in_pw').focus();
        return;
    }

    var updateData = {
        id: myId,
        pw: newPw
    };

    fetch('./backend/updateInfo.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(updateData)
    })
    .then(res => res.text())
    .then(result => {
        if(result.trim() === '수정 완료'){
            alert('비밀번호가 변경되었습니다');
            window.location.href = './myinfo.html';
        }else{
            alert('변경에 실패하였습니다');
        }
    })
    .catch(error => console.error('Error:', error));
}