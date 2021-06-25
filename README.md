# Pencil Backend Assignment (mongo-node)
RESTful Node API which queries a MongoDB for questions based on their annotated topic names.

## Requirements
- Node 11 or higher
- MongoDB cluster (for example in MongoDB Atlas)

## Usage
- Install requirements with `npm install`
- Set the connection string to your MongoDB in `src/config.js`
- Start server with `npm run dev`. It will be available on `localhost:3000`.
- Store the data (from the Questions and Topics spreadsheet) in MongoDB by making a POST request to `/storeData`
- Search the data by making a GET request to `/search?q=<TOPICNAME>`
