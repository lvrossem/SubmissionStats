#!/usr/bin/python3

import json
import cgi

def courses():
    invoer = open("courses.tsv", 'r')
    d = {}
    i = 0
    for line in invoer.readlines():
        temp = line.split('\t')
        if i != 0:
            d[temp[0]] = temp[1]
        i += 1

    print("Content-Type: application/json")
    print()
    print(json.dumps(d))
    invoer.close()


courses()