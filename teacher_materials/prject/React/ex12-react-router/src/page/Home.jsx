import { Link } from "react-router-dom"

function Home(){
    return (
        <div>
            <h2>HOME</h2>

            {/* Second 컴포넌트 페이지로 이동하기 */}
            {/* 1) <a>요소 사용(리액트에서는 권장 안함!) */}
            <a href="/second">두번째 페이지로 이동(a요소 이동)</a>
            <br />
            {/* 이 방식으로 해도 페이지는 전환되지만..SPA가 아님. 진짜로 페이지가 바뀜.. 페이지가 깜빡임 */}

            {/* 2) react-router-dom 라이브러리에서 제공하는 페이지전환용 링크요소(a요소와 비슷한데..실제 페이지가 바뀌는 것이 아님. SPA가 유지됨. 깜빡임 없음)  */}
            <Link to='/second'>두번째 페이지로 이동(Link요소 이용)</Link>
            <br />

            {/* 3) 페이지를 전활할때 현재페이지를 history에 제거 replace() */}
            <Link to='/second' replace={true}>두번째 페이지로 이동하면서 현재 페이지 닫기</Link>
            <br />

            {/* 4) 페이지 전환할때.. 서브경로를 이용하여 데이터를 전달 [예) blog/10 , blog/15 , blog/글번호] */}
            <p>
                <Link to='/third/1'>세번째 페이지로 이동 - 특정번호 1 데이터 전달(서브경로)</Link>
            </p>
            <p>
                <Link to='/third/2'>세번째 페이지로 이동 - 특정번호 2 데이터 전달(서브경로)</Link>
            </p>
            <p>
                <Link to='/third/3'>세번째 페이지로 이동 - 특정번호 3 데이터 전달(서브경로)</Link>
            </p>
            <hr />

            {/* 버튼 클릭했을때 페이지 이동 */}
            <p>
                <Link to='/intro'>버튼클릭으로 페이지 이동 연습 페이지로 이동</Link>
            </p>


        </div>
    )
}
export default Home