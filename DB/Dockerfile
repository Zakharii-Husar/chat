FROM mcr.microsoft.com/mssql/server:2022-latest

# Install SQL Server tools
USER root

# Remove conflicting packages first
RUN apt-get update && \
    apt-get remove -y unixodbc unixodbc-dev && \
    apt-get autoremove -y && \
    apt-get clean

# Install curl and gnupg2
RUN apt-get update && \
    apt-get install -y curl gnupg2

# Add Microsoft repository and install tools
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools18 unixodbc-dev

# Add SQL Server tools to PATH
ENV PATH="${PATH}:/opt/mssql-tools18/bin"

# Create directory for init scripts
RUN mkdir -p /docker-entrypoint-initdb.d

# Copy initialization script
COPY DB/init.sql /docker-entrypoint-initdb.d/

# Create startup script
RUN echo '#!/bin/bash\n\
/opt/mssql/bin/sqlservr & \n\
sleep 30s \n\
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -i /docker-entrypoint-initdb.d/init.sql -C -N\n\
tail -f /dev/null' > /docker-entrypoint.sh && \
chmod +x /docker-entrypoint.sh

EXPOSE 1433

CMD ["/docker-entrypoint.sh"]