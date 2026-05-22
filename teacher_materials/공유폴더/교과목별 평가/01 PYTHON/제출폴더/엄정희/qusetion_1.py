# 문제. 학생들의 성적이 저장된 scores.csv 파일을 이용한 성적 통계 프로그램을 만들어보시오.
# 과제 요구사항
# 1. CSV 파일 읽기 : open() 함수를 사용하여 scores.csv 파일을 읽으시오.
# [* 첫줄(헤더)을 제외한 나머지 줄의 점수를 숫자(int) 데이터로 변환해야만 계산가능]

# 2. 데이터 처리 : 각 과목(국어, 영어, 수학)에 대해 다음을 계산하시오.
# 평균 점수
# 최고 점수
# 최저 점수


def result(scores):
    avg = sum(scores)/ len(scores)
    high = max(scores)
    low = min(scores)

    return avg, high, low
def print_result(subject, scores):
    avg, high, low = result(scores)

    print(f"{subject}-평균 {avg:.1f},최고점:{high},최저점{low}")
#.1f : 소수점 한자리까지 출력.

with open('question/scores.csv', "r",encoding='UTF-8') as file:
    next(file)
    
    kor_scores=[]
    eng_scores=[]
    mat_scores=[]
    for n in file:
        print(n) 
        name,kor,eng,mat=n.strip().split(',')
        
        kor_scores.append(int(kor))
        eng_scores.append(int(eng))
        mat_scores.append(int(mat))

    print("국어평균:", sum(kor_scores)/len(kor_scores))
    print("최고:",max(kor_scores))
    print("최저:",min(kor_scores))

    print("영어평균:", sum(eng_scores)/len(eng_scores))
    print("최고:",max(eng_scores))
    print("최저:",min(eng_scores))

    print("수학평균:", sum(mat_scores)/len(mat_scores))
    print("최고:",max(mat_scores))
    print("최저:",min(mat_scores))
        
#3. 결과 출력 : 각 과목별 통계 결과를 콘솔에 보기 좋게 출력하시오.
#[과목별 통계]

print("[과목별 통계]")
print_result("국어", kor_scores)
print_result("영어", eng_scores)
print_result("수학", mat_scores)
    
    
file.close()

#코드 적기 어려워 AI의 도움을 99.9%지원으로 작성했습니다..비슷한 문제를 많이 반복해서 연습할게요..






