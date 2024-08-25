FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh
ENTRYPOINT ["./wait-for-it.sh", "db:5432", "--"]
CMD ["flask", "run", "--host=0.0.0.0", "--port=5001"]