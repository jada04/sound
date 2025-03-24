# Node.js 16 tabanlı bir imaj kullanıyoruz (buster, Python kurulumu için uygundur)
FROM node:16-buster

# Sistem paketlerini güncelle, Python3'ü yükle ve /usr/bin/python kontrolü yaparak link oluştur
RUN apt-get update && apt-get install -y python3 && \
    if [ ! -f /usr/bin/python ]; then ln -s /usr/bin/python3 /usr/bin/python; fi

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm ci

# Projedeki diğer dosyaları kopyala
COPY . .

# Uygulamayı başlat
CMD ["node", "index.js"]
