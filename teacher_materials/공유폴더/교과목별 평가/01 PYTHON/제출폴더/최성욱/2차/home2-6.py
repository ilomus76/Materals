# Title 
#import os 
#import sys




print('@'*100)
print('\t 성적 통계 프로그램')
print('@'*100)

# cSV 파일 Open
# stream definition 

# open 은 표준 함수 
#file = open('Question/Homework/scores.csv','r') 
file = open('Question/Homework/scores.csv','r',encoding='UTF-8') 
#file = open('Question/Homework/scores.csv','r',encoding='ANSI') 

# 아래의 구문은 인코딩 방식이 UTF-8 유니코드인지, ANSI인지에 따라 영향 받음.
# 내 PC에서는 UTF-8일 경우 성공, ANSI에서는 동작 안됨. 

# print('file structure :', file)

data=file.read()
#파일 내용을 처음부터 끝까지 전부 읽어버립니다.
#그래서 파일 포인터(cursor)가 이미 파일의 맨 끝(EOF)에 가 있게 됩니다.

# print('read_data type :',type(data))   #  <class 'str'> : 읽은 문자가 문자열 타입임 , 처음부터 끝까지 읽었음.
# print('read data :',data)
# print()

file.seek(0)
# 앞에서 file.read()로 데이타를 읽었고 파일 포인터가 파일의 끝을 가리키고 있기 때문ㅇ
# 뒤에서 파일을 읽기 위해서는 커서를 앞으로 보내는 file.seek(0)가 필요함. 

each_data_line=file.readlines()
# print('read_data type :',type(each_data_line))   #   <class 'list'> : 데이타를 여러 라인을 읽었기 때문에 각 라인의 값을 list로 반환
# print('read data :',each_data_line)  # data1이 list 인것을 확인할 수 있음. 
# print()

for i in range(len(each_data_line)):
    each_data_line[i]=each_data_line[i].replace('\n','').split(',')  
    #각 라인의 문자에서 개행문자를 빈문자로 변경해주고, ,값을 기준으로 분리한 리스트 데이타로 만들어줌 
    #line.replace('\n','') # 이렇게 사용하면 원본 데이타는 바뀌지 않음. immutable

# for n in each_data_line:
#     print(n)

# print()
# print('line:',each_data_line) 

# 각 점수의 항목을 str에서 int 로 수정
for i in range(1,len(each_data_line)):
    for n in range(1,len(each_data_line[i])):
        each_data_line[i][n] = int(each_data_line[i][n])
        #print(each_data_line[i][n])
# print()
# print('line:',each_data_line) 



for n in range(len(each_data_line)): 
    for i in range(2):  
        if n==0:
            each_data_line[n].append('총점')
            each_data_line[n].append('평균')
        else:        
            each_data_line[n].append(each_data_line[n][1]+each_data_line[n][2]+each_data_line[n][3])
            each_data_line[n].append(round(((each_data_line[n][1]+each_data_line[n][2]+each_data_line[n][3])/3),2))

            
# print()
# print('new line:',each_data_line) 
print()

# 국어 영어 수학 점수의 평균,최고,최저점 
number_major = 3
korean_score=[0 for i in range(len(each_data_line)-1)]
english_score=[0 for i in range(len(each_data_line)-1)]
math_score=[0 for i in range(len(each_data_line)-1)]

for i in range(1,len(each_data_line)):
    #for n in range(1,len(each_data_line[i])):
    korean_score[i-1] = each_data_line[i][1]
    english_score[i-1] = each_data_line[i][2]
    math_score[i-1] = each_data_line[i][3]

korean_text  = f"국어 - 평균:{round(sum(korean_score )/(len(each_data_line)-1),2)} 최고점:{max(korean_score) } 최저점:{min(korean_score) }"
english_text = f"영어 - 평균:{round(sum(english_score)/(len(each_data_line)-1),2)} 최고점:{max(english_score)} 최저점:{min(english_score)}"
math_text    = f"수학 - 평균:{round(sum(math_score   )/(len(each_data_line)-1),2)} 최고점:{max(math_score)   } 최저점:{min(math_score)   }"

#print(korean_score )   
print(korean_text )   
#print(english_score )   
print(english_text)   
#print(math_score ) 
print(math_text)  
print()

file.close()
print() # by default , the '\n' is set .


# 4. 결과 파일로 저장 (선택 과제) 
# 각 학생의 총점과 평균도 계산하시오. 
# 각 학생의 이름, 총점, 평균을 포함한 새로운 CSV 파일(result.csv)로 저장하시오. 
file = open("Question\Homework\ result.csv",'w',encoding="UTF-8") 
# 강의실 PC에서 UTF-8 과 ANSI둘다 가능.. 하지만 데이타 저장시 UTF-8이면 VS code로 한글이 잘 보이지만 ANSI이면 한글이 깨짐. 


print('#'*100)
print("각 학생의 이름, 총점, 평균포함한 데이타")

s = ""
for i in range(len(each_data_line)):
    for n in range(len(each_data_line[i])):
        s += str( each_data_line[i][n]) + '\t'
    s += '\n'     
print('='*100)
print(s)
print('='*100)
print()
file.write(s)
file.close()





#//////////////////////////////////////////
# 이번에는 readlines()를 사용했네요.
# 이 경우 결과가 readline() 때와 조금 다르게 나옵니다.
# 핵심 부분:
# data = file.read()
# 여기서 이미 파일 전체를 읽었습니다.
# 그래서 파일 포인터가 EOF(파일 끝)에 위치합니다.
# 그 다음:
# data1 = file.readlines()
# 를 실행하면 읽을 줄이 더 이상 없기 때문에:
# []
# 즉 빈 리스트가 반환됩니다.
# 여기서 중요한 차이:

# 함수	반환형	EOF 상태 결과
# read()	문자열(str)	''
# readline()	문자열(str)	''
# readlines()	리스트(list)	[]

# 따라서 현재 코드 출력은 대략 이렇게 됩니다.

# read_data type : <class 'str'>
# read data : (파일 전체 내용)

# read_data type : <class 'list'>
# read data : []

# 왜 리스트일까요?
# readlines()는 파일의 각 줄을 리스트 요소로 저장하기 때문입니다.
# 예를 들어 파일 내용이:
# Kim,90
# Lee,80
# Park,70
# 이면:
# file.readlines()
# 결과:
# ['Kim,90\n', 'Lee,80\n', 'Park,70']
# 입니다.
# 정상적으로 readlines()를 사용하려면:
# file.seek(0)
# data1 = file.readlines()
# 처럼 다시 처음으로 이동해야 합니다.
# 정리하면 현재 코드의 흐름은:
# file.read()       # 전체 읽기 → EOF 이동
# file.readlines()  # 더 읽을 게 없음 → []
# 입니다.
#------------------------------------------------------------------------------

#-------------------------------------------------------------------------------------
# PYTHON 과제 
# 문제. 학생들의 성적이 저장된 scores.csv 파일을 이용한 성적 통계 프로그램을 
# 만들어보시오. 
# 과제 요구사항 
# 1. CSV 파일 읽기 : open() 함수를 사용하여 scores.csv 파일을 읽으시오. 
# [* 첫줄(헤더)을 제외한 나머지 줄의 점수를 숫자(int) 데이터로 변환해야만 
# 계산가능] 
# 2. 데이터 처리 : 각 과목(국어, 영어, 수학)에 대해 다음을 계산하시오. 
# 평균 점수 
# 최고 점수 
# 최저 점수 
# 3. 결과 출력 : 각 과목별 통계 결과를 콘솔에 보기 좋게 출력하시오. 
# 예) 
# [과목별 통계] 
# 국어 - 평균: 85.5, 최고점: 92, 최저점: 76 
# 영어 - 평균: 88.0, 최고점: 94, 최저점: 80 
# 수학 - 평균: 84.0, 최고점: 95, 최저점: 72 
# 4. 결과 파일로 저장 (선택 과제) 
# 각 학생의 총점과 평균도 계산하시오. 
# 각 학생의 이름, 총점, 평균을 포함한 새로운 CSV 파일(result.csv)로 저장하시오. 
# #solution guide 
# 평균, 최고, 최저 점수를 계산하는 것을 반복문과 연산자로 수행하는 문제이지만,(필수 아님) 
# 파이썬의 표준내장함수 중에 이 값들을 쉽게 계산해주는 기능함수가 이미 존재함.  
# 배열(리스트,튜플,딕셔너리)수업에 일부 소개되었음. 즉, 계산을 편히 하려면 읽어들인 값들을 
# 리스트로 만들면 표준함수로 문제를 해결할 수도 있음. 학습하지 않은 내용은 검색하여 수행 
# [표준함수 ex : print(), input(), len(), max(). . . ] 
# 제출해야 할 내용 
# 아래 2가지를 반드시 제출하세요 
# ① Python 소스 코드 (.py) 
# ● 하나의 파일로 제출하거나 
# ● 모듈 형태로 작성된 경우 여러 파일이 있어도 무방함. 
# ② 실행 화면 캡처 (jpg/png + csv ) 
# 다음 항목들을 준비하여 파이썬 파일과 함께 제출 합니다 
# ● 결과 출력 화면 캡처 이미지 
# ● (동작 안될경우) 실행했을때 보여지는 에러 메세지 캡처 이미지 
# ● (선택과제)저장된 파일 이름이 보이는 목록 화면(윈도우 탐색기 or VSCode Explorer) 
# 캡처 
# ● (선택과제)저장된 CSV 파일 
# 제출 방법 
# ● 교강사 공유폴더 > 교과목별 평가 > 01 PYTHON > 제출폴더 > 본인이름폴더 
#------------------------------------------------------------------------------------------