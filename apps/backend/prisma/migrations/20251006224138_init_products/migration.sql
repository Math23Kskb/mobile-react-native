-- CreateTable
CREATE TABLE `produtos` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(120) NOT NULL,
    `descricao` TEXT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `categoria` ENUM('HARDWARE', 'SOFTWARE', 'ACESSORIOS', 'SERVICOS', 'OUTROS') NOT NULL,
    `estoque` INTEGER NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
