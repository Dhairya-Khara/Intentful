const mongoose = require('mongoose');
const createUserInteractor = require('../../../UseCases/UserUseCases/userRegisterInteractor');
jest.setTimeout(100000)

describe('UserRegisterInteractor test', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await mongoose.connect(globalThis.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // db = await connection.db(globalThis.__MONGO_DB_NAME__);
    });

    // afterAll(async () => {
    //     await connection.close();
    // });

    it('creates & saves valid new user successfully', async () => {
        const userData = { email: 'testing@gmail.com', password: 'solid', transcripts: [] };
        const savedUser = await createUserInteractor('testing@gmail.com', 'solid');
        // Object id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.transcripts).toEqual([]);
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