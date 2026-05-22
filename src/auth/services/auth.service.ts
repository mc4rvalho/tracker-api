import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { Bcrypt } from '../bcrypt/bcrypt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  // Used by LocalStrategy to check if the email and password match.
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

  // Used by the Controller to generate the final Token
  async login(loginDto: LoginDto) {
    const user = await this.users.findByEmail(loginDto.email);

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    // This is what will be recorded "inside" the JWT Token.
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
