import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateUserUseCase, GetUserByIdUseCase, UserDto } from '@app/application';
import { CreateUserRequest } from './requests/create-user.request';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUserById: GetUserByIdUseCase,
  ) {}

  @Post()
  create(@Body() body: CreateUserRequest): Promise<UserDto> {
    return this.createUser.execute(body);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return this.getUserById.execute(id);
  }
}
