import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    providedPassword: string,
    storedPassowrd: string,
  ): Promise<boolean> {
    return await bcrypt.compare(providedPassword, storedPassowrd);
  }
}
