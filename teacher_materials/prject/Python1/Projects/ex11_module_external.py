# 외부 모듈 - 개발자나 업체에서 특정 기능들을 미리 작성하여 제공한 라이브러리
# 파이썬 개발환경을 구축할때 자동으로 설치되지 않기에..
# 사용하려면 사전에 다운로드 및 설치작업이 필요함.

# 이런 외부모듈은 PyPI라는 파이썬 중앙저장소 서버에 등록되어 제공됨.
# 이 서버에서 모듈을 본인 PC로 다운로드 및 설치를 쉽게 해주는 CLI 프로그램이 있음.
# 이 모듈 설치 프로그램이 pip(package installer for python) 임
# pip 는 파이썬 개발환경 구축할때 이미 함께 설치되어 있음.

# pip를 이용하여 외부모듈을 설치하고 사용하는 맛보기 실습해보기(정식수업은 python 2부)
# 외부모듈 중 많이 사용하는 모듈 : requests, BeautifulSoup, numpy, pandas, matplotlib, selenium

#1. requests -- 서버데이터를 읽고쓰는 기능 모듈 [urlib보다 고수준 모듈 -- 예외처리, 디코딩, 쿠키, 세션, 파일업로드, JSON형식 처리 등을 자동으로 편하게 수행해줌]

#1) 먼저. requests 모듈 다운로드 및 설치
# -- pip는 CLI프로그램이어서..터미널 or CMD 창에서 명령어로 설치하는 프로그램
# -- 터미널을 실행하고 아래 명령어를 쓰면 다운로드 및 설치가 알아서 됨.
# -- pip install 모듈명

# pip install requests

#2) 모듈 사용 
import requests

#3) 아주 쉽게 서버에 있는 텍스트문서 읽어오기
response= requests.get('https://raw.githubusercontent.com/kitesoft2058/python-request-test/refs/heads/main/aaa.txt')
#response 는 글씨 데이터가 아니라.. 응답된 데이터와 상태값을 가진 객체
print(response.status_code) # 서버의 응답결과에 대한 상태값 [ 200 OK, 404 Not Pound, 403 권한없음 ]
print(response.text) # 응답된 글씨데이터..한들 인코딩이 자동으로 됨.
print()

#4) 대량의 데이터를 구분하기 용이하도록 데이터를 작성하는 파일형식 3가지(CSV, XML, JSON) 중 요즘 가장 선호하는 JSON 파일형식을 쉽게 분석해줌
response2= requests.get('https://raw.githubusercontent.com/kitesoft2058/python-request-test/refs/heads/main/hhh.json')
print(response2.status_code)
print(response2.text)
print()

#원하는 데이터를 추출해야 함. 이를 parse 라고 부름
#응답된 json 데이터를 python의 Dictionary로 변환해주면.. 식별자 key로 값을 쉽게 취득가능
print( type(response2.text) )
data_dict= response2.json() # 'str' --> 'dict'
print( type(data_dict) )

# dictionary 타입이기에 식별자로 원하는 값을 가져올 수 있음.
print( data_dict['data_title'] )
print( data_dict['total_count'] )
print("-"*30)
print()
#-------------------------------

#3) 인터넷에 공개된 이미지의 URL만 주면 다운로드 해주는(내 컴퓨터에 이미지파일로 저장된다는 것) 프로그램
address= 'https://cdn.pixabay.com/photo/2019/07/18/01/05/lotus-4345296_1280.jpg'
response3= requests.get(address)
print(response3.status_code)
#print(response3.text) #픽셀 데이터(2진수값)을 글씨를 읽으려 하니..깨짐
#print(response3.content) #2진수(바이너리) 데이터를 읽어옴..2진수는 값이 너무 길게 표시되기에 터미널에는 16진수로 변환된 값이 출력됨
print()

# 위 바이너리로 된 이미지데이터를 파일저장기능을 이용하여 파일로 저장하기
file= open('Projects/download/aaa.jpg', 'wb') #write binary mode
file.write(response3.content) #바이너리 데이터를 파일에 쓰면..이게 이미지파일 저장
file.close()
print('파일 다운로드 성공')
#-----------------------------------

# 다운로드 받은 이미지 데이터를 'aaa.jpg'라는 같은 이름으로 저장하면 덮어쓰기 됨
# 그래서 보통 다운로드 할때. 겹치지 않는 이름을 사용함.
# 방법1) 날짜를 이용하는 방법 'IMG_20260515111042.jpg'   2026-05-15 11:10:42 시간으로 만든 파일명
# 방법2) 원본파일명(1), 원본파일명(2), .... [이건 2부수업에서 소개]

#address= input('다운로드 하고 싶은 이미지 URL 입력 : ')
address='https://cdn.pixabay.com/photo/2019/07/17/08/07/lotus-4343365_1280.jpg'
response4= requests.get(address)

# 날짜정보를 이용하여 중복되지 않는 파일명 만들기----
import datetime
now_data= str(datetime.datetime.now()) 
#windows는 경로에 특수문자가 있으면 에러.. - : . 띄어쓰기.. 모두 제거
now_data= now_data.replace('-','')
now_data= now_data.replace(':','')
now_data= now_data.replace('.','')
now_data= now_data.replace(' ','')
file_name='Projects/download/' + now_data + ".png"
print(file_name)
#---------------------------------------------
file= open(file_name,'wb')
file.write(response4.content) #binary data
file.close()
print()
#----------------------------------------------------

# OPEN API처럼 데이터를 제공해주는 경우도 있지만..
# 필요한 데이터가 OPEN API로 제공되지 않는 경우도 있음.
# 보통 이럴때는 웹 페이지의 내용을 그래도 읽어와서 그 안에서 데이터를 추출함.
# 이를 웹 스크래핑 or 웹 크롤링 이라고 부름 .. 정식 수업은 2부수업에서..

# 이번 시간에는 웹 페이지(문서) 데이터를 읽어오는 맛보기..
# 웹 페이지(문서)는 HTML 이라는 언어로 만들어져 있음.

# 웹 수업시간에 정식으로 소개예정.
# 이번에 맛보기..로 HTML를 작성해보면서 웹 페이지를 만드는 모습 경험하고
# 그 안에서 정보를 추출해보기

# 웹페이지 만드는 연습 - [web-test]폴더 만들어 .html 문서를 작성해보기 (.html .css .js)

# HTML 에서 원하는 정보 추출 실습
#예제1) 아주 간단한 HTML 페이지 분석
response5= requests.get('https://mbca2025aix.dothome.co.kr')
print(response5.text)
print()

# 읽어온 HTML 태그를 구별하여 원하는 정보를 추출하는 행위를 parse 라고 함.
# HTML 태그를 쉽게 해독해주는 외부모듈 사용 BeautifulSoup

# BS 모듈도 외부모듈이기에 다운로드 및 설치 필요 ( pip install beautifulsoup4 )

# BS 모듈 사용
from bs4 import BeautifulSoup

# HTML을 파싱하기 위해 위 응답된 HTML 데이터를 BeautifulSoup객체에게 연결해주기
soup= BeautifulSoup(response5.text, 'html.parser')

# soup를 이용하여 원하는 정보를 추출
# <p>요소를 찾아오기
ps= soup.select('p') #웹문서에서 모든 'p' 요소를 찾아서 리스트로 제공
print('p요소의 개수:', len(ps) )

# p요소들의 개수만큼 반복하면서...그 안에 써있는 글씨 출력
for p in ps:
    print('p요소의 글씨:', p.string)

# 이미지요소를 찾아서 src 속성의 값을 추출하여 출력 (id를 이용하여)
print('이미지 경로:', soup.select_one('#aa').get('src') )
print()

#예제2) 실사례.. 오늘의 코스피지수 (네이버 웹페이지에서 정보 추출) 
response6= requests.get('https://finance.naver.com/sise/sise_index.naver?code=KOSPI')
#print(response6.text)

# BeautifulSoup로 읽어온 웹페이지에서 원하는 코스피 지수를 추출
soup= BeautifulSoup(response6.text, 'html.parser')
element= soup.select_one('#now_value')
print('지금의 코스피 지수 :', element.string )


