const mapContainer = document.getElementById('map'); // 지도를 표시할 div 
const gymList = document.getElementById("gymList");
const searchInput = document.getElementById("searchInput");

// 마커들
let userMarker = null;
let gymMarkers = [];
let currentInfoWindow = null;

const mapOption = {
    center: new kakao.maps.LatLng(37.486594, 126.929261), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};  

// 지도를 생성합니다    
const map = new kakao.maps.Map(mapContainer, mapOption); 

// 주소-좌표 변환 객체를 생성합니다
const geocoder = new kakao.maps.services.Geocoder();
const places = new kakao.maps.services.Places();

/* 사용자 위치 마커 */
const userMarkerImage =
new kakao.maps.MarkerImage(
    "../images/free-icon-user.png",
    new kakao.maps.Size(40, 40)
);

/* 헬스장 마커 */
const gymMarkerImage =
new kakao.maps.MarkerImage(
    "../images/free-icon-gym.png",
    new kakao.maps.Size(40, 40)
);

function searchGym(){
    const keyword = searchInput.value.trim();

    if (keyword === ""){
        alert("주소를 입력해주세요.");
        return;
    }

// 주소로 좌표를 검색합니다
    geocoder.addressSearch(keyword, function(result, status){
        if (status === kakao.maps.services.Status.OK){
            const coords = 
                new kakao.maps.LatLng(result[0].y, result[0].x);

            if(userMarker){
                userMarker.setMap(null);
            }

            userMarker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: userMarkerImage
            });

            map.setCenter(coords);
            showGymList(coords);

        }
    });
}

function showGymList(coords){

    if(currentInfoWindow){
        currentInfoWindow.close();
        currentInfoWindow = null;
    }

    // 기존 헬스장 마커 제거
    for(let i = 0; i < gymMarkers.length; i++){
        gymMarkers[i].setMap(null);
    }
    gymMarkers = [];

    places.keywordSearch("헬스장",function(data, status){

        if(status === kakao.maps.services.Status.OK){

            gymList.innerHTML = "";

            for(let i = 0; i < data.length; i++){
                const gymItem = document.createElement("div");
                gymItem.textContent = data[i].place_name;
                gymList.appendChild(gymItem);

                const gymCoords = new kakao.maps.LatLng(
                    data[i].y,
                    data[i].x
                );

                const gymMarker = new kakao.maps.Marker({
                    map: map,
                    position: gymCoords,
                    image: gymMarkerImage
                });

                const infoWindow = new kakao.maps.InfoWindow({
                    content: `<div>${data[i].place_name}</div>`
                });

                kakao.maps.event.addListener(gymMarker, 'click', function(){

                    if(currentInfoWindow){
                        currentInfoWindow.close();
                    }

                    infoWindow.open(map, gymMarker);

                    currentInfoWindow = infoWindow;
                });

                gymItem.onclick = function(){
                    map.setCenter(gymCoords);

                    if(currentInfoWindow){
                        currentInfoWindow.close();
                    }

                    infoWindow.open(map, gymMarker);

                    currentInfoWindow = infoWindow;
                };

                gymItem.innerHTML = `
                    <strong>${data[i].place_name}</strong><br>
                    ${data[i].road_address_name || data[i].address_name}
                `;

                gymMarkers.push(gymMarker);
                console.log(
                    data[i].place_name,
                    data[i].x,
                    data[i].y
                );
            }
        }
    },
    {
        location: coords,
        radius: 2000,
        sort: kakao.maps.services.SortBy.DISTANCE
    });
}

function bookmarkGym(){
    alert("북마크 기능 준비중");
}
