import { z } from 'zod';

const categories = ["HARDWARE", "SOFTWARE", "ACESSORIOS", "SERVICOS", "OUTROS"] as const;

export const productSchema = z.object({
  nome: z.string().min(3, 'O nome é obrigatório (mín. 3 caracteres)'),

  preco: z.coerce.number().positive('O preço deve ser um número positivo'),

  categoria: z.enum(categories, {
    errorMap: () => ({ message: 'Selecione uma categoria válida' }),
  }),

  estoque: z.coerce.number().int('O estoque deve ser um número inteiro').positive('O estoque deve ser positivo'),

  descricao: z.string().trim().optional(),

  ativo: z.boolean().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;