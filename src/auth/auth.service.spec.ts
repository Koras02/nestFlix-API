/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
// import { AuthSErvice } from './service/'

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be definend', () => {
    expect(service).toBeDefined();
  });
});
