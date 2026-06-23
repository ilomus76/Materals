function submitBoard(){
    window.event.preventDefault();

    var title = document.getElementById('in_title').value;
    var writer = document.getElementById('in_writer').value;
    var message = document.getElementById('in_msg').value;

    var user_id = sessionStorage.getItem('id');

    if(title === ''){
        alert('제목을 입력해주세요');
        document.getElementById('in_title').focus();
        return;
    }
    
    if(writer === ''){
        alert('글쓴이를 작성하지 않은경우 익명으로 표시합니다');
        writer='익명';
    }
    
    if(message === ''){
        alert('내용을 입력해주세요');
        document.getElementById('in_msg').focus();
        return;
    }

    var data = {
        title:title,
        writer:writer,
        msg:message,
        user_id:user_id
    }

    var jsonData = JSON.stringify(data);

    fetch('../backend/insertBoard.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:jsonData
    })
    .then(function(res){
        return res.text();
    })
    .then(function(text){
        alert(text);
        window.location.href='./meeting.html';
    })




}

window.onload = function(){
    var today = new Date();

    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0'); 
    var day = String(today.getDate()).padStart(2, '0');

    var date = year + '-' + month + '-' + day;

    document.getElementById('in_date').innerHTML = date;
}