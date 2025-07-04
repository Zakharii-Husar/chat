#!/bin/bash

# Function to check if .env file exists
check_env() {
    if [ ! -f ".env" ]; then
        echo "Warning: .env file not found!"
        echo "Creating default .env file..."
        cat > .env << 'EOF'
# Database Configuration (SQLite with encryption)
DatabasePassword=YourSecurePassword123!

# API Configuration
ASPNETCORE_ENVIRONMENT=Docker

# Client Configuration (Development - change for production)
REACT_APP_API_URL=http://localhost:5190/chat-api
REACT_APP_WS_URL=http://localhost:5190/Hub
REACT_APP_BASE_PATH=
EOF
        echo "Default .env file created!"
    fi
}

# Function to deploy the application
deploy() {
    echo "Checking environment..."
    check_env
    
    echo "Building and starting containers..."
    docker-compose up --build -d
    
    echo "Deployment complete!"
    echo ""
    echo "Your application is running at:"
    echo "  Client: http://localhost:8082"
    echo "  API: http://localhost:5190"
    echo ""
    echo "To view logs: docker-compose logs -f"
    echo "To stop: docker-compose down"
}

# Function to deploy only the client
deploy_client() {
    echo "Checking environment..."
    check_env
    
    echo "Building and starting client container only..."
    docker-compose up --build -d client
    
    echo "Client deployment complete!"
    echo ""
    echo "Your client is running at:"
    echo "  Client: http://localhost:8082"
    echo ""
    echo "To view logs: docker-compose logs -f client"
    echo "To stop: docker-compose down"
}

# Function to deploy only the API
deploy_api() {
    echo "Checking environment..."
    check_env
    
    echo "Building and starting API container only..."
    docker-compose up --build -d api
    
    echo "API deployment complete!"
    echo ""
    echo "Your API is running at:"
    echo "  API: http://localhost:5190"
    echo ""
    echo "To view logs: docker-compose logs -f api"
    echo "To stop: docker-compose down"
}

# Function to deploy for staging (fast production testing)
deploy_staging() {
    echo "Checking environment..."
    check_env
    
    echo "Updating .env for staging (production URLs)..."
    # Update .env with production URLs - use more specific patterns to avoid duplication
    sed -i 's|^REACT_APP_API_URL=.*|REACT_APP_API_URL=https://api.zakharii.dev/projects/chat/chat-api|' .env
    sed -i 's|^REACT_APP_WS_URL=.*|REACT_APP_WS_URL=https://api.zakharii.dev/projects/chat/Hub|' .env
    sed -i 's|^REACT_APP_BASE_PATH=.*|REACT_APP_BASE_PATH=/projects/chat|' .env
    
    echo "Building and starting staging containers (reusing cache when possible)..."
    docker-compose up --build -d
    
    echo "Staging deployment complete!"
    echo ""
    echo "Your application is running at:"
    echo "  Client: http://localhost:8082"
    echo "  API: http://localhost:5190"
    echo ""
    echo "To view logs: docker-compose logs -f"
    echo "To stop: docker-compose down"
}

# Function to deploy for production
deploy_production() {
    echo "Checking environment..."
    check_env
    
    echo "Performing aggressive Docker cleanup before production deployment..."
    echo "Stopping and removing containers..."
    docker-compose down 2>/dev/null || true
    
    echo "Removing all unused images, containers, and networks..."
    docker system prune -a -f
    
    echo "Removing build cache..."
    docker builder prune -f
    
    echo "Updating .env for production..."
    # Update .env with production URLs - use more specific patterns to avoid duplication
    sed -i 's|^REACT_APP_API_URL=.*|REACT_APP_API_URL=https://api.zakharii.dev/projects/chat/chat-api|' .env
    sed -i 's|^REACT_APP_WS_URL=.*|REACT_APP_WS_URL=https://api.zakharii.dev/projects/chat/Hub|' .env
    sed -i 's|^REACT_APP_BASE_PATH=.*|REACT_APP_BASE_PATH=/projects/chat|' .env
    
    echo "Building and starting production containers..."
    docker-compose up --build -d
    
    echo "Production deployment complete!"
    echo ""
    echo "Your application is running at:"
    echo "  Client: http://localhost:8082"
    echo "  API: http://localhost:5190"
    echo ""
    echo "To view logs: docker-compose logs -f"
    echo "To stop: docker-compose down"
}

# Function to clean up
cleanup() {
    echo "Stopping and removing containers..."
    docker-compose down
    
    echo "Removing images..."
    docker rmi chat_client chat_api 2>/dev/null || true
    
    echo "Cleaning up volumes..."
    docker volume prune -f
    
    echo "Cleaning up networks..."
    docker network prune -f
    
    echo "Cleanup complete!"
}

# Function to show status
status() {
    echo "Container Status:"
    docker-compose ps
    
    echo ""
    echo "Recent Logs:"
    docker-compose logs --tail=20
}

# Function to show logs
logs() {
    docker-compose logs -f
}

case "$1" in
    "deploy")
        deploy
        ;;
    "deploy-prod")
        deploy_production
        ;;
    "deploy-staging")
        deploy_staging
        ;;
    "cleanup")
        cleanup
        ;;
    "status")
        status
        ;;
    "logs")
        logs
        ;;
    "stop")
        docker-compose down
        ;;
    "start")
        docker-compose up -d
        ;;
    "restart")
        docker-compose restart
        ;;
    "deploy-client")
        deploy_client
        ;;
    "deploy-api")
        deploy_api
        ;;
    *)
        echo "Usage: $0 {deploy|deploy-prod|deploy-staging|cleanup|status|logs|stop|start|restart|deploy-client|deploy-api}"
        echo "  deploy      - Build and deploy for development"
        echo "  deploy-prod - Build and deploy for production"
        echo "  deploy-staging - Build and deploy for staging (fast production testing)"
        echo "  cleanup     - Stop containers and clean up everything"
        echo "  status      - Show container status and recent logs"
        echo "  logs        - Show live logs"
        echo "  stop        - Stop containers"
        echo "  start       - Start containers"
        echo "  restart     - Restart containers"
        echo "  deploy-client - Deploy only the client"
        echo "  deploy-api  - Deploy only the API"
        exit 1
        ;;
esac
