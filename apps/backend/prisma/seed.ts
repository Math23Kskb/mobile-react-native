// In apps/backend/prisma/seed.ts

import { PrismaClient, produtos_categoria } from '@prisma/client';

const prisma = new PrismaClient();

type ProductSeedData = {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: produtos_categoria;
  ativo: boolean;
};

const productsData: ProductSeedData[] = [
  // HARDWARE
  { nome: 'Processador Core i7 13700K', descricao: 'Processador de alta performance para jogos e produtividade.', preco: 1850.00, estoque: 25, categoria: 'HARDWARE', ativo: true },
  { nome: 'Placa de Vídeo RTX 4060 8GB', descricao: 'GPU de última geração com suporte a DLSS 3.', preco: 2500.00, estoque: 15, categoria: 'HARDWARE', ativo: true },
  { nome: 'Memória RAM DDR5 16GB 5200MHz', descricao: 'Módulo de memória RAM de alta velocidade.', preco: 550.00, estoque: 60, categoria: 'HARDWARE', ativo: true },
  { nome: 'SSD NVMe 2TB Gen4', descricao: 'Armazenamento ultra-rápido para sistema e jogos.', preco: 950.00, estoque: 45, categoria: 'HARDWARE', ativo: true },
  { nome: 'Fonte 750W 80 Plus Gold Modular', descricao: 'Fonte de alimentação confiável e eficiente.', preco: 620.00, estoque: 35, categoria: 'HARDWARE', ativo: true },
  
  // SOFTWARE
  { nome: 'Licença Windows 11 Pro', descricao: 'Sistema operacional Microsoft Windows 11 Professional.', preco: 850.00, estoque: 150, categoria: 'SOFTWARE', ativo: true },
  { nome: 'Pacote Office 365 Personal (1 Ano)', descricao: 'Assinatura anual para Word, Excel, PowerPoint e mais.', preco: 299.00, estoque: 300, categoria: 'SOFTWARE', ativo: true },
  { nome: 'Software de Edição de Vídeo Pro X', descricao: 'Licença vitalícia para editor de vídeo profissional.', preco: 1250.00, estoque: 80, categoria: 'SOFTWARE', ativo: true },

  // ACESSORIOS
  { nome: 'Mousepad Gamer Extra Grande', descricao: 'Superfície de tecido para controle e velocidade.', preco: 120.00, estoque: 80, categoria: 'ACESSORIOS', ativo: true },
  { nome: 'Headset Gamer 7.1 Surround Sem Fio', descricao: 'Áudio imersivo e microfone com cancelamento de ruído.', preco: 680.00, estoque: 40, categoria: 'ACESSORIOS', ativo: true },
  { nome: 'Teclado Mecânico RGB ABNT2', descricao: 'Teclado com switches Brown para digitação e jogos.', preco: 510.00, estoque: 38, categoria: 'ACESSORIOS', ativo: true },

  // SERVICOS
  { nome: 'Instalação e Configuração de PC Gamer', descricao: 'Montagem completa, instalação de SO e drivers.', preco: 300.00, estoque: 999, categoria: 'SERVICOS', ativo: true },
  { nome: 'Limpeza e Troca de Pasta Térmica', descricao: 'Serviço de manutenção para notebooks e desktops.', preco: 180.00, estoque: 999, categoria: 'SERVICOS', ativo: true },

  // OUTROS
  { nome: 'Cadeira Gamer Ergonômica Profissional', descricao: 'Cadeira com suporte lombar e braços 4D.', preco: 1300.00, estoque: 30, categoria: 'OUTROS', ativo: true },
  { nome: 'Mochila para Notebook até 15.6"', descricao: 'Mochila reforçada e à prova d\'água.', preco: 250.00, estoque: 70, categoria: 'OUTROS', ativo: false },
];

async function main() {
  console.log('Start seeding...');
  await prisma.produtos.deleteMany();

  for (const p of productsData) {
    const product = await prisma.produtos.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id_produto}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });