import json
import cgi
from heapq import nlargest


d = {}
invoer = open('submissions.tsv', 'r')
data = cgi.FieldStorage().getvalue("data")


i = 0
line = invoer.readline()
while line:
    temp = line.split('\t')
    if i != 0:
        cursus_id = int(temp[6])
        student = temp[2]
        if cursus_id == int(data):
            if int(temp[4]) != 1:
                if student in d:
                    d[student] += 1
                else:
                    d[student] = 1
    i += 1
    line = invoer.readline()
tien_grootste = nlargest(10, d, key=d.get)

result = {i: d[i] for i in tien_grootste}
print("Content-Type: application/json")
print()
print(json.dumps(result))
invoer.close()




