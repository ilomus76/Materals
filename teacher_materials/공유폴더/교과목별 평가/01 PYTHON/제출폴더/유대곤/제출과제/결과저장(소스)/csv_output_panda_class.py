import pandas as pd

class Student:
    def __init__(self, name, kor, eng, math):
        self.name = name
        self.kor = kor
        self.eng = eng
        self.math = math

    def get_total_sum(self):
        return self.kor + self.eng + self.math

    def get_avg(self):
        return self.get_total_sum() / 3

    def dict(self):
        avg = self.get_avg()
        return {
            "이름": self.name,
            "국어": self.kor,
            "영어": self.eng,
            "수학": self.math,
            "총점": self.get_total_sum(),
            "평균": int(avg) if avg.is_integer() else round(avg, 2)
        }

df = pd.read_csv('Submit/scores.csv')

student_list= []

for row in df.itertuples(index=False):
    student = Student(
        row[0], 
        row[1],
        row[2],  
        row[3]   
    )
    student_list.append(student)

df_result = pd.DataFrame([s.dict() for s in student_list])

result = df_result[["이름", "총점", "평균"]]

print(result.to_string(index=False))

result.to_csv("Submit/result.csv", index=False, encoding="utf-8-sig")

