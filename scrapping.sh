#!/bin/bash

URL="https://www.fundsexplorer.com.br/funds"

# Obter o conteúdo da página e extrair as divs desejadas usando pup
curl -s "$URL" | pup 'div.tickerBox.link-tickers-container' >> fundos.csv