import json

json_file = open("data.json", "r")
data = json.load(json_file)

addressList = {}

for lion in data["result"]:
    # print(lion["tokenOwner"])
    if lion["tokenOwner"] not in addressList:
        addressList[lion["tokenOwner"]] = 1
    else:
        addressList[lion["tokenOwner"]] += 1


print(addressList)