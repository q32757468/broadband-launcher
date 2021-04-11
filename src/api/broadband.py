import requests


def loginBroadband(data):
    res = requests.post(url="http://192.168.167.46/70.htm", data={
        "DDDDD": data["username"],
        "upass": data["password"],
        "R1": "0",
        "R2": "",
        "R6": "0",
        "para": "00",
        "0MKKey": "123456",
        "buttonClicked": "",
        "redirect_url": "",
        "err_flag": "",
        "username": "",
        "password": "",
        "user": "",
        "cmd": "",
        "Login": "",
    })
    return res
