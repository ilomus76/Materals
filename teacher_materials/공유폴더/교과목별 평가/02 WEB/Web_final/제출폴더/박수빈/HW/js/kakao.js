var mapContainer = document.getElementById('map');


var mapOption = {
    center: new kakao.maps.LatLng(37.5665,126.9780),
    level: 5
};


var map = new kakao.maps.Map(
    mapContainer,
    mapOption
);

var ps = new kakao.maps.services.Places();

var markers = [];

searchPlaces();



function searchPlaces(){


    var keyword =
    document.getElementById('keyword').value;


    ps.keywordSearch(
        keyword,
        placesSearchCB
    );


}



function placesSearchCB(data,status){


    if(status === kakao.maps.services.Status.OK){


        removeMarkers();


        var bounds =
        new kakao.maps.LatLngBounds();



        for(var i=0;i<data.length;i++){


            var place = data[i];


            var position =
            new kakao.maps.LatLng(
                place.y,
                place.x
            );


            var marker =
            new kakao.maps.Marker({

                map:map,
                position:position

            });



            markers.push(marker);



            var infowindow =
            new kakao.maps.InfoWindow({

                content:
                `<div style="padding:10px">
                📚 ${place.place_name}
                </div>`

            });



            kakao.maps.event.addListener(
                marker,
                'click',
                function(){

                    infowindow.open(
                        map,
                        marker
                    );

                }
            );



            bounds.extend(position);


        }


        map.setBounds(bounds);


    }

}



function removeMarkers(){


    for(var i=0;i<markers.length;i++){

        markers[i].setMap(null);

    }


    markers=[];

}