# class(클래스) 와 object(객체)

# class가 필요한 이유 소개.. -- 서로 연관있는 변수끼리 묶어서 관리 (리스트, 딕셔너리와는 다르게 메소드(함수)를 가지고있고 재사용이 가능함)
# 문법보다는 왜 이런 고민들이 필요했는지..이해하면서 학습하는 것이 중요!!

# 예) 학생들의 성적을 관리하는 서비스(솔루션) 개발

# 학생의 [이름,국어,영어,수학,평균] 데이터 저장
#1) 값을 저장해야 하니 변수 필요 - 변수는 값 1개씩만 저장이 가능함
name= 'sam'
kor= 80
eng= 70
math= 90
aver= 80.0

#값 출력
print(name, kor, eng, math, aver)
print()

# 2번째 학생이 있다면? .. 이 값들도 저장
#name= 'robin' # 이렇게 기존 변수에 저장하면 첫번째 학생의 데이터가 없어짐.
name2= 'robin'
kor2= 50
eng2= 40
math2= 60
aver2= (kor2+eng2+math2)/3
print(name2, kor2, eng2, math2, aver2)
print()

# 이런식 3번째 학생데이터를 저장...4,5.6,,, 이런식으로 변수들을 여러개 만드는 것 짜증
#2) 여러데이터를 묶어서 관리하는 리스트, 튜플, 딕셔너리 사용하여 해결해보기
# 리스트 써보기..
aaa= ['sam', 80, 70, 90, 80.0]
bbb= ['robin', 50, 40, 60, (50+40+60)/3]
print(aaa)
print(bbb) 
print()

# 학생성적 분석을 위해 두 학생의 국어성적만 출력해보려면??
print('학생 1 국어:', aaa[1])
print('학생 2 국어:', bbb[1])
print()
# '국영수'가 아니라..과목이 10개 정도 있으면.. 7번과목이 뭘까??
# 즉, index 번호를 이용하여 과목을 식별하는 것은 가독성도 떨어지고 기억도 안나서 불편함.

#3) 인덱스 번호 대신 식별자(key)로 요소를 구별하는 Dictionary 를 활용하면 더 구별이 용이
aaa= {'name':'sam', 'kor':80, 'eng':70, 'math':90}
#평균은 따로 계산..
aaa['aver']= (aaa['kor']+aaa['eng']+aaa['math'])/3
#수학 과목의 값 확인
print('수학 성적:', aaa['math'])
print()

# 2번째 학생 데이터 저장...
#bbb= {'name':'robin', 'kor':60, 'ena..a.R$#RE'} #짜증.!!!!! 식별자 또 쓰기 자장..
# 딕셔너리는 가독성은 개선되지만..
# 매 학생마나 같은 구조임에도..같은 식별자를 계속 써야 함....

# 똑같은 모양의 변수들을 dict 처럼 묶어서 필요할때 마다 묶음변수로 만들어주는 문법이 있다면.
# 훨씬 편하지 않을까요??
#---------------------------------------------------------------------

# 똑같은 모양의 설계하고 그 설계대로 제품을 만들어서 사용하는 문법이 파이썬에서 제공됨
# 이를 class(묶음 설계도)와 object(객체.. 설계도대로 만들어진 제품)  라고 부름.

# class : 연관있는 데이터(변수)와 기능(함수)을 묶어놓은 설계도
# object : class설계도를 기반으로 실제 메모리에 만들어진 제품

# --즉, 제품을 만들어야 기능을 사용하듯이 class를 객체로 만들어야 기능사용 가능

#4) 학생의 [이름, 국어, 영어, 수학, 평균] 변수를 하나의 그룹(class)으로 묶는다고 설계.. 파이썬에게 이렇게 묶을 거라고 알려주는 설계도 만들기
#[1] 클래스 설계해보기 -- 클래스의 이름은 그 묶음을 대표하는 명사형 영단어. 가급적 파스칼표기법 권장.
class Student:
    # Student 설계도로 객체를 만들때(생성할때) 초기화를 위해 자동으로 실행되는 아주 특별한 함수..(생성자 함수. __init__() 함수 이름이 이미 정해져 있음.)
    # 파이썬에서 class 안에 작성하는 모든 함수는 무조건 첫번째 파라미터로 self 를 지정해야 함.
    def __init__(self):
        print('Student 객체가 생성되었습니다.')
        #[3] 멤버변수 만들기 -- 일반 변수와 다르게 이 class의 소속이라는 것을 명시적으로 표시해야 만 함. self(생성자의 파라미터 변수)키워드 사용해야 하고.. class안에서 멤버변수를 사용할때는 무조건 써야 함.
        self.name= 'sam'
        self.kor= 80
        self.eng= 70
        self.math= 90
        self.aver= (self.kor + self.eng + self.math)/3

    #[5]멤버변수를 출력해주는 기능(function 함수) 설계
    def show(self):
        print('이름:', self.name)
        print('국어:', self.kor)
        print('영어:', self.eng)
        print('수학:', self.math)
        print('평균:', self.aver)
        print()
    
    #[6] 멤버변수의 값들을 파라미터로 받아서 대입해주는 기능 정의하기(만들기)
    # self는 전달받는 파라미터가 아닌..필수 파라미터.
    def set_members(self, name, kor, eng, math):
        self.name= name
        self.kor= kor
        self.eng= eng
        self.math= math
        self.aver= round( (kor+eng+math)/3 , 2 ) #소수점 2자리에서 반올림

#--클래스 설계 완료--------------------

# 클래스를 만들었다고 그 안에 코드가 실행되지 않음. 

#[2] Student 설계도를 기반으로 객체를 생성해보기 .. 생성문법: 클래스명()
Student() # 위 설계도의 __init__()초기화 함수(생성자 함수)가 자동 실행됨

# 같은 설계도로 필요할 또 객체를 생성할 수 있음.
Student()

# 이 객체의 멤버변수들을 사용해보기
#print( 위 Student객체의 name 멤버변수 사용  )
# Student를 객체로 만들때 이름을 주지 않으니..두 객체을 식별하여 부를 방법이 없음.

# 객체를 변수에 저장하고.. 이 변수명을 이용하여 객체를 제어하는 기법을 사용함.
stu= Student()
# 이 객체를 저장한 stu 변수명을 이용하여 객체안에 있는 멤버변수들을 제어할 수 있음.
print( stu.name  )
print( stu.kor )
print( stu.eng )
print( stu.math )
print( stu.aver )
print( stu ) # dict와 다르게 값이 아니라 객체가 있는 메모리의 주소가 출력됨
# 객체는 사이즈가 커서 stu 변수안에 저장되지 않음.
# 실제 객체는 Heap 메모리영역에 만들어지고.. 
# 이 만들어진 위치(메모리 주소(16진수 0x00001B4D823892398))를 stu변수가 저장하고 있음
# stu변수 이 주소값을 이용하여 실제 객체안에 있는 멤버변수에 접근하는 것임
# 그래서 stu변수가 객체를 참조하여 제어하는 모습이어서..
# 객체를 저장하는 변수는 '참조변수 reference variable'라고 부름

# 두 번째 학생 필요.. 변수를 일일이 만들필요 없이.. 객체 1개만 생성하면 됨
stu2= Student()
print(stu2.name)
print(stu2.kor)
# 이렇게 출력하니.. 모든 객체의 멤버변수값이..모두 ..'sam', 80, ....
# 그래서 두번째 학생의 멤버변수(데이터)를 변경
stu2.name= 'robin'
stu2.kor= 90
stu2.eng= 90
stu2.math= 95
stu2.aver= (stu2.kor + stu2.eng + stu2.math)/3

# 멤버변수값 확인해보기
print( stu2.name )
print( stu2.kor )
print( stu2.eng )
print( stu2.math )
print( round(stu2.aver, 2) )
print()

# 이렇게 stu.xxx() 라는 형태로 코드가 작성되어 내가 접근하는 데이터가 어떤 학생의 값인지 쉽게 읽어짐.
# 정리할겸 .. 3번째 학생 ('park', 70, 60, 80) 의 데이터를 저장하고 출력해 볼까요?

stu3= Student()
stu3.name= 'park'
stu3.kor= 70
stu3.eng= 60
stu3.math= 80
stu3.aver= (stu3.kor + stu3.eng + stu3.math)/3

# 출력
print('이름:', stu3.name)
print('국어:', stu3.kor)
print()
# 위 처럼 멤버변수를 일일이 출력하는 것 짜증!!!!
# class를 설계할때..가만보니..변수 말고..함수도 같이 설계하면??
# stu3.출력해() 이런 기능이 있다면..
#-----------------------------------

# Student 설계도면(class)에 멤버변수를 출력하는 기능(function 함수)를 추가해보기..
#[5] 객체가 보유한 출력기능 사용하기
stu.show()
stu2.show()
stu3.show()
# 참고로. 객체 안에 있는 함수와 일반 함수를 구별하여 부르기 위해.. 객체안의 함수를 '메소드method or 멤버함수'라고 부름
# --------------------

#[6] 4번째 학생을 만들어서 데이터를 저장하고 출력해보기..
stu4= Student()
stu4.name= 'hong'
stu4.kor= 80
#stu4.en# 이거 짜증..
stu4.show()
# 가만버니.. 출력기능도 만들수 있었으니..
# 저장할 값들을 한번에 각 변수에 잘 대입해주는 기능도...만들 수 있겄네??
#stu4.입력해줘('hong', 80, 70, 60)
# Student class설계도면에 입력기능 추가하기!!!

stu5= Student()
stu5.set_members('kim', 70, 75, 70)
stu5.show()

stu6= Student()
stu6.set_members('lee', 60, 50, 40)
stu6.show()
#---------------------

# 가만보니..언제나..객체생성 후.. 값을 대입하는 기능함수를 호출해야 함..
# 즉, 2줄로 써야함..
# 변수도 만들면서 값을 대입할 수 있었으니..
# 객체로 생성하면서 값을 주면 되지 않을까??
# 가만보니.. 객체생성할때.. 클래스명() <-- 소괄호가 있네.. 
# 이 소괄호는 파라미터..전달 가능한데....
# 가만보니.. 객체를 생성할때 자동으로 __init__() 이 생성자 함수라는 것이 발동했음..
# 이 생성자함수도 함수니..파라미터 줄수 있지 않나??
# 당연하죠!!!

# 그래서 초기화함수(생성자) 의 파라미터에 멤버변수의 초기값을 전달하는 형태 실습
#[7] 회원정보[이름,나이,주소] 저장

# 클래스 설계 및 생성자함수에 값 전달까지..
class Person:
    def __init__(self, name, age, address):
        self.name= name
        self.age= age
        self.address= address
        print('Person 객체를 생성했습니다.')
    
    def show(self):
        print('이름:', self.name)
        print('나이:', self.age)
        print('주소:', self.address)
        print()
#-----------------------------------------

#객체 생성
p1= Person('sam', 20, 'seoul')
p1.show()

p2= Person('robin', 25, 'busan')
p2.show()
print()
#----------------------------------

#8) 리턴값이 있는 멤버함수(메소드)도 만들어 사용가능
# [파이썬, 웹, 인공지능 교과목 점수를 한번에 저장하는 클래스 설계]
class Stu:
    def __init__(self, name='익명', python=0, web=0, ai=0): #파라미터의 default value
        self.name= name
        self.python= python
        self.web= web
        self.ai= ai
    
    def show(self):
        print(self.name, self.python, self.web, self.ai)
        print()
    
    #총점을 계산하여 리턴해주는 기능
    def get_total(self):
        return self.python + self.web + self.ai
#--------------------

# 객체 생성
s1= Stu('sam', 80,70,60)
s2= Stu('robin', 60,50,50)


s1.show()
s2.show()

# 각 학생들의 총점을 출력하고 싶다면??
total1= s1.get_total()
print('첫번째 학생의 총점:', total1)

total2= s2.get_total()
print('두번째 학생의 총점:', total2)

s3= Stu() # 값을 나중에 키보드로 입력받고 싶다면..생성할때 값을 안주어야 하는 경우도 있음.
# 그냥 쓰면 에러.. 만약. 기본값으로 초기화를 하고 싶다면?
s3.show()










