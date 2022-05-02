p_lst = []
with open("Facebook Top 1000.csv", 'r') as f:
    for line in f.readlines():
        line = line.strip()
        p_lst.append(line)

p_lst = p_lst[2:-1]
print(len(p_lst))
with open("Facebook Top 1000 List.txt", 'w') as f:
    f.write(str(p_lst))
