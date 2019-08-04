import csv 
import json

with open('words.txt','r') as tsv:
    AoA = [line.strip('\n').split('\t') for line in tsv]

count = 1
D = {}
for i in AoA:
	mycount = str(count)
	if (len(mycount) < 2) :
		mycount = "0" + mycount 
	D["A" + mycount] = i[0]
	D["B" + mycount] = i[1]
	D["C" + mycount] = i[2]
	D["D" + mycount] = i[3]
	count += 1

L = list(D.keys())
L.sort()
for i in L:
	print(i, ":", D[i])

with open('words.json', 'w', encoding='utf-8') as f:
    json.dump(D, f, ensure_ascii = False, indent = 4)