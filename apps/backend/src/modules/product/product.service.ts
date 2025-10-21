import { HttpError } from '../../lib/HttpError'; 
import * as repository from './product.repository';
import { CreateProductDTO, ListProductsQueryDTO, UpdateProductDTO } from './product.validators';

export const productService = {
  /**
   * Cria um novo produto.
   */
  async create(data: CreateProductDTO) {
    return await repository.create(data);
  },

  /**
   * Busca um produto pelo ID.
   * Lança um erro 404 se o produto não for encontrado.
   */
  async findById(id: number) {
    const product = await repository.findById(id);
    if (!product) {
      throw new HttpError(404, 'Produto não encontrado');
    }
    return product;
  },

  /**
   * Lista produtos com base nos filtros e paginação.
   */
  async list(query: ListProductsQueryDTO) {
    return await repository.list(query);
  },

  /**
   * Atualiza um produto.
   * Primeiro, garante que o produto existe usando o findById.
   */
  async update(id: number, data: UpdateProductDTO) {
    // Reutiliza a lógica do findById para garantir que o produto existe antes de atualizar.
    // Se não existir, o findById já lançará o erro 404.
    await this.findById(id);
    
    return await repository.update(id, data);
  },

  /**
   * Remove um produto.
   * Primeiro, garante que o produto existe antes de remover.
   */
  async remove(id: number) {
    // Garante que o produto existe antes de deletar.
    await this.findById(id);

    return await repository.remove(id);
  },

  async getStats() {
    return await repository.getStats();
  },

  async listRecent() {
    return await repository.listRecent();
  },
};