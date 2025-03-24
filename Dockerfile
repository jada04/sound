# Node.js 16 tabanlı bir imaj kullanıyoruz (buster, Python kurulumu için uygundur)
FROM node:16-buster

# Sistem paketlerini güncelle ve Python3'ü yükle (sembolik link oluşturmuyoruz)
RUN apt-get update && apt-get install -y python3

# Çalışma dizinini belirleyin
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin
RUN npm ci

# Projedeki diğer dosyaları kopyalayın
COPY . .

# Uygulamayı başlatın (örneğin, index.js dosyası)
CMD ["node", "index.js"]
