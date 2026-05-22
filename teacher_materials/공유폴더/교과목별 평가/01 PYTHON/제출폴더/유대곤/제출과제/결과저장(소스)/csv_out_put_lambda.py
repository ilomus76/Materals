with open("Submit/scores.csv", 'r', encoding='UTF-8') as f:

    next(f)

    data = list(map(lambda row: row.strip().split(','), f))


def avg(value):

    return int(value) if value.is_integer() else value


result_list = list(map(lambda r: { "이름": r[0],"총점": int(r[1]) + int(r[2]) + int(r[3]),"평균": avg(round((int(r[1]) + int(r[2]) + int(r[3])) / 3,2))}, data))


with open("Submit/resultlamba.csv", "w", encoding="UTF-8-sig") as f:

    f.write("이름,총점,평균\n")

    list(map(lambda r:f.write(f"{r['이름']},{r['총점']},{r['평균']}\n"),result_list))

print(result_list)

print("결과저장완료")