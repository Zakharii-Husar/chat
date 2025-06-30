# Chat App

## Deployment

The project includes a comprehensive deployment script (`deploy.sh`) that handles both development and production deployments with automatic cleanup and environment management.

### Quick Start

```bash
# Make the script executable (first time only)
chmod +x deploy.sh

# Development deployment
./deploy.sh deploy

# Production deployment (with aggressive cleanup)
./deploy.sh deploy-prod
```

### Deployment Script Commands

The `deploy.sh` script provides several commands for managing your application:

#### Development Deployment
```bash
./deploy.sh deploy
```
- Creates `.env` file if missing
- Builds and starts containers for development
- Uses localhost URLs
- No cleanup performed

#### Production Deployment
```bash
./deploy.sh deploy-prod
```
- Creates `.env` file if missing
- **Performs aggressive Docker cleanup**:
  - Stops existing containers
  - Removes all unused images, containers, and networks
  - Clears build cache
- Updates `.env` with production URLs
- Builds and starts containers

#### Container Management
```bash
# Stop containers
./deploy.sh stop

# Start containers
./deploy.sh start

# Restart containers
./deploy.sh restart
```

#### Monitoring and Debugging
```bash
# Show container status and recent logs
./deploy.sh status

# Show live logs
./deploy.sh logs
```

#### Cleanup Operations
```bash
# Full cleanup (stops containers, removes images, volumes, networks)
./deploy.sh cleanup
```

### Environment Configuration

The script automatically creates a `.env` file if it doesn't exist. You can also create it manually:

```env
# Database Configuration (SQLite with encryption)
DatabasePassword=YourSecurePassword123!

# API Configuration
ASPNETCORE_ENVIRONMENT=Docker

# Client Configuration (Development)
REACT_APP_API_URL=http://localhost:5190/chat-api
REACT_APP_WS_URL=http://localhost:5190/Hub
REACT_APP_BASE_PATH=

# Client Configuration (Production)
# REACT_APP_API_URL=https://api.zakharii.dev/projects/chat/chat-api
# REACT_APP_WS_URL=https://api.zakharii.dev/projects/chat/Hub
# REACT_APP_BASE_PATH=/projects/chat
```

### Access Points

After deployment, your application will be available at:
- **Client**: http://localhost:8082
- **API**: http://localhost:5190
- **API Documentation**: http://localhost:5190/swagger

### Docker Storage Management

The production deployment (`deploy-prod`) includes aggressive cleanup to prevent storage issues on your server:

- **`docker system prune -a -f`**: Removes all unused images, containers, and networks
- **`docker builder prune -f`**: Removes build cache
- **`docker-compose down`**: Stops and removes existing containers

This ensures your server won't run out of storage during deployments.

### Manual Docker Commands

If you prefer to use Docker commands directly:

```bash
# Development
docker-compose up --build -d

# Production (with cleanup)
docker-compose down
docker system prune -a -f
docker builder prune -f
docker-compose up --build -d
```

## Description

Chat is a web application designed for real-time communication, featuring private and group chat rooms. It utilizes **.NET Core** for the backend API, **ReactJS** for the frontend interface, and integrates various technologies such as **Entity Framework**, **Identity**, **SignalR**, and **SQLite** to provide a robust chatting experience. The backend follows the service-repository pattern for better organization and scalability.

## Features

- **User Authentication:** Secure user account creation and password login.
- **Private Chat Rooms:** Create one-on-one private chat rooms.
- **Group Chats:** Create group chat rooms for multiple participants.
- **Member Management:** Add or remove members from group chats.
- **Group Renaming:** Allow group chat creators to rename the group.
- **Message Interaction:** Like, unlike, mark as read, and delete messages.
- **Message Display:** Show messages with sender username and avatar, timestamp, likes, and read status.
- **User Profile:** Users can change their bio and avatar.
- **Data Pagination:** Implement pagination for users, chats, and messages.
- **Chat Organization:** Serve chats chronologically with recent activity on top.
- **Message Display:** Display chat messages chronologically.
- **Access Control:** Users can only see chats and messages sent during their valid membership period.
- **Notifications:** Send relevant updates to chat rooms, such as renaming groups or member changes.

## Technology Stack

- **Backend**: .NET 8, Entity Framework Core, ASP.NET Core Identity, SignalR
- **Database**: SQLite with encryption
- **Frontend**: React 19, TypeScript, Redux Toolkit, Bootstrap
- **Real-time**: SignalR WebSockets
- **Deployment**: Docker, Docker Compose
- **Security**: SQLite encryption, ASP.NET Core Identity, CORS protection

## Architecture

- **API Layer**: RESTful controllers with SignalR hubs for real-time communication
- **Service Layer**: Business logic implementation
- **Repository Layer**: Data access abstraction
- **Entity Framework**: ORM with SQLite provider
- **Identity**: User authentication and authorization
- **SignalR**: Real-time messaging and notifications

## DB Schema:
![Image Alt Text](https://github.com/Zakharii-Husar/chat/blob/main/API/Avatars/CHAT_DB_SCHEMA.png)

## Deployed:
[You can check the live demo here](https://api.zakharii.dev/projects/chat)

## Acknowledgements
Special thanks to my instructor [Carlos Osoria](https://github.com/cosoria) for introducing design patterns in .NET Core, which were implemented in the backend.
