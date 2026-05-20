// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/await-thenable */
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../../users/users.service';
// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Bcrypt } from '../bcrypt/bcrypt';
// import { UsuarioLogin } from '../entities/usuariologin.entity';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usuarioService: UsersService,
//     private jwtService: JwtService,
//     private bcrypt: Bcrypt,
//   ) {}

//   async validateUser(username: string, password: string): Promise<any> {
//     const buscaUsuario = await this.usuarioService.findByUsuario(username);

//     if (!buscaUsuario) {
//       throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
//     }

//     const matchPassword = await this.bcrypt.comparePassword(
//       password,
//       buscaUsuario.password,
//     );

//     if (matchPassword) {
//       const { password, ...result } = buscaUsuario;
//       return result;
//     }

//     throw new HttpException(
//       'Usuário ou Senha inválidos!',
//       HttpStatus.UNAUTHORIZED,
//     );
//   }

//   async login(usuarioLogin: UsuarioLogin) {
//     const payload = { sub: usuarioLogin.usuario };
//     const buscaUsuario = await this.usuarioService.findByUsuario(
//       usuarioLogin.usuario,
//     );

//     if (!buscaUsuario) {
//       throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
//     }

//     return {
//       id: buscaUsuario.id,
//       nome: buscaUsuario.nome,
//       usuario: usuarioLogin.usuario,
//       senha: '',
//       foto: buscaUsuario.foto,
//       token: `Bearer ${this.jwtService.sign(payload)}`,
//     };
//   }
// }
