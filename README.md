# Intentful
This is the Techy Blinders' Voiceflow Project!

Intentful was made to help retail companies turn transcripts into conversational assistants. Intentful is potentially an add-on feature for Voiceflow that helps Voiceflow users set up their environment on the Voiceflow platform faster and smarter.

Intentful allows you, a retail company, to find out what matters the most to your customers. After uploading your transcripts of conversations between the customers and your chat app, Intentful detects the "intent" (e.g. 'buy_pizza') of each human message in a single transcript. It keeps track of how many times each intent has occurred in the conversation(s), so that while setting up your Voiceflow environment, you can prioritize those intents to maximize customer utility.

Intentful also identifies "intent associates": the most frequent intents that come after a specific intent. By letting you know the most common conversation sequences, we help you choose better options for building conversation logic/flow with greater depth. For example, if 'buy_fries' is the most frequent intent after the 'buy_cheeseburger' intent, you can build a chatbot that asks the users whether they would like fries after they mention they want a cheeseburger. 

Consequently, Intentful is perfect to both get you started on Voiceflow and maximize your experience with Voiceflow.

## Authors
<ul>
  <li> <a href="https://github.com/BerkeAltiparmak">Berke Altiparmak</a></li>
  <li> <a href="https://github.com/chenikabukes">Chenika Bukes</a></li>
  <li> <a href="https://github.com/krishnacheemalapati">Krishna Cheemalapati</a></li>
  <li> <a href="https://github.com/Dhairya-Khara">Dhairya Khara</a></li>
  <li> <a href="https://github.com/aidanmrli">Aidan Li</a></li>
 </ul>

## Features:
### Landing Page 
- Register, Log-in functionality
- Team Bios
### Dashboard
- Upload single or multiple transcripts in a dialogue.json file
- View previously uploaded transcripts
- Ability to visualize all intents of an individual transcript, or all intents of all previously uploaded transcripts
- See an intent's associates and their frequency by clicking on the intent's bubble
- Create an intent block with that labelled intent on the Voiceflow site using the Modal (by entering Voiceflow info)

## Getting Started
- Install MongoDB and NodeJS
- Clone the repo
- Start MongoDB on port 27017 (the default MongoDB port)
- To start the client run `cd client`, `npm install`, `npm run start` from the root of the project.
- To start the server run `cd server`, `npm install`, `npm run start` from the root of the project. Note, if you have `nodemon` installed, you can also run `npm run dev` instead of `npm run start` for a better development experience.

If everything is done correctly, you can visit `http://localhost:3000/` in your favourite browser to start using the application.

To run the application in your browser, go to: https://intentful.herokuapp.com/

To see documentation for our Use Case Logic, visit https://intentful-docs.herokuapp.com/

