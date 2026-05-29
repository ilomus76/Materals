# 파이썬의 연산자 종류 : 산술, 비교, 논리, 비트, 복합대입, 형변환

#1. 산술 연산자
a= 10
b= 4

print( a+b )
print( a-b )
print( a*b )
print( a/b )

# 프로그래밍을 하다보면 나눗셈의 몫과 나머지를 별도로 계산해야 하는 경우도 있음.
print( a//b ) #나눗셈의 몫
print( a%b )  #나눗셈의 나머지
#예1) 짝수/홀수 판별할 때 .. 나머지 연산 %를 활용하여 2로 나머지 연산을 했을때 나머지가 0이되면 짝수, 1이면 홀수로 판별 [ number%2 == 0 짝수 ]
#예2) 특정 숫자가 3의 배수인지 판별할 때 .. 나머지 연산 %를 활용하여 3으로 나머지 연산을 했을대 나머지가 0이되면 3의 배수로 판별 [ number%3==0 3의 배수 ]
#예3) 돈(거스름 돈) 계산.. 10,000원을 3명이 나눌 때, 1인당 얼마씩? 몫.. 나머지 얼마? [ 10000//3 1인당 몫~ 3300]
#예4) 페이지 나누기(페이지네이션) : 게시글 53개를 한페이당 10개씩 보여줄려고 한다면.. 페이지는 몇개 필요? 53개를 10개씩 나누면 몫은 5개 페이지.. 나머지는 3개.. 나머지개수가 0이 아니면.. 페이지수 5+1 ==> 6페이지

# 나눗셈 몫, 나머지값을 한번에 계산하여 두값을 모두 반환(리턴)해주는 기능(function-함수) divmod()
x, y= divmod(a,b) 
print('몫:', x)
print('나머지:', y)

# 제곱계산을 해주는 연산자
print( b**2 ) #제곱
print( b**3 ) #세제곱
print( b**(1/2) ) #제곱근

# 부호를 변경해주는 부호연산자 -(단항 연산자)
c= -10
print( -c ) 
print()
#------------------------------------

#2. 비교연산자
a=10
b=4
print( a > b ) #결과가 논리값 True/False -- True
print( a < b ) #F
print( a <= b ) #F
print( a >= b ) #T
print( a == b ) #F
print( a != b ) #T

# 특정 범위를 비교할 때는 여러개의 비교 연산자를 연결하여 활용 가능함[파이썬 언어만의 특징]
print( 0 < a < 100) #T
print( 2 <= a <= 9) #F
print()
#-------

# 2개 이상의 비교연산을 할때...위 처럼 하나의 변수를 가지고 비교하지 않고
# 서로 다른 변수의 조건 2개 이상을 비교할 경우도 있음.
#예) (놀이기구 탈때) 나이가 10살이상이고 키가 150이상인 조건
#예) (로그인 할때) 아이디도 맞고 비밀번호도 맞아야 하는 조건
# 이건 연결연산자로 표현할 수 없음.. 그래서 비교연산을 연결해주는 [논리 연산자]와 함께 사용

#3. 논리 연산자 and, or, not

# 나이가 10살이상이고 키가 150이상인 조건 (두 조건이 모두 만족)
age= 8
height= 145
print( age>=10 and height>=150 )

# 나이가 10살이상 이거나 또는 키가 150이상인 경우 (둘 중에 하나만 만족해도..)
print( age>=10 or height>=150 )

# 미성년자가 아니면...이라는 조건 
age= 25
print( age>=20 ) # 이렇게 작성하면 미성년자가 아니라는 것을 판별할 수 있음.
# 판별은 되지만... 조건 문구(미성년자가 아니면?)와는 다른 형태로 코드가 작성된 것임
# 조건 문구와 같은 형태의 코드를 쓰는 것을 더 가독성이 높다고 생각함
print( not age<20 )
print()
#----------------------------

#4. 비트 연산자 [ 피연산자(숫자)를 2진수로 바꿔서 각 비트자리끼리만 논리연산 수행. and(&), or(|), not(~), xor(^), shift(>>, <<)]
print( 7 & 4 ) #and 비트 연산
print( 8 | 3 ) #or 비트 연산
print( 10 ^ 3 ) # exclusive or 비트연산
print( 8 >> 2 ) # 8을 2진수로 바꿔서 오른쪽으로 2비트 이동
print( 8 << 2 ) # 8을 2진수로 바꿔서 왼쪽으로 2비트 이동
print( ~10 ) #not 비트 연산 -- 0은 1로... 1은 0으로 바꾸기...
print()
#-------------------------------------------------

#5. 복합대입 연산 : 산술연산자와 대입연산자를 같이 사용...
#score= input("점수입력:")
#score= int(score)
score=10

# score 변수의 값을 5점 증가시켜 놓아라..(변경)
score= score+5
print(score)

# 3을 증가시켜라..
score= score+3
print(score)

# 프로그래밍을 하다보면 이렇게 변수의 값을 조금씩 변경해야 하는 경우가 꽤 많음.
# 위 과정을 보면 변수명을 두번씩 작성함.. 이게 은근 짜증
# 변수명을 한번만 작성하면서..위 작업이 되도록 하는 복합대입연산자(산술+대입) 등장!
score += 1
print(score)

score -= 2
print(score)

score *= 3 # score= score*3
print(score)

score /= 5
print(score)

score **= 2
print(score)
print()
#---------------------------

#6. 형변환 연산자(기능함수)
a= '10'
#print( a + 20 ) #error
#숫자모양의 문자열을 숫자로 변환해주는 형변환 기능 사용
print( int(a) + 20 ) #str --> int  

a= '3.14'
print( float(a) + 5.12 ) #str --> float

a = 5
print( a + 3 ) #산술 덧셈 
# 숫자 2개를 문자열처럼 결합하고 싶다면...
print( str(a) + str(3)  ) # '5' + '3' 문자열의 +연산은 산수가 아니라 결합

#bool() : 단순히 "True"를 True라는 논리값으로 바꾸는 것 말고도..
# 값이 있으면 True, 값이 없으면 False 로 변환됨
# 파이썬의 경우 C언어 처럼 0이나 값이 없는 것이 아니면 모두 True.
a= "True"
print( type(a) )  
a= bool(a)
print( type(a) )

a=10
print( bool(a) ) #0이 아니면 모두 True

a=0
print( bool(a) ) # F

a=-5
print( bool(a) ) # T

a=0.0
print( bool(a) ) # F

a='hello'
print( bool(a) ) # T

a='' #빈 문자열 
print( bool(a) ) # F

a=' ' #띄어쓰기도 문자임..그러니 값이 있는 것임
print( bool(a) ) # T

a= None
print( bool(a) ) # F
print()
# -------------------------------

# 연산자를 여러개 연결하여 사용할 때 ... 일반 산수처럼 연산자 우선순위가 존재함
print( 3+5*6 ) #곱셈이 우선..
# 혹시 이 순서를 바꾸고 싶다면? 소괄호 사용
print( (3+5)*6 ) 
# 사실.. 대입연산자와 산술연산자도 우선순위가 있었음.. 대입연산자가 모든 연산자 중에서 가능 우선순위기 낮음
num = 30 + 50 # +를 수행 후 값이 대입되는 것임
print("=======================================")
print()
#---------------------------------------------------------------


# 프로그램에서 사용하는 대부분의 데이터는 문자열인 경우가 많음. [이름, 제목, 메모글, 리뷰, 아이디 ....] 
# 파이썬에서 제공하는 문자열 데이터의 연산자와 기능함수들에 대해서 알아보기...

#1. 문자열 관련 연산자 3개  +  *  []

#1) 결합연산자 +
print( "aa" + "bb" ) # "aabb"

#2) 반복연산자 *
print( "hello" * 3 ) # "hellohellohello"
s= "Good" * 5
print(s)

# 뺄셈. 나눗셈 있을까?? 없음!!
#print( "aa"-"bb" ) error
#print( "aa"/"bb" ) error

#3) 인덱싱 연산자 [] : 문자열 안에서 특정 위치의 문자를 추출
print( "Hello world"[1] ) #1번방의 글씨 하나 추출 (0번부터 시작..)
print( "Hello world"[1:7] ) # 1번부터 ~ 7번 전까지.. (1~6)
print( "Hello world"[1:] )  # 1번부터 ~ 끝까지..
print( "Hello world"[:7] )  # 처음부터 ~ 7번 전까지.. (0~6)
print( "Hello world"[-1] )  # 뒤에서 첫번재.. (가장 마지막방)
print( "Hello world"[-5] )  # 뒤에서 다섯번재.. 'w'
print( "Hello world"[-5:] )  # 뒤에서 다섯번재부터 ~ 끝까지)
print()
#------------------------------------------------------

# 문자열을 다루는 다양한 기능 함수들(function)

# 파이썬에 내장된 기능함수 - 문자열의 글자수를 알려주는(값을 주는-리턴) 함수
s= "Python"
print('글자수:', len(s) ) #length

# 문자열 데이터(값)의 주요기능들(메소드들) -- 9개만 알아보기.. 더 많음.. "".xxx()
#1) .format()
price= 500
print(price,'만원') #무조건 띄어쓰기 됨
#그래서 등장..
print( "{}만원".format(price) )
print( "이름:{}   나이:{}".format('sam', 20) )
#format()기능은 데이터와 서식을 연결한 문자열을 만들어내는 것임.
s= "{}님 환영합니다.".format('홍길동')
print(s)

# format() 에 연결할 데이터의 자료형을 고정할 수 있음. 코드 실수 방지 목적!!
print( "{} {}".format(10,'aaa') )
#print( "{:d} {:d}".format(10,'aaa') ) #:d [decimal : 10진수 정수 숫자]
print( "{:d} {:d}".format(10,20) )
print( "실수:{:f}".format(3.14)  ) #float  <-- 소수점 아래 6칸까지 출력
print( "실수:{:.2f}".format(3.14)  ) # .2f <-- 소수점 아래 2칸만 출력
print( "문자열:{:s}".format('nice') ) # string
print()

# 데이터를 출력할때 칸수를 지정할 수 있음.
# 예) 디지털 시간 표시 ##:##:##
print("{}:{}:{}".format(12,35,45))
print("{}:{}:{}".format(8,5,35))
print("{:2d}:{:2d}:{:2d}".format(8,5,45)) #값과 상관없이 최소 2칸 확보
print("{:02d}:{:02d}:{:02d}".format(8,5,45)) #빈칸을 0으로 채움
print()

# 자료형의 칸수 지정 사례를 조금 더 확장
print( "[{:5d}]".format(100) )
print( "[{:05d}]".format(100) )
print( "[{:010d}]".format(-100) )

# 숫자를 출력할때 무조건 양수/음수 부호가 표시되도록
print( "{:+d}".format(30) )
print( "{:+d}".format(-30) )

# 실수일때.
print( "{:f}".format(3.14) ) #무조건 소수점 아래 6자리까지 출력
print( "{:10f}".format(3.14) ) #무조건 소수점 아래 6자리까지 출력..10자리 확보
# 소수점 아래 표기 개수 지정
print( "{:10.2f}".format(3.123456789) ) #총 10칸... 그중 소수점 아래 2자리까지만
print( "{:10.3f}".format(3.123456789) ) #총 10칸... 그중 소수점 아래 3자리까지만
print( "{:10.5f}".format(3.123456789) ) #총 10칸... 그중 소수점 아래 5자리까지만(반올림 됨)
# 칸수 지정없이 소수점 아래 개수만 지정가능
print( "{:.2f}".format(3.123456789) ) #소수점 아래 2자리까지만
# 정수를 소수점으로 출력할 수 있음.
print( "{:f}".format(10) )

# 천 단위마다 , 찍어주기
print( "{:,}원".format(1588775843658) )
# 참고로.. 코드로 숫자를 쓸때도 3자리씩 끊어서 작성 가능
print( "{:,}원".format(1_588_775_843_658) )

# 진법출력 ( 10진법, 2진법, 8진법, 16진법 )
# 숫자 10을 각각의 진법으로 출력해보기
print( "{:d}".format(10) ) #10진수 - decimal
print( "{:b}".format(10) ) #2진수 - binary
print( "{:o}".format(10) ) #8진수 - octal
print( "{:x}".format(10) ) #16진수 - hexa decimal

# 숫자데이터를 쓸때 진법으로 표현하기
# 각각의 진법을 10진수로 출력해보기
print( "{:d}".format(0o10) ) #8진수
print( "{:d}".format(0x10) ) #16진수(가끔 사용함)
print( "{:d}".format(0b1010) ) #2진수

# 색상정보 RGB 를 입력할때 가끔 16진수 표기법이 활용됨
# title.setColor(0xFF0000) # 'red'
#--------------------------------------------------------
print()

#2) .upper(), .lower() : 대소문자 변환기능
print( "Hello".upper() )
print( "Hello".lower() )

# 문자열을 변수에 저장하면.. 변수명으로도 이 기능을 사용할 수 있음.
word= "Machine"
print( word.upper() )
# 문자열의 대부분의 기능은 원본글씨는 변경하지 않음.
print( word )

#3) .strip() : 문자열 양옆의 공백 제거
print("@@", "     He llo     ", "@@")
print("@@", "     He llo     ".strip(), "@@")

#4) .find() : 특정 문자의 인덱스 번호 위치를 찾아주는 기능
print("Hello world. android. ios. android".find('android')  ) #출력 : 13 [13번 인덱스에 찾고자 하는 문자의 첫글자 존재]
print("Hello world. android. ios. android".find('web')  ) #출력 : -1 [음수가 나오면 못찾은 것임]
# 같은 문자가 여러개 있다면? 앞에 것을 먼저 찾고..이어서 다음 것을 찾아야 함..
# 그래서 특정 위치번호부터 검색하도록 요청할 수 있음.
print("Hello world. android. ios. android".find('android', 13+1)  ) # 14번 위치부터 검색을 시작!! 출력 : 27

#5) .split() : 특정 문자를 기준으로 글씨를 나누어 배열 리스트로 만들어주는 기능함수
csv= "sam,20,seoul"
aaa= csv.split(',') #,를 기준으로 글씨를 분리하여 배열리스트로 만듦 ['sam','20,'seoul']
print(csv)
print(aaa)
print(aaa[0]) #'sam'
print(aaa[1]) #'20'

#6) .replace() : 글자 바꾸기
s= "Hello world. nice world. good world"
print( s.replace('world', 'python')  ) #모든 world 찾아서 python으로 변경
#원본은 변경되지 않음.
print( s )
#대소문자 구분됨
print( s.replace('WORLD', 'python')  ) #매칭되는 글씨가 없으면 그냥 원본 그대로..

#7) in 연산자 -- 특정 단어가 포함되었는지 여부(True/False)
print( "world" in "Hello world" ) #True
print( "worlD" in "Hello world" ) #False - 대소문자 구분함

#8) isXXX() 메소드들...
#8.1] 알파벳으로만 이루어 졌는가?
print( "Hello".isalpha() ) #True
print( "Hello1234".isalpha() ) #False
print( "안녕하세요".isalpha() ) #True

#8.2] 숫자로만 이루어 졌는가? (아라비아 숫자 + 윗첨자 + 로마자 [numeric])
print( "1234".isnumeric()  ) #True
print( "aaaa".isnumeric()  ) #False
print( "4²".isnumeric()  ) #True
print( "Ⅲ".isnumeric()  ) #True

#8.3] 아라비아 숫자만 허용
print( "1234".isdecimal()  ) #True
print( "aaaa".isdecimal()  ) #False
print( "4²".isdecimal()  ) #False
print( "Ⅲ".isdecimal()  ) #False

#8.4] 아라비아와 윗첨자까지 허용
print( "1234".isdigit()  ) #True
print( "aaaa".isdigit()  ) #False
print( "4²".isdigit()  ) #True
print( "Ⅲ".isdigit()  ) #False

#8.5] 알파벳과 숫자로만 이루어 졌는가?
print( "123Hello".isalnum() ) #True
print( "123Hello!!".isalnum() ) #False
print( "123Hello  ".isalnum() ) #Flase

#8.6] 모두 소문자 인가?
print( "hello world".islower() ) #T
print( "Hello World".islower() ) #F
print()
#-------------------------------------------------------

#9) count() 메소드(함수) - 문자열 안에 특정 단어가 몇개인지 알려주는 기능
message = "EDA(Exploratory Data Analysis) : 탐색적 데이터 분석. data를 다양한 각도에서 관찰하고 이해하는 첫번째 단계. 시각화와 통계적 기법을 사용하여 Data 를 분석합니다."
# 위 메세지 데이터에 data 라는 단어가 몇번 등장하는 지 확인
print( message.count('data') ) #개수 : 1
# 대소문자 구분없이 data의 개수를 찾고 싶다면.? 위 기능함수를 응용
print( message.lower().count('data')  ) #개수 : 3

# 문자열데이터를 다루는 여러 기능함수를 살펴보았음.
# 위 9개 말고도 더 많이 있지만...나머지는 필요할때 학습...

# -------------------------------------------------------

# chapter 2까지 모두 완료... 모두 읽기..[~p.153]

# 수행과제
# 1. [직접 해보는 손 코딩] 예제 따라 코딩하기
# 2. [마무리][도전과제] 수행하기
# 3. 교사PC 공유폴더 [Q3 연산자 및 문자열기능함수 과제.pdf] 수행 ! 3개파트 중 앞 2개까지가 목표.. 3번째파트는 시간이 남으면 시도.





