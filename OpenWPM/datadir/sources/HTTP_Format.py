import pandas as pd

df = pd.read_csv("/home/kali/Desktop/Project/OpenWPM/datadir/sources/Facebook Top 1000.csv")


for i in range(len(df['url_domain'])):
    df['url_domain'][i] = 'https://www.'+df['url_domain'][i]

df.to_csv("/home/kali/Desktop/Project/OpenWPM/datadir/sources/Facebook Top 1000.csv", index=False)