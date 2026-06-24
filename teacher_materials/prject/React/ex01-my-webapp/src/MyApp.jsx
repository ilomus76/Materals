//Component 라는 클래스는 react.js 라는 라이브러리에 설계되어 있음.
//이 파일에서 사용하려면.. import 해야 함.
import {Component} from 'react' //.js는 생략가능

//별도의 css 문서를 연결..
import './MyApp.css'

//src폴더 안에 있는 이미지 파일을 불러와서 변수로 만들기
import paris from './assets/paris.jpg'

//리액트에서 화면의 구성요소가 되려면.. Component라는 클래스를 상속해야 함.
class MyApp extends Component{ //상속을 통해 Component의 능력(멤버들)을 가지게 됨

    //MyApp 컴포넌트가 보여줄 화면을 그리는 기능함수(이름이 정해져 있음)
    render(){
        // 브라우저가 보여줄 글씨를 리턴해주면 표시됨
        //return "Hello My Webapp"

        // 태그문 글씨를 출력해보면? -- 따옴표를 사용하면 그냥 문자열데이터임. 태그문인식 못함 --그냥 글씨로 보임
        //return "<h2>Hello</h2>"

        // 따옴표 없이 태그문<>을 사용하면 React가 알아서 DOM객체로 만들어 화면을 구성함        
        //return <h2>Hello Webapp</h2>
        // 이런식으로 .js 안에.. html태그문을 같은 사용할 수 있도록 만든 언어 : JSX언어 (JS + XML[html])

        // 요소 여러개를 표시해보기 -- return은 하나의 요소만 가능함
        // return <h2>Hello</h2>
        // <p>error....</p>

        // 그래서 여러요소를 감싸는 큰 요소 하나를 먼저 만들고 안에 여러개의 요소를 배치
        // JSX언어의 특징은. js안에 <>태그문을 사용하듯이..
        // <>태그안에서 JS의 변수사용이나 함수호출을 수행할 수도 있음.
        let name= 'sam' 
        let type= 'checkbox' //input 요소의 타입

        //스타일 적용해보기 -- 별도의 .css문서를 만들어 적용

        return (
            // class명 지정할때..속성명 class 대신 className 사용을 권장- why? JS에서 class를 설계도를 만드는 키워드
            <div className='wrap'>
                <h2>Hello React JSX</h2>
                <p>This is paragraph element</p>
                //이거 주석 안됨.                
                <p>Hello name</p>                
                <p>Hello {name}</p>
                {/* xml영역안에서 js를 사용하는 {}를 쓰고 JS의 주석문법으로..주석을 구현 */}
                {/* ctrl+ / 를 누르면 알아서 주석구조가 만들어짐. */}

                <input type="text" />
                {/* 속성값도 JS변수로 설정 가능 */}
                <input type={type} id='' readOnly placeholder=''/>

                {/* JSX언어는 반드시 end tag가 있어야 함. 만약 없애려면 closing tag 사용 */}
                <hr />

                {/* 이미지 보여주기 (별도 수업예정) - 맛보기*/}
                {/* src폴더에서 작업하는 component의 이미지들은 src폴더안에 위치하는 것을 선호함 */}
                {/* 이미지를 사용하려면 import 해야 사용 가능함. */}
                <img src={paris} alt="paris image" />

            </div>
        )

    }    
}//MyApp class..................

//다른 문서(main.jsx)에서 MyApp 를 사용하려면..export 해야 함.
export default MyApp