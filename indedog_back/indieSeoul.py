import requests
from bs4 import BeautifulSoup
import pprint
import json
import re

# 인디서울 현재상영영화 / 상영관 크롤링

address = ''
api_key = ''
movie_data = []

url = 'http://www.indieseoul.org/movie_info/movie_index.php?cate=0'
default_img_url = 'http://www.indieseoul.org'
response = requests.get(url, verify=False)
cnt = 0
id = 10000

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    detail = soup.select('ul.movies > li')
    imgs = soup.select('ul.movies > li > div.img_box > div.img')
    # detail = [v for v in detail if v ]
    for i in range(4):
        temp = detail[i].text.split('\n')
        temp = [v for v in temp if v and v != '\r']
        temp_len = len(temp)

        img_src = str(imgs[i])
        start = img_src.find("(")
        end = img_src.find(")")
        result = img_src[start+1:end]

        cinemas = ''

        # 중개모델
        # 현재 상영중인 영화의 시네마(상영관) 데이터를 저장 후, 중개모델에도 저장 (id 끼리.)
        movie_pk = i
        for j in range(temp_len-1, 0, -2) :
            if temp[j] == temp[0]:
                break
            print(i, temp[j-1])
            cinemas += temp[j-1] + ','


        pprint.pprint(temp)
        # print(result)
        movieInfo = {
                "model": "movies.movie",
                "pk": id,
                "fields": {
                    'cinemas': cinemas,
                    'title': temp[0],
                    'director': temp[2],
                    'genre': temp[4],
                    'length': temp[6],
                    'img_src': re.sub(r'&amp;', '&', default_img_url + result),
                }
            }
        movie_data.append(movieInfo)
        pprint.pprint(movieInfo)
        id += 1
else : 
    print(response.status_code)
  
# with open("movie_data2.json", "w", encoding='utf-8') as f:
#     json.dump(movie_data, f, indent=2, ensure_ascii=False)
