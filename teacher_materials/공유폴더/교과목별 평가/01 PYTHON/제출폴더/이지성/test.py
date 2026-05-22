# PYTHON 과제
# 문제. 학생들의 성적이 저장된 scores.csv 파일을 이용한 성적 통계 프로그램을 만들어보시오.
# 과제 요구사항
# 1. CSV 파일 읽기 : open() 함수를 사용하여 scores.csv 파일을 읽으시오.
# [* 첫줄(헤더)을 제외한 나머지 줄의 점수를 숫자(int) 데이터로 변환해야만 계산가능]
# 2. 데이터 처리 : 각 과목(국어, 영어, 수학)에 대해 다음을 계산하시오.
# 평균 점수
# 최고 점수
# 최저 점수
# 3. 결과 출력 : 각 과목별 통계 결과를 콘솔에 보기 좋게 출력하시오.
# 예) [과목별 통계]
# 국어 - 평균: 85.5, 최고점: 92, 최저점: 76
# 영어 - 평균: 88.0, 최고점: 94, 최저점: 80
# 수학 - 평균: 84.0, 최고점: 95, 최저점: 72
# 4. 결과 파일로 저장 (선택 과제)
# 각 학생의 총점과 평균도 계산하시오.
# 각 학생의 이름, 총점, 평균을 포함한 새로운 CSV 파일(result.csv)로 저장하시오.
# #solution guide
# 평균, 최고, 최저 점수를 계산하는 것을 반복문과 연산자로 수행하는 문제이지만,(필수 아님)
# 파이썬의 표준내장함수 중에 이 값들을 쉽게 계산해주는 기능함수가 이미 존재함.
# 배열(리스트,튜플,딕셔너리)수업에 일부 소개되었음. 즉, 계산을 편히 하려면 읽어들인 값들을 리스트로 만들면 표준함수로 문제를 해결할 수도 있음. 학습하지 않은 내용은 검색하여 수행
# [표준함수 ex : print(), input(), len(), max(). . . ]


with open('test/scores.csv','r', encoding='utf-8') as file:
    file.readline()

    # students = []
    s_kor = []
    s_eng = []
    s_math = []
    results = []


    for line in file:
        parts = line.strip().split(',')      
        name = parts[0]
        score = parts[1:]
        kor = parts[1]
        eng = parts[2]
        math = parts[3]

        scores = list(map(int,score))
        # 다시 쓰기위한 부분
        total = sum(scores)
        aver = round(total/len(scores),1)
        # student = name, scroe
        # students.append(student)
        s_kor.append(int(kor))
        s_eng.append(int(eng))
        s_math.append(int(math))

        personal_data = name, total, aver
        # print(personal_data)
        results.append(f"{name},{total},{aver}\n")

    # print('국어성적들:',s_kor)
    # print('영어성적들:',s_eng)
    # print('영어성적들:',s_math)


high_kor = max(s_kor)
high_eng = max(s_eng)
high_math = max(s_math)

low_kor = min(s_kor)
low_eng = min(s_eng)
low_math = min(s_math)
    
aver_kor = round(sum(s_kor)/len(s_kor),1)
aver_eng = round(sum(s_eng)/len(s_eng),1)
aver_math = round(sum(s_math)/len(s_math),1)
    

    # print( '국어 평균점:',aver_kor,'\n' '영어 평균점:',aver_eng,'\n''수학 평균점:',aver_math,'\n')
    # print( '국어 최고점:',high_kor,'\n' '영어 최고점:',high_eng,'\n''수학 최고점:',high_math,'\n')
    # print( '국어 최저점:',low_kor,'\n' '영어 최저점:',low_eng,'\n''수학 최저점:',low_math,'\n')


print(f'국어 - 평균:{aver_kor}, 최고점:{high_kor}, 최저점:{low_kor}')
print(f'영어 - 평균:{aver_eng}, 최고점:{high_eng}, 최저점:{low_eng}')
print(f'수학 - 평균:{aver_math}, 최고점:{high_math}, 최저점:{low_math}')

print()

# print(results)

with open('test/result.csv','w' ,encoding='utf-8') as file:
    file.write('이름,총점,평균 \n')

    for result in results:
        file.write(result)