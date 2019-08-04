import csv 
import json

with open('Questions.csv','r') as tsv:
    AoA = [line.strip("\n") for line in tsv]

for i in AoA:
	print(i)
with open('questions.json', 'w', encoding='utf-8') as f:
    json.dump(AoA, f, ensure_ascii = False, indent = 4)