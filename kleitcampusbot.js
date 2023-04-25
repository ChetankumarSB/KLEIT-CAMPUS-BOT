const express = require('express');
const bodyParser = require('body-parser');
const { NlpManager } = require('node-nlp');
const csv = require('csv-parser');
const fs = require('fs');

// Create a new NLP manager
const manager = new NlpManager({ languages: ['en'] });

// Read the document CSV file and add documents to the NLP manager
fs.createReadStream('questions.csv')
  .pipe(csv())
  .on('data', (row) => {
    const { language, text, intent } = row;
    manager.addDocument(language, text, intent);
  })
  .on('end', () => {
    console.log('Documents added to NLP manager');
    // Read the answer CSV file and add answers to the NLP manager
    fs.createReadStream('answers.csv')
      .pipe(csv())
      .on('data', (row) => {
        const { language, intent, answer } = row;
        manager.addAnswer(language, intent, answer);
      })
      .on('end', () => {
        console.log('Answers added to NLP manager');
        manager.train();
      });
  });

const app = express();
app.use(bodyParser.json());

// Handle incoming chatbot requests
app.post('/chat', async (req, res) => {
  const response = await manager.process('en', req.body.message);
  if (response.intent === 'exit') {
    res.json({ message: 'Exiting chatbot...' });
  } else {
    res.json({ message: response.answer || "I'm not sure what you mean." });
  }
});

// Serve the chatbot UI
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => console.log('Chatbot listening on port 3000!'));
