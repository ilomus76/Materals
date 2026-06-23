function loaded(){

    var user_id = sessionStorage.getItem('id');

    fetch('../backend/loadBoard.php')
    .then(function(res){
        return res.text();
    }).then(function(text){
        var json = JSON.parse(text);

        var wrap = document.querySelector('.wrap');
        var row="";

        for(board of json){
            row += `<div class="box">`
            row += `<div class="inner_box title">${board.title}</div>`
            row += `<div class="inner_box writer">${board.writer}</div>`
            row += `<div class="inner_box date">${board.date}</div>`
            row += `<div class="inner_box msg">${board.msg}</div>`
            

            if(board.user_id === user_id){
                row += `<div class="btn_group">`
                row += `<button onclick="goEdit(${board.no})">수정</button> <button onclick="goDelete(${board.no})">삭제</button>`
                row += `</div>`
            }

            row += `</div>`
        }

        wrap.innerHTML += row;
    })
    .catch(function(error){
        console.error('Error:', error);
    });
}

function goEdit(no){
    sessionStorage.setItem('edit_no', no);

    window.location.href = './edit.html';
}

function goDelete(no){
    sessionStorage.setItem('edit_no', no);
    window.location.href = './delete.html';
}


window.onload = loaded;