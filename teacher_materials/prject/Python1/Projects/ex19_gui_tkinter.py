# python desktop GUI 만들기

# python 표준모듈인 tkinter 사용하기 [표준모듈이기에 별도의 설치 없이 import 만 하면 사용가능]

# Tkinter [ Tk(툴킷) interface ]

from tkinter import *

# 위젯 widget : 화면에 보이는 요소 - 일종의 액자처럼 네모난 박스영역
# 컨테이너 위젯 : Tk, Frame, ....
# 단순 위젯 : Label, Button, Entry, Checkbutton, Canvas, ....

#1] 최상위 윈도우 창 만들기
window= Tk() #객체 생성

#3] 윈도우 창의 제목 설정
window.title('this is python gui')

#4] 창 크기 설정
window.geometry('400x200') #너비x높이 (픽셀단위)
window.geometry('400x200+100+50') #너비x높이+x좌표+y좌표
window.geometry('400x200-100+50') #너비x높이-x좌표+y좌표 (x좌표에 음수면 오른쪽 기준)
window.geometry('400x200-100-50') #너비x높이-x좌표-y좌표 (y좌표에 음수면 바닥쪽 기준)

window.geometry('500x400+150+50')

#5] 창에 글씨 표시하기 (GUI에서는 print()로 출력하지 않음.. 글씨를 보여주는 액자(위젯)를 만들어 배치)
label= Label(window, text='Hello. Python GUI') #객체 생성
label.pack() # 창의 가운데에 배치됨

# 글씨를 하나 더 보여주고 싶다면.. 또 다른 Label객체를 만들어서 배치해야함
label2= Label(window, text='nice to meet you.', fg='blue', bg='yellow')
label2.pack() # 창의 가운데에 배치되며.. 위 라벨의 아래에 놓여짐

# 라벨액자 크기 지정 (RGB 색상)
label3= Label(window, text='안녕하세요.', fg='white', bg="#000000", width=10, height=3) #10글자, 3글자 사이즈
label3.pack()

# 라벨폰트 지정하기
label4= Label(window, text='Have a good day. 반가워요', font='times 24 bold italic') #글꼴 크기 볼드체 이텔릭
label4.pack()
#------------

#6] 버튼 만들어보기
btn= Button(window, text='눌러주세요', padx=20, pady=5) # padx : x축 padding
btn.pack()

# 버튼 눌렀을때 특정 기능(function)이 동작하도록..

# 버튼 클릭시 동작할 코드 영역
def aaa():
    print('clicked!!!!') # vscode의 console 창에 출력되는 글씨!!!

btn2= Button(window, text='click me', command=aaa) #command속성: 버튼클릭시 실행시킬 함수이름을 등록
btn2.pack()

# 버튼 클릭시에.. 라벨위젯이 보여주는 글씨를 변경해보기..
label5= Label(window, text='hello world')
label5.pack()

def bbb():
    label5.config(text='clicked button')

btn3= Button(window, text='change text', command=bbb)
btn3.pack()
#--------------------

#7] 사용자로부터 한줄 텍스트를 입력받는 위젯 widget
entry= Entry(window)
entry.pack()

#버튼 클릭시에 반응할 함수
def ccc():
    #Entry 요소에 써있는 값을 가져오기
    value= entry.get()
    label6.config(text=value)

# 버튼 클릭했을때.. Entry에 써있는 글씨를 Label 요소에 보여주기!!
btn4= Button(window, text='입력완료', command=ccc)
btn4.pack()

label6= Label(window, text='')
label6.pack()

#8] 여러줄 입력받기.. 버튼 클릭시..입력된 글씨들을 경고창(메세지창)으로 보여주기
text= Text(window, width=30, height=3) #너비:30칸, 높이:3줄
text.pack()

# import * 로는 하위모듈까지는 가져오지 않음..그래서 하위모듈은 추가 import 필요
from tkinter import messagebox

def ddd():
    value= text.get('1.0', END) # '1.0' 첫번째줄(1)의 첫번째 칸(0)에서부터 END는 끝 위치까지의 글씨를 읽어오기
    #메세지창을 보여주는 객체가 있음.. 추가 import 필요
    messagebox.showinfo('안내글', value)


btn5= Button(window, text='메세지 읽기', command=ddd)
btn5.pack()



#-------------------------------------------------
#2] 화면에 보여주고 사용자의 이벤트에 반응하도록...
window.mainloop()