import pandas as pd

df = pd.read_csv("Submit/scores.csv")
df.index = range(1, len(df) + 1)

df["총점"] = df[["국어", "영어", "수학"]].sum(axis=1)
df["평균"] = df[["국어", "영어", "수학"]].mean(axis=1).round(2)

result = df[["이름", "총점", "평균"]]

print(result.to_string(index=False))

result.to_csv("Submit/result.csv", index=False, encoding="utf-8-sig")
