from urllib.request import Request, urlopen
import json

url = "https://crypto.org/explorer/api/v1/nfts/drops/4a8ea0336e21126f0db0e13dc448c497/tokens?limit=10000"
req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
webpage = urlopen(req).read()

data_json = json.loads(webpage)

with open("data.json", "w") as dataFile:   
    json.dump(data_json, dataFile)



print(data_json)