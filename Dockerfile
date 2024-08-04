FROM circleci/python

RUN sudo apt update && sudo apt install -y nano

WORKDIR /app

COPY . .

RUN sed -i 's/\r//' scrapping.sh && \
chmod +x scrapping.sh

RUN pip install bs4 schedule pandas

CMD ["python", "scrapping_cleaning.py"]
