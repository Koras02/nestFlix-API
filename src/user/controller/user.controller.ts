/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('/api/v1/account')
export class UserController {
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private planService: Planservice,
  ) {}
}
