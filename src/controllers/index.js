const { getQuestions, getTopics } = require("../data");
const { QuestionModel, TopicModel } = require("../models");

const storeData = async (req, res) => {
  try {
    const questionsFromFile = await getQuestions();
    const questions = await QuestionModel.insertMany(questionsFromFile, {
      ordered: true,
    });
    const topicsFromFile = await getTopics();
    const topics = await TopicModel.insertMany(topicsFromFile, {
      ordered: true,
    });
    return res.status(201).send({ questions, topics });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Error storing data');
  }
};

const searchQuestions = async (req, res) => {
  try {
    const topicName = req.query.q;
    
    if (!topicName) {
      return res.status(400).send("Specify topic name with ?q=...")
    }

    const questionNumbers = await getQuestionsForTopicName(topicName);

    res.status(200).send(questionNumbers);
  } catch (e) {
    console.error(e);
    return res.status(500).send('Error searching');
  }
}

const getQuestionsForTopicName = async topicName => {  
  const topics = await TopicModel.find({ hierarchy: topicName }).lean();

  if (!topics.length) {
    return [];
  }
  // same for all topics
  const topicNameLevel = topics[0].hierarchy.indexOf(topicName);

  const topicNames = topics.reduce((tpcNms, tpc) => {
    return new Set([...tpc.hierarchy.slice(topicNameLevel), ...tpcNms]);
  }, new Set());
  const topicPromises = [...topicNames].map(topicName => QuestionModel.find({ annotations: topicName }).lean());
  const topicQuestions = await Promise.all(topicPromises);

  const questions = topicQuestions.flat(1);
  const questionNumbers = questions.map(question => question.questionNumber);
  return questionNumbers;
}

module.exports = {
  storeData,
  searchQuestions
};