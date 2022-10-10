const axios = require('axios')

const requests = require('requests');
const api_key = 'VF.DM.6331204c9575ca00085c3fee.3xaArTcugE4obpnp';
// project id if no defined version
const version = '632b79c564484143a984b02e';
const url = 'https://api-dm-test.voiceflow.fr/exportraw/' + api_key + '?versionID=' + version;
console.log(url)
let a = ""
axios.get(url).then( (res) => {
    console.log()
    console.log(res)
})
// Log the response
var r = a;
console.log(r)
var transcript = r[1];
var relevant = [];
for (item in transcript) {
	if (item['type'] == 'request') {
		relevant.push(item);
	} 
    else if (item['type'] == 'text') {
		relevant.push(item);
	}
}
console.log(relevant);
var just_text = [];
for (item in relevant) {
	var m = item['payload']['payload'];
	// entity reprompt mode
	if (item['type'] == 'entity-filling') {
		var short = r[2]['payload']['intent']['payload'];
		var confidence = short['confidence'];
		var resolved_intent = short['intent']['name'];
		var entities = short['entities'];
		just_text.push([resolved_intent,confidence,entities]);
	// regular mode
	} 
    else if ('message' in m) {
		if (isinstance(m['message'], String)) {
			just_text.push(m['message']);
	    }
    } 
    else if ('intent' in m) {
        var confidence = m['confidence'];
        var resolved_intent = m['intent'];
        if (resolved_intent != 'None') {
            var entities = m['entities'];
        } 
        else {
            var entities = {};
        }
    }
}
console.log(just_text);
// can see here for examples of api usage
// https://github.com/voiceflow/nlu-testing-example/blob/27dc9c87d36f061186d9962806086931ad50d91a/src/main.py