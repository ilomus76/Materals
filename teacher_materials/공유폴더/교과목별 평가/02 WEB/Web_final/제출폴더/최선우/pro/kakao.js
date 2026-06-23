let map = null;
let currentMarker = null;

window.onload = function() {
    initKakaoMap();
};

function initKakaoMap() {
    const mapContainer = document.getElementById('map'); 
    
    if (!mapContainer) {
        console.error("지도를 담을 #map 태그를 찾을 수 없습니다.");
        return;
    }

    const defaultCenter = new kakao.maps.LatLng(37.5665, 126.9780);
    const mapOption = { 
        center: defaultCenter, 
        level: 3 
    };

    map = new kakao.maps.Map(mapContainer, mapOption); 
    map.relayout(); 

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            successGPS, 
            errorGPS, 
            {
                enableHighAccuracy: true, 
                maximumAge: 0,            
                timeout: 5000              
            }
        );
    } else {
        alert("이 브라우저에서는 실시간 위치 추적 기능을 지원하지 않습니다.");
    }
}

function successGPS(position) {
    const lat = position.coords.latitude;  
    const lng = position.coords.longitude; 
    const currentLatLng = new kakao.maps.LatLng(lat, lng);

    map.panTo(currentLatLng);

    if (currentMarker) {
        currentMarker.setMap(null);
    }

    currentMarker = new kakao.maps.Marker({
        position: currentLatLng
    });

    currentMarker.setMap(map);
}

function errorGPS(err) {
    console.error("GPS 추적 에러 (" + err.code + "): " + err.message);
    if (err.code === 1) {
        alert("실시간 나의 위치를 확인하려면 브라우저 상단의 위치 권한 허용이 필요합니다.");
    }
}