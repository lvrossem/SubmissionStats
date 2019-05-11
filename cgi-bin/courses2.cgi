#!/usr/bin/python3

import json
import cgi

def courses():
    jsonDict = dict()
    index = 0
    for regel in open("courses.tsv", 'r'):
        if index != 0:
            regellijst = regel.split("\t")
            jsonDict[regellijst[0]] = regellijst[1] + " " +regellijst[2]
        index += 1

    print("Content-Type: application/json")
    print()
    print(json.dumps(jsonDict))

courses()