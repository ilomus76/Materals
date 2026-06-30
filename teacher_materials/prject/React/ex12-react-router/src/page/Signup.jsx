import { useLocation } from "react-router-dom"

function Signup(){

    // 페이지 전환될때 state로 전달된 객체를 받기 - HOOK 기술
    const location= useLocation()

    return (
        <div>
            <h4>회원가입 페이지</h4>
            {/* location에 전달된 state 값을 사용 */}
            <p>이름 : {location.state.name}</p>
            <p>나이 : {location.state.age}</p>
        </div>
    )
}
export default Signup