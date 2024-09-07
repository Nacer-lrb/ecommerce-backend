# E-Commerce API

This project is an API for managing users and products, built using Node.js, Express, MongoDB, and Cloudinary for image storage. The API handles user registration, login, product creation, and deletion, along with user authentication, authorization, and more.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- User Registration, Login, Logout
- JWT Authentication
- Role-based authorization (admin, seller, etc.)
- Product creation, retrieval, and deletion
- Image upload to Cloudinary
- Validation for required fields and unique slugs for products

## Technologies

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary (for image uploads)
- JWT (JSON Web Token) for authentication
- bcrypt.js for password hashing
- express-async-handler for error handling
- dotenv for environment variables

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nacer-lrb/ecommerce-backend.git

2. Install the dependencies:
    ```bash
    cd yourproject
    npm install
3. Set up the  ```.env  ```  file in the root directory with the required environment variables (see below).

    Run the application:
    ```bash
      npm start  

## Usage

Create an account by sending a POST request to ```/api/users/register```.

Login using ```/api/users/login```.

Use the JWT token provided to access protected routes.

Sellers can create, delete, and manage products using appropriate routes.


## API Endpoints

#### User Routes

``` POST /api/users/register``` : Register a new user.

POST /api/users/login``` : Log in a user

``` GET /api/users/logout``` : Log out the user

 ``` GET /api/users/getuser``` : Get current user info

``` GET /api/users/users```  : Get all users (admin only)

#### Product Routes

``` POST /api/products``` : Create a new product (seller only)

``` GET /api/products``` : Get all products

``` DELETE /api/products``` : Delete all product




## Environment Variables

Create a ``` .env``` file in the root of the project with the following variables:

```
PORT = 5000

DATABASE_CLOUD=your_mongo_uri

NODE_ENV = 

JWT_SECRET = your_jwt_secret

CLOUDINARY_URL=your_cloudinary_uri
