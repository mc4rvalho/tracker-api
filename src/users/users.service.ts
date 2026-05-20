/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../auth/bcrypt/bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: Bcrypt,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Verifica se o email já existe
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new HttpException(
        'Email aready registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Criptografa a senha antes de salvá-la
    const hashedPassword = await this.bcrypt.hashPassword(
      createUserDto.password,
    );

    // Salva no banco e retorna sem a senha
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    const { password, ...result } = user;

    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const { password, ...result } = user;
    return result;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
