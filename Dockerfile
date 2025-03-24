# Node.js 16 tabanlı bir imaj kullanıyoruz (buster sürümü Python yüklemek için uygundur)
FROM node:16-buster

# Sistem paketlerini güncelle ve Python3'ü yükle
RUN apt-get update && apt-get install -y python3 && \
    ln -s /usr/bin/python3 /usr/bin/python

# Çalışma dizinini belirleyin
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin (npm ci, package-lock.json ile uyumlu şekilde kurar)
RUN npm ci

# Projedeki diğer dosyaları kopyalayın
COPY . .

# Uygulamayı çalıştırın (örneğin, index.js dosyasını çalıştırın)
CMD ["node", "index.js"]
