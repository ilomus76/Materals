import { Component } from "react";

class ComponentA extends Component{
    render(){
        return (
            <div>
                <h3>컴포넌트 A</h3>
                <p>내 닉네임은 <strong>{this.props.nickname}</strong> 입니다.</p>
            </div>
        )
    }
}
export default ComponentA