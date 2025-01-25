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

# Install necessary tools
USER root
RUN apt-get update && \
    apt-get install -y curl gnupg2 iputils-ping && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools18 unixodbc-dev

ENV PATH="${PATH}:/opt/mssql-tools18/bin"

# Create start script with database check
RUN echo '#!/bin/sh\n\
echo "Waiting for database..."\n\
until /opt/mssql-tools18/bin/sqlcmd -S db -U sa -P "$MSSQL_SA_PASSWORD" -Q "SELECT 1" -N -C; do\n\
  echo "Database not ready - waiting..."\n\
  sleep 5\n\
done\n\
echo "Database is ready"\n\
echo "Starting API..."\n\
dotnet API.dll 2>&1 | tee /var/log/api.log' > /app/start.sh && \
chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]
