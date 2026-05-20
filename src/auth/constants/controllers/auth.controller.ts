import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { LocalAuthGuard } from '../../guard/local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login to get JWT token' })
  login(@Body() loginDto: LoginDto) {
    return this.auth.login(loginDto);
  }
}
