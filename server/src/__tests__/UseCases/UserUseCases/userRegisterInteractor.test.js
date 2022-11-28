const mongoose = require('mongoose');
const createUserInteractor = require('../../../UseCases/UserUseCases/userRegisterInteractor');

describe('UserRegisterInteractor test', () => {
    beforeAll(async () => {
        mongoose.connect(globalThis.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('creates & saves valid new users successfully', async () => {
        let savedUserArray = []
        for (let i = 0; i < 10; i++) {
            const savedUser = await createUserInteractor(`testing${i}@gmail.com`, `${i}solid${i}`);
            // Object id should be defined when successfully saved to MongoDB.
            savedUserArray.push(savedUser)
        }
        for (let i = 0; i < 10; i++) {
            const userData = { email: `testing${i}@gmail.com`, password: `${i}solid${i}`, transcripts: [] };
            let savedUser = savedUserArray[i];
            expect(savedUser._id).toBeDefined();
            expect(savedUser.email).toBe(userData.email);
            expect(savedUser.password).toBe(userData.password);
            expect(savedUser.transcripts).toEqual(userData.transcripts);
        }
    });

    it('throws error if user email is not a valid email', async () => {
        expect.assertions(1);
        try {
            await createUserInteractor('invalid_email', 'solid');
        } catch (e) {
            const str_e = String(e);
            expect(str_e).toMatch("Unable to register user: email invalid.");
        }
    });

})