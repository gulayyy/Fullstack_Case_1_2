# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["Case_1_2.csproj", "./"]
RUN dotnet restore "Case_1_2.csproj"

# Copy source code and build
COPY . .
RUN dotnet build "Case_1_2.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "Case_1_2.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Create logs directory
RUN mkdir -p /app/logs

# Copy published files
COPY --from=publish /app/publish .

# Expose port
EXPOSE 5125

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5125
ENV ASPNETCORE_ENVIRONMENT=Development

# Entry point
ENTRYPOINT ["dotnet", "Case_1_2.dll"]