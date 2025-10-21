import { z } from 'zod';

const categories = ["HARDWARE", "SOFTWARE", "ACESSORIOS", "SERVICOS", "OUTROS"] as const;

export const productSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),

  preco: z.coerce.number({
    required_error: 'O preço é obrigatório.',
    invalid_type_error: 'O preço deve ser um número.',
  }).positive('O preço deve ser um número positivo.'),

  categoria: z.enum(categories, {
    errorMap: () => ({ message: 'Selecione uma categoria válida.' }),
  }),

  estoque: z.coerce.number({
    required_error: 'O estoque é obrigatório.',
    invalid_type_error: 'O estoque deve ser um número.',
  }).int('O estoque deve ser um número inteiro.')
    .positive('O estoque deve ser um número positivo.'),

  descricao: z.string().trim().optional(),

  ativo: z.boolean().default(true).optional(),
});


export const updateProductSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.').optional(),

  preco: z.coerce.number({
    invalid_type_error: 'O preço deve ser um número.',
  }).positive('O preço deve ser um número positivo.').optional(),

  categoria: z.enum(categories, {
    errorMap: () => ({ message: 'Selecione uma categoria válida.' }),
  }).optional(),

  estoque: z.coerce.number({
    invalid_type_error: 'O estoque deve ser um número.',
  }).int('O estoque deve ser um número inteiro.')
    .positive('O estoque deve ser um número positivo.').optional(),

  descricao: z.string().trim().optional(),

  ativo: z.boolean().optional(),
})
.refine(data => Object.keys(data).length > 0, {
  message: "Pelo menos um campo deve ser preenchido para atualizar.",
});


export type ProductFormData = z.infer<typeof productSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;