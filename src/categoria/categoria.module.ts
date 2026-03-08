import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from './controllers/categoria.controller';
import { Categoria } from './entities/categoria.entity';
import { CategoriaService } from './services/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])], // Registra a entidade Categoria
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService, TypeOrmModule], // Exporte o TypeOrmModule para outros módulos verem a Categoria
})
export class CategoriaModule {}
