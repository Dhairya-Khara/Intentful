const mongoose = require('mongoose');
const loginUserInteractor = require('../../../UseCases/UserUseCases/userLoginInteractor');
const User = require('../../../Entities/UserSchema');

describe('UserLoginInteractor test', () => {
    beforeAll(async () => {
        mongoose.connect(globalThis.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('correctly logs into existing user and gives a token', async () => {
        const mockUser = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const user = new User(mockUser);
        await user.save()

        // need to learn how to mock jwt to check for unique token value
        expect(loginUserInteractor('testing@gmail.com', 'solid')).resolves.toBeDefined();
        const token = await loginUserInteractor('testing@gmail.com', 'solid');
        expect(token).toBeDefined();
    });

    it('throws error if user does not exist', async () => {
        expect.assertions(1);
        try {
            await loginUserInteractor('notarealuser@gmail.com', 'solid');
        } catch (e) {
            const str_e = String(e);
            expect(str_e).toMatch("Unable to find user.");
        }
    });

})