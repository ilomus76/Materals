import { Component } from "react";

class MyComponent3 extends Component{
    render(){
        return (
            <div style={{border:'1px solid gray', margin:4, padding:'0.5rem'}}>
                <h4>This is MyComponent3</h4>
                {/* 속성으로 전달받은 값들은 Component클래스안에 props라는 이름의 아주 특별한 멤버변수에 전달됨  */}
                <p>Hello {this.props.aaa}님</p>
                {/* 혹시 이름을 전달받지 않으면 안내문구 보여주기 */}
                {/* JSX언어의 태그안에서 JS를 사용하려면 {}를 써야함 */}
                {/* 단, {}안에는 오직 값,연산자,변수,함수호출 만 가능함 */}
                {/* 그래서 조건 if문을 사용할 수 없음. */}
                {/* { if(this.props.aaa==undefined){} } */}
                {/* 조건에 따라 다른 UI를 구성하려면? 삼항연산자(조건?A:B) */}
                { this.props.aaa==undefined? <em>이름이 없어요</em> : <em>이름이 있어요.</em>  }

                <p style={{color:this.props.color}}>나이: {this.props.age}</p>
            </div>
        )
    }
}
export default MyComponent3