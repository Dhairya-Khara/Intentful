const convertMultiWOZInteractor = require('../../../UseCases/TranscriptUseCases/convertMultiWOZInteractor');
const convertedTranscript1 = require('../../sample transcripts/transcript1.json')
const convertedTranscript2 = require('../../sample transcripts/transcript2.json')
const multiWOZsize1 = require('../../sample transcripts/multiwoz/size1_dialogues_001.json')
const multiWOZsize2 = require('../../sample transcripts/multiwoz/size2_dialogues_001.json')


describe('convertMultiWOZInteractor', () => {
    test('converts one transcript correctly', () => {
        const processedList = [JSON.stringify(convertedTranscript1)];
        expect(convertMultiWOZInteractor(multiWOZsize1)).toEqual(processedList)
    })

    test('converts multiple transcripts correctly', () => {
        const processedList = [JSON.stringify(convertedTranscript1), JSON.stringify(convertedTranscript2)];
        expect(convertMultiWOZInteractor(multiWOZsize2)).toEqual(processedList)
    })
})
