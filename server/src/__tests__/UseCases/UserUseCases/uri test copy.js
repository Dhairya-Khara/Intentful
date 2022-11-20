const mongoose = require('mongoose');
// const MongoClient = require()
const User = require('../../../Entities/UserSchema');
const createUserInteractor = require('../../../UseCases/UserUseCases/userRegisterInteractor')

describe('UserRegisterInteractor test', () => {
    let connection;
    let db;
    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        connection = await mongoose.connect(globalThis.__MONGO_URI__, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
        db = await connection.db(globalThis.__MONGO_DB_NAME__);
    });

    // afterAll(async () => {
    //     await connection.close();
    // });

    it('creates & saves new user successfully', async () => {
        const userData = { email: 'testing@gmail.com', password: 'solid' };
        // const validUser = new User(userData);
        const savedUser = createUserInteractor(userData);
        // Object id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.transcripts).toEqual([]);
    });

    // // Test Validation is working!!!
    // // It should us told us the errors in on gender field.
    // it('create user without required field should failed', async () => {
    //     const userWithoutRequiredField = new User({ name: 'TekLoon' });
    //     let err;
    //     try {
    //         const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
    //         error = savedUserWithoutRequiredField;
    //     } catch (error) {
    //         err = error
    //     }
    //     expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    //     expect(err.errors.gender).toBeDefined();
    // });
})