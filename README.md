# Real-Time Messaging App Backend

This is a backend server built using Node.js and Socket.IO, providing real-time messaging functionality for a messaging application. The server utilizes JWT (JSON Web Tokens) authentication for secure user authentication and authorization.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
  - [Authentication](#authentication)
  - [User](#user)
  - [Chat](#chat)
  - [Chat Messages](#chat-messages)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```
3. Create the following directories in the project root:
- `uploads/image`: This directory is used to store uploaded images for chat messages.
- `uploads/avatar`: This directory is used to store user avatars.

4. Create a `.env` file in the project root with the following credentials:
```js
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_NAME=your_database_name
DB_USER=your_database_username
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret_key
```


Replace with the credentials for your MongoDB database. Additionally, provide a unique `JWT_SECRET` key for JSON Web Token encryption.

5. Start the server:

```bash
npm run start
```

## API Routes

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in with existing credentials.
- **POST /api/auth/refresh_access_token**: Refresh the access token.

### User

- **GET /api/user/getUser**: Get the logged-in user's details.
- **PATCH /api/user/me**: Update the logged-in user's profile.
- **GET /api/user/getUsers**: Get all users.
- **GET /api/user/:id**: Get a user by ID.

### Chat

- **POST /api/chat/create**: Create a new chat.
- **GET /api/chat/**: Get all chats.
- **DELETE /api/chat/:id**: Delete a chat by ID.
- **GET /api/chat/:id**: Get a chat by ID.

### Chat Messages

- **POST /api/chat/message**: Send a text message to a chat.
- **POST /api/chat/message/image**: Send an image message to a chat.
- **GET /api/chat/message/:chatId**: Get all messages for a chat.
- **GET /api/chat/message/total/:chatId**: Get the total number of messages for a chat.
- **GET /api/chat/message/last/:chatId**: Get the last message for a chat.



