const mongoose = require('mongoose');
const User = require('../../../Entities/UserSchema');
const uploadTranscriptInteractor = require('../../../UseCases/TranscriptUseCases/transcriptUploadInteractor');
const size1sampleDialogue = require('../../sample transcripts/multiwoz/size1_dialogues_001.json')
const size3sampleDialogue = require('../../sample transcripts/multiwoz/size3_dialogues_001.json');
const size5sampleDialogue = require('../../sample transcripts/multiwoz/s5_dialogues_002.json');

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
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        await user.save()
        const sampleTranscriptJSON = JSON.stringify(size1sampleDialogue);
        const sampleTranscriptFilename = 'size1_dialogues_001.json'
        await expect(uploadTranscriptInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;

        const sampleIntents = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 3]])]],
            ['find_hotel', [4, new Map([['find_restaurant', 2], ['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);
        expect(user.transcripts).toEqual([{ "intents": sampleIntents, "size1_dialogues_001.json": sampleTranscriptJSON }])
    });

    it('correctly uploads a dialogue with 3 transcripts', async () => {
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        await user.save()
        const sampleTranscriptJSON = JSON.stringify(size3sampleDialogue);
        const sampleTranscriptFilename = 'size3_dialogues_001.json'
        await expect(uploadTranscriptInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;

        const sampleIntents = new Map([
            ['find_restaurant', [7, new Map([['find_hotel', 4], ['book_hotel', 1]])]],
            ['find_hotel', [8, new Map([['find_restaurant', 4], ['book_hotel', 2]])]],
            ['book_hotel', [5, new Map([['find_restaurant', 1]])]]
        ]);
        expect(user.intents).toEqual(sampleIntents) // check intents are okay
    });

    it('correctly uploads a dialogue with 5 transcripts and updates intents when 3 transcripts are added', async () => {
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        await user.save()
        const sampleTranscriptJSON = JSON.stringify(size5sampleDialogue);
        const sampleTranscriptFilename = 's5_dialogues_002.json'
        await expect(uploadTranscriptInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;

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

    it('stops a duplicate transcript from uploading', async () => {
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        await user.save()
        const sampleTranscriptJSON = JSON.stringify(size1sampleDialogue);
        const sampleTranscriptFilename = 'transcript1.json'
        await expect(uploadTranscriptInteractor(user, sampleTranscriptJSON, sampleTranscriptFilename)).resolves;
        return uploadTranscriptInteractor(user,
            sampleTranscriptJSON, sampleTranscriptFilename).catch(e =>
                expect(String(e)).toMatch("A transcript with the same name already exists"));
    });

    it('correctly returns an error when the User is not a valid user', async () => {
        const invalidUser = {};
        const sampleTranscriptJSON = JSON.stringify(size1sampleDialogue);
        const sampleTranscriptFilename = 'transcript1.json'
        expect.assertions(1);
        return uploadTranscriptInteractor(invalidUser,
            sampleTranscriptJSON, sampleTranscriptFilename).catch(e =>
                expect(String(e)).toMatch("Not a valid user"));
    });

})