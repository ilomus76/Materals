const searchBar = document.getElementById('search_bar');
const keywordInput = document.getElementById('keyword');
const resultList = document.getElementById('search_result');

const container = document.getElementById('map');

let startLat = 37.484170;
let startLng = 126.929720;
let startLevel = 5;

if(selectedPost && selectedPost.lat && selectedPost.lng){
    startLat = Number(selectedPost.lat);
    startLng = Number(selectedPost.lng);
    startLevel = 2;
}

const options = {
    center: new kakao.maps.LatLng(startLat, startLng),
    level: startLevel
};

const map = new kakao.maps.Map(container, options);
    let myPosition = null;

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function(position){

            const myLat = position.coords.latitude;
            const myLng = position.coords.longitude;

            myPosition = new kakao.maps.LatLng(myLat, myLng);

            const myMarker = new kakao.maps.Marker({
                map: map,
                position: myPosition
            });

        });

    }

const ps = new kakao.maps.services.Places();

const markerImageSrc = '../source/img/logo_marker.png';
const markerImageSize = new kakao.maps.Size(50, 65);
const markerImageOption = {
    offset: new kakao.maps.Point(22, 50)
};

const markerImage = new kakao.maps.MarkerImage(
    markerImageSrc,
    markerImageSize,
    markerImageOption
);

let marker = null;
let infoWindow = null;

allPosts.forEach(function(post){
    if(!post.lat || !post.lng) return;

    const position = new kakao.maps.LatLng(Number(post.lat), Number(post.lng));

    const postMarker = new kakao.maps.Marker({
        map: map,
        position: position,
        image: markerImage
    });

    kakao.maps.event.addListener(postMarker, 'click', function(){
        if(infoWindow){
            infoWindow.close();
        }

        infoWindow = new kakao.maps.InfoWindow({
            content: `       
            <div style="
                width:210px;
                box-sizing:border-box;
                padding:12px;
                font-size:14px;
                line-height:1.5;
                overflow:hidden;
            ">
                <strong style="
                    display:block;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                ">${post.food_name}</strong>

                <div style="
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                ">${post.restaurant_name}</div>

                <div style="
                    font-size:12px;
                    color:#777;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                ">${post.address}</div>

                <div style="display:flex; gap:6px; margin-top:8px;">
                    <button 
                        onclick="location.href='./2_1_content.php?no=${post.no}'"
                        style="
                            flex:1;
                            padding:6px 0;
                            border:none;
                            border-radius:10px;
                            background:#FFC107;
                            font-weight:bold;
                            cursor:pointer;
                        ">
                        상세보기
                    </button>

                    <button 
                        onclick="openKakaoRoute('${post.restaurant_name}', ${post.lat}, ${post.lng})"
                        style="
                            flex:1;
                            padding:6px 0;
                            border:none;
                            border-radius:10px;
                            background:#333;
                            color:white;
                            font-weight:bold;
                            cursor:pointer;
                        ">
                        길찾기
                    </button>
                </div>

            </div>
            `
        });

        infoWindow.open(map, postMarker);
        map.setCenter(position);
    });
});

const geocoder = new kakao.maps.services.Geocoder();

kakao.maps.event.addListener(map, 'rightclick', function(mouseEvent){
    if(!confirm('이 위치로 맛식당을 등록하시겠습니까?')){
        return;
    }

    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();

    geocoder.coord2Address(lng, lat, function(result, status){
        let address = '';

        if(status === kakao.maps.services.Status.OK){
            address = result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name;
        }

        location.href = './2_2_upload.php?lat=' + lat
            + '&lng=' + lng
            + '&address=' + encodeURIComponent(address);
    });
});

if(selectedPost && selectedPost.lat && selectedPost.lng){
    const selectedPosition = new kakao.maps.LatLng(
        Number(selectedPost.lat),
        Number(selectedPost.lng)
    );

    const selectedMarker = new kakao.maps.Marker({
        map: map,
        position: selectedPosition,
        image: markerImage
    });

    infoWindow = new kakao.maps.InfoWindow({
        content: `
            <div style="
        width:210px;
        box-sizing:border-box;
        padding:12px;
        font-size:14px;
        line-height:1.5;
        overflow:hidden;
    ">
        <strong style="
            display:block;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        ">${selectedPost.food_name}</strong>

        <div style="
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        ">${selectedPost.restaurant_name}</div>

        <div style="
            font-size:12px;
            color:#777;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        ">${selectedPost.address}</div>

        <button 
            onclick="openKakaoRoute('${selectedPost.restaurant_name}', ${selectedPost.lat}, ${selectedPost.lng})"
            style="
                display:block;
                width:80px;
                margin-top:8px;
                padding:6px 0;
                border:none;
                border-radius:10px;
                background:#333;
                color:white;
                font-weight:bold;
                cursor:pointer;
            ">
            길찾기
        </button>
    </div>

        
        `
    });

    infoWindow.open(map, selectedMarker);
}

searchBar.addEventListener('submit', function(e){
    e.preventDefault();

    const keyword = keywordInput.value.trim();

    if(keyword === ''){
        alert('검색어를 입력해주세요.');
        return;
    }

    ps.keywordSearch(keyword, placesSearchCB);
});

function placesSearchCB(data, status){
    resultList.innerHTML = '';

    if(status === kakao.maps.services.Status.OK){
        searchBar.classList.add('active');

        data.forEach(function(place){
            const li = document.createElement('li');

            li.innerHTML = `
                <div class="place-name">${place.place_name}</div>
                <div class="place-address">${place.road_address_name || place.address_name}</div>
            `;

            li.addEventListener('click', function(){
                selectPlace(place);
            });

            resultList.appendChild(li);
        });
    }else{
        searchBar.classList.remove('active');
        alert('검색 결과가 없습니다.');
    }
}

function selectPlace(place){
    const position = new kakao.maps.LatLng(place.y, place.x);

    map.setCenter(position);

    if(marker){
        marker.setMap(null);
    }

    marker = new kakao.maps.Marker({
        map: map,
        position: position
    });

    keywordInput.value = place.place_name;

    searchBar.classList.remove('active');
}

document.getElementById('my_location_btn')
.addEventListener('click', function(){

    if(myPosition){
        map.setCenter(myPosition);
        map.setLevel(2);
    }else{
        alert('현재 위치를 가져오는 중입니다.');
    }

});

function openKakaoRoute(name, lat, lng){
    if(!myPosition){
        alert('현재 위치를 먼저 가져와야 합니다.');
        return;
    }

    const startLat = myPosition.getLat();
    const startLng = myPosition.getLng();

    const url = `https://m.map.kakao.com/scheme/route?sp=${startLat},${startLng}&ep=${lat},${lng}&by=foot`;

    window.open(url);
}