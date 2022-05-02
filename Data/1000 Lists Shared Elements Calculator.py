import pandas as pd
import numpy as np

a_lst = []
f_lst = []
with open("Alexa Top 1000 Text Dump.txt", 'r') as f:
    for line in f.readlines():
        line = line.strip()
        try:
            int(line)
        except ValueError:
            a_lst.append(line)

f_lst = []
with open("Facebook Top 1000.csv", 'r') as f:
    for line in f.readlines():
        line = line.strip()
        f_lst.append(line)

a_lst = a_lst[2:-2]
f_lst = f_lst[1:]

# Print common elements of Top 1000 from Facebook and Alexa Top 1000
print(len(set(a_lst).intersection(f_lst)))