/**
 * Tests for the transcriptUploadInteractor Use Case.
 * Tests that dialogues with single and multiple transcripts are uploaded correctly, and also tests
 * that successive uploads update the existing intents correctly.
 * @interactor
 * @param {mongoose.Schema} user - The current authorized user of the website
 * @param {JSON} file - The JSON transcript file that the user has uploaded
 * @param {String} filename - Name of the file the user has uploaded
 */

const mongoose = require('mongoose');
const User = require('../../../Entities/UserSchema');
const transcriptUploadInteractor = require('../../../UseCases/TranscriptUseCases/transcriptUploadInteractor');
const size1sampleDialogue = require('../../sample transcripts/multiwoz/size1_dialogues_001.json');
const size5sampleDialogue = require('../../sample transcripts/multiwoz/s5_dialogues_002.json');

// need to mock the User because of issues with the User.save method. 
// This is valid because our transcriptUploadInteractor does not directly interact with any user methods; it only
// updates attributes of the user, and we can check that these attributes are updated correctly even with the mock.
jest.mock('../../../Entities/UserSchema');

describe('transcriptUploadInteractor test', () => {
    beforeAll(async () => {
        mongoose.connect(globalThis.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    it('correctly uploads a dialogue with 1 transcript', async () => {
        // Jest mock user
        const user = new User();
        user.email = 'testing@gmail.com'
        user.transcripts = []
        user.save // Jest mocks user save method

        const sampleTranscriptJSON = JSON.stringify(size1sampleDialogue);
        const sampleTranscriptFilename = 'size1_dialogues_001.json'
        await expect(transcriptUploadInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;

        const sampleIntents = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 3]])]],
            ['find_hotel', [4, new Map([['find_restaurant', 2], ['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);
        expect(user.transcripts).toEqual([{ "intents": sampleIntents, "size1_dialogues_001.json": sampleTranscriptJSON }])
    });

    it('correctly uploads a dialogue with 5 transcripts', async () => {
        // Jest mock user
        const user = new User();
        user.email = 'testing@gmail.com'
        user.transcripts = []
        user.save // Jest mocks user save method

        const sampleTranscriptJSON = JSON.stringify(size5sampleDialogue);
        const sampleTranscriptFilename = 's5_dialogues_002.json'
        await expect(transcriptUploadInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;

        const sampleIntents = new Map([
            ['find_restaurant', [12, new Map([['find_hotel', 1], ['book_hotel', 1], ['find_taxi', 1], ['find_train', 1]])]],
            ['find_taxi', [2, new Map([['book_hotel', 1]])]],
            ['find_train', [2, new Map([['book_restaurant', 1]])]],
            ['find_hotel', [5, new Map([['find_restaurant', 2]])]],
            ['book_hotel', [3, new Map([['find_restaurant', 1]])]],
            ['book_restaurant', [1, new Map([['find_train', 1]])]],
            ['find_attraction', [2, new Map([['find_restaurant', 1]])]],
            ['find_hospital', [2, new Map()]],
        ]);
        expect(user.intents).toEqual(sampleIntents) // check intents are okay
    });

    it('correctly returns an error when the same transcript is uploaded twice', async () => {
        expect.assertions(1);
        // Jest mock user
        const user = new User();
        user.email = 'testing@gmail.com'
        user.transcripts = []
        user.save // Jest mocks user save method

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