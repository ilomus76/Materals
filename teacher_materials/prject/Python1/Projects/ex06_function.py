# 함수(function 기능) : 특정 기능을 수행하는 코드를 모아놓은 코드영역
#예) 로그인함수(=로그인기능 코드들), 회원가입함수(=회원가입기능 코드들), max함수(=최대값을 구해주는 기능 코드들), ..

# 특정기능을 작성한 코드 영역만들고.. 필요할때 마다 호출call하여 코드가 실행되도록...

# 파이썬 함수의 종류
#1. 표준(내장)함수 : 이미 파이썬에서 만들어서 내장해 놓은 함수들 print(), input(), len(), ...
#2. 외부 함수: 기존 개발자 또는 업체에서 만들어 라이브러리형태로 제공하는 함수. 사용하려면 import 키워드로 불러서 사용(다음 module 수업에서 소개)
#3. 개발자 정의 함수 (오늘 학습할 내용)

# 코드가 써있는 영역을 구분하기 위해 보통 기능의 이름을 영어로 작성(변수이름 명명규칙과 같음. 스네이크 표기법사용. 단. 보통 변수는 명사형단어, 함수는 동사영단어 권장)
# 이름(식별자)옆에 소괄호()가 반드시 있어야 함. 이를 통해 변수명과 구별이 가능함
# age <-- 변수
# login()  <-- 함수

# 파이썬은 영역을 구분할때 들여쓰기를 통해 소속을 구분함. 다른 언어들은 {}중괄호 이용

#1. 함수 정의 문법 def [define]
def show():
    print('show function')
    #이 영역안에 여러줄의 코드가 있어도 됨
    print('aaa')

# 함수를 만들었다고 실행되지 않음. 특정 기능을 사용하겠다고 호출해야만 함수영역의 코드가 실행됨
#1.1 함수 호출
show()
#1.2 여러번 호출하는 것이 가능
show()
print("Hello")
show()
print()
# ------------------------

# 함수의 출력문이 매번 같은 글씨가 출력됨..
# 내가 전달할 값을 출력해주는 기능(function 함수)를 만들어보기..

#2. 함수에 값을 전달(파라미터 이용)
def show_name(name): #파라미터==매개변수 (전달된 값을 받는 변수)
    print('welcome!', name)

#함수를 호출하면서 파라미터에 값을 전달
show_name('sam')
show_name('robin')
print()

# 매개변수는 2개 이상일 수도 있음
def output( a, b ):
    print('a:', a)
    print('b:', b)

output(10, 20)
#output(100) #값 하나만 전달하면?? error
#output(100,200,300) #error

# 결국, 파라미터의 개수만큼 반드시 값을 전달해야만 함. 안하면 에러..
# 근데. 경우에 따라서는 값 전달하지 않으면 기본값을 보여주고 싶을 수도 있음.
# 함수의 파라미터에 기본값(default value)를 지정해 놓을 수 있음.

#3. 함수 파라미터의 default value 지정
def display(a=1,b=2):
    print("a:", a)
    print("b:", b)

display(100,200)
display(1000) #b값은 기본값으로 지정
display()
display(b=2000) #파라미터를 선택하여 값 전달 가능
print()

# 근데.. 기능을 만들다 보면 전달값이 몇개일지 미리 특정하기 어려운 경우도 있음. [예. 전달받은 모든 값을 출력.. 또는 모든 값들의 총합..또는 값들 중 최대값을 구하든지..]
#해결방법1) 리스트로 값들을 전달 받기
def cal_total(number_list):
    print('전달받은 값들의 총합은:', sum(number_list) )

cal_total([10,20])
cal_total([10,20,30,40])
cal_total([10,20,30,40,50,60])
#이 함수는 반드시 리스트로 묶어서 값들을 전달해야만 함...
#cal_total(100,200,300) #error
print()

#4. 가변 파라미터 -- 개수 제한 없이 값 전달... 자동으로 List형태도 받게 됨(단, 값을 전달하는 쪽에서 List를 만드는 것이 아님)
def nice( *values ):
    print("전달받은 값들의 개수:", len(values))
    #개별값을 반복문으로 출력도 가능
    for v in values:
        print(v)

# 값 전달의 개수를 다르게 호출해보기
nice()
nice(10)
nice(10,20)
nice(10,20,30)
nice(10,20,30,40)
print()

# 대표적으로 파이썬에서 제공되는 표준함수 중에서 min(), max() 함수가 가변 파라미터를 사용
m= max(10,20,30)
print(m)

m= max(40,78,46,79,20,13,45)
print(m)
print()
#-------------------------------------

#5. 같은 이름의 함수를 또 정의하면 기존 함수를 덮어 씀
def output(a):
    print("다시만든 output a:", a)

output(100)
#저 위에서 만들었던 파라미터 2개짜리 output함수를 호출하려고 하면..에러!
#output(200,300) error
print()

# 파이썬에서 이미 만들어서 제공하는 표준(내장)함수와 같은 이름의 함수를 정의하면..표준함수는 사용불가
def max():
    print('내가 만든 max() 함수')

max()
#max(10,20,30) #최대값 구해주는 표준함수 사용하면 에러

#변수 이름을 정할때도 가끔 실수로 표준함수명을 써서 문제가 되는 경우도 있음. 조심해야 함
min= 1000 #표준함수 min()를 변수명으로 덮어버림
print(min)

#min(100,200,300) #표준함수 min()이 발동되지 않음..에러 발생
print()

#그래서 변수명을 정할때 의심되면.. _value 와 같은 접미사를 붙이는 것이 좋음. min_value, max_value, sum_val, len_num ....
#---------------

# 함수를 정의하는 코드 보다 호출하는 코드를 먼저 쓰면? 에러..
#ggg() #error
def ggg():
    print("ggg function")
#------------------------------------------------------------


#6. 리턴을 하는 함수 -- 함수 안에서 print()로 출력하는 것이 아니고.. 실행(연산)결과를 함수를 호출하는 쪽으로 되돌려 주는 문법 return
def aaa():
    return 100

num= aaa()
print(num)

num2= aaa()
print(num2)

#당연히 리턴값은 정수외에 어떤 자료형이든 가능함
def bbb():
    return 'hello'

s= bbb()
print(s)

# input(), max(), min() 표준함수들이 모두..리턴을 해주는 함수였음..
# score= input()
# m= max()
# min_value= min()

# 매번 같은 값을 리턴받으면 별도 쓰임이 없으니..
# 의미를 가진 기능으로 만들기위해..
# 예) 전달받은 값 2개를 더하여 결과를 리턴(반환)하는 기능 만들어 보기..
def add(x,y):
    return x+y
    # z= x+y
    # return z

num= add(3,5)
print(num)

num= add(30,50)
print(num)
print()

#함수를 쓰는 활용 예) 두 정수를 전달받아 두수의 차를 계산하여 그 값을 리턴해주는 기능(단, 음수가 나오지 않도록..)
def subtract(x,y):
    if(x>y):
        return x-y
    else:
        return y-x

num= subtract(3,5)
print(num)

num= subtract(5,3)
print(num)
print()

#6.1 함수안에서 return 키워드를 만나면 함수의 실행은 멈춤. 함수의 작업을 종료한느 목적으로도 활용
def aaa():
    print("aaa function")    
    return #리턴옆에 값이 없어도 됨. 값 없이 돌아감
    print("Hello")

aaa()

#[활용사례] 특정 조건에서 함수 종료하기...
# print(10/0) # 연산불가.. 0나눗셈은 에러!

#두 정수를 받아 나눗셈의 결과를 출력해주는 기능함수 만들기
def divide(a,b):
    if b==0:
        print("0으로 나눗셈은 할 수 없어요.")
        #더 이상 함수 작업을 하지마!!!
        return
            
    print("나눗셈의 결과:", a/b)

divide(10, 2) #OK
divide(10, 0) #조치가 없으면 에러
print()

#6.2 return 값이 없는 함수의 리턴을 받아보면?? None
def bbb():
    print("bbb function")

m= bbb()
print(m) #None
print()

#6.3 return 값은 원래 1개만 가능함.. 근데 여러개가 가능한 것처럼 보임
def ccc():
    print("ccc function!!!")
    return 100,200,300 #사실은 자동으로 ()소괄호로 묶은 Tuple 1개가 리턴됨

# 함수의 리턴이 3개니까 변수도 3개로 차례대로 받을 수 있음.
n1, n2, n3= ccc() # 튜플덩어리의 요소를 분해하여 받을 수 있었음..그 상황임
print(n1)
print(n2)
print(n3)
print()

nnn= ccc() # Tuple 1개 덩어리를 리턴받음
print(nnn)

# 튜플의 요소를 분해할때 변수의 개수가 맞지 않으면 에러..
#n1,n2= ccc() #error

#6.4 return 값 여러개의 자료형이 달라도 상관없음
def ddd():
    return 100, 3.14, True, "Good" #자동 Tuple

v= ddd()
print(v)
print()
#-----------------------------------------------------

#[추가] 전역변수(global variable)와 지역변수(local variable)에 대한 이해
# 함수안에 만든 변수를 지역변수라고 부름

def hhh():
    age=20 # 이곳에서 처음 등장한 변수..첫 생성.. 이 변수를 지역변수라고 부름
    print(age)

hhh()
#print(age) #error - 지역변수를 그 함수 지역 밖에서 사용할 수 없음

name= 'sam' #함수 밖에 있는 변수는 전역변수(이 문서 전체에서 인식 가능한 변수)
def sss():
    print("name:", name)

sss() #호출
print("이름:", name)
print()

#근데... 이 전역변수 사용만 하는 것이 아니라..변경를 시도하면..
#더이상 전역변수가 아닌 새로운 지역변수를 만들어 냄.
def ttt():
    name= 'robin' #값을 변경하는 순간.. name은 새로운 지역변수가 됨
    print("ttt:", name) #robin

ttt()
print("함수 밖:", name)
print()

# 만약. 함수 지역 안에서 전역변수의 값 변경을 시도하고 싶다면... global 키워드 필요
def rrr():
    #print(name) #에러.. global 선언보다 먼저 변수 사용하면 에러...
    global name #이 영역안에서 name은 global(전역)변수를 사용하겠다는 선언(무조건 함수의 첫줄에 있어야 함.즉, 변수 사용보다 먼저 써 있어야 함.)
    name="park" #전역변수로 인식되었으면...
    print("rrr:", name) #park

rrr()
print("함수 밖:", name)
print()
#---------------------------------------------------------

#7. 재귀함수 recursive call - 함수안에서 다른 함수를 호출할 수 있음. 나아가 본인 함수안에서 본인함수를 다시 호출할 수도 있음.
def ggg():
    print("ggg function")

def iii():
    print('this is iii function')
    ggg() #다른 함수를 호출 할 수도 있음
    print('iii function END!!!')

iii()
print()

# 함수안에서 본인을 다시 호출하는 것도 가능함. 이를 재귀호출이라고 부름
def kkk():
    print('I am kkk function')
    kkk() # 이를 재귀호출 .. 무한 반복과 흡사함.. while True: 무한반복과 다르게 일정 반복 후에 에러발생!! 멈춤
#kkk() #error
#리커시브콜을 하면 함수가 계속 만들어져서 메모리 문제 발생함..
#그래서 무한루프처럼 실행되다가 결국 다운됨..에러!!!

# 재귀호출을 올바르게 사용하려면 함수의 호출이 멈추도록 종료가 가능함 형태로 구현해야 함
def ppp(n):
    if(n==0): return
    print('ppp function :', n)
    ppp(n-1)
    print("aaa")

ppp(5)
#---------------------------------------------------------
print()

#8. 람다함수 lambda. 코드 간단한 함수의 정의를 단순하게 한줄로 축약하기!!
#8.1 간단한 함수 
def eee(a):
    return a*10

print( eee(2)  )

#8.2 람다 lambda 함수 
fff= lambda a:a*10 #return 키워드 생략. 그리고 한줄로..
# 특이하게. 함수이름대신..변수에 람다함수를 저장
# 이 변수가 함수의 코드를 가지고 있기에..
# 변수지만...마치 함수의 이름처럼 호출 식별자로 사용할 수 있음.
print( fff(3)  )
print()

# 람다함수는 간단한 함수들 더 간결하게 표현하려는 문법
# 그냥 함수를 만들고 호출할때는 굳이 사용할 필요 없음..

# 람다함수는 어떤 함수의 파라미터로 함수를 전달해야 할때. 사용됨.

# 고차함수 - 함수를 파라미터로 받는 함수

# 함수도 값처럼 변수에 대입하는 것이 가능함!!

a=10
b= a # a가 가진 값을 변수 b에 대입
print(a)
print(b)

#위 와 마찬가지로...
def www():
    print('www function')

ooo= www #함수명 뒤에 소괄호()를 쓰지 않았음!!!!!!@!!!!!!! .. 함수의 코드를 준것임
print(ooo)

#결국 ooo변수는 www함수명처럼 코드를 가지고 있음..
#그렇기에..
www() #함수명 호출... 함수가 가진 코드들이 실행됨...
ooo() #변수명 호출한건데.. 원래 안돼야 하는데...변수가 코드를 가지고 있기에..실행됨

# 이런 특징을 활용하여... 특정 기능의 코드들을 구현함...
# 이를 활용한 표준함수 몇개 소개..
aaaa= [1,2,3,4,5]
def cal_square(num):
    return num*num

# bbb= []
# bbb.append( cal_square(aaa[0]) )
# bbb.append( cal_square(aaa[1]) )
# bbb.append( cal_square(aaa[2]) )
# bbb.append( cal_square(aaa[3]) )
# 위 작업을 쉽게..
# 리스트의 각 요소마다 특정한 함수가 연결되어 실행되도록 해주는 특별한 표준 기능 함수 map()
bbbb= map( cal_square, aaaa )
print(bbbb) #map 되었는다는 표시만 출력됨
print(list(bbbb)) #리스트로 형변환

# cal_square 함수의 코드가 매우 간결하니..별도의 def로 정의하지 말고..
# 바로 map()하면서 람다함수로 정의... 
cccc= map( lambda n:n*n , aaaa )
print(list(cccc))

# 요소마다 적용될 함수의 코드를 조금 수정하는 것도 어렵지 않음.
# 제곱 --> 세제곱
dddd= map( lambda n:n**3, aaaa )
print(list(dddd))
#---------------------------------------------

#[추가] doc string - 함수의 첫줄에 위치하며 함수의 기능이 무엇인지 설명하는 용도의 따옴표3개

# 이름을 전달받아 환영인사를 출력해주는 기능 함수 만들기(정의해보기)
def show_name(name):
    """이 함수에 이름을 전달하면 환영인사를 해줍니다.""" #이를 doc string 이라고 부름
    print(f"{name}님 환영합니다.")

show_name('sam')
show_name('robin')

#-----------------------------
 
# 수행내역..
# chapter 5 ... 파일처리 전까지..( ~p.326 ) 읽어보기~ [내용도 많고.. 시간이 오래걸리는 예제와 과제가 많음]
# 유용한 예제들이 많음..그래서 가급적 모두 주의깊게 읽어보고.. 따라해보세요..

# 과제
#1. chapter5 파일처리 전까지 [직접 해보는 손 코딩] -- 따라 해보기 (오늘은 여기에 집중)
#2. chapter5 파일처리 전까지 [마무리] 수행
#3. [Q6 함수.pdf] 과제 풀기 ~ 중요도가 높지 않음..예제 더 우선시...








    


