/**
 * Tests for the transcriptProcessInteractor Use Case.
 * Tests that transcripts from the "original"/simplified format will be converted with the correct intent values,
 * with single and multiple transcripts, and also updates a user's existing intents corrrectly.
 * If more steps are added to the transcriptProcessInteractor, we will update and add additional tests here.
 */

const transcriptProcessInteractor = require('../../../UseCases/TranscriptUseCases/transcriptProcessInteractor')
const sampleTranscript = require('../../sample transcripts/transcript1.json')
const sampleTranscript2 = require('../../sample transcripts/transcript2.json')
const sampleTranscript3 = require('../../sample transcripts/transcript3.json')

describe('processed sample transcript', () => {
    test('has correct values for one transcript', () => {
        const processedTranscript = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 3]])]],
            ['find_hotel', [4, new Map([['find_restaurant', 2], ['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);
        expect(transcriptProcessInteractor(new Map(), [sampleTranscript])).toEqual(processedTranscript)
    })

    test('has correct values for multiple transcripts', () => {
        const processedTranscript = new Map([
            ['find_restaurant', [5, new Map([['find_hotel', 4], ['book_hotel', 1]])]],
            ['find_hotel', [8, new Map([['find_restaurant', 4], ['book_hotel', 2]])]],
            ['book_hotel', [4, new Map()]],
            ['find_train', [3, new Map([['find_hotel', 1]])]]
        ]);
        expect(transcriptProcessInteractor(new Map(), [sampleTranscript,
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

        expect(transcriptProcessInteractor(existingMap,
            [sampleTranscript2, sampleTranscript3])).toEqual(processedTranscript)
    })
})
