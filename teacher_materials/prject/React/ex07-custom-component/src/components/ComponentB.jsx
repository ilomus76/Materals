import { Component } from "react";

class ComponentB extends Component{
    render(){
        return (
            <div>
                <h3>컴포넌트 B</h3>
                <button style={{padding:8}} onClick={this.props.onClick}>컴포넌트 A의 닉네임 변경</button>
            </div>
        )
    }
}
export default ComponentB