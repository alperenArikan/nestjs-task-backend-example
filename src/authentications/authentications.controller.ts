import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Headers,
} from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Post('signin')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const token = await this.authenticationsService.login(loginDto);
      return new LoginResponseDto(token);
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('signup')
  async register(@Body() signupDto: SignupDto): Promise<boolean> {
    try {
      return await this.authenticationsService.signup(signupDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('access-token')
  async accessToken(@Headers() headers): Promise<LoginResponseDto> {
    console.log(headers);
    try {
      return await this.authenticationsService.accessToken(
        headers['authorization'].split(' ')[1],
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
