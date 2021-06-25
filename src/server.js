require('dotenv').config();
const express = require('express');
const {
  storeData,
  searchQuestions
} = require('./controllers');
const mongoose = require('mongoose');

const app = express();

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDb connection success.');
  } catch(e) {
    console.error('MongoDb connection failed.', e);
  }
};

connectMongoDb();

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

app.get('/', (req, res) => {
  res.send('Endpoints:  GET "/search" and POST "/storeData"');
});

app.get('/search', searchQuestions);

app.post('/storeData', storeData);