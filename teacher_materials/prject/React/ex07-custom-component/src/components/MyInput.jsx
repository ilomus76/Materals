import { Component } from "react";

class MyInput extends Component{
    render(){
        // type, size, placeholder 속성값을 전달받는 input요소
        //return <input type={this.props.type} size={this.props.size} placeholder={this.props.placeholder} style={{padding:'.5rem', margin:4}}></input>   

        // 사용자가 어떤 속성들을 전달할지 모르니..그냥 그 속성들 그대로 적용시키기
        // 객체의 멤버를 펼쳐주는 연산자 ... [스프레드(펼치다. 전개하다) 연산자]
        return <input {...this.props}  style={{padding:'.5rem', margin:4}}/>
    }
}
export default MyInput