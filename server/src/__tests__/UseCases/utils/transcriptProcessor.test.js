const processTranscript = require('../../../UseCases/utils/transcriptProcessor')
const sampleTranscript = require('../../sample transcripts/transcript1.json')

test('processed sample transcript has correct values', () => {
    const processedTranscript = new Map([
        ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
        ['find_hotel', [2, new Map([['book_hotel', 1]])]],
        ['book_hotel', [1, new Map()]]
    ]);
    const newMap = new Map();
    expect(processTranscript(newMap, [sampleTranscript])).toEqual(processedTranscript)
})
