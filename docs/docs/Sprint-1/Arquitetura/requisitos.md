---
sidebar_position: 1
slug: /sprint-1/Arquitetura/requisitos
---

# Requisitos

## Introdução

&emsp; Segundo [Sommerville, Sawyer (1997)](/docs/Sprint-1/referencias.md), [Pressman e Maxim (2021)](/docs/Sprint-1/referencias.md), a Engenharia de Requisitos se trata da elicitação de funcionalidades e restrições que uma solução deve atender, refletindo as necessidades e expectativas de stakeholders. Esses requisitos são divididos em funcionais, que especificam as ações que sistema ou dispositivo deve realizar, e não funcionais, que determinam suas limitações de escopo, como desempenho, design, segurança e usabilidade. Requisitos são conceitos essenciais para o desenvolvimento de tecnologias e devem ser analisados com cuidado, conciliando as necessidades dos clientes e as limitações técnicas, de forma a se desenvolver sistemas de qualidade, confiáveis e eficientes.


### Requisitos Funcionais
&emsp; A seguir, são apresentados os requisitos funcionais, que visam atender às expectativas dos usuários e garantir a qualidade e eficiência da solução proposta.

<p style={{textAlign: 'center'}}>Quadro 1 - Requisitos Funcionais</p>
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF01 | O sistema deve permitir o cadastro de usuarios, com diferentes tipos de permissoes e acessos. | Alta |
| RF02 | O sistema deve permitir o cadastro de medicamentos, com informações sobre dosagem, validade e forma de administração. | Alta |
| RF03 | O sistema deve receber um pedido de separação de medicamentos, contendo informações sobre o paciente, a prescrição médica e a quantidade de medicamentos necessária. | Alta |
| RF04 | O sistema deve permitir a separação automática de medicamentos, com base nas prescrições médicas. | Alta |
| RF05 | O sistema deve permitir a montagem da "Fita de Medicamentos", com a disposição correta dos medicamentos para cada paciente. | Alta |
| RF06 | O sistema deve permitir a visualização em tempo real do processo de separação e montagem dos medicamentos. | Média |
| RF07 | O sistema deve permitir a integração com o sistema de gestão hospitalar, para atualização automática de prescrições e controle de estoque. | Média |
| RF08 | O sistema deve permitir a geração de relatórios de desempenho, com dados sobre o uso de medicamentos, tempo de processamento e incidência de erros. | Baixa |
| RF09 | O sistema deve permitir a rastreabilidade dos medicamentos, com informações sobre origem, validade e uso. | Baixa |
| RF10 | O sistema deve permitir a identificação de medicamentos vencidos ou em falta, para reposição imediata. | Baixa |

&emsp; Com isso, os requisitos funcionais apresentados visam garantir a eficiência e qualidade do sistema proposto, atendendo às expectativas dos usuários e stakeholders envolvidos no projeto.


### Requisitos Não Funcionais
#### Pesquisa realizada (norma ISO 25010)
&emsp; Nesta seção sobre requisitos não funcionais - que são responsáveis por definir **como** o sistema deve operar - foi levantada uma pesquisa sobre a norma ISO 25010 (ou International Organization for Standardization) que consiste em uma organização que promove a padronização de produtos e serviços por meio de normas internacionais, sendo o 25010 a versão mais atualizada desse padrão para qualidade de software. Com isso, os seguintes critérios foram estipulados:

<p style={{textAlign: 'center'}}>Quadro 2 - Padrões de qualidade de software de acordo com a norma ISO 25010</p>

| **Requisitos**      | **Critérios**                    | **Descrição**                                                                                     |
|---------------------|----------------------------------|---------------------------------------------------------------------------------------------------|
| Adequação Funcional | Completude Funcional             | O sistema implementa todas as funções necessárias para atender aos requisitos especificados.      |
| Adequação Funcional | Exatidão Funcional               | O sistema fornece resultados corretos e precisos, conforme especificado nos requisitos.           |
| Adequação Funcional | Adequação Funcional              | As funcionalidades do sistema são apropriadas para o propósito e contexto de uso.                 |
| Eficiência          | Comportamento Temporal           | O sistema responde e processa operações dentro dos tempos aceitáveis de resposta.                 |
| Eficiência          | Utilização de Recursos           | O sistema utiliza recursos como memória e CPU de forma eficiente, sem desperdícios excessivos.    |
| Eficiência          | Capacidade                       | O sistema suporta a quantidade de usuários e transações especificadas sem perda de desempenho.    |
| Compatibilidade     | Coexistência                     | O sistema opera de forma eficaz junto a outros sistemas, sem causar conflitos.                    |
| Compatibilidade     | Interoperabilidade               | O sistema pode trocar informações com outros sistemas e utilizar dados de outras fontes.          |
| Usabilidade         | Reconhecimento de Adequação      | Os usuários conseguem entender facilmente a adequação das funções do sistema ao seu propósito.    |
| Usabilidade         | Capacidade de Aprendizado        | O sistema é fácil de aprender para novos usuários, com curva de aprendizado reduzida.             |
| Usabilidade         | Operabilidade                    | O sistema é fácil de usar e permite que os usuários realizem suas tarefas sem dificuldade.        |
| Usabilidade         | Proteção Contra Erros do Usuário | O sistema previne ou facilita a recuperação de erros causados por entradas ou ações incorretas.   |
| Usabilidade         | Estética da Interface de Usuário | A interface do sistema é visualmente atraente e organizada de forma a facilitar o uso.            |
| Usabilidade         | Acessibilidade                   | O sistema é acessível para pessoas com diferentes tipos de deficiências e limitações.             |
| Confiabilidade      | Maturidade                       | O sistema possui baixo índice de falhas e é estável em diversas condições de operação.            |
| Confiabilidade      | Disponibilidade                  | O sistema está disponível para uso conforme o esperado, minimizando o tempo de inatividade.       |
| Confiabilidade      | Tolerância a falhas              | O sistema pode continuar funcionando mesmo em caso de falhas parciais ou erros.                   |
| Confiabilidade      | Recuperabilidade                 | O sistema pode se recuperar de falhas e restaurar dados e operações sem perda significativa.      |
| Segurança           | Confidencialidade                | O sistema protege dados sensíveis contra acessos não autorizados.                                 |
| Segurança           | Integridade                      | O sistema mantém a precisão e a consistência dos dados armazenados e processados.                 |
| Segurança           | Não-repúdio                      | O sistema garante que as ações dos usuários podem ser rastreadas e autenticadas.                  |
| Segurança           | Autenticidade                    | O sistema verifica a identidade dos usuários e fontes de dados antes do acesso.                   |
| Segurança           | Responsabilidade                 | O sistema permite rastrear ações de usuários para responsabilização em caso de problemas.         |
| Manutenabilidade    | Modularidade                     | O sistema é composto de módulos independentes, facilitando a manutenção e atualização.            |
| Manutenabilidade    | Reutilização                     | O sistema permite a reutilização de componentes ou módulos em outros sistemas.                    |
| Manutenabilidade    | Analisabilidade                  | O sistema facilita a identificação e análise de problemas para suporte e melhorias.               |
| Manutenabilidade    | Modificabilidade                 | O sistema pode ser modificado para atender a novas necessidades ou corrigir problemas.            |
| Manutenabilidade    | Testabilidade                    | O sistema é fácil de testar, com funcionalidades verificáveis e monitoráveis.                     |
| Portabilidade       | Adaptabilidade                   | O sistema pode ser adaptado para diferentes ambientes e plataformas com facilidade.               |
| Portabilidade       | Instalabilidade                  | O sistema pode ser instalado em diferentes ambientes de maneira prática e eficaz.                 |
| Portabilidade       | Substituibilidade                | O sistema pode substituir ou ser substituído por outro, com mínima dificuldade de integração.     |


#### Requisitos levantados
&emsp; A partir da pesquisa levantada, os seguintes requisitos foram estipulados:

<p style={{textAlign: 'center'}}>Quadro 3 - Requisitos Não Funcionais</p>

### **Quadro 3 - Requisitos Não Funcionais**

| ID   | Descrição | Prioridade | Aspecto de Qualidade |
|------|-----------|------------|----------------------|
| **RNF01** | O sistema deve garantir a segurança e confidencialidade dos dados dos pacientes e do hospital. | Alta | Segurança (Confidencialidade) |
| **RNF02** | O sistema deve garantir a integridade dos dados durante a transmissão e armazenamento, evitando inconsistências. | Alta | Segurança (Integridade) |
| **RNF03** | O sistema deve operar de forma estável, minimizando falhas e interrupções inesperadas. | Alta | Confiabilidade (Maturidade) |
| **RNF04** | O sistema deve ser acessível a usuários com deficiência visual, garantindo compatibilidade com leitores de tela. | Média | Usabilidade (Acessibilidade) |
| **RNF05** | O sistema deve permitir recuperação de dados e continuidade da operação em caso de falha. | Média | Confiabilidade (Recuperabilidade) |
| **RNF06** | O sistema deve integrar-se com o sistema de gestão hospitalar utilizando APIs para garantir a interoperabilidade. | Alta | Compatibilidade (Interoperabilidade) |
| **RNF07** | O sistema deve registrar logs detalhados de todas as operações realizadas pelo robô, garantindo rastreabilidade para auditoria e segurança. | Alta | Segurança (Responsabilidade) |
| **RNF08** | O sistema deve permitir fácil manutenção e atualização modular para ajustes futuros. | Média | Manutenibilidade (Modificabilidade) |
| **RNF09** | A interface do sistema deve seguir padrões de design responsivo para adaptação a diferentes dispositivos, incluindo tablets utilizados no hospital. | Baixa | Portabilidade (Adaptabilidade) |
| **RNF10** | O sistema deve permitir instalação e operação em diferentes ambientes hospitalares sem necessidade de grandes ajustes. | Baixa | Portabilidade (Instalabilidade) |

&emsp; Com isso, os requisitos não funcionais garantirão que o sistema opere com um desempenho eficiente, segurança, usabilidade, confiabilidade, escalabilidade, entre outros.