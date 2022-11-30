const getOneTranscriptIntentsInteractor = require('../../../UseCases/GetUseCases/getSpecificIntentsInteractor');
const User = require('../../../Entities/UserSchema');
const sampleTranscript = require('../../sample transcripts/transcript1.json');
const sampleTranscript2 = require('../../sample transcripts/transcript2.json');
const sampleTranscript3 = require('../../sample transcripts/transcript3.json');
const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [sampleTranscript, sampleTranscript2, sampleTranscript3] };

describe('getTranscriptsInteractor test', () => {
    it('correctly returns "No intents" if there are no transcripts', () => {
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        const transcriptName = 'transcript3.json'
        expect(getOneTranscriptIntentsInteractor(user, transcriptName)).toBe("No intents");
    });
});
