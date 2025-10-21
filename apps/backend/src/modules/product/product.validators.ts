// Importa o Zod, a lib de validação em runtime que vamos usar nos schemas.
import { number, z } from 'zod';

export const CATEGORIA = ['HARDWARE', 'SOFTWARE', 'ACESSORIOS', 'SERVICOS', 'OUTROS'] as const;
export type Categoria = (typeof CATEGORIA)[number];

export const createProductSchema = z
  .object({
    nome: z
      .string()
      .min(1, 'nome é obrigatório')
      .min(2, 'nome deve ter pelo menos 2 caracteres')
      .max(120, 'nome deve ter no máximo 120 caracteres')
      .trim(),

    descricao: z
      .string()
      .max(500, 'descrição deve ter no máximo 500 caracteres')
      .trim()
      .optional(),

    preco: z
      .number({ 
        required_error: 'preco é obrigatório',
        invalid_type_error: 'preco deve ser um número'
       })
      .positive('preço deve ser um número positivo'),

    categoria: z.enum(CATEGORIA, {
      required_error: 'A categoria é obrigatória',
      invalid_type_error: 'A categoria deve ser um dos valores válidos'
    }),

    estoque: z
      .number({
        required_error: 'preco é obrigatório',
        invalid_type_error: 'preco deve ser um número'
      })
      .int('estoque deve ser um número inteiro')
      .min(0, 'estoque deve ser maior ou igual a zero'),

    ativo: z.boolean().optional(),
  })
  .strict();

export const updateProductSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(2, 'nome deve ter pelo menos 2 caracteres')
      .max(120, 'nome deve ter no máximo 120 caracteres')
      .optional(),

    descricao: z
      .string()
      .trim()
      .max(500, 'descrição deve ter no máximo 500 caracteres')
      .optional(),

    preco: z.number().positive('preço deve ser um número positivo').optional(),

    categoria: z.enum(CATEGORIA, {
      errorMap: () => ({ message: "A categoria deve ser um dos valores válidos" }),
    }).optional(),

    estoque: z
      .number()
      .int('estoque deve ser um número inteiro')
      .min(0, 'estoque deve ser maior ou igual a zero')
      .optional(),

    ativo: z.boolean().optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: 'envie pelo menos um campo para atualizar' }
  );


export const productIdParamSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, 'id do produto é obrigatório')
    .transform((val) => Number(val))
    .refine((num) => Number.isInteger(num), 'id do produto deve ser um número inteiro')
    .refine((num) => num > 0, 'id do produto deve ser um número positivo'),
});

export const listProductsQuerySchema = z
  .object({
    search: z.string().trim().min(1).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    active: z.coerce.boolean().optional(),
  })
  .strict();

export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type ProductIdParamDTO = z.infer<typeof productIdParamSchema>;
export type ListProductsQueryDTO = z.infer<typeof listProductsQuerySchema>;
