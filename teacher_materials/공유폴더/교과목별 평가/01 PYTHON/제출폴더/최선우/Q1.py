k = []
e = []
m = []
s = []
a = []
b = []

with open('scores.csv','r',encoding='UTF-8') as file:
    next(file)
    for line in file:
        name, ko, en, ma=line.strip().split(",")

        ko=int(ko)
        en=int(en)
        ma=int(ma)
        
        k.append(int(ko))
        e.append(int(en))
        m.append(int(ma))

        total = ko + en + ma
        average = total/3
        s.append([name, ko, en, ma, total,average])

    print("국어 - 평균:",round(sum(k)/len(k),1), '최고점:', max(k), '최저점:', min(k))
    print("영어 - 평균:",round(sum(e)/len(e),1), '최고점:', max(e), '최저점:', min(e))
    print("수학 - 평균:",round(sum(m)/len(m),1), '최고점:', max(m), '최저점:', min(m))

    
    for result1 in s:
        print(f'{result1[0]},{result1[1]},{result1[2]},{result1[3]},{result1[4]},{round(result1[5],1)}')
    
    

    

   
        
    


  
    
    
      

    

       
    

