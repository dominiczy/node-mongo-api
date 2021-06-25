const csv = require("csv-parser");
const fs = require("fs");

const parseCsv = async path => {
  const rows = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      return resolve(rows);
    });
  });
}

const transformQuestions = questions => {
  return questions.map(question => {
    const questionNumber = question["Question number"];
    delete question["Question number"];
    const annotations = Object.values(question).filter(questionStr => questionStr);
    return { questionNumber, annotations };
  })
}

const getQuestions = async () => {
  const questionsRaw = await parseCsv('src/data/rawData/Questions and Topics - Questions.csv');
  const questions = transformQuestions(questionsRaw);
  return questions;
}

const transformTopics = topics => {
  return topics.map((topic, topicNumber) => {
    const hierarchy = Object.values(topic).filter(topicStr => topicStr);
    return { topicNumber, hierarchy };
  })
}

const getTopics = async () => {
  const topicsRaw = await parseCsv('src/data/rawData/Questions and Topics - Topics.csv');
  const topics = transformTopics(topicsRaw);
  return topics;
}

module.exports = {
  getQuestions,
  getTopics
};