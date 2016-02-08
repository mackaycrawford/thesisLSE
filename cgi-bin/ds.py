#!/usr/bin/env python
from pattern.en import sentiment
# Imports
import cgi, cgitb
import sys, json

# Logic
data= cgi.FieldStorage()
output = data.getvalue("documentText")

outputArr = []


s = sentiment(output)
s = s[0]
outputArr.append(s)

print 'Content-Type: application/json\n\n'
print json.dumps(outputArr)
