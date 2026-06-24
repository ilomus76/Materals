function show(){
    //alert('show');
    //모듈 js 쪽에서는 html의 dom을 직접 출력하는 기능 불가.
    //document.write('show....');

    //DOM객체를 생성해서 출력해야 함.
    const div= document.createElement('div');
    div.textContent= 'show!!!';
    document.body.appendChild(div);

    //리액트는 이 DOM생성을 알아서 해줌..개발자는 그대로 태그문으로 만들면 됨.
}
//다른 js에서 show 함수를 import하여 사용하게 하려면..export해야 함.
export default show; //이 문서안에서 적어도 1개는 export default 여야 함.

//또 다른 함수 정의
export function output(){
    const div= document.createElement('div');
    div.textContent= 'output~~~~~~~';
    document.body.appendChild(div);
}
//다른 js에서 import 하려면..여기서 export해야만 함.
//export output; //default는 .js모듈안에 1개만 가능.. defalut가 아닌것은 만들면서 export

//변수도 export 가능
export let name= 'sam';
export const age= 20;

