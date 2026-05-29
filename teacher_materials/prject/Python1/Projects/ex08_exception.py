# 예외 처리 Exception

# 문제가 있는 상황을 말하는 용어 2개
# 1. Error(오류)     : 문법적으로 문제가 있어서 실행조차 불가능한 문제 
# 2. Exception(예외) : 실행 중(Run Time) 문제가 발생

# Exception 의 대표적인 예
# 1) 개발자가 작성한 로직이나 계산을 잘못한 경우 : 배열(리스트)의 인덱스번호 오류...
# 2) 네트워크나 하드디스크의 파일제어 오류

# 예외처리는 예외가 발생하지 않도록 하는 것이 아니라..예외가 발생하더라도 다운되지 않고 다음 코드들이 이어서 실행되도록 하는 문법

print("예외처리에 대해 알아보기 -------")
print()

#1) 에러 상황
#10= a #이건 문법에러.. 그렇기에 처음부터 실행조차 안됨. 위 안내문구도 출력안됨. [해결. 문법 고쳐야 함]

#2) 예외 상황
#print( 10/0 ) #0나눗셈은 불가능.. 문법적 오류는 아니지만 수행이 불가능한 경우..
# 에러처럼 코드가 멈추지만.. 이 코드 전에 있는 모든 코드들은 정상 수행됨..

# 예외가 발생하면...그 줄 아래가 모두 실행되지 않음.
# 즉, 프로그램 전체가 여기서 멈춤. 즉, 앱이 다운되는 것임. 이거 좀 짜증.
# 여기에서 예외가 발생하더라도 그 아래 모든 줄이 실행되지 못하는 문제를 해결...하는 것을 '예외처리'라고 부름

# 예외처리하는 모습을 실습해보기 위해 대표적인 4가지 상황 처리해보기..
#1) 0 나눗셈
n= 0
try:
    print(10/n)
except:
    print('0으로 나눗셈을 할수 없어요.')

#2) 리스트의 인덱스번호를 잘못 사용하는 경우
aaa= [10,20,30]
try:
    print(aaa[3])
except:
    print('잘못된 인덱스 번호를 사용했습니다.')

#3) 다른 자료형과의 연산 [ 문자열 + 숫자 ]
try:
    print('aaa'+10)
except:
    print('문자와 숫자는 연산이 안돼요.')

#4) 바꿀 수 없는 자료형을 형변환을 시도.
try:
    print( int('12ab')  )
except:
    print('12ab 데이터는 정수로 변활될 수 없어요.')

print("-"*10)
print()

# 오류 가능성이 있는 코드는 try에, 성공했을때만 실행하는 코드를 별도의 영역에 구분하여 작성하면 더 가독성 좋아짐..
# ex) 정수를 입력받아 제곱하는 작업..... 두 방법으로 비교..

#[1] try블럭만으로 처리하는 코드
# try:
#     number= int(input('정수입력:'))  #에러가 발생할 여지가 있는 코드
#     print('입력한 정수의 제곱:', number**2) #성공시에 처리할 코드
# except:
#     print('정수만 입력하세요.')

#[2] 성공했을때 처리하를 코드를 분리하는 else 영역을 사용하는 코드
# try:
#     number= int(input('정수입력:'))
# except:
#     print('정수만 입력하세요')
# else:
#     print('입력한 정수의 제곱:', number**2) #성공시에 처리할 코드
    
# print()
#-------------------위 내용은 기능적인 부분보다는 코드의 가독성을 위한 문법. 필수X

# 예외상황과 상관없이 무조건 수행할 작업이 있다면 ... finally 마침내..라는 영역에 작성
try:
    file= open('aaa.txt', 'r') # 무지개 로드(stream)가 열림..
    print( file.read()  )      # 스트림을 통해 데이터를 읽어오기 
    # (예외발생시켜보기)
    #print( file.reah() )

    #file.close()               #이 작업은 파일처리작업의 끝에 반드시 해야하는 필수 작업..
except:
    print('예외가 발생했어요.')
finally:
    #예외가 발생하든 안하는 무조건 실행할 코드를 이 곳에 작성
    print('파일 스트림을 닫겠습니다.')
    file.close()

#--------------------------
print()

# 예외상황이 발생했을때 그 정보를 알고 싶다면? 예외정보를 가진 Exception 이라는 객체(변수+함수)를 이용
try:
    print(10/0)
except Exception as e: #Exception객체...
    print('예외발생')
    print('예외종류:', type(e)) #<class 'ZeroDivisionError'>
    print('예외이유:', e)

try:
    nnn=[10,20,30]
    print(nnn[5])
except Exception as e:
    print('예외발생')
    print('예외종류:', type(e)) #<class 'IndexError'>
    print('예외이유:', e)

# try:
#     number= int(input('input:'))
# except Exception as e:
#     print('예외발생')
#     print('예외종류:', type(e)) #<class 'ValueError'>
#     print('예외이유:', e)
# print()

# try 영역안에 예외가 여러개 발생될 여지가 있다면.. 어떤 예외인지 대응하기 어려움..
# 이때.. Exception의 종류를 이용하여 구분하여 대응

# ex) 사용자로부터 정수 2개를 입력받아 나눗셈 하는 프로그램
# try:
#     num1= int(input('input:'))
#     num2= int(input('input:'))

#     div= num1/num2
#     print('나눗셈 결과:', div)
# except ValueError as e:
#     print('입력은 정수만 가능해요.')
# except ZeroDivisionError as e:
#     print('0나눗셈 안돼요.')
# except Exception as e:
#     print('알수없는 예외가 발생했어요.')
# print()
#---------------------------------------------------------

# [추가] 강제로 예외를 던지는 문법 키워드 raise [ 다른 언어들에서는 throw 라고 부름]

# ex) 원래 파이썬은 음수를 입력해도 에러는 아님. 근데..이 프로그램에서는 양수만 원하는..즉, 음수를 입력하면 예외라고..하고 싶을때..!!
#[방법] if-else 문으로 해결..
# num= int(input('input number:'))
# if(num<0):
#     raise Exception # 강제로 예외를 발동!!
# else:
#     print('num:', num)
# print()

#[예외처리 해보기]
try:
    num= int(input('input number:'))
    if(num<0):
        raise Exception # 강제로 예외를 발동!!
    else:
        print('num:', num)
except:
    print('양수만 입력 가능해요.')

#--------------------------------------------------------
# exception이 발생하면..그 코드 이후부터는 실행이 안됨.
# 확인
print()
print('-'*20)
print('프로그램 종료...')

# chapter 6 장 완료... 수행내역을 동일하게..6교시부터..수행..
