# 상속 - inheritance -- 이미 설계된 다른 클래스를 상속받아 새로운 멤버만 추가하는 문법

# 문법보다는.. 대략적으로 상속을 받는 다는 것을 알아보는 예제

#1. 게임 캐릭터 종류 : Robot, FlyRobot, SwimmingRobot
# Robot         : 이동기능, 공격기능
# FlyRobot      : 이동기능, 공격기능, +나는기능
# SwimmingRobot : 이동기능, 공격기능, +수영기능

# 캐릭터마다 보유한 기능이 다르기에 각각 class 설계도를 만들어야 함.
class Robot:
    #이동 기능
    def move(self):
        print('아장아장..')
    
    #공격 기능
    def attack(self):
        print('주먹발사!!')

#로봇 객체 생성
r= Robot()
r.move()
r.attack()
print()

# 공중유닛 [Robot + 나는기능]
class FlyRobot(Robot):
    #로봇이라면 가져야할 기본기능(이동,공격)을 다시 작성하려니..짜증
    #저 위 Robot class 설계도면에 이미 이동과 공격기능이 있으니..
    #이를 상속받아 새로운 기능만 추가하면 더 빠르게 설계가 가능..

    #새로운 기능(나는 기능)
    def fly(self):
        print('오~~ 난다~~')

# 공중유닛 로봇 객체 생성
fr= FlyRobot()
fr.move()
fr.attack()
fr.fly()
print()

# 해상유닛 [ Robot + 수영기능 ]
class SwimmingRobot(Robot):
    #이미 move(), attack()보유한 상태
    def swimming(self):
        print('음~파! 음~파!')

sr= SwimmingRobot()
sr.move()
sr.attack()
sr.swimming()
print('-'*30)
print()
#---------------------------------------------------------


#2. 상속 문법에 대해 조금 더 알아보기 
# First 클래스 <- Second 클래스 <- Third 클래스

class First:
    #초기화함수(생성자)를 만들어 멤버변수 a 만들기
    def __init__(self):
        self.a= 10
        print('First class constructor!')
    
    #멤버함수(메소드) 정의
    def show(self):
        print('a:', self.a)
#---------------

# First 클래스를 상속하는 Second 클래스 설계해보기
class Second(First):
    # 이 클래스도 초기화함수(생성자)를 만들어 새로운 멤버변수를 추가할 수 있음.
    def __init__(self):
        #파이썬언어에서는 자식클래스의 생성자를 명시적으로 사용할때는
        #반드시 부모클래스의 생성자를 명시적으로 호출해야만 상속이 됨.
        #상속해주는 클래스를 보통 [부모parent 클래스 or 슈퍼super 클래스] 라고 부름
        #상속받는 클래스를 보통 [자식child 클래스 or 서비sub 클래스] 라고 부름

        #부모의 생성자를 명시적으로 호출하기!!
        super().__init__() #가급적 부모생성자 호출코드를 첫줄에 작성하는 것을 권장.!

        #본인만의 멤버 추가
        self.b= 20
        print('Second class constructor!!')
    
    # 상속받은 First의 show()출력기능함수의 기능을 재정의하여 개선...override
    def show(self):
        #print('a:', self.a)
        #a변수는 First 클래스의 멤버이며.. 이 값을 출력하는 기능은
        #이미 First 부모클래스의 show()로 만들어져 있고.. 이를 상속해왔기에..
        super().show() #부모것은 부모가 출력
        print('b:', self.b) #내것은 내가 출력


#Second 객체 생성
s= Second() # 상속은 부모클래스의 멤버만 쪽 뽑아오는 것이 아니라.. 자식객체를 생성할때 그 안에 부모객체로 생성하여 사용하는 문법(마치. 러시안 인형처럼..) .. Second객체만 생성해도 First 객체의 생성자 함수가 실행되는 것을 확인할 수 있음.
# 상속을 받으면 부모객체의 멤버를 내것인양 쓸 수 있도록 해주는 것임
print(s.a) #부모의 멤버를 내것인양
print(s.b) #자식만의 고유 멤버
print()

# 멤버변수의 값을 직접 출력하는 것 짜증..
# 멤버변수의 값을 출력해주는 기능함수를 이용
# 가만보니. 상속받은 First 클래스에 show()라는 출력기능함수가 존재함.
# s.show() 
# 위 기능은 a변수만 출력해줌...
# 즉, 상속받은 기능함수가 있지만..그 기능함수의 동작이 맘에 안들 수도 있음.
# 상속받은 기능함수가 맘에 들지 않을때 이를 재정의 하여 기능을 개선하도록 함
# 이를 함수의 오버라이드 override 라고 부름
# 재정의를 하면...
s.show() # 재정의된 Second의 show()가 발동함.

# Second를 상속하는 Third 클래스 만들어보기..[조부모-부모-자식]
class Third(Second):
    def __init__(self):
        super().__init__()
        print('Third class constructor!!!')
        self.c= 30
#----------------------
t= Third()
print(t.a, t.b, t.c)
print("-"*30)
print()
#========================================================


# [상속 마무리 예제]
# 어떤 대학앱의 회원데이터 저장 [회원종류 여러개]
# 일반회원 : 이름, 나이
# 학   생 : 이름, 나이, 전공
# 교   수 : 이름, 나이, 연구과제
# 근로학생 : 이름, 나이, 전공, 업무

#1] 일반회원
class Person:
    def __init__(self, name, age):
        self.name= name
        self.age= age
        print('Person 객체 생성')
    
    def show(self):
        print('이름:', self.name)
        print('나이:', self.age)
#----------------

p= Person('sam', 20)
p.show()
print()

#2] 학생 회원
class Student(Person):
    def __init__(self, name, age, major):
        super().__init__(name, age) #부모의 멤버는 부모가 초기화..
        self.major= major #내건 내가..
        print('Student 객체 생성')
    
    #상속받은 show()는 [이름,나이]만 출력함. 그래서 기능 개선 override 재정의
    def show(self):
        super().show() #부모의 값들은 부모의 출력기능으로...
        print('전공:', self.major)
#----------------------

stu= Student('robin', 23, 'ai web')
stu.show()
print()

#3] 교수회원
class Professor(Person):
    def __init__(self, name, age, subject):
        super().__init__(name, age)
        self.subject= subject
        print('Professor 객체 생성')
    
    def show(self):
        super().show()
        print('연구과제:', self.subject)
#--------------------

pro= Professor('park', 45, 'ai data analysis')
pro.show()
print()


#4] 근로학생
class AlbaStudent(Student):
    def __init__(self, name, age, major, task):
        super().__init__(name, age, major)
        self.task= task
        print('AlbaStudent 객체 생성')
    
    def show(self):
        super().show()
        print('업무', self.task)
#------------------------

alba= AlbaStudent('hong', 25, 'data', 'pc management')
alba.show()
print()
#-----------------------------------------------------------

# 모든 책의 내용 끝!!!





    



