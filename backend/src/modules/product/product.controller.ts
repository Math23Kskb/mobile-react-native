// src/modules/product/product.controller.ts

import { Request, Response } from 'express';
import { productService } from './product.service';
// Importa os schemas de validação do Zod
import {
  createProductSchema,
  listProductsQuerySchema,
  productIdParamSchema,
  updateProductSchema,
} from './product.validators';

export const productController = {
  /**
   * Rota POST /products - Cria um novo produto.
   */
  async create(req: Request, res: Response) {
    // 1. Valida o corpo da requisição com Zod. Se falhar, lança um erro.
    const data = createProductSchema.parse(req.body);
    // 2. Chama o service com os dados validados.
    const product = await productService.create(data);
    // 3. Retorna a resposta com status 201 (Created).
    return res.status(201).json(product);
  },

  /**
   * Rota GET /products/:id - Busca um produto pelo ID.
   */
  async findById(req: Request, res: Response) {
    // 1. Valida o parâmetro de rota :id.
    const { id } = productIdParamSchema.parse(req.params);
    // 2. Chama o service.
    const product = await productService.findById(id);
    // 3. Retorna a resposta com status 200 (OK).
    return res.status(200).json(product);
  },

  /**
   * Rota GET /products - Lista todos os produtos com filtros.
   */
  async list(req: Request, res: Response) {
    // 1. Valida os query params (search, page, limit, etc).
    const query = listProductsQuerySchema.parse(req.query);
    // 2. Chama o service.
    const result = await productService.list(query);
    // 3. Retorna a resposta com status 200 (OK).
    return res.status(200).json(result);
  },

  /**
   * Rota PUT /products/:id - Atualiza um produto.
   */
  async update(req: Request, res: Response) {
    // 1. Valida o ID e o corpo da requisição.
    const { id } = productIdParamSchema.parse(req.params);
    const data = updateProductSchema.parse(req.body);
    // 2. Chama o service.
    const updatedProduct = await productService.update(id, data);
    // 3. Retorna a resposta com status 200 (OK).
    return res.status(200).json(updatedProduct);
  },

  /**
   * Rota DELETE /products/:id - Remove um produto.
   */
  async remove(req: Request, res: Response) {
    // 1. Valida o ID.
    const { id } = productIdParamSchema.parse(req.params);
    // 2. Chama o service.
    await productService.remove(id);
    // 3. Retorna uma resposta vazia com status 204 (No Content).
    return res.status(204).send();
  },
};