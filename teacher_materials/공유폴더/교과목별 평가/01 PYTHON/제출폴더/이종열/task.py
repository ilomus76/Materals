# 과제 1번

import csv

ks = []
es = []
ms = []
results = []

with open('Projects/files/scores.csv', 'r', encoding='UTF-8') as f:
    reader = csv.reader(f)

    for row in reader:
       
        if row[0] != '이름':
            row[1] = int(row[1])
            row[2] = int(row[2])
            row[3] = int(row[3])

            ks.append(row[1])
            es.append(row[2])
            ms.append(row[3])

            scores = [row[1], row[2], row[3]]

            total = sum(scores)
            avg = sum(scores) / len(scores)

            results.append([row[0],total,f"{avg:.2f}"])
           
        print(row)

print("-"*30)

# 과제 2번

kor_avg = sum(ks) / len(ks)
print(f"국어 평균점수:{kor_avg:.2f}")
print(f"국어 최고점수:{max(ks)}")
print(f"국어 최저점수:{min(ks)}")
print("-"*30)

eng_avg = sum(es) / len(es)
print(f"영어 평균점수:{eng_avg:.2f}")
print(f"영어 최고점수:{max(es)}")
print(f"영어 최저점수:{min(es)}")
print("-"*30)

math_avg = sum(ms) / len(ms)
print(f"수학 평균점수:{math_avg:.2f}")
print(f"수학 최고점수:{max(ms)}")
print(f"수학 최저점수:{min(ms)}")
print("-"*30)

# 과제 3번

print(f"국어 - 평균:{kor_avg:.2f}, 최고점:{max(ks)}, 최저점:{min(ks)}")
print(f"영어 - 평균:{eng_avg:.2f}, 최고점:{max(es)}, 최저점:{min(es)}")
print(f"수학 - 평균:{math_avg:.2f}, 최고점:{max(ms)}, 최저점:{min(ms)}")
print("-"*30)

# 과제 4번

import csv

with open('Important_task/result.csv', 'w', encoding='UTF-8', newline='') as f:
    writer = csv.writer(f)

    writer.writerow(['이름','총점','평균'])

    for r in results:
        writer.writerow(r)
