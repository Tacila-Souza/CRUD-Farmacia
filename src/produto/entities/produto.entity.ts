// src/produto/entities/produto.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty()
  preco!: number;

  @IsOptional()
  @IsUrl()
  @Column({ length: 500, nullable: true })
  @ApiProperty()
  foto?: string;

  @ApiProperty()
  @IsNotEmpty()
  @ManyToOne('Categoria', 'produto', {
    onDelete: 'CASCADE',
  })
  categoria!: Categoria;
}
