# 모듈 다운로드
import csv, os        

# 파일 위치가 안잡혀서 출력해서 확인했음
print(os.getcwd())      

# 과목별 점수 리스트 형성했음
kr_scores = []
english_scores = []
math_scores = []

# 학생 점수 리스트 
student_result = []

# CSV 파일 읽기
with open('scores.csv', 'r', encoding='utf-8') as file: # 혹시 모르니 UTF-8로 언어 바꿔서 r모드 읽기
    red = csv.reader(file)

    # 리스트 앞부분 즉 헤더 제거
    next(red)

 # 반복문 으로 하나씩 저장
    for i in red:
        # 트라이 문 이용해서 만약에 음수나 언어가 적히면 바로 예외처리해서 실행
        try:
            name = i[0]

            # 점수별로 리스트 위치를 정해줌, 및 점수가 실수일수 있으니 float으로 저장
            kr = float(i[1])
            english = float(i[2])
            math = float(i[3])

            # 점수 범위를 not으로 써서 간단하게 검사
            if not (0 <= kr <= 100 and
                    0 <= english <= 100 and
                    0 <= math <= 100):
                print(f"{name} 학생의 점수에 오류가 있습니다.")
                # if문 안에 continue를 사용해서 끝까지 다 검사를 하게 만듦              
                continue

            # 과목별 리스트에 append 즉 추가
            kr_scores.append(kr)
            english_scores.append(english)
            math_scores.append(math)

            # 총점과 평균을 계산 후 저장
            total = kr + english + math
            avg = round(total / 3, 1) # 써보니까 소수점 찍히는게 보기 안좋아서 round기용

            # result는 결과, 걀과들 추가
            student_result.append([name, total, avg])

        # 이거 두개 사용해서 밸류 오류, 인덱스 오류 구분 후 따로 말해준다.    
        except ValueError:
            print(f"{i[0]} 학생의 점수가 잘못되었습니다.")
            continue

        except IndexError:
            print("데이터가 올바르지 않습니다.")
            continue
        except Exception:
            print("알수없는 오류입니다. 파일을 확인해 보세요")
            continue


# 과목별로 평균들 모두 계산 후 저장
kr_avg = sum(kr_scores) / len(kr_scores)
english_avg = sum(english_scores) / len(english_scores)
math_avg = sum(math_scores) / len(math_scores)

# 결과 출력
print("[과목별 통계]")

print(f"국어 - 평균: {kr_avg:.1f}, 최고점: {max(kr_scores)}, 최저점: {min(kr_scores)}")
print(f"영어 - 평균: {english_avg:.1f}, 최고점: {max(english_scores)}, 최저점: {min(english_scores)}")
print(f"수학 - 평균: {math_avg:.1f}, 최고점: {max(math_scores)}, 최저점: {min(math_scores)}")

# 결과 파일로 저장하기
# 일단 w모드로 파일을 저장
with open('result.csv', 'w', newline='', encoding='utf-8') as result_file:
    writer = csv.writer(result_file)

    # 앞에 머리부분 쓰기
    writer.writerow(['이름', '총점', '평균'])

    # 아까 만든거 리스트 그대로 넣기
    writer.writerows(student_result)

print()
print("result.csv 파일 저장 완료")