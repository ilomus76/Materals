var myId = sessionStorage.getItem('id');

window.onload = function(){
    document.getElementById('info_id').innerText = myId;
}

function deleteInfo(){
    if(confirm("정말 탈퇴하시겠습니까?")){
        fetch('./backend/deleteInfo.php', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:myId})
        })
        .then(res => res.text())
        .then(result => {
            if(result.trim() === '탈퇴 완료'){
                alert('탈퇴가 완료되었습니다');
                window.location.href = '../login.html'
            }else{
                alert('다시 시도해 주세요');
            }
        })
        .catch(error => console.error('Error:',error));
    }else{
        alert('탈퇴가 취소되었습니다');
    }
}