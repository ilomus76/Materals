//움직임이 있는 요소를 만들어주는 framer-motion 라이브러리로 UX 향상
//npm install framer-motion

//motion기능을 사용하기 위해 import
import {motion, useAnimationControls} from 'framer-motion'

import ms19 from './assets/ms19.png'

import './BottomSheet.css'

function Home(){

    //애니메이션의 컨트롤러를 만들어주는 HOOK기술(useXXX()함수)
    const controls= useAnimationControls()

    return (
        <div>
            <h2>frame motion 라이브러리</h2>

            {/* 1) 애니메이션이 가능한 div요소를 사용 */}
            <motion.div 
                initial={{x:10, y:5}} //애니메이션의 시작위치(원래놓여질 위치를 기준으로 배치됨)
                animate={{x:100, y:50}} //움직일 곳의 좌표
                transition={{duration:3, repeat:Infinity}} //3초동안 이동
            >나는 움직이는 div 입니다</motion.div>
            <hr />

            {/* 2) 버튼클릭하면 특정 위치로 이동 */}
            <button onClick={()=>controls.start('right')}>right</button>
            <button onClick={()=>controls.start('up')}>up</button>
            <button onClick={()=>controls.start('down')}>down</button>
            <motion.div
                style={{padding:8, boxShadow:'3px 3px 10px gray', width:150}}
                //애니메이션으로 움질일 곳들의 위치를 지정(무조건 원래위치 기준임.)
                variants={{
                    right:{x:100},
                    up:{y:-50},
                    down:{y:50}
                }}
                //애니메이션을 실행하는 컨트롤러 등록 -- HOOK기술로 컨트롤러 적용
                animate={controls}
            >나는 DIV 입니다.</motion.div>
            <hr />

            {/* 3) 드래그 하기 */}
            <motion.img 
                src={ms19} 
                style={{height:100, border:'solid', margin:'16px auto', display:'block'}}
                drag='x' //both: true
                dragConstraints={{left:-100, right:100}} //현재위치부터 좌우 드래그범위 제한
                dragElastic={0.3} //제한범위 바운더리에서 움직임 허용치
                onClick={()=>controls.start('open')}
            ></motion.img>
            <hr />

            {/* 4) 요즘 가장많이 보이는 UX-- Bottom Sheet */}
            <button onClick={()=>controls.start('open')}>open bottom sheet</button>
            <button onClick={()=>controls.start('close')}>close bottom sheet</button>

            {/* bottomsheet 요소 만들기 */}
            <motion.div 
                className='BottomSheet'
                variants={{
                    close:{y:'50%'}, //원래 위치에서 버텀시트의 절반사이즈 만큼 내리기
                    open:{y:0} //원래 위치
                }}                
                animate={controls}
                initial='close' //초기상태는 닫힌 상태
                drag='y'
                dragConstraints={{top:0}}
            >
                <div className='title'>
                    <h2>BOTTOM SHEET TITLE</h2>
                </div>
                <div className='content'>
                    <p>요즘 많이 보이는 버텀시트 요소입니다.</p>
                    <img src={ms19} style={{width:'200px'}}></img>
                </div>
            </motion.div>

        </div>
    )
}
export default Home