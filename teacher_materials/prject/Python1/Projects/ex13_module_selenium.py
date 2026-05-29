# selenium : 사용자가 브라우저에서 수행하는 행동을 파이썬 코드가 대시 움직이도록 해주는 모듈 -- 웹 크롤러 or RPA 자동화서비스 개발에 활용

#0. 설치
#pip install selenium

#1. 모듈 사용
import time
from selenium import webdriver
from selenium.webdriver.common.by import By

#2. 크롬 웹드라이버 준비
chrome= webdriver.Chrome()
chrome.get('https://www.naver.com')

#바로 꺼지니까.. 잠시 대기
time.sleep(5)

#셀레니움으로 웹브라우저에 사람이 하는 행동을 대신 요청!!
#3. 네이버의 검색어 입력창을 찾기
search_box= chrome.find_element(By.CLASS_NAME, "search_input")
#키보드값 입력
search_box.send_keys('스타벅스')

#바로 꺼지니까.. 잠시 대기
time.sleep(5)

#4. 검색버튼 찾아서 클릭
search_button= chrome.find_element(By.ID, "search-btn")
search_button.click()

#바로 꺼지니까.. 잠시 대기
time.sleep(5)

# 수행내역
# 7-2까지 읽기( ~p.439)
# 손코딩, 마무리 수행...