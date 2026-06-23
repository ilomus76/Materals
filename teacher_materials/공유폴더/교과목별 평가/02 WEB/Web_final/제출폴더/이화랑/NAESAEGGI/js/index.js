var loginId = sessionStorage.getItem('id');

if(!loginId){
    window.location.href='./login.html';
}else{
    window.onload = function(){
        var data = {owner_id: loginId};

        fetch('./content/backend/index.php',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
        .then(function(res){
            return res.json();
        })
        .then(function(result){
            if(result && result.imgData){
                document.getElementById('pic').src = result.imgData;
            }
        })
        .catch(function(error){
            console.error('Error:',error);
        });
    };
}