# MongoDB & Express.js Project

A Node.js project demonstrating the integration of Express.js with MongoDB using Mongoose ODM.

## Overview

This is a class notes project that sets up a basic Express.js server with MongoDB connectivity using Mongoose. The application serves as a foundation for building REST APIs with persistent data storage.

## Project Structure

```
12_mongodb/
├── app.js              # Main application file
├── package.json        # Project dependencies
├── package-lock.json   # Locked dependency versions
├── .env                # Environment variables (not committed)
├── .gitignore          # Git ignore rules
└── node_modules/       # Installed packages
```

## Prerequisites

- Node.js 
- MongoDB instance (local or cloud)
- npm or yarn package manager

## Installation

1. Clone or navigate to the project directory:
   ```bash
   cd 12_mongodb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/your_database_name
   ```
   
   For MongoDB Atlas (cloud), use:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
   ```

## Running the Application

Start the Express server:

```bash
npm start
```

Or if you have a start script configured:

```bash
node app.js
```

The application will:
- Start an Express server on port 5000
- Attempt to connect to MongoDB
- Display connection status in the console

Expected output:
```
calıstı
MongoDB bağlandı
```

## Technologies Used

- **Express.js** (^5.2.1) - Web application framework
- **Mongoose** (^9.6.1) - MongoDB object modeling
- **dotenv** (^17.4.2) - Environment variable management

## Configuration

### Environment Variables

The project uses environment variables stored in a `.env` file:

- `MONGO_URI` - MongoDB connection string (required)

### Port

The Express server runs on **port 5000** by default. You can modify this in `app.js`:

```javascript
const PORT = 5000
```

## Next Steps

To expand this project:

1. **Create MongoDB schemas** - Define Mongoose schemas for your data models
2. **Implement routes** - Add Express routes for CRUD operations
3. **Add middleware** - Configure body parser, authentication, etc.
4. **Error handling** - Implement comprehensive error handling
5. **Validation** - Add input validation for API requests

## Troubleshooting

### MongoDB Connection Issues

- Verify `MONGO_URI` is correct in `.env`
- Ensure MongoDB service is running
- Check network connectivity for cloud databases
- Verify credentials for MongoDB Atlas

### Port Already in Use

If port 5000 is already in use, either:
- Kill the process using that port
- Change the `PORT` variable in `app.js`

## License

Class notes project - Educational use only

## Notes

This is a beginner-level project created for learning Node.js with MongoDB integration.


