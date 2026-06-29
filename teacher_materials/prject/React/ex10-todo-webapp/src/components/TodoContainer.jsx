import { useState } from 'react'

//별도의 스타일 문서를 연결하기
import './TodoContainer.scss'
//UI 조각 컴포넌트 사용
import TodoInput from './TodoInput'
import TodoList from './TodoList'

function TodoContainer() {

    //TodoInput과 TodoList에서 사용할 [할일목록 데이터 todos] state 변수 만들기
    const [todos, setTodos] = useState([
        { no: 1, content: '리액트 기초문법 학습', isDone: false },
        { no: 2, content: '리액트 스타일링 학습', isDone: true },
        { no: 3, content: '리액트 컴포넌트 학습', isDone: false },
    ])

    //todos배열에 새로운 데이터를 추가하는 기능함수(사용하는 위치와 상관없이 todos 변수가 선언된 곳에서 변경하는 함수도 정의할 것을 권장)
    const insertTodo= (content)=>{ //파라미터로 새로추가할 할일데이터를 받아서 추가
        //새로 추가할 객체를 만들기
        const newTodo={
            no: todos.length + 1, //요소개수 + 1 을 통해 번호를 부여
            content: content,
            isDone: false
        }
        //todos라는 state 배열변수에 새로운 데이터를 추가 
        //배열에 새로운 객체를 추가하는 기능함수 호출
        const newTodos= todos.concat(newTodo)
        //새로운 todo데이터들을 state변수에 적용하기
        setTodos(newTodos)
    }

    // todos의 항목들 중에서 전달받은 번호의 todo요소를 삭제하는 기능함수
    const deleteTodo= (no)=>{
        // 기존 state배열에서 요소만 삭제하면 setState()할때 배열객체의 변화가 없다고
        // 생각하여 화면갱신이 자동으로 되지 않음.

        // 리액트팀에서 배열의 요소를 삭제하는 권장기법( .filter기능함수 사용 )        
        const newTodos= todos.filter((todo,idx)=>{return todo.no!=no}) //no 빼고 나머지만 살아남아라..
        setTodos(newTodos)
    }

    // todos항목들의 index번째 todo 객체의 isDone 값을 toggle..
    const toggleDone= (index)=>{
        //원래 todos배열의 요소값을 바꾸어도 화면을 새로 갱신되지 않음.
        //원래 배열을 복제한 완전 새로운 배열 만들기
        const newTodos= [ ...todos ] // ... 스프레드연산자(todos의 요소들를 전개시켜 줌 )
        newTodos[index].isDone= !newTodos[index].isDone

        setTodos(newTodos)
    }



    return (
        <div className="TodoContainer">
            {/* [1] 타이틀 영역 */}
            <div className="app-title">TODO LIST</div>

            {/* [2] 사용자가 할일목록을 입력하는 컴포넌트 */}
            {/* + 버튼을 클릭했을때 insertTodo()함수를 실행할 수 있도록 함수를 전달 */}
            <TodoInput insertTodo={insertTodo}></TodoInput>

            {/* [3] 할일목록이 나열되는 컴포넌트 */}
            {/* 표시할 할일목록 데이터들 todos 배열을 속성으로 전달하기 */}
            {/* todos를 삭제/변경 하는 기능함수도 속성으로 전달하기 */}
            <TodoList todos={todos} deleteTodo={deleteTodo} toggleDone={toggleDone}></TodoList>
        </div>
    )
}
export default TodoContainer