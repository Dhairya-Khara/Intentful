# Intentful
This is the Techy Blinders' Voiceflow Project! (ft. Berke Altiparmak, Chenika Bukes, Krishna Cheemalapati, Dhairya Khara, Aidan Li)

Intentful is potentially an add-on feature for Voiceflow to help Voiceflow users set up their environment on the Voiceflow platform faster and smarter.

Intentful allows you, a retail company, to find out what matters the most to your customers. After uploading your transcripts of conversations between the customers and your chat app, Intentful detects the "intent" (i.e., 'buy pizza') of each human message in your transcript. It keeps track of how many times each intent has occurred in the conversation(s), so that while setting up your Voiceflow environment, you can prioritize those intents to maximize customer utility.

In addition, Intentful identifies "intent associates": the most frequent intents that come after a specific intent. This helps you build options for conversation logic/flow by letting you know common conversation sequences, and subsequently, you can create more thorough logic for them. For example, 'buy_fries' being the most frequent intent after 'buy_cheeseburger' intent can help you build a chatbot that asks the users whether they would like fries after they mention they want a cheeseburger. 

Consequently, Intentful is perfect to both get you started on Voiceflow and maximize your experience with Voiceflow.

## Getting Started
- Install MongoDB and NodeJS
- Clone the repo
- Start MongoDB on port 27017 (the default MongoDB port)
- To start the client run `cd client`, `npm install`, `npm run start` from the root of the project.
- To start the server run `cd server`, `npm install`, `npm run start` from the root of the project. Note, if you have `nodemon` installed, you can also run `npm run dev` instead of `npm run start` for a better development experience.

If everything is done correctly, you can visit `http://localhost:3000/` in your favourite browser to start using the Application.
