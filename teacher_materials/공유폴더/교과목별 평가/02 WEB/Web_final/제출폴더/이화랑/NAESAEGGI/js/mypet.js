window.onload = function(){
    var loginId = sessionStorage.getItem('id');

    var typeMap = {
        "norwegian forest": "노르웨이 숲",
        "ragdoll": "렉돌",
        "russian blue": "러시안 블루",
        "maine coon": "메인쿤",
        "munchkin": "먼치킨",
        "bengal": "벵갈",
        "british shorthair": "브리티시 쇼트헤어",
        "british longhair": "브리티시 롱헤어",
        "siamese": "샴",
        "scottish fold": "스코티시 폴드",
        "sphynx": "스핑크스",
        "american shorthair": "아메리칸 쇼트헤어",
        "abyssinian": "아비시니안",
        "custom": "코리안 숏헤어",
        "turkish angora": "터키시 앙고라"
    };

    var data = {owner_id: loginId};

        fetch('./backend/index.php',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
        .then(function(res){
            return res.json();
        })
        .then(function(result){
            if(result){
                if(result.imgData){
                    document.getElementById('pic').src = result.imgData;
                }

                if(result.petname){
                    document.getElementById('petname').innerText = result.petname;
                }

                if(result.type){
                    var kor_type = typeMap[result.type] || result.type;
                    document.getElementById('type').innerText = kor_type;

                    loadCatAPI(result.type);
                }
            }
        })
        .catch(function(error){
            console.error('Error:',error);
        });

}


function loadCatAPI(type){
    var showcase = document.querySelector('.showcase');
    if (type === 'custom') {
        showcase.innerHTML = `
            <h2 style="color:#333;">😸 코리안 숏헤어 (Korean Shorthair)</h2>
            <p><strong>특징:</strong> 한국의 친근하고 사랑스러운 토종 고양이</p>
            <p><strong>매력 포인트:</strong> 치즈, 고등어, 턱시도, 삼색이 등 다양한 코트와 애교 만점 성격! 꼬리를 바짝 세우고 다가온다면 기분이 아주 좋다는 뜻입니다.</p>
            <hr style="border:1px solid #eee; margin:15px 0;">
            <p style="line-height:1.6;">공식 품종으로 등록되지는 않았지만, 튼튼한 체질과 다채로운 매력으로 한국에서 가장 많은 사랑을 받고 있는 고양이입니다.</p>
        `;
        return; 
    }
    var apiUrl = 'https://api.thecatapi.com/v1/breeds/search?q=' + type;
    
    fetch(apiUrl)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        if(data && data.length > 0){
            var breedInfo = data[0];

            var infoHtml = `
                <h2 style="color:#333;">😸 ${breedInfo.name}</h2>
                <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
                <p><strong>Life Span:</strong> ${breedInfo.life_span} years</p>
                <hr style="border:1px solid #eee; margin:15px 0;">
                <p style="line-height:1.6;">${breedInfo.description}</p>
            `;

            document.querySelector('.showcase').innerHTML = infoHtml;
        }else{
            document.querySelector('.showcase').innerHTML = "<p>정보를 찾지 못했습니다</p>"
        }
    })
    .catch(function(error){
        console.error('API Error:', error);
    });
}