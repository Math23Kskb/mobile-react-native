import { prisma } from '../../lib/prisma';
// Importa a instância única (singleton) do Prisma Client.

import { Prisma } from '@prisma/client';
// Tipos utilitários gerados pelo Prisma (WhereInput, GetPayload, etc).

import { CreateProductDTO, ListProductsQueryDTO, UpdateProductDTO } from './product.validators';

type Product = Prisma.produtosGetPayload<{}>;

export type ListParams = { search?: string; page: number; limit: number; active?: boolean };


export async function list(params: ListProductsQueryDTO): Promise<{ products: Product[]; total: number }> {
  const { search, page, limit, active } = params;

  const where: Prisma.produtosWhereInput = {};
  if (typeof active === 'boolean') {
    where.ativo = active;
  }

  if (search && search.trim().length > 0) {
    const s = search.trim();
    where.OR = [
      { nome: { contains: s } },
      { descricao: { contains: s } },
    ];
  }

  const skip = (page - 1) * limit;
  const take = limit;

  const [total, products] = await prisma.$transaction([
    prisma.produtos.count({ where }),
    prisma.produtos.findMany({
      where,
      skip,
      take,
      orderBy: { id_produto: 'desc' },
    }),
  ]);

  return { products, total };
}

/**
 * Busca um produto pelo seu ID. Retorna null se não encontrar.
 */
export function findById(id: number): Promise<Product | null> {
  return prisma.produtos.findUnique({
    where: { id_produto: id },
  });
}

/**
 * Cria um novo produto.
 * 'data' já vem validado pelo Zod e corresponde ao tipo CreateProductDTO.
 */
export function create(data: CreateProductDTO): Promise<Product> {
  return prisma.produtos.create({ data });
}

/**
 * Atualiza um produto existente.
 * Lança um erro do Prisma se o produto com o 'id' fornecido não existir.
 */
export function update(id: number, data: UpdateProductDTO): Promise<Product> {
  return prisma.produtos.update({
    where: { id_produto: id },
    data,
  });
}

/**
 * Exclui (hard delete) um produto pelo seu ID.
 */
export function remove(id: number): Promise<Product> {
  return prisma.produtos.delete({
    where: { id_produto: id },
  });
}