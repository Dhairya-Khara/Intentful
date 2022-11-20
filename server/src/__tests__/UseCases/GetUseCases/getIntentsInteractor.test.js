const User = require('../../../Entities/UserSchema');
const getIntentsInteractor = require('../../../UseCases/GetUseCases/getIntentsInteractor');

test('returns intents correctly', () => {
    let email = 'hello@gmail.com';
    let password = 'password';
    let transcripts = [];
    let intents = 'testtesttest'
    const user = new User({ email, password, transcripts, intents });
    expect(getIntentsInteractor(user)).toEqual(intents);
})