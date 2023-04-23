const { NlpManager } = require('node-nlp');
const readline = require('readline');

// Create a new NLP manager
const manager = new NlpManager({ languages: ['en'] });

// Train the NLP manager with some sample data
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'how are you', 'greetings.howareyou');
manager.addDocument('en', 'fine', 'greetings.fine');
manager.addDocument('en', 'what is your name', 'greetings.name');
manager.addDocument('en', 'bye', 'greetings.bye');
manager.addDocument('en', 'see you later', 'greetings.bye');
manager.addDocument('en', 'goodbye', 'greetings.bye');
manager.addDocument('en', 'thanks', 'greetings.thanks');
manager.addDocument('en', 'thank you', 'greetings.thanks');
manager.addDocument('en', 'quit', 'exit');


// Need to add similar Train sample data
manager.addDocument('en', 'What majors do you offer?', 'college.majors');
manager.addDocument('en', 'Can you tell me about your tuition fees?', 'college.tuition');
manager.addDocument('en', 'What is the application process like?', 'college.application');
manager.addDocument('en', 'Do you have any scholarships available?', 'college.scholarships');
manager.addDocument('en', 'What extracurricular activities are offered?', 'college.activities');

// Train the NLP manager
manager.train();

// Add some responses for the "greetings.name" intent
manager.addAnswer('en', 'greetings.hello', "hello");
manager.addAnswer('en', 'greetings.name', "I'm a chatbot!");
manager.addAnswer('en', 'greetings.howareyou', "fine");
manager.addAnswer('en', 'greetings.bye', "good bye");
manager.addAnswer('en', 'greetings.thanks', "thank you");

// Need to add some responses
manager.addAnswer('en', 'college.majors', 'We offer a wide range of majors including Business, Engineering, and Computer Science.');
manager.addAnswer('en', 'college.tuition', 'Our tuition fees vary based on the program and degree level. You can find more information on our website.');
manager.addAnswer('en', 'college.application', 'The application process involves submitting your transcripts, test scores, and an essay. You can find more information on our website.');
manager.addAnswer('en', 'college.scholarships', 'Yes, we offer several scholarships for students who demonstrate academic excellence and financial need. You can find more information on our website.');
manager.addAnswer('en', 'college.activities', 'We have a variety of clubs and organizations for students to get involved in including sports teams, music groups, and academic clubs.');



// Create a function to handle user input
async function handleInput(input) {
//   console.log(`Received input: ${input}`);
  const response = await manager.process('en', input);
//   console.log(`Response: ${JSON.stringify(response)}`);
  if (response.intent === 'exit') {
    console.log('Exiting chatbot...');
    process.exit();
  } else {
    console.log(response.answer || "I'm not sure what you mean.");
  }
}

// Start a conversation with the chatbot
console.log('Type "quit" to exit.');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', async (input) => {
  await handleInput(input.trim());
});
