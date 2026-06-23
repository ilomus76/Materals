let map;
let ps;
let theaterList;

console.log("kakao =", window.kakao);

navigator.geolocation.getCurrentPosition(function(position){

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    theaterList =
    document.getElementById("theater_list");

    const container =
        document.getElementById("map");

    const options = {
        center : new kakao.maps.LatLng(lat,lng),
        level : 4
    };

    map =
    new kakao.maps.Map(container,options);

    // 내 위치 마커 (빨간색)
    const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";

    const imageSize =
        new kakao.maps.Size(64,69);

    const markerImage =
        new kakao.maps.MarkerImage(
            imageSrc,
            imageSize
        );

    const myMarker =
        new kakao.maps.Marker({

            position :
                new kakao.maps.LatLng(
                    lat,
                    lng
                ),

            image :
                markerImage

        });

    myMarker.setMap(map);

    // 내 위치 정보창
    const myInfoWindow =
        new kakao.maps.InfoWindow({

            content:
            `
            <div style="
                padding:10px;
                color:black;
                font-weight:bold;
            ">
                📍 현재 내 위치
            </div>
            `

        });

    kakao.maps.event.addListener(
        myMarker,
        "click",
        function(){

            myInfoWindow.open(
                map,
                myMarker
            );

        }
    );

    // 페이지 열자마자 표시
    myInfoWindow.open(
        map,
        myMarker
    );

    // Places 객체 생성
    ps =
    new kakao.maps.services.Places();

    // 영화관 검색
    searchTheater(
        lat,
        lng
    );

});

function moveTheater(lat, lng){

    const moveLatLng =
        new kakao.maps.LatLng(
            lat,
            lng
        );

    map.setCenter(moveLatLng);

    map.setLevel(3);
}

function searchLocation(){

    const keyword =
        document.getElementById(
            "location_keyword"
        ).value;

    if(keyword==""){

        alert("지역명을 입력하세요.");

        return;
    }

    ps.keywordSearch(
        keyword,
        function(data,status){

            if(
                status ===
                kakao.maps.services.Status.OK
            ){

                const moveLatLng =
                    new kakao.maps.LatLng(
                        data[0].y,
                        data[0].x
                    );

                map.setCenter(
                    moveLatLng
                );

                map.setLevel(4);

                searchTheater(
                    data[0].y,
                    data[0].x
                );

            }else{

                alert(
                    "검색 결과가 없습니다."
                );

            }

        }
    );

}

function searchTheater(lat,lng){

    theaterList.innerHTML = "";
    markers = [];

    ps.keywordSearch(
        "영화관",

        function(data,status){

            if(
                status ===
                kakao.maps.services.Status.OK
            ){

                for(
                    let i=0;
                    i<data.length;
                    i++
                ){

                    const movieMarker =
                        new kakao.maps.MarkerImage(
                            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                            new kakao.maps.Size(24,35)
                        );

                    const marker =
                        new kakao.maps.Marker({

                            map : map,

                            image : movieMarker,

                            position :
                                new kakao.maps.LatLng(
                                    data[i].y,
                                    data[i].x
                                )

                        });

                    const infowindow =
                        new kakao.maps.InfoWindow({

                            content:
                                "<div style='padding:10px;color:black;'>"
                                + data[i].place_name +
                                "<br>"
                                + data[i].address_name +
                                "<br>"
                                + (data[i].phone || "전화번호 없음")
                                + "</div>"

                        });

                    markers.push({
                        marker : marker,
                        infowindow : infowindow
                    });

                    kakao.maps.event.addListener(
                        marker,
                        "click",
                        function(){

                            infowindow.open(
                                map,
                                marker
                            );

                        }
                    );

                    theaterList.innerHTML +=
                    `
                    <div
                        class="theater_item"
                        onclick="moveTheater(${data[i].y}, ${data[i].x}, ${i})"
                    >

                        <h3>${data[i].place_name}</h3>

                        <p>
                            주소 :
                            ${data[i].address_name}
                        </p>

                        <p>
                            전화 :
                            ${data[i].phone || "전화번호 없음"}
                        </p>

                    </div>
                    `;
                }

            }

        },

        {
            location :
            new kakao.maps.LatLng(
                lat,
                lng
            )
        }
    );

}