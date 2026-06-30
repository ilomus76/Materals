import { useNavigate } from "react-router-dom"

function Login(){

    const navigate= useNavigate()

    return (
        <div>
            <h4>로그인 페이지</h4>

            {/* 브라우저의 뒤로가기 아이콘을 누르는 효과를 버튼으로 구현 */}
            <button onClick={()=>{navigate('/intro', {replace:true})}}>이전 페이지로 돌아가기</button>
            <button onClick={()=>{navigate(-1)}}>이전 페이지로 돌아가기</button>
        </div>
    )
}
export default Login