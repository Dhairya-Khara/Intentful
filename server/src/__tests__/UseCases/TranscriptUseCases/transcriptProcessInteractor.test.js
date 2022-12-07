/**
 * Tests for the transcriptProcessInteractor Use Case.
 * Tests that transcripts from the original/simplified format will be converted with the correct intent values,
 * with single and multiple transcripts, and also updates a user's existing intents corrrectly.
 * If more steps are added to the transcriptProcessInteractor, we will update and add additional tests here.
 * IMPORTANT: we mock the implementation of intentIdentifyInteractor used in transcriptProcessInteractor.
 */

const transcriptProcessInteractor = require('../../../UseCases/TranscriptUseCases/transcriptProcessInteractor')
const sampleTranscript = require('../../sample transcripts/transcript1.json')
const sampleTranscript2 = require('../../sample transcripts/transcript2.json')
const sampleTranscript3 = require('../../sample transcripts/transcript3.json')

// Mocking the implementation of intentIdentifyInteractor
const intentIdentifyInteractor = require('../../../UseCases/TranscriptUseCases/intentIdentifyInteractor')
jest.mock('../../../UseCases/TranscriptUseCases/intentIdentifyInteractor')
intentIdentifyInteractor.mockImplementation((map, arrayOfTranscripts) => arrayOfTranscripts.length + map.size)

describe('processed sample transcript', () => {
    afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('has correct values for one transcript', () => {
        expect(transcriptProcessInteractor(new Map(), [sampleTranscript])).toEqual(1)
    })

    test('has correct values for multiple transcripts', () => {
        expect(transcriptProcessInteractor(new Map(), [sampleTranscript,
            sampleTranscript2, sampleTranscript3])).toEqual(3)
    })

    test('processes transcripts and adds them correctly to itself', () => {
        const existingMap = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
            ['find_hotel', [2, new Map([['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);

        expect(transcriptProcessInteractor(existingMap,
            [sampleTranscript2, sampleTranscript3])).toEqual(5)
    })
})