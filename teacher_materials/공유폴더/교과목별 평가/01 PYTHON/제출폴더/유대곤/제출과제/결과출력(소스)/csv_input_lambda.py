with open("Submit/scores.csv", 'r', encoding='UTF-8') as f:
    next(f)

    rows = list(map(lambda x: x.strip().split(','), f))

scores = {
    "국어": list(map(lambda r: int(r[1]), rows)),
    "영어": list(map(lambda r: int(r[2]), rows)),
    "수학": list(map(lambda r: int(r[3]), rows))
}

list(map(lambda subject: print(
    f"{subject} - 평균: {round(sum(scores[subject]) / len(scores[subject]), 2)}, "
    f"최고점: {max(scores[subject])}, 최저점: {min(scores[subject])}"
), scores))


#람다함수: 매개변수:리턴값