var signupForm = document.querySelector('#signupForm');
var idInput = document.querySelector('#user_id');

signupForm.addEventListener('submit', function(event){

    event.preventDefault();

    var userId = idInput.value;

    if(userId === ''){
        alert('아이디를 입력해주세요.');
        return;
    }

    fetch('../backend/check_id.php?user_id=' + userId)
    .then(function(response){
        return response.text();
    })
    .then(function(result){

        if(result === 'exist'){
            alert('이미 사용중인 아이디입니다.');
            return;
        }

        signupForm.submit();

    });

});