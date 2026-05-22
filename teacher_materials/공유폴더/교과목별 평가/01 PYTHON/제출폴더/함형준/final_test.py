# 문제. 학생들의 성적이 저장된 scores.csv 파일을 이용한 성적 통계 프로그램을 만들어보시오. 

# 과제 요구사항 
# 1. CSV 파일 읽기 : open() 함수를 사용하여 scores.csv 파일을 읽으시오. 
# [* 첫줄(헤더)을 제외한 나머지 줄의 점수를 숫자(int) 데이터로 변환해야만 계산가능]

with open('final/scores.csv', 'r', encoding='UTF-8') as file:
    lines=file.read().strip().split('\n') #line들이 모여있는 리스트
    labels = lines[0].split(',')
    students = [] # 학생들 데이터 dict들을 담은 리스트

    for i in lines[1:]:
        line = i.split(',') # [이름, 국어, 영어, 수학]
        student = {}

        for n in range(len(line)):
            v = line[n]
            if v.isdigit():
                student[labels[n]] = int(v) #labels 이름을 key로, 거기에 line의 n번째 조각인 n을 값으로 넣기!
            else:
                student[labels[n]] = v
        students.append(student)

# -----------------------------------
# 2. 데이터 처리 : 각 과목(국어, 영어, 수학)에 대해 다음을 계산하시오. 
# 평균 점수 
# 최고 점수 
# 최저 점수

subjects = labels[1:]
subjects_scores = {}

for subject in subjects:
    scores = []
    for student in students:
        scores.append(student[subject])
    
    avrg_score = sum(scores)/len(scores)
    max_score = max(scores)
    min_score = min(scores)

    subjects_scores[subject] = {
        '평균 점수': avrg_score,
        '최고 점수': max_score,
        '최저 점수': min_score
    }

# -----------------------------------
# 3. 결과 출력 : 각 과목별 통계 결과를 콘솔에 보기 좋게 출력하시오. 
# 예) 
# [과목별 통계] 
# 국어 - 평균: 85.5, 최고점: 92, 최저점: 76 
# 영어 - 평균: 88.0, 최고점: 94, 최저점: 80 
# 수학 - 평균: 84.0, 최고점: 95, 최저점: 72

print('과목별 통계')
for subject in subjects:
    print('{} - 평균: {:.1f}, 최고점: {}, 최저점: {}'.
          format(subject, subjects_scores[subject]['평균 점수'],
                  subjects_scores[subject]['최고 점수'],
                  subjects_scores[subject]['최저 점수'])
        )
print()

# -----------------------------------
# 4. 결과 파일로 저장 (선택 과제) 
# 각 학생의 총점과 평균도 계산하시오. 
# 각 학생의 이름, 총점, 평균을 포함한 새로운 CSV 파일(result.csv)로 저장하시오.

# 각 학생 총점, 평균 계산해서 딕셔너리 넣기
for student in students:
    name = student[labels[0]]
    scores = [] # 학생별 국수영 점수를 담기

    for subject in subjects:
        scores.append(student[subject])
            
    total_score = sum(scores)
    avrg_score = round((total_score / len(scores)), 1)

    student['총점'] = total_score
    student['평균'] = avrg_score

# 각 학생 데이터를 파일로 저장하기
with open('final/result.csv', 'w', encoding='UTF-8') as new_file:
    # 라벨 나열하기
    for key in students[0]: # 첫 학생의 키 값을 라벨로 쓰기
        if key == '평균': # 마지막 항목인 키 값이 '평균'이면 ,대신 \n하게 작성 
            new_file.write(f'{key}\n')
        else:
            new_file.write(f'{key},')
        
    # 데이터 값 나열하기
    for student in students: #학생(한 줄) 한명씩 순차적으로 반복
        for key in student: #한 학생의 데이터 값들 하나씩 순차적으로 반복
            value = student[key]
            if key == '평균':
                new_file.write(f'{value}\n') #마지막 값 '평균' 이후 줄 바꾸기
            else:
                new_file.write(f'{value},')

# ---------- 덤으로 하기 ----------
# 터미널에서 \t 형식으로 보기좋기 print 해보기
# 라벨 나열하기
for key in students[0]: # 첫 학생의 키 값을 라벨로 쓰기
    if key == '평균': # 마지막 항목인 키 값이 '평균'이면 ,대신 \n하게 작성 
        print(f'{key}\n')
    else:
        print(key, end='\t')
        
# 데이터 값 나열하기
for student in students: #학생(한 줄) 한명씩 순차적으로 반복
    for key in student: #한 학생의 데이터 값들 하나씩 순차적으로 반복
        value = student[key]
        if key == '평균':
            print(f'{value}\n') #마지막 값 '평균' 이후 줄 바꾸기
        else:
            print(value, end='\t')