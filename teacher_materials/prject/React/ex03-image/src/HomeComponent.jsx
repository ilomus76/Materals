import React, {Component} from 'react'
// src폴더안에 있는 이미지파일을 불어와서 변수에 저장
import newyork from './newyork.jpg'
import paris from './assets/paris.jpg'
import sydney from './assets/sydney.jpg'

import moana01 from './assets/moana/moana01.jpg'
import moana02 from './assets/moana/moana02.jpg'
import moana03 from './assets/moana/moana03.jpg'
import moana04 from './assets/moana/moana04.jpg'
import moana05 from './assets/moana/moana05.jpg'

class HomeComponent extends Component{

    //값이 변경되면 화면이 갱신되는 Component 클래스의 아주 특별한 멤버변수 state
    state= {
        image: newyork,
        //이미지들을 가진 배열
        images: [moana01, moana02, moana03, moana04, moana05],
        imgIndex: 0, //현재 보여줄 이미지의 인덱스 번호        
    }

    render(){
        return (
            <div>
                <h2>React Image</h2>

                {/* img 요소 보여주기 */}
                {/* 1)src폴더 안에 이미지파일을 위치 */}
                {/* (경로1) html에서 처럼 파일경로를 지정하면 안보여짐. */}
                <img src="./newyork.jpg" alt="뉴욕 이미지" />
                {/* (해결) src 폴더의 이미지를 .jsx파일에서 불러와서 보여줘야함. import */}
                <img src={newyork} alt="뉴욕 이미지" width={150}/>
                {/* 2)src폴더 안에 이미지파일을 위치하면 파일이 너무많이 식별이 어려움. 그래서 src/assets폴더안에 이미지를 위치할 것을 권장 */}
                <img src={paris} alt="파리 이미지" width={150}/>

                {/* 3)public 폴더는 index.html이 바라보는 본인 폴더위치임. */}
                {/* public 폴더에 이미지파일을 위치하고 사용해보기 */}
                <img src="./koala.jpg" alt="코알라 이미지" width={150}/>

                {/* 4)웹 이미지파일의 전체 url 경로(절대경로) */}
                <img src="https://cdn.pixabay.com/photo/2019/09/17/02/20/jeju-4482313_1280.jpg" alt="웹 이미지" width={150}/>

                {/* 이미지파일을 사용하는 방법은 경로에 따라 다름. 이 중 권장은 src/assets 폴더 */}
                {/* public 폴더안에는 아이콘 이미지들을 보통 배치하여 사용 */}
                <hr />

                {/* 버튼 클릭하여 이미지 변경하기 -- 화면갱신에 영향을 주는 state 변수 활용*/}
                <img src={this.state.image} alt="뉴욕" width={200} />
                <button onClick={ this.changeImage }>change image</button>
                <hr />

                {/* 이미지를 클릭하면 그림 변경하기 */}
                <img src={this.state.images[this.state.imgIndex]} alt="moana images" width={200} onClick={this.changeImage2} />

            </div>
        )
    }//render method.....

    changeImage= ()=>this.setState({image:paris})

    changeImage2= ()=>{
        //번호가 계속 증가되면 안됨.
        let idx= this.state.imgIndex + 1
        if(idx>=5){
            idx=0
        }
        this.setState({imgIndex: idx})
    }
    

}//HomeComponent ....................
export default HomeComponent