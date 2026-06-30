import { useParams } from "react-router-dom"

function Third(){

    // 라우터에 등록된 서브경로 :no 를 받기위한 HOOK기술 (useXXX)
    const params= useParams()

    return (
        <div>
            <h2>Third 페이지</h2>
            <p>Hello 전달받은 번호 : <strong>{params.no}</strong></p>
        </div>
    )
}
export default Third