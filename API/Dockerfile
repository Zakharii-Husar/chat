FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["API/API.csproj", "./"]
RUN dotnet restore "API.csproj"
COPY API/. .
RUN dotnet build "API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Docker

# Install curl for health checks
USER root
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean

# Create necessary directories with proper permissions
RUN mkdir -p /app/Data && \
    mkdir -p /app/Avatars && \
    chown -R 1000:1000 /app && \
    chmod -R 755 /app && \
    chmod 777 /app/Avatars

# Create start script
RUN echo '#!/bin/sh\n\
echo "Starting API..."\n\
dotnet API.dll' > /app/start.sh && \
chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]
