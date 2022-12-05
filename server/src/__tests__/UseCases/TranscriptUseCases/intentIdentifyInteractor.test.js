/**
 * Tests for the intentIdentifyInteractor Use Case.
 * Tests that intents are identified and aggregated correctly from both single and multiple transcripts,
 * and also updates a user's existing intents corrrectly.
 */

const intentIdentifyInteractor = require('../../../UseCases/TranscriptUseCases/intentIdentifyInteractor');
const sampleTranscript = require('../../sample transcripts/transcript1.json');
const sampleTranscript2 = require('../../sample transcripts/transcript2.json');
const sampleTranscript3 = require('../../sample transcripts/transcript3.json');

describe('intentIdentifierInteractor test', () => {
    test('returns correct values for one transcript', () => {
        const processedTranscript = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 3]])]],
            ['find_hotel', [4, new Map([['find_restaurant', 2], ['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);
        expect(intentIdentifyInteractor(new Map(), [sampleTranscript])).toEqual(processedTranscript)
    })

    test('has correct values for multiple transcripts', () => {
        const processedTranscript = new Map([
            ['find_restaurant', [5, new Map([['find_hotel', 4], ['book_hotel', 1]])]],
            ['find_hotel', [8, new Map([['find_restaurant', 4], ['book_hotel', 2]])]],
            ['book_hotel', [4, new Map()]],
            ['find_train', [3, new Map([['find_hotel', 1]])]]
        ]);
        expect(intentIdentifyInteractor(new Map(), [sampleTranscript,
            sampleTranscript2, sampleTranscript3])).toEqual(processedTranscript)
    })

    test('processes transcripts and adds them correctly to itself', () => {
        const existingMap = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
            ['find_hotel', [2, new Map([['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);

        const processedTranscript = new Map([
            ['find_restaurant', [5, new Map([['find_hotel', 2], ['book_hotel', 1]])]],
            ['find_hotel', [6, new Map([['book_hotel', 2], ['find_restaurant', 2]])]],
            ['book_hotel', [4, new Map()]],
            ['find_train', [3, new Map([['find_hotel', 1]])]]
        ]);

        expect(intentIdentifyInteractor(existingMap,
            [sampleTranscript2, sampleTranscript3])).toEqual(processedTranscript)
    })
})
