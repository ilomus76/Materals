const searchInput = document.getElementById('search_keyword');
const liveResult = document.getElementById('live_search_result');

searchInput.addEventListener('input', function(){
    const keyword = searchInput.value.trim();

    if(keyword === ''){
        liveResult.innerHTML = '';
        liveResult.style.display = 'none';
        return;
    }

    fetch('./search_posts.php?keyword=' + encodeURIComponent(keyword))
        .then(res => res.json())
        .then(data => {
            liveResult.innerHTML = '';

            if(data.length === 0){
                liveResult.innerHTML = '<li class="no_result">검색 결과가 없습니다.</li>';
                liveResult.style.display = 'block';
                return;
            }

            data.forEach(post => {
                const li = document.createElement('li');

                li.innerHTML = `
                    <strong>${post.food_name}</strong>
                    <span>${post.restaurant_name}</span>
                `;

                li.addEventListener('click', function(){
                    location.href = './2_1_content.php?no=' + post.no;
                });

                liveResult.appendChild(li);
            });

            liveResult.style.display = 'block';
        });
});
