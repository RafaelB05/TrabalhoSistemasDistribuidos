#!/bin/bash

for n in 10 20 30 40 50 60 70; do
    curl "https://api.infomoney.com.br/fii/${n}/10/ticker/desc/ativos/null?type=json" >> fundos.txt
done
