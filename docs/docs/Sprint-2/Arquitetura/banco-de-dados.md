---
sidebar_position: 2
slug: /sprint-2/Arquitetura/banco-de-dados
---

# Banco de Dados

&emsp; O banco de dados é um componente essencial para o funcionamento do sistema, pois é responsável por armazenar e gerenciar as informações necessárias para o correto funcionamento da aplicação. Neste contexto, o banco de dados da solução Pharmabot foi projetado para armazenar informações sobre os usuários, medicamentos, pedidos de fitas de medicamentos e registros de saídas dos medicamentos. A seguir, são apresentadas as entidades e atributos do banco de dados, bem como o modelo entidade-relacionamento (ER) elaborado para a solução.

## Modelo Entidade-Relacionamento (ER)

&emsp; O modelo entidade-relacionamento (ER) é uma representação gráfica das entidades e relacionamentos presentes no banco de dados, permitindo visualizar a estrutura e as interações entre os dados. No contexto da solução Pharmabot, o modelo ER foi elaborado considerando as principais entidades e atributos necessários para o funcionamento do sistema. A seguir, é apresentado o modelo ER da solução Pharmabot.

<p style={{textAlign: 'center'}}>Figura 1 - Modelo Entidade-Relacionamento (ER) da Solução Pharmabot</p>

<div align="center">

![Modelo ER](/img/arquitetura/banco-de-dados.png)

</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria (2025)</p>

&emsp; O modelo ER apresentado na Figura 1 contempla as seguintes entidades e atributos:

- **Medicamentos**: Armazena informações sobre os medicamentos cadastrados no sistema, como nome, descrição, fabricante, validade, lote e dose.

- **Pacientes**: Contém os dados dos pacientes atendidos pelo hospital, como nome, número do prontuário (HC) e leito.

- **Configurações Robô**: Registra as configurações do robô, como velocidade de operação e status.

- **Usuários**: Armazena os dados dos usuários do sistema, como nome, e-mail, senha e data de criação.

- **Pedidos**: Registra os pedidos de fitas de medicamentos realizados pelos usuários, contendo informações como status, data do pedido, paciente associado, prioridade e usuário que liberou o pedido.

- **Estoque**: Gerencia o estoque de medicamentos disponíveis no hospital, com informações sobre a quantidade, localização e medicamento associado.

- **Logs do Sistema**: Registra as ações realizadas pelos usuários no sistema, como autenticação, solicitação de fitas de medicamentos e consultas de estoque.

- **Configurações Bins**: Armazena as configurações dos bins de armazenamento dos medicamentos, com informações sobre o bin, coordenada e configuração do robô associada.

- **Pedidos Medicamentos**: Relaciona os pedidos de fitas de medicamentos com os medicamentos solicitados, contendo informações sobre a quantidade de cada medicamento no pedido.

&emsp; Com base no modelo ER apresentado, foram elaboradas as tabelas do banco de dados da solução Pharmabot, conforme descrito a seguir.

## Tabelas do Banco de Dados

&emsp; A seguir, são apresentadas as tabelas do banco de dados da solução Pharmabot, com os atributos e relacionamentos entre as entidades e os comando SQL para a criação de cada tabela.

### Tabela `medicamentos`

&emsp; A tabela `medicamentos` armazena informações sobre os medicamentos cadastrados no sistema, como nome, descrição, fabricante, validade, lote e dose.

```sql
CREATE TABLE `medicamentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` TEXT NOT NULL,
  `descricao` TEXT,
  `fabricante` TEXT,
  `validade` DATE,
  `lote` TEXT,
  `dose` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```

### Tabela `pacientes`

&emsp; A tabela `pacientes` contém os dados dos pacientes atendidos pelo hospital, como nome, número do prontuário (HC) e leito.

```sql
CREATE TABLE `pacientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` TEXT NOT NULL,
  `hc` TEXT,
  `leito` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```

### Tabela `configuracoes_robo`

&emsp; A tabela `configuracoes_robo` registra as configurações do robô, como velocidade de operação e status.

```sql
CREATE TABLE `configuracoes_robo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `velocidade_operacao` INT,
  `status` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```

### Tabela `usuarios`

&emsp; A tabela `usuarios` armazena os dados dos usuários do sistema, como nome, e-mail, senha e data de criação.

```sql
CREATE TABLE `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `senha` TEXT NOT NULL,
  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```

### Tabela `pedidos`

&emsp; A tabela `pedidos` registra os pedidos de fitas de medicamentos realizados pelos usuários, contendo informações como status, data do pedido, paciente associado, prioridade e usuário que liberou o pedido.

```sql
CREATE TABLE `pedidos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` TEXT,
  `data_pedido` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `paciente_id` INT,
  `prioridade` INT,
  `liberado_por` TEXT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`paciente_id`) REFERENCES `pacientes`(`id`)
) ENGINE=InnoDB;
```

### Tabela `estoque`

&emsp; A tabela `estoque` gerencia o estoque de medicamentos disponíveis no hospital, com informações sobre a quantidade, localização e medicamento associado.

```sql
CREATE TABLE `estoque` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `medicamento_id` INT,
  `quantidade` INT NOT NULL,
  `bin_localizacao` TEXT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos`(`id`)
) ENGINE=InnoDB;
```

### Tabela `logs_sistema`

&emsp; A tabela `logs_sistema` registra as ações realizadas pelos usuários no sistema, como autenticação, solicitação de fitas de medicamentos e consultas de estoque.

```sql
CREATE TABLE `logs_sistema` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT,
  `acao` TEXT NOT NULL,
  `data_hora` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `detalhes` TEXT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`)
) ENGINE=InnoDB;
```

### Tabela `configuracoes_bins`

&emsp; A tabela `configuracoes_bins` armazena as configurações dos bins de armazenamento dos medicamentos, com informações sobre o bin, coordenada e configuração do robô associada.

```sql
CREATE TABLE `configuracoes_bins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `configuracao_robo_id` INT,
  `bin_id` TEXT NOT NULL,
  `coordenada` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`configuracao_robo_id`) REFERENCES `configuracoes_robo`(`id`)
) ENGINE=InnoDB;
```

### Tabela `pedidos_medicamentos`

&emsp; A tabela `pedidos_medicamentos` relaciona os pedidos de fitas de medicamentos com os medicamentos solicitados, contendo informações sobre a quantidade de cada medicamento no pedido.

```sql
CREATE TABLE `pedidos_medicamentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pedido_id` INT,
  `medicamento_id` INT,
  `quantidade` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`),
  FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos`(`id`)
) ENGINE=InnoDB;
```

&emsp; Com as tabelas e relacionamentos definidos, o banco de dados da solução Pharmabot está estruturado para armazenar e gerenciar as informações necessárias para o correto funcionamento do sistema, garantindo a eficiência e qualidade da aplicação.


