FROM node:16-bullseye

# Sistemi güncelle, "python-is-python3" paketini yükle.
RUN apt-get update && apt-get install -y python-is-python3

WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm ci

# Tüm projeyi kopyala
COPY . .

CMD ["node", "index.js"]
