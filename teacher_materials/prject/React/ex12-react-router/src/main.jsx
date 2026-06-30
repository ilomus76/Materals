import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyRouter from './MyRouter'
// import './index.css'
// import App from './App.jsx'

// 웹앱을 구현할때 여러페이지로 화면을 구현해야 함.[인트로, 로그인, 회원가입 등...]
// 리액트는 기본적으로 하나의 html페이지에 동적으로 UI를 구성하는 SPA방식임
// 그래서 페이지 전환에 대한 기능이 제공되지 않음.
// 그래서 등장한 라이브러리 : react-router-dom   설치

//1. 각 페이지용 컴포넌트들에 경로를 지정하는 Router 컴포넌트를 먼저 제작 : MyRouter.jsx
//2. 각 페이지용 컴포넌트를 제작( page/Home.jsx,   page/Scone.jsx)
//3. MyRouter.jsx에 Route로 페이지 컴포넌트와 경로 등록
//4. MyRouter를 root로 등록

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyRouter></MyRouter>
  </StrictMode>,
)
