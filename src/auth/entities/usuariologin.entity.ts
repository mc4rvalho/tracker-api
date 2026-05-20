import { ApiProperty } from '@nestjs/swagger';

export class UsuarioLogin {
  @ApiProperty()
  public usuario: string | undefined;

  @ApiProperty()
  public senha: string | undefined;
}
