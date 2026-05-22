import pandas as pd
class Student:
    def __init__(self, name, kor, eng, math):
        self.name = name
        self.kor = kor
        self.eng = eng
        self.math = math

df = pd.read_csv('Submit/scores.csv')

kor_list= []
eng_list= []
math_list= []

for row in df.itertuples(index=False):
    student = Student(
        row[0],
        row[1],
        row[2],
        row[3]  
    )
    kor_list.append(student.kor)
    eng_list.append(student.eng)
    math_list.append(student.math)
    
print("[과목별 통계]")

print(f"국어 평균: {sum(kor_list)/len(kor_list):.2f}, 최고점: {max(kor_list)}, 최저점: {min(kor_list)}")
print(f"영어 평균: {sum(eng_list)/len(eng_list):.2f}, 최고점: {max(eng_list)}, 최저점: {min(eng_list)}")
print(f"수학 평균: {sum(math_list)/len(math_list):.2f}, 최고점: {max(math_list)}, 최저점: {min(math_list)}")
