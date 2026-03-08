import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, LessThanOrEqual, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService, // Injeção para validar a existência da categoria
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: { categoria: true },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: { categoria: true },
    });
    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    return produto;
  }

  async findAllByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { categoria: true },
    });
  }

  async findAllByPreco(preco: number): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { preco: LessThanOrEqual(preco) },
      order: { preco: 'ASC' }, // Boa prática: ordenar do mais barato ao preço limite
      relations: { categoria: true },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    // Valida se a categoria existe antes de criar o produto
    if (produto.categoria && produto.categoria.id) {
      await this.categoriaService.findById(produto.categoria.id);
      return await this.produtoRepository.save(produto);
    }

    throw new HttpException(
      'A categoria deve ser informada!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    // Valida se a categoria existe antes de atualizar
    if (produto.categoria && produto.categoria.id) {
      await this.categoriaService.findById(produto.categoria.id);
      return await this.produtoRepository.save(produto);
    }

    throw new HttpException(
      'A categoria deve ser informada!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.produtoRepository.delete(id);
  }
}
