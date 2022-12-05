# Intentful
This is the Techy Blinders' Voiceflow Project! (ft. Berke Altiparmak, Chenika Bukes, Krishna Cheemalapati, Dhairya Khara, Aidan Li)

Intentful was made to help retail companies turn transcripts into conversational assistants. Intentful is potentially an add-on feature for Voiceflow that helps Voiceflow users set up their environment on the Voiceflow platform faster and smarter.

Intentful allows you, a retail company, to find out what matters the most to your customers. After uploading your transcripts of conversations between the customers and your chat app, Intentful detects the "intent" (e.g. 'buy_pizza') of each human message in a single transcript. It keeps track of how many times each intent has occurred in the conversation(s), so that while setting up your Voiceflow environment, you can prioritize those intents to maximize customer utility.

Intentful also identifies "intent associates": the most frequent intents that come after a specific intent. By letting you know the most common conversation sequences, we help you choose better options for building conversation logic/flow with greater depth. For example, if 'buy_fries' is the most frequent intent after the 'buy_cheeseburger' intent, you can build a chatbot that asks the users whether they would like fries after they mention they want a cheeseburger. 

Consequently, Intentful is perfect to both get you started on Voiceflow and maximize your experience with Voiceflow.

## Getting Started
- Install MongoDB and NodeJS
- Clone the repo
- Start MongoDB on port 27017 (the default MongoDB port)
- To start the client run `cd client`, `npm install`, `npm run start` from the root of the project.
- To start the server run `cd server`, `npm install`, `npm run start` from the root of the project. Note, if you have `nodemon` installed, you can also run `npm run dev` instead of `npm run start` for a better development experience.

If everything is done correctly, you can visit `http://localhost:3000/` in your favourite browser to start using the application.

To run the application in your browser, go to: https://intentful.herokuapp.com/
