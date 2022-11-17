import getIntentsInteractor from '../../../server/src/UseCases/GetUseCases/getIntentsInteractor';

test('adds empty user', () => {
  expect(getIntents()).toBe();
});