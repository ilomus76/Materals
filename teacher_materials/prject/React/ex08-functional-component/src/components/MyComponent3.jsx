function MyComponent3(props){ //태그에 작성한 속성들이 파라미터로 전달됨

    //전달된 props에서 address만 뽑아내기
    let {address, age}= props //구조분해할당

    return (
        <div>
            {/* Component를 상속받지 않았기에 아주 특별한 멤버변수인 this.props가 존재하지 않음. */}
            {/* 그럼 속성은... 함수니까..값을 당연히. 파라미터로 속성들을 받음 */}
            <span>Hello {props.aaa}님</span>
            <p style={{color:props.color}}>나이는 {props.age}살 입니다.</p>
            <p>나라: {props.address.nation}</p>
            <p>도시: {props.address.city}</p>

            {/* 위에 보이 prop. 을 매번 쓰는게 좀 번거로워. [구조분해할당] */}
            <p>{age} , {address.nation} , {address.city}</p>
        </div>
    )
}
export default MyComponent3

