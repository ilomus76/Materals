// class형 컴포넌트로 만드는 작업은 코드가 길어 짜증.
// 그래서 함수를 컴포넌트로 사용할 수 있도록 업그레이드 됨.

//컴포넌트 조각을 import
import MyComponent2 from "./components/MyComponent2"
import MyComponent3 from "./components/MyComponent3"
import MyComponent4 from "./components/MyComponent4"
import MyComponent5 from "./components/MyComponent5"
import MyComponent6 from "./components/MyComponent6"

function Home(){
    return (
        <div>
            <h2>함수형 컴포넌트 Functional Component</h2>

            {/* 1) 컴포넌트 UI조각 만들기 */}
            <MyComponent></MyComponent>
            <MyComponent></MyComponent>

            {/* 2) 별도의 .jsx로 컴포넌트 UI조각 만들기 */}
            <MyComponent2></MyComponent2>
            <MyComponent2></MyComponent2>

            {/* 3) 매번 같은 데이터가 보여지는 것 짜증. 속성으로 값 전달해보기(함수의 파라미터 전달됨) */}
            <MyComponent3 aaa='sam' age='20' color='red' address={{nation:'korea', city:'seoul'}}></MyComponent3>
            <MyComponent3 aaa='robin' age='30' color='green' address={{nation:'japan', city:'tokyo'}}></MyComponent3>
            <hr />

            {/* 4) 함수형 컴포넌트에서 state 변수 사용해보기 */}
            <MyComponent4></MyComponent4>
            
            {/* 5) 함수형 컴포넌트를 익명함수나 화살표함수로 만들어도 됨. */}
            <MyComponent5></MyComponent5>

            {/* 6) 커스텀 컴포넌트사용할때. 속성명이 자동완성안됨. 이게 되게 하려면..*/}
            <MyComponent6 label="" color=""></MyComponent6>



        </div>
    )
}
export default Home

function MyComponent(){
    return <p>This is MyComponent UI조각</p>
}