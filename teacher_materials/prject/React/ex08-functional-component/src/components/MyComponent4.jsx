import { useState } from "react"

function MyComponent4(){

    //값이 변경되면 화면이 자동으로 갱신되는 아주 특별한 state 변수
    //Component 클래스를 상속하지 않았기에 this.state라는 멤버변수가 존재하지 않음.
    //원래 함수형 컴포넌트는 간단하게 UI만 표시하는 목적이었음.
    //즉, Component의 유용한 능력은 아무것도 가지고 있지 않았음.
    //리액트의 버전이 갱신되면서..함수형컴포넌트에서도 클래스형 컴포넌트기능들을 사용할 수 있도록 개선되었음.
    //이렇게 함수형에서 클래스형의 기능들을 사용할 수 있는 기법을 Hook 기술이라고 부르기로 했음.
    //이 Hook 기능(함수)들의 명칭은 대부분 useXXX() 라고 명명하였음.

    //이 HOOK 중에서 가장 중요한 useState() 사용
    //message 라는 이름의 state 변수와 setState()용 함수를 만들어보기
    let [message, setMessage]= useState('this is state message') //()안에 초기값을 지정

    //버튼 클릭시 반응할 함수 (화살표 함수로 만드는 것을 권장)
    const aaa= ()=>{
        setMessage('hello hook!!!')
    }

    //또 다른 state 변수 만들어보기
    let [title, setTitle]= useState('제목')
    const bbb= ()=> setTitle('다른 제목')
 
    return (
        <div style={{border:'2px solid black', padding:8, margin:4}}>
            <h3>함수형 컴포넌트에서 state 사용해보기</h3>

            {/* state변수 만들어 출력해보기 */}
            <p> {message} </p>
            {/* 버튼 클릭하여 message 변수 변경(state변수이니 자동으로 화면 갱신) */}
            {/* 클릭되면 aaa라는 지역함수를 호출 [return 키워드 전에 함수가 있어야 함] */}
            <button onClick={aaa}>change message</button>
            <hr />
            <p>{title}</p>
            <button onClick={bbb}>제목 변경</button>


        </div>
    )
}
export default MyComponent4