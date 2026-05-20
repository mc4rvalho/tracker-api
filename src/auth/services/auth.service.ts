import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  // Utilizado pelo LocalStrategy para checar se o e-mail e senha batem
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    const isMatch = await this.bcrypt.comparePasswords(pass, user.password);

    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  // Utilizado pelo Controller para gerar o Token final
  async login(loginDto: LoginDto) {
    const user = await this.users.findByEmail(loginDto.email);

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    // Aqui é.  que vai gravado para "dentro" do Token JWT
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },

      access_token: this.jwt.sign(payload),
    };
  }
}
