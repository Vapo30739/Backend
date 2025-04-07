## Overview

This project is a backend server built using Node.js and Express for an E-Commerce Gallery. The backend provides various functionalities such as user authentication, product management, order processing, and file uploads, deployed on Vercel as a serverless function.

## Features

- **User Authentication**: Utilizes `bcryptjs` for password hashing and `jsonwebtoken` for generating and verifying JWT tokens.
- **File Uploads**: Supports file uploads using `busboy` and integrates with Cloudinary for cloud storage.
- **Database Interaction**: Uses `mongoose` to interact with a MongoDB database.
- **Logging**: Implements request logging using `morgan`.
- **Environment Variables**: Manages environment variables securely using `dotenv`.

## Prerequisites

Before running the project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Cloudinary](https://cloudinary.com/) account (for file uploads)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ghassan1199/AboMariamVapeStoreBackEnd.git
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
5. Create a .env file in the root directory and add your environment variables:
  ```ini
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  PORT=3000
  ```
## Running the Project Locally
To run the project locally, use the following command:
```bash 
npm start
```
This will start the server using nodemon, which automatically restarts the server when changes are made.

