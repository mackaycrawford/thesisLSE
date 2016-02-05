#!/usr/bin/env python
from pattern.en import sentiment
# Imports
import cgi, cgitb
import sys, json

# Logic
data= cgi.FieldStorage()
output = data.getvalue("documentText")
sArr = output.split("|||")

outputArr = []
for sentences in sArr: 
    miniArr = []
    miniArr.append(sentences)
    s = sentiment(sentences)
    s = s[0]
    miniArr.append(s)
    outputArr.append(miniArr)

print 'Content-Type: application/json\n\n'
print json.dumps(outputArr)
