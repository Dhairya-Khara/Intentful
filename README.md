# Intentful
This is the Techy Blinders' Voiceflow Project! (ft. Berke Altiparmak, Chenika Bukes, Krishna Cheemalapati, Dhairya Khara, Aidan Li)

Intentful is potentially an add-on feature for Voiceflow to help Voiceflow customers set up their environment faster and smarter. 
Intentful allows you, a retail company, to upload your transcripts of conversations between the customers and your chat app, and then for each message Intentful detects the "intent" (i.e., 'buy pizza') of the message. It keeps a track of the frequency of the intents so that while setting up your Voiceflow environment, you can prioritize those intents and maximize the customer satisfaction. 
In addition, Intentful identifies "intent associates," the most frequent intents that come after a specific intent, which is a great feature to have while building your novel chat bot. For example, 'buy fries' being the most frequent intent after 'buy cheeseburger' intent can help you build a chatbot such that it asks the users whether they want fries after they mention they want a cheeseburger. 
Consequently, Intentful is perfect to both get you started on Voiceflow and maximize your experience with Voiceflow.

## Getting Started
- Install MongoDB and NodeJS
- Clone the repo
- Start MongoDB on port 27017 (the default MongoDB port)
- To start the client run `cd client`, `npm install`, `npm run start` from the root of the project.
- To start the server run `cd server`, `npm install`, `npm run start` from the root of the project. Note, if you have `nodemon` installed, you can also run `npm run dev` instead of `npm run start` for a better development experience.

If everything is done correctly, you can visit `http://localhost:3000/` in your favourite browser to start using the Application.
