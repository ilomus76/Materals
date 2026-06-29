//아이콘 사용
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

//스타일 연결
import './TodoItem.scss'

function TodoItem(props){ //속성으로 todo정보를 전달받으면 파라미터로 받아짐

    // todo 항목데이터의 isDone값이 true 이면.."TodoItem isDone"으로 클래스명 지정
    const todoItemeStyleName= props.todo.isDone? "TodoItem isDone" : "TodoItem" 

    return (
        <div className={todoItemeStyleName}>
            {/* 1. */}
            <div className="checkbox" onClick={()=>{ props.toggleDone(props.index) }}>
                {/* 체크박스의 색상이나 사이즈를 지정하기 위해 아이콘으로 구현 */}
                {/* isDone 여부에 따라 체크박스의 아이콘 모양을 다르게.. */}
                {
                    props.todo.isDone?<MdCheckBox/> : <MdCheckBoxOutlineBlank/>
                }
            </div>
            {/* 2. */}
            <div className="content">
                { props.todo.content }
            </div>
            {/* 3. */}
            <div className="delete" onClick={()=>props.deleteTodo(props.todo.no)}>
                <MdDeleteForever/>
            </div>
        </div>
    )
}
export default TodoItem