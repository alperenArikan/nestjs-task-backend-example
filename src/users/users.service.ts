import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/authentications/dto/signup.dto';
import { AuthService, HelperService } from 'src/utils/helpers';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  listByIds(ids: number[]): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('id IN(:...ids)', { ids: ids })
      .getMany();
  }

  async list(): Promise<UserDto[]> {
    return await this.userRepository.find({
      select: ['email', 'firstName', 'lastName', 'id'],
    });
  }
  async getById(id: number): Promise<UserDto> {
    return await this.userRepository.findOne({
      where: { id: id },
      select: ['email', 'firstName', 'lastName', 'id'],
    });
  }
  async update(id: number, userUpdateDto: UserUpdateDto): Promise<UserDto> {
    const result = await this.userRepository.update({ id }, userUpdateDto);
    if (result.affected === 0) {
      throw new Error('Bir hata oluştu');
    }

    return this.getById(id);
  }

  async create(signupDto: SignupDto): Promise<boolean> {
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
}
