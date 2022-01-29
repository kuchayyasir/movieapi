import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('register')
  async register(@Body() registerDTO: CreateUserDto) {
    const user = await this.userService.create(registerDTO);
    // const payload = {
    //   id: user._id,
    //   username: user.username,
    // };

    // const token = await this.authService.signPayload(payload);
    return { user };
  }
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.login(loginDTO);
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
