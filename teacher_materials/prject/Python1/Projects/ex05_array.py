# 대량의 데이터를 다루는 배열의 필요성..확인

# 학생 3명 성적데이터 다루기
student1= 70
student2= 80
student3= 60

# 출력하려면.. 각각의 변수명별로 출력해야 함
print(student1)
print(student2)
print(student3)

# 만약, 이런 학생이 20명...100명...1000명이면....
# 변수도 20개...출력도 20번이상....직접 작성하는 것 짜증.!!
# 이 점수들을 한번에 묶어서 저장하면.. 더 편하지 않을까..
students= [70,80,60]
print(students) # 값들을 알아서 출력..
# 값 하나하나를 뽑아서 사용도 가능
print(students[0])
# 반복문으로 여러개의 요소값 출력가능
for e in students:
    print(e)
print()
#------------------------------------

# 대부분의 프로그래밍 언어들은 대량의 데이터를 다루는 문법을 배열 Array 라고 부름
# 파이썬은 Array라는 용어를 사용하지 않음. 대신 List, Tuple, Dictionary 가 존재함

#1. List [] - 값의 변경 및 요소의 추가/삭제 가능
aaa= [10,20,30,40] #용어 : 요소element, 인덱스index
print( aaa ) #리스트의 요소값들을 [] 표시하며.. 출력해 줌
print( type(aaa) ) # <class 'list'>

# 요소값 사용 - 인덱스 번호 사용
print( aaa[0] )
print( aaa[1] )
print( aaa[2] )
print( aaa[3] )
#print( aaa[4] ) #error : list index out of range

# 요소의 개수가 많으면 일일이 출력하기 짜증..
# 반복문을 이용하면... 같은 모양의 출력을 쉽게 처리할 수 있음.
for n in range(4): #0,1,2,3
    print( aaa[n] )
print()

# for문은 기본적으로 여러개의 데이터에서 요소를 뽑아오는 문법이어서..
for e in aaa:
    print(e)
print()

# 각 요소들에 1 출력된 값을 출력해보기
for e in aaa:
    print(e+1)
print()

# 각 요소들의 총합 구하기.. [예) 성적들의 총점. 평균 구하기..]
total= 0
for e in aaa:
    total= total + e

print('total:', total)
print()

# 요소값 변경 -- 요소 1개를 일반변수처럼..
aaa[0]= 100
print(aaa)

# 요소 추가기능 -- append(), insert()
aaa.append(50) # 리스트 기차의 가장 마지막에 요소하나가 새로 추가
print(aaa)

# 원하는 위치에 요소 삽입
aaa.insert(0, 1000) #0번방 위치에 1000을 새로 삽입. 기존 요소들은 옆으로 밀림.
print(aaa)

# 요소 삭제 -- remove(), del, clear()
aaa.remove(100) #100이라는 값을 가진 요소를 제거!
print(aaa)

del aaa[2]  # 2번방 요소를 제거
print(aaa)

aaa.clear() # 모든 요소 삭제
print(aaa)

# 요소의 개수를 알려주는 기능함수 len()
print("요소개수:", len(aaa))

# 요소들의 자료형은 서로 달라도 됨
aaa= [10, 3.14, False, "sam"]
print(aaa)

for e in aaa:
    print(e)
print("------------------------")
print()

# 리스트의 여러가지 유용한 기능(function함수)들...소개

#1) 요소의 순서를 뒤집기 - 원본이 변경됨 .. 게시글 리스트를 최신글 순으로 보여줄때 활용
aaa.reverse()
print(aaa)

#2) 요소 정렬
aaa= [4,15,7,2,16,4,10]
aaa.sort()
print(aaa)

#3) 요소 중 특정 값의 인덱스 번호(위치) 얻어오기
print( aaa.index(7) )

#4) in 연산자로 특정요소가 있는지 여부(T/F) 알수 있음.
print( 7 in aaa )
print( 777 in aaa )
print( 777 not in aaa )

#5) 특정값이 리스트안에 몇개 있는지 카운팅
print( aaa.count(4), "개" )

#6) 특정값을 꺼내오기 -- 인덱싱연산자를 이용한 사용과 다른것임!
n= aaa[2] #이건 사용
print(n)
print(aaa)

n= aaa.pop(2) #2번방 요소가 꺼내짐. 즉, 리스트에서 제외됨
print(n)
print(aaa)

#7) 다른 리스트를 내 리스트 뒤에 한방에 추가하는 기능 (리스트의 확장)
aaa= [10,20,30]
bbb= [4,5,6]
aaa.extend(bbb)
print(aaa)

# 리스트의 확장은 매우 많이 사용됨. .extend()기능은 많이 사용 안함. why?
# 리스트도 + 라는 결합연산자가 제공됨
ccc= [700,800,900]
print(aaa + ccc)
print()
#------------------------------

# 2차원 리스트 -- 리스트의 요소가 또 다른 리스트...즉, 리스트 안에 리스트..
aaa= [ [10,20,30,40], ['aa','bb'], [3.14, 5.24, 4.33]  ]
print(aaa)
print(aaa[0])
print(aaa[0][0])
print(aaa[2][1])
print()

# len()의 사이즈를 확인할때.. 조금 주의할 것..
print(len(aaa),"개")
print(len(aaa[0]),"개")
print(len(aaa[1]),"개")
print(len(aaa[2]),"개")

# 중첩 반복문으로 모든 좌석의 값들 출력해보기
for row in aaa: #기차의 한 차량씩...
    for e in row:
        print(e, end='\t')
    print()
print()
#---------

# 리스트를 사용하여 여러데이터를 다루는 예제 2개 소개....
#ex1) 학생 성적들의 총합과 평균
scores= [80,75,64,90,50]
total=0
for score in scores:
    total= total + score

print("총점:", total)
print("평균:", total/len(scores))
print()

#ex2) 일주일의 온도 중에서 가장 더운 날의 온도와 요일은?
week_temperature= [14, 12, 15, 19, 14, 7, 10] #데이터순서:[월,화,수,목,금,토,일]
highest= week_temperature[0]
for temp in week_temperature:
    if temp>highest:
        highest= temp

print('최고온도:', highest)
idx= week_temperature.index(highest) # 가장 높은 온도 19 가 있는 곳의 요소 인덱스 번호
print(idx)

if idx==0:
    print("월요일")
elif idx==1:
    print("화요일")
elif idx==2:
    print("수요일")
elif idx==3:
    print("목요일")
elif idx==4:
    print("금요일")
elif idx==5:
    print("토요일")
elif idx==6:
    print("일요일")
print()

# 위 조건문을 더 쉽게 ...
week= ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"]
print( week[idx] )
print()
#----------------------------------------------------------------


#2. Tuple () - 요소의 값 변경 및 추가/삭제 불가능
bbb= (10,20,30)
print(bbb)
print(type(bbb)) #<class 'tuple'>

# 튜플의 요소값 출력은 리스트와 동일
print(bbb[0])
print(bbb[1])
print(bbb[2])

# 값 변경과 요소 추가/삭제가 불가능
#bbb[0]= 100 #error
#bbb.append(50) #error 

# 특이한 튜플 생성 문법 - 변수수업에 소개했었음.
bbb= 100,200,300 #자동으로 ()소괄호로 묶어줌.. 오토박싱기술
print(bbb)

# 반대로.. 튜플의 요소값들을 분해하여 여러변수에 한방에 대입 가능 [꽤 선호함. 특히. ML]
a,b,c= (100,200,300) #a,b,c 는 기본 정수형 변수들 not tuple
print(a)
print(b)
print(c)
print("-"*20)
print()

# 반복문으로 요소접근하는 것은 당연히 가능
for e in bbb:
    print(e)
print()

# 튜플은 원본데이터를 실수로라도 건드리지 못하도록 할때. 유용하게 활용됨.
#---------------------------------------


#3. Dictionary {} - key:value 쌍으로 요소를 저장 (변경 및 추가/삭제 가능)
ccc= {'name':'sam', 'age':20, 'address':'seoul'}
print(ccc)
print(type(ccc)) #<class 'dict'>

# 요소값 접근은 인덱스번호 대신에...식별자 key 사용
print( ccc['name'] )
print( ccc['age'] )
print( ccc['address'])

# 리스트처럼 요소의 값 변경 및 추가/삭제 모두 가능
ccc['age']= 25
print(ccc)

# 요소 추가.
ccc['email']= 'aaa@gmail.com' #새로운 식별자key로 값 대입..하면 추가됨
print(ccc)

# 요소 제거
del ccc['email']
print(ccc)

# 요소 모두 제거
ccc.clear()
print(ccc)

# in 연산자 활용 - 특정 식별자 key 를 가지고 있는지 확인
ccc= {'name':'sam', 'age':20, 'address':'seoul'}
if 'name' in ccc:
    print('이름:', ccc['name'])

# 존재하지 않는 키로 접근하여 당연히 에러..
#print(ccc['tel']) #error

# 키로 접근할때 에러가 걱정된다면.. 위 처럼 if문으로 쓰거나...
# 안전하게 값을 얻어오는 기능함수를 사용
value= ccc.get('tel') #없는 key를 사용하면 None 값을 줌..에러가 안남
print(value)
value= ccc.get('address') #있는 key를 사용하면 그 값을 줌
print(value)
print()

# 딕셔너리 요소를 반복문으로 접근하기.. 조금 ..신경써야 함.
# 1] 딕셔너리에 for in 반복을 처리하면.. 값이 오지 않고 key값들이 반복됨
for key in ccc:
    print(key) #name, age, address
print()
# 반복되는 key 값을 이용하여 값을 접근
for key in ccc:
    print(key,":",ccc[key])
print()

# 2] key와 요소값을 한번에 (튜플로) 얻어와서 반복
items= ccc.items()
print(items) #[('name', 'sam'), ('age', 20), ('address', 'seoul')]

for item in items:
    print(item[0],"-",item[1])
print()

# 위 item은 튜플이기에..일반변수들로 분해하여 변수에 넣을 수 있음.
for key,value in items:
    print(key,"~",value)
print()
print("~"*20)
print()

# 별외. 리스트의 요소에 또 다른 리스트, 튜플, 딕셔너리
ddd= [ [10,20,30], (4,5,6), {'id':'aaaa', 'password':'1234'} ]
print(ddd)
print(ddd[0])
print(ddd[0][2])
# 'password' 출력해보기
print(ddd[2]['password']) #'1234'
print("==================================")
print()


#[추가!!] 리스트를 만드는 특별한 문법 [ 리스트 내포 list comprehensions ]
#반복문으로 리스트의 요소를 만들어야 할때.. 간결하게 한줄로 줄여서 쓰는 문법 - 데이터 분석에 많이 사용

#1] 기존 방식대로 반복문으로 리스트 생성
aaaa= [] #빈 리스트
for n in range(1,10): #1~9
    aaaa.append(n)
print(aaaa) #생성된 리스트 출력

#2] 리스트 내포 문법으로 간략화...
bbbb= [ n for n in range(1,10) ]
print(bbbb)

# 위 리스트 내포 표현식을 다소 응용하면.. 2~10까지의 짝수의 제곱값들..로 리스트 생성
cccc= [ n**2 for n in range(2,11,2) ]
print(cccc)

# 리스트 컴프리헨션 기능은 요소값을 필터기능도 구현 가능함
# 원래 리스트에서 특정 조건의 요소만 뽑아서 새로운 리스트 생성 [데이터분석에 매우 많이 필요]
scores= [70,80,95,42,68,73,57,84]

#60점 미만을 걸러내고 새로운 리스트 생성
pass_scores= [ score for score in scores if score>=60 ]
print(pass_scores)

# (응용) 사용자 입력 숫자만큼 리스트의 요소를 만들기. 단, 요소의 초기값은 0
# n= int(input('개수:'))
# eee= [ 0 for n in range(n) ]
# print(eee)
print()

# 컴프리헨션 문법이 좀 지저분해서 ... 별도의 조건없이 간단하게 순서대로 있는 값들로 만든다면..
ggg= list(range(5))
print(ggg) 

hhh= list(range(2,11,2))
print(hhh)
print("="*30)
print()
#------------------------------------

# 리스트로 데이터를 다루면 좋은 점.... 대량의 데이터를 다루은 파이썬언어에 내장된 함수(기능)의 사용이 가능해 짐.

# 리시트,튜플,딕셔너리등과 관련된 파이썬의 내장함수(기능)들

#1] 리시트의 요소들 중에 최소, 최대, 총합 구해주는 파이썬 내장함수
numbers= [48, 107, 51, 6, 786, 1024]
print('최소값:', min(numbers) )
print('최대값:', max(numbers) )
print('총합:', sum(numbers) )
print()

# min, max 는 리스트가 아니어도 값을 여러개 주면 최소/최대값을 구해줌
print( min(51,75,42,108,53) )
print( max(51,75,42,108,53) )
#print( sum(51,75,42,108,53) ) error
print()

#2) 요소들의 순서를 반대로 뒤집기.. [reversed() ... 원본은 불변]
#numbers.reverse() #원본이 변경됨
aaaa= reversed(numbers)
print(aaaa) #뒤집어진 객체 --아직 리스트아님
#리스트로 형변환 하면...
print( list(aaaa) )
#원본은 그대로..
print(numbers)
print()

#3] 리스트를 반복문으로 접근할때 인덱스 번호도 같이 표시하고 싶다면? 이를 해주는 기능함수 
mmm= ['sam', 'robiin', 'hong']
for idx, value in enumerate(mmm):
    print(idx, ":", value)
print("~~~~~~~~~")
print()
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


#4. Set : 집합 {} -- 서로 다른 데이터를 묶어서 관리하는 문법 [p.515~518]
# 중복된 데이터의 저장을 허용하지 않은..중복데이터는 무시됨

# 딕셔너리처럼 {}중괄호를 사용하지만.. key식별자를 사용하지 않고.. 값만 나열함
ddd= {'sam','robin','park','sam', 'hong'} #중복된 'sam'
print(ddd) # 순서대로 저장되어 있지 않음.
print(type(ddd)) #<class 'set'>

# 순서가 없기에 인덱스번호라는 개념도 없음..
#print(ddd[0]) #error

# for in 문법을 사용하면.. 요소별로 접근은 가능함
for e in ddd:
    print(e)
print()

#[활용사례] 리스트에서 중복된 요소를 제거할때.. 사용가능
aaa= [10,50,70,80,90,10,50,40,30]
bbb= { e for e in aaa  } # set {}에 값들이 나열됨..자연스럽게 중복이 제거됨
print(bbb) #단, 순서는 바뀔 수 있음.
print()

# 수학에서 배웠던..'집합'의 주요 연산자가 제공됨
# 합집합 : |  또는  .union()
aaa={1,2,3,4}
bbb={3,4,5,6}
print( aaa | bbb )  # 합집합 연산 A U B
print( aaa.union(bbb) )  #{1,2,3,4,5,6}
# 교집합 : &  또는  .intersection()
# 차집합 : -  또는  .difference()

# set에 대한 내용은 여기서 수업종료.. 대신 책이나 검색을 통해 추가내용 확인가능
# 과제 중 이를 사용하는 문제가 한개 있음.. 
# 배우지 않은 내용을 해결하는 연습 해보기..검색아니 AI활용

# 수행내역
# chapter4 에 List와 Dictionary가 소개되어 있음.. 모두 읽기 [~p.271]
# p.271페이지는 꼭! 읽어보세요.. 동기부여..

# 
# 과제
# 1. chapter4 [직접 해보는 손 코딩] 따라 해보기
# 2. [마무리][도전과제] 수행
# 3. [Q5 배열.pdf] 과제 풀이 - 학습하지 않은 내용이 있다면..검색을 통해 해결..

# 튜플은 5.3장에 소개됨. p.316


    

