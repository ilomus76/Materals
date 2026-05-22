# 파일 경로 처리
from pathlib import Path
# 현재 실행 중인 파이썬 파일(.py)의 절대 경로를 기준으로 잡기
BASE_DIR = Path(__file__).resolve().parent
scores_path = BASE_DIR / 'scores.csv'
result_path = BASE_DIR / 'result.csv'

# 문제 1 CSV 파일 읽기 : open() 함수를 사용하여 scores.csv 파일을 읽으시오. 
import csv

with open(BASE_DIR / 'scores.csv', 'r', encoding='utf-8') as file:
    score_data = []
    reader = csv.reader(file)
    header = next(reader)
    score_data = []
    for row in reader:
        name = row[0]
        score = int(row[1]) 
        
        score_data.append([name, score])

print(score_data)

# 2. 데이터 처리 : 각 과목(국어, 영어, 수학)에 대해 다음을 계산하시오. 
with open(BASE_DIR / 'scores.csv', 'r', encoding='utf-8') as file:
    reader = csv.reader(file)
    header = next(reader)  

    kor_list = []
    eng_list = []
    math_list = []
    
    for row in reader:
        kor_list.append(int(row[1]))
        eng_list.append(int(row[2]))
        math_list.append(int(row[3]))

subjects = ['국어', '영어', '수학']
score_lists = [kor_list, eng_list, math_list]
# 3. 결과 출력 : 각 과목별 통계 결과를 콘솔에 보기 좋게 출력하시오. 
print("============== 과목별 성적 통계 ================")
for sub, scores in zip(subjects, score_lists):
    avg_score = sum(scores) / len(scores)  # 평균 계산
    max_score = max(scores)                # 최고 점수
    min_score = min(scores)                # 최저 점수
    
    print(f"[{sub}] 평균: {avg_score:.2f}점 | 최고: {max_score}점 | 최저: {min_score}점")

# 4. 결과 파일로 저장 (선택 과제) 
with open('result.csv', 'w', encoding='utf-8', newline='') as file:
    writer = csv.writer(file)
    
    writer.writerow(['과목', '평균 점수', '최고 점수', '최저 점수'])
    
    for sub, scores in zip(subjects, score_lists):
        avg_score = round(sum(scores) / len(scores), 2)
        max_score = max(scores)
        min_score = min(scores)
        
        writer.writerow([sub, avg_score, max_score, min_score])
print("============== 과목별 성적 통계 ================")
print("")
print("성공적으로 'result.csv' 파일에 저장되었습니다.")
print("")
