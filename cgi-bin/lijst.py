#!/usr/bin/python3

import json
import cgi


def lijst():
    verzenden = {}

    invoer, i = open('courses.tsv', 'r'), 0
    line = invoer.readline()
    while line:
        if i != 0:
            temp = line.split('\t')
            verzenden[temp[0]] = temp[1] + ' ' + temp[2]
        i += 1
        line = invoer.readline()

    print("Content-Type: application/json")
    print()

    print(json.dumps(verzenden))
    invoer.close()
print(lijst())