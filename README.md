# MERN Book Search Engine

## Description

MERN Book Search Engine is a full-stack web application that allows users to search for books using the Google Books API, save favorite titles to a personal collection, and manage saved books through a simple and intuitive interface.

The app is built with the MERN stack (MongoDB, Express, React, Node.js), using Apollo Server and GraphQL for API communication and JWT authentication for secure user access.

## Features

- Search for books via the Google Books API
- Save books to a personal collection
- Remove books from the saved list
- User authentication with JWT (sign up, log in, stay logged in)
- GraphQL API powered by Apollo Server
- Modern front-end built with React and Vite
- Deployed on Render with MongoDB Atlas

## Technologies Used

- Frontend: React, Vite, TypeScript
- Backend: Node.js, Express, Apollo Server
- Database: MongoDB (Atlas)
- Authentication: JSON Web Tokens (JWT)
- API Integration: Google Books API
- Deployment: Render

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/iaplesnyc/MERN-Book-Search-Engine.git
cd MERN-Book-Search-Engine
```

### 2. Install Dependencies

**Client:**

```bash
cd client
npm install
```

**Server:**

```bash
cd ../server
npm install
```

### 3. Set Environment Variables

Create a `.env` file inside the `server` directory with the following:

```bash
MONGODB_URI=your-mongodb-connection-uri
JWT_SECRET_KEY=your-secret-key
NODE_ENV=development
```

### 4. Run the Development Servers

**Client:**

```bash
cd client
npm run dev
```

**Server:**

```bash
cd server
npm run dev
```

## Deployment

### Build Command on Render

```bash
cd client && npm install --production=false && npm run build && cd ../server && npm install && npm run build
```

### Start Command on Render

```bash
cd server && npm run start
```

### Environment Variables on Render

- MONGODB_URI
- JWT_SECRET_KEY
- NODE_ENV=production

## Usage

- Sign up for an account
- Log in to your dashboard
- Search for books
- Save books to your collection
- Manage your saved books list

Render link: https://mern-book-search-engine-s6xv.onrender.com

## Screenshot

![MERN Book Search Engine Screenshot](assets/Screenshot%202025-04-28%20194257.png)
