const processTranscript = require('../../../UseCases/TranscriptUseCases/intentIdentifyInteractor')
const sampleTranscript = require('../../sample transcripts/transcript1.json')
const sampleTranscript2 = require('../../sample transcripts/transcript2.json')
const sampleTranscript3 = require('../../sample transcripts/transcript3.json')

describe('processed sample transcript', () => {
    test('has correct values for one transcript', () => {
        const processedTranscript = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
            ['find_hotel', [2, new Map([['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);
        expect(processTranscript(new Map(), [sampleTranscript])).toEqual(processedTranscript)
    })

    test('has correct values for multiple transcripts', () => {
        const processedTranscript = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
            ['find_hotel', [6, new Map([['book_hotel', 3]])]],
            ['book_hotel', [4, new Map()]],
            ['find_train', [3, new Map([['find_hotel', 1]])]]
        ]);
        expect(processTranscript(new Map(), [sampleTranscript,
            sampleTranscript2, sampleTranscript3])).toEqual(processedTranscript)
    })

    test('processes transcripts and adds them correctly to itself', () => {
        const existingMap = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
            ['find_hotel', [2, new Map([['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);

        const processedTranscript = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
            ['find_hotel', [6, new Map([['book_hotel', 3]])]],
            ['book_hotel', [4, new Map()]],
            ['find_train', [3, new Map([['find_hotel', 1]])]]
        ]);

        expect(processTranscript(existingMap,
            [sampleTranscript2, sampleTranscript3])).toEqual(processedTranscript)
    })
})
