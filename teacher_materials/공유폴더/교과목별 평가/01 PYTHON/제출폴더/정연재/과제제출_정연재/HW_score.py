# 문제. 학생들의 성적이 저장된 scores.csv 파일을 이용한 성적 통계 프로그램을 만들어 보시오

# 과제 요구사항

korean_scores = []
english_scores = []
math_scores = []

with open('Self Test/files/scores.csv', 'r', encoding='UTF-8') as file:
    header = file.readline().strip()
    print(header)

    for line in file:
        name, kor, eng, math = line.strip().split(',')
        kor = int(kor)
        eng = int(eng)
        math = int(math)
        print(name, kor, eng, math)
    print()

    korean_scores.append(kor)
    english_scores.append(eng)
    math_scores.append(math)

print("국어")
print("평균: ", sum(korean_scores)/len(korean_scores))
print("최고값: ", max(korean_scores))
print("최소값: ", min(korean_scores))

print("영어")
print("평균: ", sum(english_scores)/len(english_scores))
print("최고값: ", max(english_scores))
print("최소값: ", min(english_scores))

print("수학")
print("평균: ", sum(math_scores)/len(math_scores))
print("최고값: ", max(math_scores))
print("최소값: ", min(math_scores))
