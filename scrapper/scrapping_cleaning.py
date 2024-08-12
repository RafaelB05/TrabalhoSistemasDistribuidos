import schedule
import rotinas

def executar_rotinas():
    if(rotinas.rotinaScrapper()):
        fundos = rotinas.rotinaCleanner()
        rotinas.rotinaEnvioDados(fundos)
    else:
        print("Erro ao executar a rotina de scrapping")

def main():
    executar_rotinas()
    schedule.every().monday.at("10:00").do(executar_rotinas)
    while True:
        schedule.run_pending()


if __name__ == "__main__":
    main()