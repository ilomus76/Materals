# 나만의 모듈 만들기

#1] 별도의 파일(module_a.py)에 함수와 변수를 만들어 사용해보기
#print(title) #error
#show() #error

# 다른 모듈(파이썬 파일)의 변수와 함수를 사용하려면..import
import module_a
print(module_a.title)
module_a.show()
print()

#모듈명 없이 변수와 함수명을 사용하려면..
from module_a import title, show
print(title)
show()
print()

#특정 모듈의 모든 변수와 함수를 쉽게 사용하고 싶다면..
from module_a import *
print(title)
show()
print()
#-------------------------

import modules.aaa
print(modules.aaa.title)
modules.aaa.show()
print()

from modules import aaa
print(aaa.title)
aaa.show()
print()
#-----------------------------

# 모듈을 import 한다는 것은 사실..그 파이썬파일.py를 실행한다는 것임
from modules import bbb

# bbb모듈의 output()함수를 호출하고 싶다면..
bbb.output()
print()
#------------------------

# _(언더스코어)를 변수명에 사용하면 import * 로 가져올때 제외됨..
from modules import ccc
print(ccc.title)
print(ccc._message)

from modules.ccc import *
print(title)
#print(_message) #인식안됨

# import * 일때만 제외되는 것이어서.. 직접 대상을 명시하며 import 하면 사용가능
from modules.ccc import _message
print(_message)