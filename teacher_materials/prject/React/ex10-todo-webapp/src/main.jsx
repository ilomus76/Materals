import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import Home from './Home'

//TODO webapp mini project...
//[제작순서]
//1. 필요한 라이브러리 추가 : scss(스타일 라이브러리), react-icons(아이콘 SVG 라이브러리) [ npm install sass react-icons ]
//2. Home component 제작
//3. UI 구성요소는 컴포넌트로 영역을 구분하여 제작 [4개 컴포넌트]
//3.1 TodoContainer : 화면 가운데 위치, 할일목록 웹앱의 Root컴포넌트
//3.2 TodoInput     : 사용자가 할일을 입력할 수 있도록 스타일된 입력 컴포넌트  
//3.3 TodoList      : 할일 항목(TodoItem)들이 놓여질 컴포넌트
//3.4 TodoItem      : 할일 글씨와 아이콘들을 보여주는 UI로 스타일된 컴포넌트

// UI 작업을 모두 완료 한 후.. 기능 구현하기
// 할일 데이터들을 가진 배열(todos)을 만들어야 함. 어디에??
// TodoInput컴포넌트에서 입력한 글씨를 TodoList에서 보여줘야 함.
// 위 2개의 컴포넌트를 가지는 TodoContainer 컴포넌트에 todos 데이터배열이 있어야만 함

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Home></Home>
  </StrictMode>,
)
