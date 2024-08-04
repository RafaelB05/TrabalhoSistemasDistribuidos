import subprocess
import schedule
from bs4 import BeautifulSoup

class FundoInfo:
    def __init__(self, tipo, titulo, descricao, info1, info2):
        self.tipo = tipo
        self.titulo = titulo
        self.descricao = descricao
        self.info1 = info1
        self.info2 = info2

script_path="./scrapping.sh"
arquivo_gerado="index.html"

def executarRotinaScrapper(path):
    script_path="./scrapping.sh"
    arquivo_gerado="index.html"
    process = subprocess.Popen(['bash',script_path],stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    if process.returncode != 0:
        return False
    else:
        return True


def executarRotinaCleanner(arquivo):
    fundos_parse = []
    with open(arquivo, "r", encoding="utf-8") as arquivo:
        conteudo = arquivo.read()
        soup = BeautifulSoup(conteudo, "html.parser")
        fundos = soup.find_all('div', class_='tickerBox link-tickers-container')

        for fundo in fundos:
            fundo_tipo = fundo.find('span', class_='tickerBox__type').get_text(strip=True)
            fundo_titulo = fundo.find('div', class_='tickerBox__title').get_text(strip=True)
            fundo_desc = fundo.find('div', class_='tickerBox__desc').get_text(strip=True)
            info_boxes = fundo.find_all('div', class_='tickerBox__info__box')
            info1 = info_boxes[0].get_text(strip=True) if len(info_boxes) > 0 else ''
            info2 = info_boxes[1].get_text(strip=True) if len(info_boxes) > 1 else ''
            fundo_info = FundoInfo(tipo=fundo_tipo, titulo=fundo_titulo, descricao=fundo_desc, info1=info1, info2=info2)
            fundos_parse.append(fundo_info)
        
        return fundos_parse

def executar_rotinas():
    if(executarRotinaScrapper(script_path)):
        fundos = executarRotinaCleanner(arquivo_gerado)
        print(fundos[0].titulo)
    else:
        print("Erro ao executar a rotina de scrapping")


def main():
    schedule.every(1).minutes.do(executar_rotinas)
    while True:
        schedule.run_pending()

if __name__ == "__main__":
    main()