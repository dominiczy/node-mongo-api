# Pencil Backend Assignment (node-mongo-api)
RESTful Node API which queries a MongoDB for questions based on their annotated topic names.

## Requirements
- Node 11 or higher
- MongoDB cluster (for example in MongoDB Atlas)

## Setup
- Install requirements with `npm install`
- Set the connection string to your MongoDB in `src/config.js`
- Start server with `npm run dev`. It will be available on `localhost:3000`.
- Store the data (from the Questions and Topics spreadsheet) in MongoDB by making a POST request to `/storeData`
- Search the data by making a GET request to `/search?q=<TOPICNAME>`

## Hosting
You can use the hosted service at https://pencil-backend.onrender.com/.
It's connected to a MongoDB Atlas cluster with data already uploaded (no need to call `/storeData`).

Example search requests:

https://pencil-backend.onrender.com/search?q=Nutrition%20in%20Humans return question numbers: `[82,125,152,46,63,185,25,34,133,158,188,123,155,131,184,6,80,89,110,47,62,59,6,136,23,60,90]`

https://pencil-backend.onrender.com/search?q=Describe%20the%20structure%20of%20the%20eye%20as%20seen%20in%20front%20view%20and%20in%20horizontal%20section returns question numbers: `[15,23,35,125,180]`

https://pencil-backend.onrender.com/search?q=NotExistingTopic returns question numbers: `[]`