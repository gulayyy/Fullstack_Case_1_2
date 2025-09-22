# 🚀 Full Stack Case Study - Quick Start Guide

Bu repository'yi clone edip hızlıca çalıştırmak için:

## ⚡ Hızlı Başlangıç (3 Adım)

### 1️⃣ Repository'yi Clone Edin
```bash
git clone https://github.com/gulayyy/Fullstack_Case_1_2.git
cd Fullstack_Case_1_2
```

### 2️⃣ Docker ile Çalıştırın (Önerilen)
```bash
# Tüm servisleri başlat
docker-compose up -d

# Migration çalıştır
docker-compose exec backend dotnet ef database update

# Uygulamaya git: http://localhost:3000
```

### 3️⃣ Manuel Kurulum (Alternatif)
```bash
# Backend
cd backend
dotnet restore
dotnet ef database update
dotnet run &

# Frontend (yeni terminal)
cd frontend
npm install
npm run dev
```

## 🔗 Erişim URL'leri
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5125
- **Swagger**: http://localhost:5125/swagger

## 📋 Gereksinimler
- Docker Desktop (önerilen)
- veya .NET 8.0 + Node.js 18+ + PostgreSQL + Redis

Detaylı bilgi için [README.md](README.md) dosyasına bakın.