console.log(window.kakao);

// 이미지 업로드 미리보기
var img1 = document.getElementById('profile_select');
var in1 = document.getElementById('in1');

img1.addEventListener('click', function(){
    in1.click();
});

in1.addEventListener('change', function(){
    var file = in1.files[0];

    if(file){
        var fr = new FileReader();

        fr.onload = function(){
            img1.src = fr.result;
        };

        fr.readAsDataURL(file);
    }
});


// 카카오 지도 생성
var mapContainer = document.getElementById('map');

var mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3
};

var map = new kakao.maps.Map(mapContainer, mapOption);

var ps = new kakao.maps.services.Places();

var marker = null;


// 식당 검색
var searchBox = document.getElementById('search_bar');
var searchBtn = document.getElementById('search_btn');
var searchResult = document.getElementById('search_result');
var restaurantNameInput = document.getElementById('restaurant_name');

searchBtn.addEventListener('click', function(){
    searchRestaurant();
});

function searchRestaurant(){

    var keyword = restaurantNameInput.value;

    if(keyword.trim() === ''){
        alert('식당명을 입력하세요.');
        return;
    }

    ps.keywordSearch(keyword, placesSearchCB);
}

function placesSearchCB(data, status){

    searchResult.innerHTML = '';

    if(status === kakao.maps.services.Status.OK){

        searchBox.classList.add('active');

        data.forEach(function(place){

            var li = document.createElement('li');

            li.innerHTML = `
                <strong>${place.place_name}</strong><br>
                <span>${place.road_address_name || place.address_name}</span>
            `;

            li.addEventListener('click', function(){

                 var moveLatLon = new kakao.maps.LatLng(place.y, place.x);

                map.setCenter(moveLatLon);

                if(marker){
                     marker.setMap(null);
                }

                marker = new kakao.maps.Marker({
                    map: map,
                    position: moveLatLon
                });

                restaurantNameInput.value = place.place_name;

                document.getElementById('lat').value = place.y;
                document.getElementById('lng').value = place.x;
                document.getElementById('address').value =
                    place.road_address_name || place.address_name;

                searchBox.classList.remove('active');
            });

            searchResult.appendChild(li);
        });

    }else{
        searchBox.classList.add('active');
        searchResult.innerHTML = '<li>검색 결과가 없습니다.</li>';
    }
}