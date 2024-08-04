FROM circleci/python

RUN sudo apt update && sudo apt install -y pup && sudo apt install -y nano

WORKDIR /app

COPY . .

RUN sudo su
RUN sed -i 's/\r//' scrapping.sh
RUN chmod +x scrapping.sh

RUN pip install bs4 pandas
