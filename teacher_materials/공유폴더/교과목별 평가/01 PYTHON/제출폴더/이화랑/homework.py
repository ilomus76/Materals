list_korean=[]
list_english=[]
list_math=[]

with open('scores.csv','r',encoding='UTF-8') as file:
    for score in file:
    
        (name,korean,english,math)=score.split(',')
        if korean.strip().isdigit():
            list_korean.append(int(korean))

        if english.strip().isdigit():
            list_english.append(int(english))
        if math.strip().isdigit():
            list_math.append(int(math))
    


total_korean=sum(list_korean)
total_english=sum(list_english)
total_math=sum(list_english)

aver_korean=sum(list_korean)/len(list_korean)
aver_english=sum(list_english)/len(list_english)
aver_math=sum(list_math)/len(list_math)

max_korean=max(list_korean)
max_english=max(list_english)
max_math=max(list_math)

min_korean=min(list_korean)
min_english=min(list_english)
min_math=min(list_math)

print(f'[과목별 통계]\n'
      f'국어 - 평균: {aver_korean:.1f}, 최고점: {max_korean}, 최저점: {min_korean}\n'
      f'영어 - 평균: {aver_english:.1f}, 최고점: {max_english}, 최저점: {min_english}\n'
      f'수학 - 평균: {aver_math:.1f}, 최고점: {max_math}, 최저점: {min_math}')
  

