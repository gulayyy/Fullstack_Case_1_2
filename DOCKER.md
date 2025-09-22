# Case 1 Full Stack - Docker Kurulum Rehberi

## 🐳 Docker ile Hızlı Başlangıç

### Ön Gereksinimler
- Docker Desktop yüklü olmalı
- En az 4GB RAM ve 10GB disk alanı

### Mevcut Çalışan Konteynerler
Sisteminizde şu konteynerler çalışıyor:
- **postgres-case** (postgres:15) - Port 5432
- **redis-case** (redis:alpine) - Port 6379

### Tüm Servisleri Başlatma
```bash
# Tüm servisleri arka planda başlat
docker-compose up -d

# Logları izle
docker-compose logs -f

# Sadece belirli servisin loglarını izle
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Servis URL'leri
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5125
- **Swagger**: http://localhost:5125/swagger
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

### Servis Durumlarını Kontrol Etme
```bash
# Çalışan konteynerları listele
docker-compose ps

# Servis durumlarını kontrol et
docker-compose exec postgres-case pg_isready -U postgres
docker-compose exec redis-case redis-cli ping
```

### Mevcut Konteynerlerle Bağlantı
```bash
# Mevcut PostgreSQL konteynerine bağlan
docker exec -it postgres-case psql -U postgres -d ProductDb_Dev

# Mevcut Redis konteynerine bağlan  
docker exec -it redis-case redis-cli

# Mevcut konteyner durumlarını kontrol et
docker ps
docker logs postgres-case
docker logs redis-case
```

### Database Migration
```bash
# Backend konteyneri içinde migration çalıştır
docker-compose exec backend dotnet ef database update
```

### Servisleri Durdurma
```bash
# Servisleri durdur (veriler korunur)
docker-compose down

# Servisleri durdur ve verileri sil
docker-compose down -v
```

### Manuel Container Yönetimi
```bash
# Sadece database servislerini başlat
docker-compose up -d postgres-case redis-case

# Sadece backend'i yeniden başlat
docker-compose restart backend

# Frontend'i yeniden build et
docker-compose build frontend
docker-compose up -d frontend
```

### Troubleshooting
```bash
# Container loglarını kontrol et
docker-compose logs backend
docker-compose logs frontend

# Container içine gir
docker-compose exec backend bash
docker-compose exec postgres-case psql -U postgres -d ProductDb_Dev

# Tüm kaynakları temizle
docker-compose down -v
docker system prune -a
```