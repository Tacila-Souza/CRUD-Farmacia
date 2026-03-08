import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../categoria/categoria.module';
import { ProdutoController } from './controllers/produto.controller';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './services/produto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]), // Registra a entidade Produto
    CategoriaModule, // Importa o módulo que exporta o CategoriaService e o TypeOrmModule de Categoria
  ],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [TypeOrmModule],
})
export class ProdutoModule {}
