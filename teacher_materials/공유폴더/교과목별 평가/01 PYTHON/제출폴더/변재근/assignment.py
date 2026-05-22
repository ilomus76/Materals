# 문제. 학생들의 성적이 저장된 scores.csv 파일을 이용한 성적 통계 프로그램을 만들어보시오. 

# 과제 요구사항 

# 1. CSV 파일 읽기 : open() 함수를 사용하여 scores.csv 파일을 읽으시오.
kor_scores=[]
eng_scores=[]
math_scores=[]

with open("scores.csv","r",encoding="utf-8") as file:
    lines=file.readlines()
    for line in lines[1:]:
        data=line.strip().split(",")
        
        kor=int(data[1])   
        eng=int(data[2])   
        math=int(data[3])  
        
        kor_scores.append(kor)
        eng_scores.append(eng)
        math_scores.append(math)

#---------------------------------------------------------------------------------------------------

# 2. 데이터 처리 : 각 과목(국어, 영어, 수학)에 대해 다음을 계산하시오. 
# 평균 점수  # 최고 점수  # 최저 점수
subjects=["국어", "영어", "수학"]
score_lists=[kor_scores, eng_scores, math_scores]
results=[]

for sub,scores in zip(subjects,score_lists):
    sub_avg=sum(scores)/len(scores)  
    sub_max=max(scores)                
    sub_min=min(scores)               
    results.append([sub,sub_avg,sub_max,sub_min])

#---------------------------------------------------------------------------------------------------

# 3. 결과 출력 : 각 과목별 통계 결과를 콘솔에 보기 좋게 출력하시오.
print("[과목별 통계]")
for r in results:
    print(f"{r[0]} - 평균: {r[1]:.1f}, 최고점: {r[2]}, 최저점: {r[3]}")

#---------------------------------------------------------------------------------------------------























