/**
 * Tests for the transcriptUploadInteractor Use Case.
 * Tests that dialogues with single and multiple transcripts are uploaded correctly, and also tests
 * that errors are thrown correctly.
 * 
 * ------------------------------------NOTES ABOUT MOCKING------------------------------------------------------
 * We mock the implementations of convertMultiWOZInteractor and transcriptProcessInteractor
 * used by transcriptUploadInteractor. Our convertMultiWOZInteractor has different mock implementations in different
 * tests, whereas the transcriptProcessInteractor has a single mock implementation that is used in all tests.
 * We have different mock implementations of convertMultiWOZInteractor for ease of testing with different
 * complex dialogue json files that also need a strict return type for the transcriptUploadInteractor to proceed 
 * without failing for different functionalities (single vs multiple transcripts).
 * 
 * We also mock the User entity (Mongoose schema). Our transcriptUploadInteractor does not directly interact with 
 * any user methods; it only updates attributes of the user, and we can check that these attributes are 
 * updated correctly with the mock.
 */

const User = require('../../../Entities/UserSchema');
const transcriptUploadInteractor = require('../../../UseCases/TranscriptUseCases/transcriptUploadInteractor');
const size1sampleDialogue = require('../../sample transcripts/multiwoz/size1_dialogues_001.json');
const transcript1 = require('../../sample transcripts/transcript1.json');
const transcript2 = require('../../sample transcripts/transcript2.json');
const transcript3 = require('../../sample transcripts/transcript3.json');
const size3sampleDialogue = require('../../sample transcripts/multiwoz/size3_dialogues_001.json');

// Mocking convertMultiWOZInteractor (IMPORTANT: the implementation is mocked in individual tests
// by forcing it to return the correct value so that the transcriptUploadInteractor can proceed without failing)
const convertMultiWOZInteractor = require('../../../UseCases/TranscriptUseCases/convertMultiWOZInteractor');
jest.mock('../../../UseCases/TranscriptUseCases/convertMultiWOZInteractor')

// Mocking the implementation of transcriptProcessInteractor. We could change this implementation, but this works.
const transcriptProcessInteractor = require('../../../UseCases/TranscriptUseCases/transcriptProcessInteractor');
jest.mock('../../../UseCases/TranscriptUseCases/transcriptProcessInteractor')
transcriptProcessInteractor.mockImplementation((map, arrayOfTranscripts) =>
    new Map([...map, [map.size + arrayOfTranscripts[0].length, arrayOfTranscripts[0].length]]))

jest.mock('../../../Entities/UserSchema');

describe('transcriptUploadInteractor test', () => {
    afterAll(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    it('correctly uploads a dialogue with 1 transcript', async () => {
        // Jest mock user
        const user = new User();
        user.email = 'testing@gmail.com'
        user.transcripts = []
        const sampleTranscriptJSON = JSON.stringify(size1sampleDialogue);
        const sampleTranscriptFilename = 'size1_dialogues_001.json'

        // Mock implementation of ConvertMultiWOZInteractor for this test to ensure it returns the correct value.
        // See this file's header for more comments.
        // TranscriptProcessInteractor has a mock implementation independent of all tests on line 36.
        convertMultiWOZInteractor.mockImplementation(() => [JSON.stringify(transcript1)])
        await expect(transcriptUploadInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;

        const mockIntentsMap = new Map([[12, 12]])

        expect(user.transcripts).toEqual([{ file: sampleTranscriptJSON, intents: mockIntentsMap, filename: 'size1_dialogues_001.json' }])
    });

    it('correctly uploads a dialogue with 3 transcripts and updates aggregate intents', async () => {
        // Jest mock user
        const user = new User();
        user.email = 'testing@gmail.com'
        user.transcripts = []
        const sampleTranscriptJSON = JSON.stringify(size3sampleDialogue);
        const sampleTranscriptFilename = 'size3_dialogues_001.json'

        // Mock implementation of ConvertMultiWOZInteractor for this test to ensure it returns the correct value.
        // See this file's header for more comments.
        convertMultiWOZInteractor.mockImplementation(() => [JSON.stringify(transcript1), JSON.stringify(transcript2), JSON.stringify(transcript3)])

        expect(user.transcripts.length).toBe(0) // verify that only transcriptUploadInteractor adds transcripts
        await expect(transcriptUploadInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;
        expect(user.transcripts.length).toBe(3) // check that we have 3 transcripts

        const mockIntentsMap = new Map([[12, 12], [13, 12], [16, 14]])
        expect(user.intents).toEqual(mockIntentsMap) // check aggregate intents are okay
    });

    it('correctly returns an error when the same transcript is uploaded twice', async () => {
        expect.assertions(1);
        // Jest mock user
        const user = new User();
        user.email = 'testing@gmail.com'
        user.transcripts = []
        const sampleTranscriptJSON = JSON.stringify(size1sampleDialogue);
        const sampleTranscriptFilename = 'size1_dialogues_001.json'
        await expect(transcriptUploadInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;

        return transcriptUploadInteractor(user,
            sampleTranscriptJSON, sampleTranscriptFilename).catch(e =>
                expect(String(e)).toMatch("A transcript with the same name already exists"));
    });

    it('correctly returns an error when the User is not a valid user', async () => {
        const invalidUser = {};
        const sampleTranscriptJSON = JSON.stringify(size1sampleDialogue);
        const sampleTranscriptFilename = 'transcript1.json'
        expect.assertions(1);
        return transcriptUploadInteractor(invalidUser,
            sampleTranscriptJSON, sampleTranscriptFilename).catch(e =>
                expect(String(e)).toMatch("Not a valid user"));
    });

})