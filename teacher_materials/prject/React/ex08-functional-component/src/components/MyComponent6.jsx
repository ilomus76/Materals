//속성을 자동완성 되게 하려면..
//방법1(권장) : TypeScript언어 사용
//방법2 : JSDoc 문서를 만들기 -- 컴파일러가 인식하는 주석  /** 로 시작

/**
 * @param {{
 *     label?: string;
 *     color?: string; 
 * }} props
 */
function MyComponent6(props){
    return <button style={{color:props.color}}>{props.label}</button> 
}
export default MyComponent6