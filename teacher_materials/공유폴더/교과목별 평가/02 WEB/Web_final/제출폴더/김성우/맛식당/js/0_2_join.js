// 요소들 참조
        var img1= document.getElementById('profile_img')
        var in1= document.getElementById('in1') //숨겨져 있는 파일 탐색기. 선택 input 요소

        // 이미지 요소 클릭 이벤트 처리
        img1.addEventListener('click', function(){
            in1.click(); //숨겨져있던 input 요소를 강제로 클릭!
        });

        // 파일 탐색기의 이미지 선택이 완료되면..
        in1.addEventListener('change', function(){
            // 선택한 파일 객체 취득
            var file= in1.files[0]; //여러개 선택할 수 있어서 배열임. 그래서 첫번째

            if(file){
                var fr= new FileReader();
                fr.onload=function(){
                    img1.src= fr.result;
                }
                fr.readAsDataURL(file);
            }
        })