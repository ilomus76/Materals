# [별외] 파이썬에서 사용하는 _(언더스코어) 의 다양한 의미!

#0. 스네이크 표기법의 단어 연결
project_title= '영화 추천 서비스'

#1. 파이썬 인터렉티브 쉘 에서 _ 는 이전 쉘의 리터럴 값 출력을 다시 요청.

#2. for 문을 사용할때 value변수를 특별히 사용하지 않을때..
for v in range(3):
    print('Hello')
print()

for _ in range(3):
    print('Good')
print()

#3. 리스트, 튜플의 요소를 분해하여 변수들에 대입해야 할때.. 중간에 필요없는 값이 있을때
aaa= ('sam', 20, 'seoul')
#name, address= aaa #요소의 개수와 변수의 개수가 맞지 않아..에러!

name, _, address= aaa
print(name, address)
print()

#4. 숫자 데이터를 표기할때.. 자리수 구분을 용이하게...
print(100000000) #바로 읽어지지 않아..
print(1_000_000) #권장
#무조건 3자리일 필요는 없음.
print(1_00_00)
print(1_000000000_000_00)
print()

#5. 언더바의 위치와 개수에 따른 네이밍 관습(컨벤션)
#5.1 뒤에 하나의 언더바 variable_ : 파이썬에 이미 예약된 키워드,표준함수,모듈과 같은 이름의 변수명 사용에 대한 문제를 해결할때 사용
max_= max(10,20,30,40,50)
print(max_)

for_= [n for n in range(3)]
print(for_)
print()

#5.2 앞에 하나의 언더바 _variable : 모듈이나 클래스 내부에서만 사용하는 변수/함수 -- 모듈 추가할때 import * 할때 제외
from modules.mymodule import *
print(title)
#print(_message) #error
print()

#5.3 앞뒤에 두개의 언더바 __variable__ : 내장변수 또는 매직 메소드 혹은 dunder(double under) 메소드 -- 파이썬에서 역할 정해놓은 특별한 식별자들
print(__name__) #직접 실행 : '__main__' ... import로 실행되면 '모듈명'

class Person:
    def __init__(self):
        print('초기화 함수(생성자)')

Person()

#5.4 앞에만 2개 언더바.. 클래스의 멤버를 외부에서 .연산자로 접근 불가능하게...private변수라고 부름
class Member:
    def __init__(self):
        self.name= 'sam'
        self.age= 20
        self.__address='seoul'
    
    def show(self):
        print(self.name, self.age, self.__address) #클래스의 멤버에서는 사용가능

m= Member()
print(m.name)
print(m.age)
#print(m.__address) #error

m.show()
# 멤버변수를 실수로 잘못 건드릴까봐...보호하는 목적..
# 미리 정의해놓은 기능함수를 통해서만 사용이 가능하도록....



