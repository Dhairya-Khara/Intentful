// fetch('./transcript1.json')   // to fetch json file from local 
//     .then((response) => response.json())
//     .then((json) => console.log(json));

import transcript1 from './transcript1.json' assert { type: 'json' };
import transcript2 from './transcript2.json' assert { type: 'json' };
import transcript3 from './transcript3.json' assert { type: 'json' };



function getIntents(transcript_json) {
    let intentsArray = [];
    for (let i = 0; i < transcript_json.length; i++) {
        let message = transcript_json[i];

        if (message.intents.length > 0) { // removes no intents
            intentsArray.push(message.intents);
        }
    }
    // Aidan: maybe at some point we incorporate functionality to see
    // who the intents came from (system or user)
    return intentsArray;
}
console.log(getIntents(transcript3));