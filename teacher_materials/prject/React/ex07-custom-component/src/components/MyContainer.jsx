import { Component } from "react";

class MyContainer extends Component{
    render(){
        return (
            <div style={{margin:8, padding:8, border:'1px dotted red'}}>
                {/* 컴포넌트의 자식요소로 전달된 요소 배치하기 */}
                {this.props.children}
            </div>
        )
    }
}
export default MyContainer