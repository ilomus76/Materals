import pandas as pd
aa= pd.read_csv('Submit/scores.csv')
korean= f"국어 평균: {aa['국어'].mean():.2f} ,최고점: {aa['국어'].max()}, 최저점: {aa['국어'].min()}"
english= f"영어 평균: {aa['영어'].mean():.2f} ,최고점: {aa['영어'].max()}, 최저점: {aa['영어'].min()}"
math= f"수학 평균: {aa['수학'].mean():.2f} ,최고점: {aa['수학'].max()}, 최저점: {aa['수학'].min()}"
print('[과목별 통계]')
print(korean)
print(english)
print(math)
