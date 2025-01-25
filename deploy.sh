#!/bin/bash

IMAGES_DIR="docker-images"

# Function to build images locally
build_local() {
    echo "Building images locally..."
    docker-compose build
    
    echo "Saving images to tar files..."
    mkdir -p $IMAGES_DIR
    
    # Save each image from docker-compose.yml
    docker save chat-client > $IMAGES_DIR/chat-client.tar
    docker save chat-api > $IMAGES_DIR/chat-api.tar
    docker save chat-db > $IMAGES_DIR/chat-db.tar
    
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
        docker load < "$tar"
    done

    echo "Starting containers..."
    docker-compose up -d
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
    "git-add")
        add_to_git
        ;;
    *)
        echo "Usage: $0 {build|deploy|git-add}"
        echo "  build    - Build and save images locally"
        echo "  deploy   - Deploy using saved images"
        echo "  git-add  - Add built images to git"
        exit 1
        ;;
esac
