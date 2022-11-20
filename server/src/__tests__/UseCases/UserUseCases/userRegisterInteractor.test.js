const mongoose = require('mongoose');
const User = require('../../../Entities/UserSchema');
const userData = { email: 'testing@gmail.com', password: 'solid' };
const createUserInteractor = require('../../../UseCases/UserUseCases/userRegisterInteractor')

const createUserInteractor = async (email, password) => {
    const user = new User({ email, password })
    try {
        await user.save()
        return user
    }
    catch (e) {
        console.log(e)
    }
}

describe('UserRegisterInteractor test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('creates & saves new user successfully', async () => {
        const validUser = new User(userData);
        const savedUser = await validUser.save();
        // Object id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.transcripts).toEqual([]);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new UserModel({ name: 'TekLoon', gender: 'Male', nickname: 'Handsome TekLoon' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on gender field.
    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.gender).toBeDefined();
    });
})