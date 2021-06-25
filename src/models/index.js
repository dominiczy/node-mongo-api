const { Schema, model } = require('mongoose');

const topicSchema = new Schema({
  topicNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  hierarchy: [String],
});

const questionSchema = new Schema({
  questionNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  annotations: [String],
});

const QuestionModel = model('Questions', questionSchema);
const TopicModel = model('Topics', topicSchema);

module.exports = {
   QuestionModel,
   TopicModel,
};
