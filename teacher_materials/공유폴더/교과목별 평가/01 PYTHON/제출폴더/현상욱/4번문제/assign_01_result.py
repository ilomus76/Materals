file1 = open("assignment/scores.csv", "r", encoding="utf-8")
file2 = open("assignment/result04.csv", "w", encoding="utf-8")


assign4 = file1.readlines()

print("학생명\t", "총점\t", "평균점수")
file2.write("학생명\t총점\t평균점수\n")

for i in assign4[1:]:
    i = i.strip()
    i = i.split(",")

    name = i[0]
    kor_scr = int(i[1])
    eng_scr = int(i[2])
    math_scr = int(i[3])

    total = kor_scr + eng_scr + math_scr
    total_average = round(total/len(i[1:]), 2)

    print(f"{name}\t {total}\t {total_average}")
    file2.write(f"{name}\t {total}\t {total_average}\n")




# assign = file.readlines()




# for i in assign[1:]:
#     i = i.strip()
#     i = i.split(",")





# #4) 파일 저장 경로(위치) 지정해보기
# file= open('Projects/files/aaa.txt', "w") #쓰기모드는 파일이 없으면 생성함..하지만. 폴더가 없으면 에러! 그래서 미리 폴더를 만들어 놓거나.. 파이썬코드로 폴더를 생성해야함(다음 수업에 배울 모듈개념이 필요함.. 지금 안함)
# file.write('nice to meet you')
# file.close()

# # 상위폴더 위치 지정하는 상대경로 ../
# file= open('../aaa.txt',"w")
# file.write('have a good day.')
# file.close()

# # 절대경로 지정해보기(권장 안함.. 이유? 개발자PC기준이 아니라..사용자 PC기준이기에.예측 어려움)
# file= open('c:/Users/mbca/aaa.txt', "w")
# file.write('this is good')
# file.close()