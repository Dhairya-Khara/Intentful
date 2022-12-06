/**
 * Tests for the getSpecificIntentsInteractor Use Case.
 * Tests that it returns a specific transcript's intents correctly, and if there are no transcripts, 
 * "No intents" is returned.
 */

const getSpecificIntentsInteractor = require('../../../UseCases/GetUseCases/getSpecificIntentsInteractor');
const User = require('../../../Entities/UserSchema');
const sampleTranscript = require('../../sample transcripts/transcript1.json');

describe('getSpecificIntentsInteractor', () => {
    it('correctly returns "No intents" if there are no transcripts', () => {
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        const transcriptName = 'transcript3.json'
        expect(getSpecificIntentsInteractor(user, transcriptName)).toBe("No intents");
    });

    it("correctly returns a transcript's intents if the user has it", () => {
        const mockIntents = new Map([
            ['find_restaurant', [3, new Map([['find_hotel', 1]])]],
            ['find_hotel', [2, new Map([['book_hotel', 1]])]],
            ['book_hotel', [1, new Map()]]
        ]);
        const mockTranscriptObject = { 'transcript1.json': sampleTranscript, 'intents': mockIntents };
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [mockTranscriptObject] };
        const user = new User(mockUser);
        const transcriptName = 'transcript1.json'
        expect(getSpecificIntentsInteractor(user, transcriptName)).toBe(mockIntents);
    });
});
