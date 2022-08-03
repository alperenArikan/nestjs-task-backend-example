import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthService, HelperService } from 'src/utils/helpers';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthenticationsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto) {
    const isValidEmail = HelperService.checkIsValidEmail(loginDto.email);
    if (!isValidEmail) {
      throw new Error('Geçersiz email');
    }

    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    const isPasswordValid = await AuthService.comparePasswordAndHash(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Geçersiz şifre');
    }

    const token = await AuthService.getJwtToken({
      email: user.email,
      id: String(user.id),
    });

    return token;
  }

  async signup(signupDto: SignupDto): Promise<boolean> {
    const isValidEmail = HelperService.checkIsValidEmail(signupDto.email);
    if (!isValidEmail) {
      throw new Error('Geçersiz email');
    }

    const user = await this.userRepository.findOne({
      where: { email: signupDto.email },
    });

    console.log(user);
    if (user) {
      throw new Error('Email adresi alınmıştır.');
    }
    const hashedPassword = await AuthService.getHashedPassword(
      signupDto.password,
    );
    const newUser = await this.userRepository.create({
      email: signupDto.email,
      firstName: signupDto.firstName,
      lastName: signupDto.lastName,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return true;
  }

  accessToken(token: string): LoginResponseDto {
    const isValid = AuthService.verifyJwtToken(token);
    if (isValid) {
      return new LoginResponseDto(token);
    } else {
      throw new Error('Geçersiz token');
    }
  }
}
