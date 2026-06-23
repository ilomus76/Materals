function deleteBoard(event){
    event.preventDefault();

    var editNo = sessionStorage.getItem('edit_no');

    fetch('../backend/deleteBoard.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({no: editNo})
    })
    .then(res => res.text())
    .then(result => {
        if(result === "삭제 완료"){
            alert("삭제 완료");
            window.location.href = './meeting.html';
        }else{
            alert('삭제에 실패하였습니다');
        }
    })
    .catch(error => console.error('Error:', error));
}