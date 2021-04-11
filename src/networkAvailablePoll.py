from threading import Timer
from subprocess import run, PIPE, Popen
import logging
import traceback

logging.basicConfig(filename='log.txt', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')


def checkNetworkAvailable():
    checkedRes = run("ping 8.8.8.8", stdout=PIPE,
                     stderr=PIPE,
                     stdin=PIPE,
                     shell=True)
    # print(checkedRes.returncode)
    if checkedRes.returncode:
        print("需要重新登录")
        try:
            # 必须加入stdin参数，否则在无窗口模式无法执行
            loginRes = run(
                "app.exe", stdin=PIPE, stderr=PIPE, stdout=PIPE, shell=True)
        except:
            logging.debug(traceback.format_exc())
    else:
        print("不需要登录了")


def checkNetworkAvailable_timer():
    checkNetworkAvailable()
    global timer
    timer = Timer(10, checkNetworkAvailable_timer)
    timer.start()


timer = Timer(0, checkNetworkAvailable_timer)
timer.start()
