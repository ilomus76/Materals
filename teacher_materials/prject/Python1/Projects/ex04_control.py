#제어문 : 프로그램의 진행 순서를 제어하는 문법
#조건문, 반복문, +기타제어문

#1. 조건문 if, if-else, if-elif
#1) if
age= 15
if(age<20):
    print('미성년자 입니다. 시청지도가 필요합니다.')

print("여기는 if문과는 상관없는 실행문입니다.")

# 조건 영역의 실행문이 여러줄이어도 됨
age=15
if(age<20):
    print('미성년. 시청지도가 필요합니다.')
    print('다른 컨텐츠를 시청하세요.')    
print('넷플릭스 입니다.') #이건 IF문과 상관없는 실행문.
print()
#----------

#2) if-else
age= 15
if(age>=20):
    print("환영합니다. 문 나이트 입니다.")
    print("신나게 즐기세요~~")

    #영역안에 출력기능만 사용가능한 것은 아님..모든 코드 작성 가능함
    n=10
    n+=20 #n=n+20
    print('n:', n)
else:
    print("꺼져!!")
    print("좀 커서 와~~~")
print()
#-------------------------------

#2-1) if문의 중첩사용
age= 15

if(age<20):
    print('꺼져!')

    if(age>=18):
        print("뒷문으로....")
else:
    print('성인이시네요. 환영합니다.')

    gender= 'female'
    if(gender=='female'):
        print('할인해줍니다')
    else:
        print('정가 그대로 ㅜㅜ')
    
    print("필요한거 있으면 '찬호박'을 찾아주세요.")

print("지금까지 문나이트 였습니다.")
print()
#-----------------------

#3) if-elif 
score= 45
if( score>=90 ):
    print('A학점')
    print("아주 우수합니다.")
elif(score>=80):
    print('B학점')
    print("우수합니다.")
elif(score>=70):
    print('C학점')
    print("준수합니다.")
elif(score>=60):
    print('D학점')
    print("분발합시다.")
else:
    print('F학점')
    print('거 너무한거 아녀!!!')
print()
#----------------------------------------------

#4) 조건이 2개 이상인 경우 [ and, or, not : 논리연산자 활용 ]

#4.1) and : 점수 90이상이고 결석이 1개 이하일때만 A+ 부여
score= 95
absent_days= 3 #결석한 일수
if(score>=90 and absent_days<=1):
    print("A+학점입니다. 최우수 성적입니다.")
else:
    print("최우수 성적은 될 수 없습니다.")
print()

#4.2) or: 이벤트 당첨조건 - 리뷰를 작성했을때.. 특정단어('좋아요')가 있거나 또는 최소 20글자 이상 작성한 리뷰
#review= input('리뷰 입력:')
review= '오늘 신발이 도착했습니다.'
review= '오늘 신발이 도착했습니다.좋아요'
review= '오늘 신발이 도착했습니다. 이거 편하네요. 그리고 빨리 도착했어요. 만족해요.'
if( '좋아요' in review  or  len(review)>=20 ):
    print('이벤트 당첨~~!!')
else:
    print('탈락!! 원하는 단어가 없거나 글자가 너무 짧아요. ㅜㅜ')
print()

#4.3) not : 나이가 성인이 아니면.... 이라는 조건문구를 그대로 표현
age=15
if(not age>=20):
    print('미성년')
else:
    print('성인')
print()
#-------------

#5) 조건식이 크다/작다 만 있지는 않겠지요.. 같다 == 도 많이 사용됨..

# 강아지 키우는 게임
print("@ 강아지 키우기 @")
print("---------------")
print("1. 밥먹기")
print("2. 산책하기")
print("3. 목욕하기")
print("---------------")
#menu= input("메뉴선택:")
menu=1
print()

#메뉴선택에 따른 처리..
if(menu=='1'):
    print('아구아구..맛있다!!')
elif(menu=='2'):
    print('와우~~신난다~~~')
elif(menu=='3'):
    print('으아!! 짜증나!!!')
else:
    print('잘못된 메뉴 번호를 입력했습니다.')
print()
#---------------

#6) 특이한 pass 키워드(예약어) -- 아직 미완성 작업중일때.. 사용
a=150
if(a<100):
    print('aaa')
elif(a<200):
    pass #이건 아무 동작도 하지 않음.. 단지..실행문의 위치에 존재할 뿐..에러 안나도록.
elif(a<300):
    pass
print()

#7) 조건식을 쓸때 소괄호() 생략 가능 (더 많이 사용함)
a=5
if a<10:
    print('AAA')
else:
    print('BBB')
print()
#------------------------------------

#8) 조건에 따라 실행될 실행문이 한줄이라면..조건식과 실행문을 한줄에 써도 됨(코드의 간결 - One line if문)
#8.1) if 한줄로..
age=15
if age>20: print('adult')
print()

#8.2) if-else 한줄로..
#예) 사용자의 숫자가 홀수인지 짝수인지..
#number= int(input('숫자입력:'))
number= 10

#원래방법..
if number%2==0:
    print('even')
else:
    print('odd')

#한줄로 줄이기..[조심. 순서가 이상함-- 조건식의 그림을 연상해야 함...]
print('even') if(number%2==0) else print('odd')
print()

#8.3) if elif 줄이기 - 형식:  실행문A if(조건1) else 실행문B if(조건2) else 실행문C
menu=4
print('Hello') if(menu==1) else print('Nice') if(menu==2) else print('Good') 
print()
#---------------------------------------------

#9) 위 한줄 줄여쓰기의 특이한 사용 용법 [ 삼항 연산자 : Ternary Operator ]
# (다른 언어에서는 ? : 이라는 삼항연산자가 별도로 존재 )

#예) 사용자가 입력한 2개의 숫자 중 큰 값을 max_value 라는 변수에 저장하기
num1= 10
num2= 15

#방법1) 원래 방법
if num1>num2:
    max_value= num1
else:
    max_value= num2

#방법2) 한줄로 줄이기 - 삼항연산자
max_value= num1 if(num1>num2) else num2
print('큰값은:', max_value)

#예2) 조금 더 조건이 많은 경우의 삼항연산자 사용... -- 성적에 따라 학점 산출 프로그램
score= 85
grade= 'A학점' if(score>=90) else 'B학점' if(score>=80) else 'C학점' if(score>=70) else 'D학점' if(score>=60) else 'F학점'
print('당신의 학점은:', grade)
print()
#--------------------------------------

#10) 파이썬은 0과 값이 없는 것을 제외하고는 모두 참True로 인식함.
data=10 #T
data=0  #F
data='hello' #T
data='' #빈 문자열 - F
data=[10,20,30] #다음시간에 배울 리스트!
data=[] #빈 리스트 - F
if(data):
    print('참입니다')
else:
    print('거짓입니다.')
print()

#[사용사례]
# 사용자의 입력이 있는지 확인하기!!
#text= input('글씨를 입력하세요: ')
text=''
if not text:
    print('글씨를 입력하지 않았어요.')
else:
    print('입력한 글씨는:', text)
print()
#----------------

# 조건문에서 변수를 사용할 때 주의할 점....
#[1] 특정 조건일때 만 변수값이 변경되는 상황
aa= 'Hello'
n=15
if n<10:
    aa='nice'

print('aa변수의 값:', aa)
print()

#[2] 특정 조건일때만 만들어지는 변수를 영역 밖에서 사용하는 문제!!!
#kk=None #해결
n= 5
if n<10:
    kk='good'

print('kk의 값:', kk)
print()
#-------------------------------------------------------------


#2. 반복문 while 
a=0
while(a<5):
    print('aaa')
    #조건식에 사용한 변수의 값을 변경하면...조건결과가 달라질 수 있음. 
    #이를 이용하면..반복 횟수를 제어할 수 있음.
    a+=1 #a= a+1
print()

#사례 - 특정 조건을 달성할때 까지 반복작업 수행...[게임의 전투 참여할때 레벨 체크]
level=5
while(level<10):
    print('훈련!! 레벨업!', level)
    level+=2

print('전투 참여!!')
print()

# 반복횟수의 결정은 하나의 코드로 결정되지 않음.
# 1)제어변수의 초기값
# 2)제어 조건
# 3)제어변수의 연산
# 위 3개를 모두 고려하여 결정됨...

# 그럼 "Hello"라는 글씨를 출력하는 실행문을 5번 반복수행하도록 하고 싶다면?..
a=0
while(a<5):
    print('Hello')
    a+=1
print()

a=0
while(a<10):
    print('Hello')
    a+=2
print()

a=5
while(a<10):
    print('Hello')
    a+=1
print()

a=5
while(a>0):
    print('Hello')
    a-=1
print()

# 위 처럼 반복횟수의 결정은 여러방법으로 구현이 가능함..
# Tip. 잘모르겠다면..무조건 초기값은 0.. 조건은 <횟수.. 연산은 +=1
#----------------------------

# 반복문의 실행문영역에 print()만 사용가능한 것은 아님. 모든 코드가 가능함. 키보드 입력도 가능
#예1) 사용자로부터 정수를 5번 입력받으면서 짝/홀 수인지에 대한 판별결과를 출력하기!!
# a=0
# while(a<5):
#     num= int(input('정수 입력:'))
#     if num%2==0:
#         print("even")
#     else:
#         print("odd")
#     a+=1
# print()

#예2) 사용자로부터 정수를 5번 입력받으면서 그 값들을 모두 더한 누적값(총합)을 출력하기
# total=0
# a=0
# while(a<5):
#     num= int(input('정수 입력:')) 
#     total= total+num #누적 합
#     a+=1

# print("입력된 값의 총 합:", total)
# print("입력된 값의 평균 :", total/5)

# [참고로] 문자열의 결합 + 를 이용하여... 문자열을 누적하는 형태도 가능함
ss= ""
ss= ss + "aaa"
ss= ss + "bbb"
ss += "ccc"
print(ss)
print()
#-----------------------------------

# [다른 사례] 반복에 사용하는 제어변수의 값을 이용할 수도 있음.
n=1
while(n<10):
    #print(3, "x", n, "=", 3*n)
    print("{} x {} = {}".format(3,n,3*n))
    n+=1 
print()

# [다른 사례] 조건식에 사용하는 값을 변수가 가진 값으로 지정하는 것도 가능
# 사용자가 입력한 숫자만큼 반복하도록...
# num=int(input('반복횟수:'))
# a=0
# while(a<num):
#     print("nice")
#     a+=1
# print()
#-----------------------------

# while의 조건식을 감싼 소괄호() 생략 가능 -- 대부분 생략
a=0
while a<10:
    print("good")
    a+=2
print()
#------------------------------------

#3. for - in 문 -- 특정 횟수를 반복할때 while 보다 더 간결함
# 소괄호를 사용하면 에러
for n in [10,20,30,40,50,80,5,13]: #[]리스트 안에 있는 요소(값)들을 한번에 하나씩 뽑아서 n변수에 넣어주면 반복
    print(n)
print()

# 리스트[]의 값을 일일이 나열하기 짜증..그래서 파이썬에 내장된 기능(함수)중에 차례대로 숫자를 만들어주는 range()함수 이용!
for n in range(10): # [0~9] #10개의 숫자를 만들어줌. 무조건 0부터..
    print(n)
print()

for n in range(5,10): #5~9 
    print(n)
print()

#2씩 증가하고 싶다면..
for n in range(0,10,2): #start, end전, 간격(step) 0~9까지 2씩...
    print(n)
print()

#반복할 때 숫자가 작아지게 하고 싶다면... 
for n in range(10, 0, -1): #10부터 0전까지...1씩 감소
    print(n)
print()

for n in range(10, 0, -3): #10부터 0전까지...3씩 감소
    print(n)
print()

# 5단 구구단 출력
dan=5
for n in range(1,10):
    print(f"{dan} x {n} = {dan*n}")
print()

# 5단 구구단을 역순으로 출력해보기
dan=5
for n in range(9, 0, -1):
    print(f"{dan} x {n} = {dan*n}")
print()

# 'Hello'라는 글씨를 5번 출력
for n in range(5): #0~4
    print('Hello')
print()

#k= int(input())
k=3
for n in range(k):
    print('Hello')
print()
#-------------------------------

#[응용] 글자수만큼 반복하면서 'GOOD'출력해보기
word='PYTHON '
for n in range(len(word)):
    print("GOOD")
print()

#[별외.] 사실 문자열데이터는 한문자 데이터가 연속으로 배열된...리스트와 같음
#for 문을 사용할때.. 리스트 자리에..문자열데이터가 있어도 됨
s=''
for n in word:        
    print(n)
    s+= (n+"_")

print(s)
print()
#------------------------

# 중첩 반복문..
# 특정작업을 5번씩 3세트 수행..
for a in range(3):
    print('세트:', a)

    for b in range(5):
        print('푸시업:', b+1)
    print()
print()

#중첩 반복문을 이용하여 2단~9단까지 모두 출력하기
for dan in range(2,10): #2~9
    for i in range(1,10): #1~9
        print(dan, "x", i, "=", dan*i)
    print()
print()
#------------------------

#4. 기타 제어문 - break, continue [반복문을 제어하기 위한 제어문 키워드]
for n in range(1,11):
    #특정 조건이 되었을때.. 반복문을 멈추고 싶다면..
    if n==5:
        break

    print("n:", n)
print()

for n in range(1,11):
    #특정 조건이 되었을때.. 반복문을 멈추고 싶다면..
    if n==5:
        continue

    print("n:", n)    
print()

#[활용 예1] 무한루프를 멈추는 곳에 활용가능
n=0
while True:
    print("afternoon")

    n+=1
    if(n==10):
        break
print()

# [활용2] 사용자로부터 점수를 계속 입력받아...총합을 구하는 프로그램..(단, 입력에 -1이 들어오면 종료)
# total=0
# while True:
#     num= int(input('숫자 입력:'))
#     if num==-1:
#         break
#     total= total+num

# print('입력된 값들의 총합:', total)

# [활용3] 특정 문자가 입력될때까지 계속 글씨 입력받기
while True:
    word= input('>>>')
    if word.lower()=='exit':
        break

    print('입력된 단어:', word)
print()
#-------------------------------------------

# while, for 중 어느것을 사용할 것인가?
# for : 반복횟수의 예측이 명확할때
# while : 특정조건이 될때까지 반복할때.. 반복횟수 예측 X ...

# 반복문은 대량의 데이터를 다룰때 많이 사용됨.
# 파이썬의 리스트, 튜플, 딕셔너리 에서 활용됨...(다음 수업)

# 수행내역...

# 조건문 chapter3 수업 완료 [ ~p.185 ] 읽어보기~
# 반복문 chapter4 는 리스트와 딕셔너리를 할께 소개하고 있어서..읽을 때..예습하듯이 가볍게..읽기. 이해못해도 됨.
# 반복문 처리 학습은 chapter 4-3 수업 완료 [ p.230~p.246 ] 읽어보기~

# 수행과제
# 1. chapter3 & chapter4-3 [직접 해보는 손 코딩] 따라 코딩해보기
# 2. chapter3 & chapter4-3 [마무리][도전과제] 수행
# 3. 교사PC 공유폴더 [Q4 제어문 과제.pdf] ..










    





        




