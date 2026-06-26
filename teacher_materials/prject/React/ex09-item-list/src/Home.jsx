import { useState } from "react"

import ItemComponent from "./components/ItemComponent";

function Home(){

    //1)글씨 데이터를 가진 state 변수와 setState 함수 만들기
    let [message, setMessage]= useState('Hello world')

    //2)JSX의 태그를 가진 state 변수 만들기 (즉, 변수가 요소를 저장할 수도 있음)
    let [message2, setMessage2]= useState(<h2>nice to meet you</h2>);

    //3)여러개의 글씨를 가진 배열 변수
    let [datas, setDatas]= useState(['aaa','bbb','ccc','ddd'])//초기값-배열
    //4)여러개의 <li>요소를 가진 배열 변수
    let [datas2, setDatas2]= useState([<li>aaa</li>, <li>bbb</li>, <li>ccc</li>, <li>ddd</li>])

    //7) 대량의 데이터를 가진 배열 변수
    const [items, setItems]= useState([
        {no:1, name:'sam', message:'Hello react'},
        {no:2, name:'robin', message:'nice to meet you'},
        {no:3, name:'hong', message:'have a good day'},
        {no:4, name:'park', message:'nice AI'},
    ])

    //[수행과제]이미지가 있는 데이터를 목록으로 표시해보기
    const [items2, setItems2]= useState([
        {no:1, name:'sam', message:'Hello react', image:'https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg'},
        {no:2, name:'robin', message:'nice to meet you', image:'https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg'},
        {no:3, name:'hong', message:'have a good day', image:'https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg'},
        {no:4, name:'park', message:'nice AI', image:'https://cdn.pixabay.com/photo/2016/12/09/09/52/girl-1894125_1280.jpg'},
    ])


    return (
        <>
            <h2>목록형 UI 구현하기</h2>

            {/* 1) 일반 글씨를 가진 변수를 그냥 출력해보기 */}
            {message}
            {/* 2) 요소를 가진 변수를 그냥 출력하면.. */}
            {message2}
            <hr />

            {/* 3) 글씨 여러개를 가진 배열을 출력해보기(JS는 배열을 출력하면 ,구문자로 요소들이 보여짐. JSX는 ,구분자 없이 그냥 열거됨) */}
            {datas}

            {/* 4) 각 요소들의 구분을 쉽게 하기 위해 ul요소로 표시하기 */}            
            <ul>
                {/* 요소들을 가진 배열을 그냥 출력하면..요소들이 열거됨 */}
                {datas2}
            </ul>

            {/* 5) 위 방식이 편해보이지만.. 배열의 요소에 html요소를 저장하는 방식은 좀 번거로움 */}
            {/* 실무 환경의 서버 DB에는 html요소가 아니라 그냥 데이터 값들만 존재함 */}
            {/* 그래서 우리는 일반 데이터를 가진 배열요소를 하나씩 가져와서 html요소로 감싸서 보여줘야 만 함 */}
            <ul>
                <li>{datas[0]}</li>
                <li>{datas[1]}</li>
                <li>{datas[2]}</li>
                <li>{datas[3]}</li>
            </ul>

            {/* 6) 배열의 요소데이터를 하나씩 직접 쓰는건 미쳤음. 그래서 반복문 활용 */}
            <ul>
                {
                    //for(let i=0; i<3; i++){} error - {}안에서는 변수,값,연산자,함수호출 만 가능함
                    // 배열스스로 본인의 요소개수만큼 반복하면서 특정 함수가 실행되도록 하는 메소드가 있었음
                    //datas.forEach(function(e,idx,array){}) //forEach()기능은 반복만 할뿐 출력이 없음. 그래서 사용 X
                    // .forEach 처럼 요소의 개수만큼 반복하면서 함수를 실행하여 그 결과를 새로운 배열로 리턴해주는 기능 .map()
                    datas.map(function(e,idx,array){ //요소, 인덱스번호, 배열
                        // 반복문으로 목록을 구현할때 항목(item)마다 key 라는 속성을 줘야만 함.(값은 중복되지 않는 값)
                        return <li key={idx}>{e}</li>
                    })
                }
            </ul>
            <hr />

            {/* 7) 대량의 데이터가 보통은 값여러개를 가진 객체들인 경우가 많음. */}
            {
                items.map((item,idx)=>{
                    return (
                        <div key={idx} style={{border:'1px solid black', borderRadius:4, margin:4, padding:4, display:'flex', flexDirection:'column'}}>
                            <span>{item.no}</span>
                            <span>{item.name}</span>
                            <span>{item.message}</span>
                        </div>
                    )
                })
            }
            <hr />

            {/* 8) 항목(item)마다 화면UI를 만드는 코드가 같이 있으니 지저분.. 그래서 항목 1개의 UI를 별도의 컴포넌트 조각으로 분리하여 제작 */}
            <div style={{border:'2px solid blue', padding:8, margin:8}}>
                {
                    items.map( (item,idx)=>{
                        return <ItemComponent item={item} key={idx} onClick={()=>{ alert('선택항목의 이름: ' + item.name) }}></ItemComponent>
                    } )
                }                
            </div>
            

        </>
    )
}
export default Home
