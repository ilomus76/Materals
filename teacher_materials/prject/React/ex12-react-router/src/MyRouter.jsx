//라우터를 import
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//페이지 컴포넌트 import
import Home from './page/Home'
import Second from './page/Second'
import Third from './page/Third'
import Intro from './page/Intro'
import Login from './page/Login'
import Signup from './page/Signup'

//라우터도 컴포넌트이기에 함수형컴포넌트로 제작
function MyRouter(){
    return (
        // 경로에 따라 페이지를 다르게 보여주는 라우터 생성
        <BrowserRouter>
            <Routes>
                {/* 페이지 컴포넌트들을 등록.. 경로와 함께 */}
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/second' element={<Second/>}></Route>

                {/* 서브경로(:변수)를 가지는 페이지 */}
                <Route path='/third/:no' element={<Third/>}></Route>

                {/* 경로 등록 */}
                <Route path='/intro' element={<Intro/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default MyRouter