const multiWOZconverter = require('../utils/multiWOZconverter')

const convertMultiWOZ = (transcript_json_list) => {
    if (checkMultiWOZ === true) { // toggle multiWOZ with a button or something
        let convertedMultiWOZlist = multiWOZconverter(transcript_json_list)
        return convertedMultiWOZlist
    }
    return transcript_json_list
}

module.exports = convertMultiWOZ