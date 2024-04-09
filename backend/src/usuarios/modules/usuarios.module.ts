import { Module } from '@nestjs/common';
import { UsuariosController } from '../controllers/usuarios.controller';
import { UsuariosService } from '../services/usuarios.service';
import { AvatarModule } from 'src/avatar';

@Module({
  imports: [AvatarModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
