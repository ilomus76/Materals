# 데이터 분석을 통한 서비스를 개발하려면 데이터 수집해야 함.(정식 수업은 2부 수업)
# 이 수집할 데이터는 크게
# 1. 회사나 개인이 가진 매출데이터, 회원데이터, 설문자료 등 엑셀파일같은 형태의 데이터일수도 있고... [파일 입출력 기능사용]
# 2. 날씨정보, 채용정보, 행사정보 등 웹을 통해 서비스 되는 데이터일 수도 있음. [ urllib request, requests(외부모듈), BeautifulSoup(외부모듈) ]

# 이렇게 애플리케이션 서비스를 개발할때 사용할 데이터를 공개해주는 기술을 OPEN API 라고 부름
# 웹 데이터를 불러와서 분석하여 원하는 정보를 추출하는 작업이 서비스를 개발할때 거의 필수기술

# 간단하게 웹 데이터를 읽어오는 실습을 위한...URL경로..이용

# 표준 모듈을 이용하여 웹 데이터 읽기 구현
from urllib import request

#1] 일반 텍스트파일 읽기
address= 'https://raw.githubusercontent.com/2017mrhi/python_network_files/refs/heads/main/aaa.txt'
url= request.urlopen(address)
data= url.read()
print(data)# 한글이 깨져보임
print('-'*30)
#한글을 해독하기 위해 UTF-8 방식으로 해독(디코딩 - decoding)
print(data.decode('UTF-8'))
print('-'*30)
print()
print()

# 실제 웹데이터들은 보통 표형태안에..값들이 칸별도 구분되어 존재하는 경우가 많음. (회원정보,매출데이터,날자별 온도...등)
# 이런 엑셀형태의 파일은 너무 무거워서..값들만 추출하여 제공해 줌..
#2] 대량의 데이터를 주는 파일 읽기
address= 'https://raw.githubusercontent.com/2017mrhi/python_network_files/refs/heads/main/bbb.txt'
url= request.urlopen(address)
data= url.read()
print(data.decode('UTF-8'))
print('-'*30)
print()

# 대량의 데이터에서 원하는 정보를 추출 하려면..값들의 구분이 용이해야 함.
# 그래서 등장한..파일형식..CSV(콤마로 값들을 구분하는 방식, 줄바꿈으로 아이템별 구별)
#3] .csv 파일을 읽어서 원하는 정보를 추출하는 기능 구현...
address= 'https://raw.githubusercontent.com/2017mrhi/python_network_files/refs/heads/main/ddd.csv'
url= request.urlopen(address)
data= url.read()
print( data.decode('UTF-8') )
print()

# 데이터를 수집한다는 것은 단순히..데이터를 전체를 가져오는 것으로 끝나지 않고..
# 그 안에서 원하는 정보를 분리하여 추출할 수 있어야 함...

# 이름, 나이, 전공, 주소를 각각 분리해야 함...

#1) 데이터를 줄 단위로 분리... -- 레코드별 분리..
data= data.decode('UTF-8')
lines= data.split('\n')
print('분리된 줄 수:', len(lines))

# 첫번째 줄은 제목글씨 줄..이니..이것만 뽑아서.. 출력
print('-'*50)
labels= lines[0].split(',') #[name,age,major,address]
for label in labels:
    print(label, end='\t\t')
print()
print('-'*50)

# 나머지 학생들의 정보도 반복문으로 출력해보기
for idx in range(1,len(lines)): #1,2,3
    values= lines[idx].split(',')
    for v in values:
        print(v, end='\t\t')
    print()
print('-'*50)
print()

# 웹의 존재하는 대량의 데이터는 이런식으로 .csv나 .xml 또는 .json 과 같은 파일형식으로 제공함
# 이 파일형식을 분석(parse)하여 원하는 정보만 뽑아서 분석하는 작업을 해야만 함.
#--------------------------------------------


# 수행내역
# chapter 7.1 까지 읽기

# 과제
#1. chapter 7.1 [직접 해보는 손 코딩] 따라 코딩하기
#2. chapter 7.2 [마무리] 수행







