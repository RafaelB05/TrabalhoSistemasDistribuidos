import subprocess
import schedule
import requests
import json
from bs4 import BeautifulSoup



def rotinaScrapper():
    script_path="./scrapping.sh"
    process = subprocess.Popen(['bash',script_path],stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    if process.returncode != 0:
        return False
    else:
        return True


def rotinaCleanner():
    arquivo="index.html"
    fundos_parse = []
    with open(arquivo, "r", encoding="utf-8") as arquivo:
        conteudo = arquivo.read()
        soup = BeautifulSoup(conteudo, "html.parser")
        fundos = soup.find_all('div', class_='tickerBox link-tickers-container')

        for fundo in fundos:
            info_boxes = fundo.find_all('div', class_='tickerBox__info__box')
            
            fundo_info = {
                "fundo_tipo":fundo.find('span', class_='tickerBox__type').get_text(strip=True),
                "fundo_titulo":fundo.find('div', class_='tickerBox__title').get_text(strip=True),
                "fundo_desc":fundo.find('div', class_='tickerBox__desc').get_text(strip=True),
                "info1":info_boxes[0].get_text(strip=True) if len(info_boxes) > 0 else '',
                "info2":info_boxes[1].get_text(strip=True) if len(info_boxes) > 1 else '',
            }

            fundos_parse.append(fundo_info)
        
        return fundos_parse

def jsonParser(fundos):
    json_fundos = json.dumps(fundos)
    return json_fundos

def rotinaEnvioDados(fundos):
    url = "http://node-app:3000/api/v1/dados"
    response = requests.post(url,data=jsonParser(fundos),headers={'Content-Type': 'application/json'})
    if response.status_code == 200:
        print(response.json())


def executar_rotinas():
    if(rotinaScrapper()):
        fundos = rotinaCleanner()
        rotinaEnvioDados(fundos)
    else:
        print("Erro ao executar a rotina de scrapping")


def main():
    executar_rotinas()
    schedule.every(1).minutes.do(executar_rotinas)
    while True:
        schedule.run_pending()

if __name__ == "__main__":
    main()