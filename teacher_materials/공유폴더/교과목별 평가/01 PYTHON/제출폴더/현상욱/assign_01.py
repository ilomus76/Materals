#1---------------------
file = open("c:/users/admin/mbca/python/assignment/scores.csv", "r", encoding="utf-8")
assign = file.readlines()

for i in assign:
    i = i.split(",")

    for j in i:
        print(j.strip(), end="\t")
        
    print()

print()

#2---------------------------
kor_scr = []
eng_scr = []
math_scr = [] #상자들을 만들어서

for i in assign[1:]: #두번째 줄부터 반복
    i = i.split(",") #리스트로 잘라서 반복
    kor_scr.append(int(i[1])) #kor_scr 상자 뒤에다가 넣어라
    eng_scr.append(int(i[2]))
    math_scr.append(int(i[3]))

print ("국어점수 리스트 :", kor_scr)
print ("영어점수 리스트 :", eng_scr)
print ("수학점수 리스트 :", math_scr)
print()

print ("국어점수 평균 :", round(sum(kor_scr)/len(kor_scr), 1))
print ("국어점수 최고점:", max(kor_scr))
print ("국어점수 최하점:", min(kor_scr))
print()

print ("영어점수 평균:", round(sum(eng_scr)/len(eng_scr),1))
print ("영어점수 최고점:", max(eng_scr))
print ("영어점수 최하점:", min(eng_scr))
print()

print ("수학점수 평균:", round(sum(math_scr)/len(math_scr),1))
print ("수학점수 최고점:", max(math_scr))
print ("수학점수 최하점:", min(math_scr))
print()

#3-------------------------------

kor_scr_avg = round(sum(kor_scr)/len(kor_scr), 1)
kor_scr_highest = max(kor_scr)
kor_scr_lowest = min(kor_scr)
print(f"국어 - 평균: {kor_scr_avg}, 최고점: {kor_scr_highest}, 최저점: {kor_scr_lowest}")

eng_scr_avg = round(sum(eng_scr)/len(eng_scr), 1)
eng_scr_highest = max(eng_scr)
eng_scr_lowest = min(eng_scr)
print(f"영어 - 평균: {eng_scr_avg}, 최고점: {eng_scr_highest}, 최저점: {eng_scr_lowest}")

math_scr_avg = round(sum(math_scr)/len(math_scr), 1)
math_scr_highest = max(math_scr)
math_scr_lowest = min(math_scr)
print(f"수학 - 평균: {math_scr_avg}, 최고점: {math_scr_highest}, 최저점: {math_scr_lowest}")