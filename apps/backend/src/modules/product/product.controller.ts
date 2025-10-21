import { Request, Response } from 'express';
import { productService } from './product.service';
import {
  createProductSchema,
  listProductsQuerySchema,
  productIdParamSchema,
  updateProductSchema,
} from './product.validators';

export const productController = {
  async create(req: Request, res: Response) {
    const data = createProductSchema.parse(req.body);
    const product = await productService.create(data);
    return res.status(201).json(product);
  },

  async findById(req: Request, res: Response) {
    const { id } = productIdParamSchema.parse(req.params);
    const product = await productService.findById(id);
    return res.status(200).json(product);
  },

  async list(req: Request, res: Response) {
    const query = listProductsQuerySchema.parse(req.query);
    const result = await productService.list(query);
    return res.status(200).json(result);
  },

  async update(req: Request, res: Response) {
    const { id } = productIdParamSchema.parse(req.params);
    const data = updateProductSchema.parse(req.body);
    const updatedProduct = await productService.update(id, data);
    return res.status(200).json(updatedProduct);
  },

  async remove(req: Request, res: Response) {
    const { id } = productIdParamSchema.parse(req.params);
    await productService.remove(id);
    return res.status(204).send();
  },

  async getStats(_req: Request, res: Response) {
    const stats = await productService.getStats();
    return res.status(200).json(stats);
  },

  async listRecent(_req: Request, res: Response) {
    const products = await productService.listRecent();
    return res.status(200).json(products);
  },
};