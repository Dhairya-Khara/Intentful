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

    // it('should insert a doc into collection', async () => {
    //     const users = db.collection('users');

    //     const mockUser = { _id: 'some-user-id', name: 'John' };
    //     await users.insertOne(mockUser);

    //     const insertedUser = await users.findOne({ _id: 'some-user-id' });
    //     expect(insertedUser).toEqual(mockUser);
    // });

    // const email = req.body.email
    // const password = req.body.password
    // try {
    //     const user = await createUserInteractor(email, password)
    //     res.send(user)
    // }
    it('should do something', async () => {
        expect(await createUserInteractor('testing@gmail.com', 'solid')).toBeDefined();
    });

    it('creates & saves new user successfully', async () => {
        // const users = db.collection('users');
        const userData = { email: 'testing@gmail.com', password: 'solid' };
        // const validUser = new User(userData);
        const savedUser = await createUserInteractor('testing@gmail.com', 'solid');
        // Object id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.transcripts).toEqual([]);
    });

})