const weatherResult =
    document.getElementById("weatherResult");

const geocoder =
    new kakao.maps.services.Geocoder();

async function fetchWeather(lat,lon){

    let data;

    try{

        const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        const response =
            await fetch(url);

        data =
            await response.json();

    }catch(error){

        console.error(error);

        weatherResult.innerHTML =
        `
        <p>날씨 정보를 불러오지 못했습니다.</p>
        `;

        return;
    }

    let recommendation = "";

    const weatherCode =
        data.current_weather.weathercode;

    // 이하 기존 코드
    

    if(weatherCode === 0){
        recommendation = "☀️ 맑은 날씨입니다. 러닝, 자전거, 산책을 추천합니다. 😄";
    }else if(weatherCode >= 1 && weatherCode <= 3){
        recommendation = "☁️ 흐린 날씨입니다. 가벼운 조깅을 추천드려요. 💨";
    }else if(weatherCode >= 61){
        recommendation = "🌧️ 비가 오는 날씨입니다. 실내 헬스 운동을 추천합니다. 가는 길 우산 잊지 마세용.☔"
    }else if(weatherCode >= 45 && weatherCode <= 48){
        recommendation = "🌫️ 안개가 심합니다. 실내 운동을 추천드립니다."
    }else{
        recommendation = "💪 날씨가 꿀꿀해요..헬스장 운동을 추천드립니다."
    }

    console.log(weatherCode);

    weatherResult.innerHTML = `
    <h3>현재 날씨</h3>
    <p>온도 : ${data.current_weather.temperature}°C</p>
    <p>풍속 : ${data.current_weather.windspeed} km/h</p>
    <p>${recommendation}</p>
    `;
}

function getWeather(){

    const location =
        document.getElementById("cityInput").value.trim();

    if(location === ""){
        alert("지역을 입력해주세요.");
        return;
    }
    
    geocoder.addressSearch(location,function(result,status){

        if(status !== kakao.maps.services.Status.OK){
            alert("지역을 찾을 수 없습니다.");
            return;
        }

        
        const lat = result[0].y;
        const lon = result[0].x;

        fetchWeather(lat,lon);
        
    });
}