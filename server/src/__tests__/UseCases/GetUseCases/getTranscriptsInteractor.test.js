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
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [sampleTranscript, sampleTranscript2, sampleTranscript3] };
        const expectedIntents = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
            ['find_hotel', [2, new Map([['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);
        const user = new User(mockUser);
        expect(getTranscriptsInteractor(user)).toEqual(mockUser.transcripts);
    });

    it('correctly returns an error when the User is not a valid user', async () => {
        const invalidUser = {};
        const errorMessage = 'user not a valid User model or user does not have transcripts property';
        expect(getTranscriptsInteractor(invalidUser)).toEqual(errorMessage);
    });
});
