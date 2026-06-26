//React 기능과 Component 클래스를 사용하기 위해..import
import React, {Component} from 'react'

//react는 Component 능력을 가진 녀석이 화면의 구성요소가 될 수 있음.
class HomeComponent extends Component{

    //일반 멤버변수
    name= 'sam'

    //값이 변경되면 react가 자동으로 화면을 갱신해주는 Component클래스의 아주 특별한 멤버변수
    //state로 관리될 변수가 여러개 일 수 있어서 객체로 저장
    state= {
        name:'park',
        age:20
    }

    //컴포넌트가 보여줄 화면구성을 리턴해주는 기능함수
    render(){        
        return (
            <div>
                <h2>React Button click event</h2>

                {/* 1. 버튼 클릭 이벤트 처리 (html때와 약간 다름) - 함수의 이름만 써야함..호출하면 안됨. 마치 함수를 등록해 놓은 느낌.*/}
                <button onClick={ aaa }>눌러주세요</button>
                {/* 위 처럼 클릭이벤트에 반응하는 함수를 HomeComponent클래스 밖에 놓는 것은 안 좋음. */}
                {/* 그래서 반응하는 함수도 가급적.. 클래스의영역 {}안에 멤버함수(method)로 만들어 등록하는 것을 권장 */}
                {/* 멤버를 지칭할때는 this 키워드 필요 */}
                <button onClick={ this.bbb }>눌러주세요</button>
                <button onClick={ this.ccc }>눌러주세요</button>
                <button onClick={ this.ddd }>눌러주세요(권장)</button>
                {/* 화살표함수로 실행할 코드가 길지 않다면.. 별도로 만들지 말고..바로적용 */}
                <button onClick={ ()=>alert('arrow') }>눌러주세요</button>
                <hr />

                {/* 버튼 눌렀을때 다른 요소의 글씨를 변경해보기 */}
                <p>이름 : {this.name}</p>
                <button onClick={ this.changeName }>robin으로 이름 변경</button>
                <button onClick={ this.changeName2 }>robin으로 이름 변경</button>
                <hr />

                {/* state 변수를 활용하여 데이터를 변경해보기 */}
                <p>이름 : {this.state.name}</p>
                <button onClick={ this.changeName3 }>이름 변경</button>

                {/* state.age 정보 표시하고. 변경해보기 */}
                <p>나이 : {this.state.age}</p>
                <button onClick={ this.changeAge }>나이 변경</button>
                <button onClick={ this.increaseAge }>나이 1 증가</button>
                
            </div>
        )
    }//render method.......

    increaseAge= ()=>{
        //state값의 변경은 setState()만 해야함
        this.setState({age: this.state.age+1})
    }

    changeAge= ()=>{
        //state 변수의 값 변경은 무조건 setState()함수 이용
        this.setState({age:30});
    }

    changeName3= ()=>{
        //state변수의 값 변경은 무조건 setState()라는 함수를 이용해야만 갱신됨
        this.setState({name:'hong'})
    }
        

    // react 에서 이벤트처리용 함수는 무조건 화살표함수로...
    changeName2= ()=>{
        this.name='roin';    
        //변수를 바꿨다고해서 화면을 다시 갱신해 주지 않음.
        //화면을 다시 그리라고 명령.
        this.forceUpdate()   
        //이렇게 갱신하라고 명령하는 것 짜증.. 알아서 갱신되었으면..한다면.
        //값이 변경되었을때 자동으로 화면이 갱신되는 아주 특별한 변수 state를 활용 
    }

    // 이름 변경 버튼 클릭했을때 실행될 멤버함수
    changeName= function(){
        //기존 방식과 완전 다른 방식으로 요소의 글씨를 변경.
        //요소가 변수의 값을 보여주고.. 클릭되었을때. 요소를 찾지 않고..변수값만 변경하면
        //그 변수를 보여주는 요소의 글씨가 변경되도록 하는 기법(data binding 이라고 부름)
        this.name= 'robin'//error
        //이유? 익명함수도 객체가 될수 있기에. this.name을 HomeComponent말고
        //본인 changeName함수객체의 멤버인줄 오해함.
        //그래서.. this.키워드의 영향을 받지 않으려면..
        //화살표 함수를 써야함. 화살표함수를 객체가 되지 않는 함수임.
    }


    //es6에서 도입된 또 다른 방법 : 화살표함수(react에서 권장!!!!)
    ddd= ()=>{
        alert('화살표 함수')
    }

    //함수를 정의하는 또 다른 방법 : 익명함수
    ccc= function(){
        alert('익명함수')
    }

    //멤버영역 - 클릭이벤트에 반응하는 함수(method) 만들기
    bbb(){
        alert('bbb function...');
    }

}//HomeComponent ....................

//main.jsx에서 사용하도록..
export default HomeComponent

//1번 실습) 버튼 클릭시 반응하면 함수
function aaa(){
    alert('click!')
}