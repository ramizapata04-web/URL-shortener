# Project Setup Guide

## Overview
This is a URL Shortener Microservice built with Node.js, Express, and MongoDB.

## Prerequisites
- Node.js 18.x
- MongoDB 7.0
- npm

## Installation

### 1. Environment Configuration
Copy the sample environment file and configure it:
```bash
cp sample.env .env
```

Edit `.env` with your configuration:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/urlshortener
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start MongoDB
MongoDB needs to be running before starting the application:
```bash
mkdir -p /data/db
mongod --fork --logpath /tmp/mongodb.log --dbpath /data/db
```

### 4. Start the Application
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Test Endpoint
- **GET** `/api/hello`
  - Returns: `{"greeting": "hello API"}`

## Project Structure
```
.
├── index.js           # Main application file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (not in git)
├── sample.env        # Environment template
├── views/            # HTML templates
├── public/           # Static files
└── .devcontainer/    # Dev container configuration
```

## Development

### Dev Container
This project includes a dev container configuration with:
- Node.js 18.x
- MongoDB 7.0
- All required dependencies

The dev container automatically sets up the development environment.

## Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **body-parser**: Request body parsing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Notes
- MongoDB must be running before starting the application
- The application connects to MongoDB on startup
- Default port is 3000 (configurable via .env)
