const mongoose = require('mongoose');
const User = require('../../../Entities/UserSchema');
const uploadTranscriptInteractor = require('../../../UseCases/TranscriptUseCases/transcriptUploadInteractor');
const sampleTranscript = require('../../sample transcripts/transcript1.json');
const sampleTranscript2 = require('../../sample transcripts/transcript2.json');
const sampleTranscript3 = require('../../sample transcripts/transcript3.json');

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

    it('correctly uploads a transcript', async () => {
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        await user.save()
        const sampleTranscriptJSON = JSON.stringify(sampleTranscript);
        const sampleTranscriptFilename = 'transcript1.json'
        await expect(uploadTranscriptInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;

        const sampleIntents = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
            ['find_hotel', [2, new Map([['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);
        expect(user.transcripts).toEqual([{ "intents": sampleIntents, "transcript1.json": sampleTranscriptJSON }])
    });

    it('stops a duplicate transcript from uploading', async () => {
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        await user.save()
        const sampleTranscriptJSON = JSON.stringify(sampleTranscript);
        const sampleTranscriptFilename = 'transcript1.json'
        await expect(uploadTranscriptInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;
        return uploadTranscriptInteractor(user,
            sampleTranscriptJSON, sampleTranscriptFilename).catch(e =>
                expect(String(e)).toMatch("A transcript with the same name already exists"));
    });

    it('correctly returns an error when the User is not a valid user', async () => {
        const invalidUser = {};
        const sampleTranscriptJSON = JSON.stringify(sampleTranscript);
        const sampleTranscriptFilename = 'transcript1.json'
        expect.assertions(1);
        return uploadTranscriptInteractor(invalidUser,
            sampleTranscriptJSON, sampleTranscriptFilename).catch(e =>
                expect(String(e)).toMatch("Not a valid user"));
    });

})