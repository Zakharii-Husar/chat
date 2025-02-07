# Chat App

## Deploy Containers

### DB Container

1. Build: ``sudo docker build -t chat-db -f DB/Dockerfile .``

2. Run: ```
sudo docker run -d \
  --name chat-db \
  --network host \
  -e "ACCEPT_EULA=Y" \
  -e "MSSQL_SA_PASSWORD=YourStrongPassword123!" \
  -e "MSSQL_ENCRYPT=OPTIONAL" \
  -p 1433:1433 \
  chat-db
  ```



### API Container

1. Build: ``sudo docker build -t chat-api -f API/Dockerfile . ``

2. Run: ```
sudo docker run -d \
  --name chat-api \
  --network host \
  -e "DB_SERVER=localhost,1433" \
  -e "DB_NAME=chat" \
  -e "DB_USERNAME=sa" \
  -e "DB_PASSWORD=YourStrongPassword123!" \
  -p 5190:80 \
  chat-api
  ```

## Description

Chat is a web application designed for real-time communication, featuring private and group chat rooms. It utilizes **.NET Core** for the backend API, **ReactJS** for the frontend interface, and integrates various technologies such as **Entity Framework**, **Identity**, **SignalR**, and **SQL Server** to provide a robust chatting experience. The backend follows the service-repository pattern for better organization and scalability.

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
- **Live Updates:** Real-time updates using web sockets for incoming messages, likes, read receipts, etc.

## DB Schema:
![Image Alt Text](https://github.com/Zakharii-Husar/chat/blob/main/API/Avatars/CHAT_DB_SCHEMA.png)

## Deployed:
[You can check the live demo here](https://api.zakharii.dev/projects/chat)

## Acknowledgements
Special thanks to my instructor [Carlos Osoria](https://github.com/cosoria) for introducing design patterns in .NET Core, which were implemented in the backend.
