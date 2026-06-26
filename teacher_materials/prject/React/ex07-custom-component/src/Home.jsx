import { Component } from "react";
//컴포넌트 조각 불러오기
import MyComponent2 from "./components/MyComponent2";
import MyComponent3 from "./components/MyComponent3";
import MyInput from "./components/MyInput";
import MyButton from "./components/MyButton";
import ComponentA from "./components/ComponentA";
import ComponentB from "./components/ComponentB";
import MyContainer from "./components/MyContainer";

class Home extends Component{

    //컴포넌트 A 가 보여줄 글씨 데이터(값이 변경되면 자동으로 화면갱신)
    state= {
        'nickname':'oops',
    }
    //컴포넌트 B 가 클릭했을때 실행할 함수
    changeNickname=()=> this.setState({'nickname':'mbca'})

    render(){
        return (
            <>
                <h2>Custom Component</h2>

                {/* 리액트는 화면의 일부영역을 별도의 컴포넌트로 분리하여 조립하여 구성하는 것이 가능 */}
                {/* 1)별도의 컴포넌트 조각 만들기. Home.jsx안에 또 다른 컴포넌트를 제작해보기 */}
                <MyComponent></MyComponent>
                <MyComponent></MyComponent>
                <MyComponent/>

                {/* 2)다른 문서에서도 재사용하게 하고 싶다면 별도의 .jsx로 화면조각을 만드는 것이 좋음 */}
                <MyComponent2></MyComponent2>
                <MyComponent2></MyComponent2>

                {/* 3)컴포넌트를 재사용할때 매번 같은 글씨만 보이는 것 효용성이 없어보임. */}
                {/* 그래서 컴포넌트를 재사용할때 데이터를 속성property으로 전달해보기 */}
                <MyComponent3 aaa='sam' age='20' color='red'></MyComponent3>
                <MyComponent3 aaa='robin' age='25' color='green'></MyComponent3>
                {/* 혹시 속성들을 안주면? */}
                <MyComponent3></MyComponent3>

                {/* 4) 컴포넌트에 전달할 값들이 여러개일때... 컴포넌트 안에서 속성들을 한번에 알아서 사용하기*/}
                <MyInput type='text' size='10' placeholder='닉네임 입력' readOnly></MyInput>
                <MyInput type='password' size='20' placeholder='비밀번호 입력' autoFocus></MyInput>
                <hr />

                {/* 5) 컴포넌트의 props로 함수를 전달할 수도 있음 */}
                <MyButton label='A를 선택' aaa={this.actionA}></MyButton>
                <MyButton label='B를 선택' aaa={this.actionB}></MyButton> 
                <hr />

                {/* 6) 컴포넌트들 간의 데이터 처리 */}
                <ComponentA nickname={this.state.nickname}></ComponentA>
                <ComponentB onClick={this.changeNickname}></ComponentB>

                {/* 7) 컴포넌트의 속성이 아니라 자식을 전달 */}
                <MyContainer>
                    <h5>TITLE</h5>
                    <p>this is component children</p>
                </MyContainer>
                <MyContainer>
                    <a href="">aaa</a>
                    <a href="">bbb</a>
                </MyContainer>
                




            </>
        )
    }//render.....    

    actionA=()=>alert('전화를 겁니다.')
    actionB=()=>alert('이메일을 보냅니다.')
}//Home........................
export default Home

//나만의 UI조각 만들기
class MyComponent extends Component{
    render(){
        return (
            <div>
                <p>This is MyComponent</p>
                <button>BUTTON</button>
            </div>
        )
    }
}