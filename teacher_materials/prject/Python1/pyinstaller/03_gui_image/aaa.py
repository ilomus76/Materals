# pyinstaller 로 실행프로그램 만들때. 미디어파일들이 있는 폴더 위치가
# pyinstaller 만의 특별한 임시폴더로 옮겨져서 만들어짐.
# 그렇기에..폴더 경로에 문제가 생김

# 그 폴더의 위치가 정해진것이 아니어서... 이 폴더들의 위치를 가지고 있는
# 특별한 변수명을 활용해야함.

# pyinstaller가 미디어파일을 저장할 위치를 지정한 경로를 찾는 함수 만들기
import sys
import os
def get_path(user_path):
    try:
        base_path= sys._MEIPASS #MEI : pyinstaller의 원래이름..McMillan Enterprise Installer
    except:
        base_path= os.path.abspath('.')#현재 위치.

    return os.path.join(base_path, user_path)    


from tkinter import *

window= Tk()

img= PhotoImage(file=get_path('resources/image/ms19.png')).subsample(2)
label= Label(window, image=img)
label.pack()

window.mainloop()
