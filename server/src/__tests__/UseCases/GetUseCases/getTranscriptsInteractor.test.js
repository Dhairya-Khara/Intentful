/**
 * Tests for the getTranscriptsInteractor Use Case.
 * Tests that it returns a user's list of transcripts correctly if the user has transcripts.
 * If the User does not have transcripts, an empty list is returned.
 * If the user is an invalid User, then an error message is thrown.
 */

const getTranscriptsInteractor = require('../../../UseCases/GetUseCases/getTranscriptsInteractor');
const User = require('../../../Entities/UserSchema');
const sampleTranscript = require('../../sample transcripts/transcript1.json');
const sampleTranscript2 = require('../../sample transcripts/transcript2.json');
const sampleTranscript3 = require('../../sample transcripts/transcript3.json');

// might want to figure out some way to mock User schema if possible

describe('getTranscriptsInteractor test', () => {
    it('correctly returns an empty list when there are no transcripts', async () => {
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        expect(getTranscriptsInteractor(user)).toEqual(mockUser.transcripts);
    });

    it('correctly returns a list of transcripts containing multiple transcripts', async () => {
        const mockTranscript1 = { file: sampleTranscript, intents: 'dontcare', filename: 'transcript1.json' }
        const mockTranscript2 = { file: sampleTranscript2, intents: 'dontcare', filename: 'transcript2.json' }
        const mockTranscript3 = { file: sampleTranscript3, intents: 'dontcare', filename: 'transcript3.json' }
        const mockUserInfo = { email: 'testing@gmail.com', password: 'solid', transcripts: [mockTranscript1, mockTranscript2, mockTranscript3] };
        const user = new User(mockUserInfo);

        expect(getTranscriptsInteractor(user)).toEqual(user.transcripts);
    });

    it('correctly returns an error when the User is not a valid user', async () => {
        const invalidUser = {};
        const errorMessage = 'user not a valid User model or user does not have transcripts property';
        expect(getTranscriptsInteractor(invalidUser)).toEqual(errorMessage);
    });
});
