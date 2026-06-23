const contents = document.querySelectorAll('.content, .top');

contents.forEach(item => {
    item.addEventListener('click', function(){
        location.href = './2_1_content.php';
    });
});