FROM node:16-buster

# Sistem paketlerini güncelle, Python3'ü yükle, mevcut /usr/bin/python varsa sil ve yeni link oluştur
RUN apt-get update && apt-get install -y python3 && \
    rm -f /usr/bin/python && \
    ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin (npm ci, package-lock.json ile uyumlu şekilde kurar)
RUN npm ci

# Projedeki diğer dosyaları kopyalayın
COPY . .

CMD ["node", "index.js"]
