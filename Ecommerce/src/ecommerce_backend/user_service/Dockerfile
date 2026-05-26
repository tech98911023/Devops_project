FROM python:3.11-slim

WORKDIR /app/ecommerce_backend/user_service

COPY . /app/ecommerce_backend/user_service/

RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    curl

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]