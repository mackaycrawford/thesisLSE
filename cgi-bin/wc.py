#!/usr/bin/env python
from pattern.en import referenced
# Imports
import cgi, cgitb
import sys, json
from pattern.vector import count, LEMMA
from pattern.en import parse, Sentence

# Logic 
data= cgi.FieldStorage()
output = data.getvalue("documentText")
s = Sentence(parse(output))
res = count(s, exclude=['.', ',', '-', '!', '"', "'", ":", ";", "?"], stemmer=LEMMA)
 
print 'Content-Type: application/json\n\n'
print json.dumps(res)
