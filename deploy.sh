#!/bin/bash

IMAGES_DIR="docker-images"
PROJECT_NAME="chat"  # This should match your directory name

# Function to check if .env file exists
check_env() {
    if [ ! -f ".env" ]; then
        echo "Error: .env file not found!"
        echo "Please create a .env file with the following content:"
        echo ""
        echo "MSSQL_SA_PASSWORD=YourStrongPassword123!"
        echo "ASPNETCORE_ENVIRONMENT=Docker"
        echo "REACT_APP_API_URL=https://api.zakharii.dev/projects/chat/chat-api"
        echo "REACT_APP_WS_URL=https://api.zakharii.dev/projects/chat/Hub"
        echo "REACT_APP_BASE_PATH=/projects/chat"
        echo ""
        exit 1
    fi
}

# Function to build images locally
build_local() {
    echo "Checking environment..."
    check_env
    
    echo "Building images locally..."
    if ! docker-compose build; then
        echo "Error: Build failed! Please check the error messages above."
        exit 1
    fi
    
    echo "Saving images to tar files..."
    mkdir -p $IMAGES_DIR
    
    # Check if images exist before saving
    if docker images | grep -q "${PROJECT_NAME}_client"; then
        docker save ${PROJECT_NAME}_client > $IMAGES_DIR/chat-client.tar
        echo "Saved chat-client.tar"
    else
        echo "Warning: ${PROJECT_NAME}_client image not found"
    fi
    
    if docker images | grep -q "${PROJECT_NAME}_api"; then
        docker save ${PROJECT_NAME}_api > $IMAGES_DIR/chat-api.tar
        echo "Saved chat-api.tar"
    else
        echo "Warning: ${PROJECT_NAME}_api image not found"
    fi
    
    if docker images | grep -q "${PROJECT_NAME}_db"; then
        docker save ${PROJECT_NAME}_db > $IMAGES_DIR/chat-db.tar
        echo "Saved chat-db.tar"
    else
        echo "Warning: ${PROJECT_NAME}_db image not found"
    fi
    
    echo "Images built and saved successfully!"
    echo "Don't forget to commit the $IMAGES_DIR directory to git"
}

# Function to deploy from saved images
deploy() {
    if [ ! -d "$IMAGES_DIR" ]; then
        echo "Error: $IMAGES_DIR directory not found!"
        echo "Please run './deploy.sh build' first or ensure you've pulled the latest changes"
        exit 1
    fi

    echo "Loading saved images..."
    for tar in $IMAGES_DIR/*.tar; do
        if [ -f "$tar" ]; then
            echo "Loading $(basename "$tar")..."
            docker load < "$tar"
        else
            echo "Warning: $tar not found, skipping..."
        fi
    done

    echo "Starting containers..."
    docker-compose up -d
}

# Function to deploy directly without saving/loading images
deploy_direct() {
    echo "Checking environment..."
    check_env
    
    echo "Building and starting containers directly..."
    docker-compose up --build -d
}

# Function to deploy production
deploy_production() {
    echo "Checking environment..."
    check_env
    
    echo "Building and starting production containers..."
    docker-compose -f docker-compose.prod.yml up --build -d
}

# Function to clean up
cleanup() {
    echo "Stopping and removing containers..."
    docker-compose down
    
    echo "Removing images..."
    docker rmi ${PROJECT_NAME}_client ${PROJECT_NAME}_api ${PROJECT_NAME}_db 2>/dev/null || true
    
    echo "Cleaning up volumes..."
    docker volume prune -f
    
    echo "Cleanup complete!"
}

# Add images directory to git
add_to_git() {
    git add $IMAGES_DIR/*.tar
    git status
    echo "Now you can commit and push the changes"
}

case "$1" in
    "build")
        build_local
        ;;
    "deploy")
        deploy
        ;;
    "deploy-direct")
        deploy_direct
        ;;
    "deploy-prod")
        deploy_production
        ;;
    "cleanup")
        cleanup
        ;;
    "git-add")
        add_to_git
        ;;
    *)
        echo "Usage: $0 {build|deploy|deploy-direct|deploy-prod|cleanup|git-add}"
        echo "  build         - Build and save images locally"
        echo "  deploy        - Deploy using saved images"
        echo "  deploy-direct - Build and deploy directly (recommended for development)"
        echo "  deploy-prod   - Build and deploy production version (for Ubuntu server)"
        echo "  cleanup       - Stop containers and clean up images/volumes"
        echo "  git-add       - Add built images to git"
        exit 1
        ;;
esac
