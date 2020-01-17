import { UserModel } from './user_model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new UserModel()).toBeTruthy();
  });
});
