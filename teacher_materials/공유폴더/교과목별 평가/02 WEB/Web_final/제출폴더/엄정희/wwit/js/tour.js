// 검색어 입력코드
document.querySelector(".search-icon").addEventListener("click", function(){
        const keyword = document.getElementById("in1").value.trim();
        if(!keyword){
            alert("검색어를 입력하세요");
            return
        }
        alert("검색: " + keyword);
    });

//인기 검색어 입력코드
document.querySelector(".hot-keyword h2").addEventListener("click", function(){
    this.parentElement.classList.toggle("open")
});