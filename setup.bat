@echo off
echo 🚀 Setting up Full Stack Case Study...

:: Check if Docker is available
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 📦 Docker found - Using Docker setup
    
    :: Start services
    docker-compose up -d
    
    :: Wait for services to start
    echo ⏳ Waiting for services to start...
    timeout /t 10 >nul
    
    :: Run migrations
    docker-compose exec backend dotnet ef database update
    
    echo ✅ Setup complete!
    echo 🌐 Frontend: http://localhost:3000
    echo 🔧 Backend: http://localhost:5125
    echo 📊 Swagger: http://localhost:5125/swagger
    
) else (
    echo ⚠️  Docker not found - Using manual setup
    echo Please install .NET 8.0, Node.js 18+, PostgreSQL, and Redis
    echo Then run the commands in QUICKSTART.md
    pause
)