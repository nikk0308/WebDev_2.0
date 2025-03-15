import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: { name: string, email: string, password: string }): Promise<User> {
    return this.usersService.register(createUserDto);
  }

  @Get(':id')
	async getUserById(@Param('id') id: string): Promise<User | null> {
  return this.usersService.findOne(id);
}
}