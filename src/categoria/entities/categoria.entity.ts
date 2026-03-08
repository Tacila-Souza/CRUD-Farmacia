// src/categoria/entities/categoria.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity({ name: 'tb_categoria' })
export class Categoria {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id!: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome!: string;

  @IsOptional()
  @IsUrl()
  @Column({ length: 500, nullable: true })
  @ApiProperty()
  foto?: string;

  @ApiProperty()
  @IsOptional()
  @OneToMany('Produto', 'categoria')
  produto!: Produto[];
}
