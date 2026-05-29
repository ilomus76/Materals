# image widget

from tkinter import *
window= Tk()
#사이즈 지정이 없으면 안에 내용물을 감쌀만큼의 사이즈로 자동 조절됨

# 이미지파일을 불러와서 tkinter에서 사용 [.jpg는 tkinter가 불어오지 못함.]
img= PhotoImage(file='Projects/images/ms18.png').subsample(2)
# 위 이미지를 보여주는 전용 widget은 없음..대신 글씨를 보여주던 액자..Label 이용
label= Label(window, image=img)
label.pack()

# jpg를 보여주고 싶다면... 외부 모듈이 추가로 필요함
# 파이썬의 이미지작업에 특화된 라이브러리 pillow (python image library)
# 외부모듈을 설치필요 ( pip )
# pip install pillow

# 사용
from PIL import Image, ImageTk #tkinter에서 pillow의 이미지를 인식하도록..

# PIL 라이브러리로 이미지 불러오기 [jpg 파일도 가능]
pil_image= Image.open('Projects/images/newyork.jpg')
#사이즈 조정
pil_image= pil_image.resize( (300,250), Image.LANCZOS  ) #사이즈를 튜플로.., 품질옵션
# pillow image를 tikiner용 image로 변환
img2= ImageTk.PhotoImage(image=pil_image)

#이미지 액자에 사진 보여주기
label2= Label(window, image=img2)
label2.pack()

# 버튼 클릭할때 이미지 변경해보기..
# 변경될 이미지를 미리 준비하기
pil_image= Image.open('Projects/images/ms19.png')
pil_image= pil_image.resize( (300,250), Image.LANCZOS )
img3= ImageTk.PhotoImage(image=pil_image)

def eee():
    img= label2.cget('image') # image 속성값 취득
    if img == str(img2):
        label2.configure(image=img3)
    else:
        label2.configure(image=img2)

btn= Button(text='change image', command=eee)
btn.pack()


window.mainloop()