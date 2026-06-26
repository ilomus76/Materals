import { Component } from "react";

class MyComponent2 extends Component{
    render(){
        return (
            // 컴포넌트 조각이 본인의 스타일은 알아서 해놓기..(인라인 스타일:JS객체)
            <div style={{margin:'16px'}}>
                <span style={{padding:'.5rem 1rem', color:'blue'}}>안녕하세요. MyComponent2입니다.</span>
                <button>버튼</button>
            </div>
        )
    }
}
export default MyComponent2