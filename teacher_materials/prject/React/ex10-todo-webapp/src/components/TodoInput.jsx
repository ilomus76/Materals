//아이콘 라이브러리 사용
import { MdAdd } from "react-icons/md";

//스타일 적용
import './TodoInput.scss'
import { useState } from "react";

function TodoInput(props){ //전달받은 값/함수 들 받는 파라미터

    //input요소에 써있는 글씨를 저장할 state 변수
    const [content, setContent]= useState('')

    //버튼 클릭할때 발동할 함수
    const clickAddBtn=()=>{
        //input요소에 써있는 글씨(content state변수)를 가져와서..props 전달받은 insertTodo()함수를 실행시켜 항목 추가
        props.insertTodo(content)
        //다음 입력이 편하도록.. input요소의 value값을 빈글씨로..
        setContent('')
    }

    //버튼을 클릭하거나. 'enter'키를 눌렀을때 form요소의 onSubmit 이벤트에 의해 실행될 함수
    const submit=(event)=>{
        //form요소는 기본적으로 화면을 바꾸는 동작을 수행함. 이를 방지해야 함.
        event.preventDefault()
        if(content=='') return //글씨 쓴것이 없으면 동작 종료

        props.insertTodo(content)
        setContent('')
    }

    return (
        // 사용자가 'enter'키를 눌러도 할일데이터가 추가되도록 하고 싶다면.. form요소 사용
        // form요소의 안에 있는 마지막 input요소의 입력이 되고 'enter'키를 누르면 자동 서밋이 됨
        <form className="TodoInput" onSubmit={submit}>
            <input type="text" placeholder="할 일을 입력하세요" value={content} onChange={(event)=>{setContent(event.target.value)}}/>
            {/* 버튼에 보여지는 + 기호는 아이콘 이용(react-icons 라이브러리) */}
            <button type="submit"><MdAdd/></button>
        </form>
    )
}
export default TodoInput