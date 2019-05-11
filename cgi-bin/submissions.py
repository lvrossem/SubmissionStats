import json

def submissions():
    d = {}
    invoer = open('submissions.tsv', 'r')

    i = 0
    line = invoer.readline()
    while line:
        temp = line.split('\t')
        if i != 0:
            key = temp[2]
            if int(temp[4]) != 1:
                if key in d:
                    d[key] += 1
                else:
                    d[key] = 1
        i += 1
        line = invoer.readline()
    print("Content-Type: application/json")
    print()
    print(json.dumps(d))
    invoer.close()


