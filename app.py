from flask import Flask, render_template, request
import requests
import ssl
import config

app = Flask(__name__, template_folder="client/build", static_folder='client/build/static')

def getRoute(dep, dest):        
    url = f'https://api.odsay.com/v1/api/searchPubTransPath?SX={dep["x"]}&SY={dep["y"]}&EX={dest["x"]}&EY={dest["y"]}&apiKey={config.odsay_api_key}'
    
    response = requests.get(url)
    rescode = response.status_code

    if rescode == 200:
        return response.json()["result"]["path"]
    else:
        print("Error : " + response.text)    
    
    
    return

def getGeoCode(addr):
    url = f"https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query={addr}"

    response = requests.get(url, headers=config.naver_map_headers)
    rescode = response.status_code

    if rescode == 200:
        return { "x":response.json()["addresses"][0]["x"] , "y":response.json()["addresses"][0]["y"] }
    else:
        print("Error : " + response.text)

    
    return

def getLocPosition(location):
    
    url = f"https://openapi.naver.com/v1/search/local.json?query={location}"
    response = requests.get(url, headers=config.naver_address_headers)
    rescode = response.status_code

    if rescode == 200:
        return getGeoCode(response.json()["items"][0]["roadAddress"])
        
    else:
        print("Error : " + response.text)
    
    
    return 

@app.route("/")
def serve():

    return render_template('index.html')
    

@app.route('/info', methods=['GET'])
def info():

    dep = None
    dest = None
    
    location = request.args.to_dict()
    print(location)
    if "dep_addr" in location:
        dep=getLocPosition(location["dep_addr"])
        dest=getLocPosition(location["dest_addr"])
    else:
        dep={ "x":location["dep_x"], "y":location["dep_y"] }
        dest=getLocPosition(location["dest_addr"])
    
    path = getRoute(dep, dest)
    
    #최소 소요 시간 경로
    time_arr = []
    for idx in range(len(path)):
        time_arr.append(path[idx]["info"]["totalTime"])
    
    min_time_idx = time_arr.index(min(time_arr))
    
    info = path[min_time_idx]["info"] # 총 소요시간
    path_type = path[min_time_idx]["pathType"] # 1-지하철, 2-버스, 3-버스+지하철
    sub_path = path[min_time_idx]["subPath"]
    
    
    traffic_path = []
    for idx in range(len(sub_path)):
        if sub_path[idx]["trafficType"] != 3:
            traffic_path.append(sub_path[idx])
    
    #return Response(audio_data, mimetype="audio/wav")
    return { 'info':info, 'path_type':path_type ,'path':traffic_path }
    
  

if __name__ == "__main__":

    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ssl_context.load_cert_chain(certfile='server.crt', keyfile='server.key', password='****')

    app.run(host="0.0.0.0", port=8080, ssl_context=ssl_context, debug=True)
    #app.run(host="0.0.0.0", port=8080, debug=True)