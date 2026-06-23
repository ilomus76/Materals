window.onload = function(){

    var editNo = sessionStorage.getItem('edit_no');

    if(!editNo){
        alert('오류가 발생했습니다');
        window.location.href='./meeting.html';
        return;
    }

    fetch('../backend/edit.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({no:editNo})
    })
    .then(res => res.json())
    .then(data =>{
        if(data){
            document.getElementById('in_title').value = data.title;
            document.getElementById('in_writer').value = data.writer;
            document.getElementById('in_date').innerText = data.date;
            document.getElementById('in_msg').value = data.msg;
        }
    })
    .catch(error => console.error('Error:', error));

}

function editBoard(event){
    event.preventDefault();

    var editNo = sessionStorage.getItem('edit_no');

    var title = document.getElementById('in_title').value;
    var writer = document.getElementById('in_writer').value;
    var msg = document.getElementById('in_msg').value;

    var updateData = {
        no:editNo,
        title:title,
        writer:writer,
        msg:msg
    };


    fetch('../backend/updateBoard.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(updateData)
    })
    .then(res => res.text())
    .then(result => {
        if(result === "수정 완료"){
            alert("수정 완료");
            window.location.href = './meeting.html';
        }else{
            alert('수정에 실패하였습니다');
        }
    })
    .catch(error => console.error('Error:', error));
}