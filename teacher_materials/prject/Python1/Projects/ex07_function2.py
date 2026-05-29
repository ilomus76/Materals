# 주요 표준 내장 함수 ( Built-in Functions )
# 표준 함수는 Python 프로그램 작성 시 가장 기본적이고 필수적인 기능을 제공 

# 가장 많이 사용되는 16개정도 소개..

#1. print() : 데이터를 화면에 출력기능
#2. input() : 사용자로부터 키보드 입력을 받을 수 있는 기능
#3. type()  : 데이터(객체)의 자료형을 리턴해주는 기능

#4. len() : 문자열, 리스트 등의 길이나 요소의 개수를 리턴해주는 기능
message= 'Hello Python'
print( len(message)  )

aaa= [10,20,30]
print( len(aaa) ) #3
aaa.append(40)
print( len(aaa) ) #4

#5. sum(): 반복 가능한 객체(대량의 데이터-list,tuple,dictionary)의 모든 요소 합을 리턴해주는 기능
total= sum(aaa)
print(total)

#6. min(), max() : 반복가능한 데이터나 여러개의 인자(전달값)들 중 최소값, 최대값을 리턴해주는 기능
bbb= [10,72,54,3,180,42,1500]
print( min(bbb) )
print( max(bbb) )

#7. abs() : 절대값을 리턴해주는 기능
num= 100
print( abs(num) )
num= -100
print( abs(num) )

#8. range() : 지정된 범위의 숫자 시퀀스(순서대로)를 생성해주는 기능
aa= range(5) #0~4
print(aa) #range 라는 객체(범위값을 만들어주는 녀석)가 출력됨
for a in aa:
    print(a)

#9. list() : 리스트를 새로 생성하거나. 다른 반복가능한iterable 객체(대량의 데이터)를 리스트형태로 변환해주는 기능
# 빈 리스트를 생성
my_list= list()
print(my_list)

# iterable 객체를 리스트로 변환 : 문자열, 튜플, 딕셔너리, 집합 등을 리스트로 ....
aa= list("hello")
print(aa) #['h', 'e', 'l', 'l', 'o']

bb= list((1,2,3))
print(bb)

cc= list({'a':10, 'b':20})
print(cc) #키만 리스트로 만들어서 리턴해줌

dd= list({100,200,300})
print(dd) #set은 순서대로 저장되지 않음..

# 리스트의 연산자 +, *
ee= [10,20,30] + [40,50,60]
print(ee)
print(len(ee))

ee= [10]*5 #요소값을 반복적으로 추가해 줌
print(ee)

ee= [100,200,300] * 5
print(ee)

ee= [1]*20 + [0]*7 #1의 20개..이어서...0이 7개..
print(ee)
#------------------------------

#10. map() : 반복 가능한 객체의 각 요소에 특정 함수를 적용한 결과를 리턴해줌
aaa= [10,20,30,40]
bbb= map( lambda n:n*10 , aaa )
print(bbb) # 곧바로 리스트로 결과를 주지않고.. map객체가 만들어짐
print(list(bbb)) #리스트로 형변환

#11. filter() : map()처럼 각 요소마다 특정 함수(특정 조건을 결정하는)를 적용한 결과를 리턴해줌
scores= [70,80,40,35,95,72]
# 60점 이상만 뽑아내기...
pass_scores= filter( lambda n:n>=60 , scores )
print(pass_scores)
print(list(pass_scores))

#12. sorted() : 반복 가능한 객체의 정렬된 새 리스트를 리턴해주는 기능 - 원본은 정렬안됨
aaa= [10,5,4,8,80,40]
#aaa.sort() 원본 변경
bbb= sorted(aaa) #원본 aaa는 그대로.. 정렬된 새로운 bbb리스트가 만들어짐
print(aaa)
print(bbb)

#13. enumerate() : 반복 가능한 자료형(리스트,튜플,딕셔너리)에 인덱스 번호를 포함하는 튜플로 리턴해주는 기능
aaa= [10,20,30]
for v in aaa:
    print(v)
print()

for idx, v in enumerate(aaa):
    print(idx, v)


#14. zip(): 여러개의 반복 가능한 객체들을 병렬로 묶어 튜플의 반복자로 리턴해주는 기능
names= ['sam', 'robin', 'hong']
ages= [20,25,30]
people= zip(names, ages)
print(people) #zip 객체를 출력..
#리스트로 만들거나..또는..반복문으로 묶여진 튜플들을 하나씩 사용 가능
for p in people:
    print(p)

#15. int(), float(), str(), bool(), tuple(), dict(), set() 등의 형변환 기능

#16. any(), all() : any()는 하나라도 참이면 True리턴, all()은 모두 참이어야 True

#예)요소들 중에서 특정 조건에 해당하는 것이 하나라도 있다면....
scores=[4,8,7,6,3,7,9]
# 특정 점수를 달성하지 못한 값이 하나라도 있나??
if any( n<5 for n in scores ):
    print('5점을 달성하지 못한 점수가 존재함!!!')

if all( n<5 for n in scores ):
    print('모두 5점을 달성하지 못했어요..')
else:
    print('일부는 5점 이상을 달성했어요..')
print("="*30)
print()
#--------------------------------------------------------


# 표준함수 중에서 데이터분석 이나 ML 작업에서 많이 활용되는 [파일 입출력(처리)] 소개
# 프로그램이 종료되어도 보관하고 싶은 데이터가 있다면 Disk에 별도의 파일로 저장해야 함.

# 파이썬의 표준함수 중 파일 입출력(저장/읽기) 기능을 아주 쉽게 함수로 제공함

#1) 파일에 문자열데이터를 저장(파일에 데이터 쓰는 행위)해보기
file= open("aaa.txt","w") #mode : 'w:write', 'r:read', 'a:append'
file.write('This is python programming..한글도 되나?')
file.close()
#------------------

#2) 파일 데이터 읽어오기
file= open("aaa.txt","r") #mode: read
#파일을 열때.. 인코딩 방식을 지정할 수 있음.
#file= open("aaa.txt","r", encoding='UTF-8') #mode: read

#데이터를 읽어오는 기능...을 호출하면.. 읽어온 값을 리턴해 줌
contents= file.read()
print('읽어온 데이터:', contents)
file.close()
#-----------------

#3) 파일 이어쓰기 모드 append mode
file= open('bbb.txt', "a")
file.write('aaa')
file.write('bbb')
file.write('ccc')
file.close()
#--------------------

# 줄바꿈을 하고 싶다면.. 데이터를 쓸때(write) 줄바꿈문자('\n')도 같이 써야함.
file= open('ccc.txt',"a")
file.write('apple\n')
file.write('banana\n')
file.write('orange\n')
file.close()
#----------------------

# 인코딩 방식에 대한 확인
file= open('long story.txt',"r", encoding='UTF-16')
contents= file.read()
print(contents)
file.close()

# encoding [ default : ANSI(미국 표준협회에서 만든 표준안. 한국어 windows os에서는 ANSI가 CP949로 지정됨. 영어권에서는 ANSI..유럽은 Windows-1252) ]
# 1. UTF-8 : 유니코드 문자 인코딩 방식 중 하나. 가장 널리 사용되는 인코딩
# 2. UTF-16 : 유니코드 문자 인코딩 방식 중 하나. 기본문자는 16비트, 그 이상의 문자는 32비트로 인코딩 됨.
# 3. EUC-KR : 한글 완성형 인코딩, 8비트 문자 인코딩
# 4. CP949 : EUC-KR의 확장 버전.. 
# ------------------------------------------

# append mode 에서 대한 추가 실습
# 사용자로부터 한줄 리뷰를 계속 입력받아 파일에 저장. 단, 'quit'를 입력하면 종료하도록..
file= open('ddd.txt',"a", encoding='UTF-8')
while True:
    message= input('리뷰입력:')
    if message=='quit' or message=='그만':
        print('입력을 종료합니다.')
        break

    file.write(message+"\n")
file.close()
#------------------------------------

#4) 파일 저장 경로(위치) 지정해보기
file= open('Projects/files/aaa.txt', "w") #쓰기모드는 파일이 없으면 생성함..하지만. 폴더가 없으면 에러! 그래서 미리 폴더를 만들어 놓거나.. 파이썬코드로 폴더를 생성해야함(다음 수업에 배울 모듈개념이 필요함.. 지금 안함)
file.write('nice to meet you')
file.close()

# 상위폴더 위치 지정하는 상대경로 ../
file= open('../aaa.txt',"w")
file.write('have a good day.')
file.close()

# 절대경로 지정해보기(권장 안함.. 이유? 개발자PC기준이 아니라..사용자 PC기준이기에.예측 어려움)
file= open('c:/Users/mbca/aaa.txt', "w")
file.write('this is good')
file.close()
#--------------------------------------

#5) 여러줄의 문자열도 한번에 파일에 저장할 수 있음.
file= open('eee.txt','w',encoding='UTF-8')
data='''
안녕하세요.
여러줄의 데이터를 한번에 쓰기.
연습해 봅니다.
this is multi line.
'''
file.write(data)
file.close()
#------------------------------

#6) 리스트의 데이터들을 파일에 저장하는 것을 한번에 해주는 writelines()
names= ['sam','robin','hong']
file= open('fff.txt','w')
file.writelines(names) #이름에 속지 말아요.. 여러개의 데이터를 줄바꿈해주지 않아요..
file.close()
#-----
# [해결] 리스트의 요소마다 \n을 추가
names= ['sam\n','robin\n','hong\n']
#만약 요소 개수가 100개면... \n 추가하는 것 짜증..
#실무에서도 데이터마다 \n이 있을리가 없음...
names= ['sam','robin','hong']
# 배열의 각 요소마다 \n 을 추가해주는 기능함수를 만들어..연결(mapping)해주기
names= map( lambda s:s+'\n', names)
file= open('ggg.txt','w')
file.writelines(names) #이름에 속지 말아요.. 여러개의 데이터를 줄바꿈해주지 않아요..
file.close()
#--------------------------

#7) File 입출력 작업을 안전하게 마치기 위해 close()를 호출해야 하지만 실수로 누락할 여지가 있어서..이를 자동으로 처리해주는 with 키워드 영역
with open('hhh.txt','w') as file:
    file.write('good day')
#영역을 벗어나면 자동 close()
#또 다른 장점: 들여쓰기로 인해.. 파일작업에 관련된 코드들의 구별이 쉬워짐.
#실무에서 선호하는 방식.. 거의 대부분 이 방식으로 코딩함.

#8) 파일 데이터를 읽어올때도 당연히 with와 함께.. 좀 긴글은 읽을때..너무 많이 읽어져서 파악이 용이하지 않을 수 있음. 
# 보통 좀 긴들을 읽어들여 처리할때는 한번에 모두 읽지 않고.. 한줄씩 읽어오는 방식을 선호함
with open('short story.txt','r',encoding='UTF-8') as file:
    #1]한줄 읽기
    # line= file.readline()
    # print('한줄 문자열:', line)

    #2]반복문으로 여러줄(10줄) 읽기
    # for i in range(10):
    #     line= file.readline()
    #     print(i,":",line)

    #3]한줄씩 리스트의 요소로 읽어오기
    # lines= file.readlines() #리턴: 리스트
    # print(len(lines))
    # print(lines)

    #4] file 객체는 반복이 가능한 자료형(iterable)이기에 이 반복자를 이용하여 한줄씩 출력이 쉽게 가능함
    for line in file: #파일에서 한줄씩..반복처리..
        print(line)
print("="*30)
print()
#-------------------------------------------

# 데이터분석을 하려면 데이터셋 파일들을 읽어와야 하는데..이 파일들이 보통 엑셀형태처럼 표구조가 많음.
# 이 엑셀파일을 직접 읽어들이는 기능은..표준함수 open()으로 는 불가능 [셀구조를 이해할 수 없음.]
# 만약 읽고 싶다면.. 엑셀에서 셀구조를 제외한 데이터만 쏙 뽑아서 일반 텍스트파일로 만들어야 함. 이 기능은 다행이..엑셀프로그램에 있어요..
# 각 셀 데이터를 구분하기 위해 콤마로 구분된 형식을 사용하는 .CSV 파일형식의 데이터를 많이 사용함

#9) CSV 파일데이터를 한줄씩 읽어오기
with open('member.csv',"r", encoding='CP949') as file: # or 'UTF-8'
    for line in file:
        #print('한줄 데이터:', line)
        
        #일반적으로..한줄 데이터 'sam,20,seoul'에서 원하는 칸의 값만 뽑아야 하는 경우가 많음
        #콤마, 로 구분된 한줄 데이터를 값별도 분리하기.작업 수행(이 행위를 csv파일을 분석한다고 부름. 영어로 parsing 한다고 부름) 
        name, age, address= line.split(',') 
        print(name, age, address)

        #주의할점. 파일에서 읽어들인 값을 그 생김새와 상관없이 무조건 문자열데이터임
        print(type(name), type(age), type(address))

        #그래서 age값에 1을 더하고 싶다면..형변환해서 더해야 함..
        #주의. 데이터셋의 첫줄에 칸이름(column명)이 써있음 '이름,나이,주소' 이건 데이터가 아님..그래서 그냥 int()로 변환하려하면 에러발생!

        # int()로 바꿀 수 있는 모양새 인지 확인한 후 변환시도..
        if age.strip().isdigit(): #isdigit() : 문자열이 숫자로만 이루어 졌는지 여부
            age_int= int(age)
            print(age_int + 1)

print("="*30)
print()
# 실무에서 가장 많이 하는 행위중에 하나가 CSV 데이터셋에서 원하는 데이터를 추출하여 분석하는 것임.. 이를 대략적으로 경험해본 것임.

# -------

#10) mode에 추가된 것들 : +키워드가 붙어 있음. [write()와 read() 둘다 가능]
#1] 기존 파일을 제거하고 새로 쓰기 (파일이 없으면 생성)
with open('example.txt','w+') as file:
    file.write('new data....')
    #파일커서를 첫번째 위치로..
    file.seek(0)
    print(file.read())

#2] 기존 파일을 내용을 유지하면서 파일 끝에 새로운 데이터 추가 (파일이 없으면 생성)
with open('example.txt','a+') as file:
    file.write('new data....')
    #파일커서를 첫번째 위치로..
    file.seek(0)
    print(file.read())

#3] 기존 파일 열고.. 수정할 수 있음.커서의 위치가 처음 (파일이 없으면 에러!)
with open('example.txt','r+') as file:
    file.write('덮어!')
    #파일커서를 첫번째 위치로..
    file.seek(0)
    print(file.read())


# 수행내역

# chapter 5 완료 [~p.351] 읽어보기~~ [학습에 소개되지 않은 내용도 일부 존재함. 제너레이터, 스택,힙 같은 내용 소개되어 있음..이건 차후에 수업예정..가볍게 읽어보기]
# 유용한 예제가 많아요.. 모두 시도..
# 그중 p.332에 데이터분석과정과 유사한 예제 있음..[키,몸무게 데이터를 기반으록 BMI 분석 (정상체중,과체중,저체중 분류..)]

# 과제
#1. chapter5 [직접 해보는 손코딩]
#2. chapter5 [마무리][도전과제] 수행
#----------------------------------------------

# 파이썬교과 마지막날까지..제출할 과제 풀기.. 시간 날때 수행하면 됨..다음주 목요일 5시 50분까지..제출







