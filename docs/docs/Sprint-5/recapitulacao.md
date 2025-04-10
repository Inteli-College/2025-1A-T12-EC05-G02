---
sidebar_position: 1
slug: /sprint-5/recapitulacao
description: Recapitulação Requisitos Funcionais e Não Funcionais
---

# Recapitulação de Requisitos

&emsp; Durante o projeto, a PharmaTech manteve-se atenta aos [requisitos funcionais e não funcionais definidos no início do projeto](../Sprint-1/Arquitetura/requisitos.md). Isso permitiu que a equipe entregasse o máximo de valor ao cliente, focando em suas necessidades e dores. Entretanto, um dos princípios da metodologia ágil é que "mudanças nos requisitos são bem-vindas, mesmo tardiamente no desenvolvimento" [(Cunningham, 2001)](referencias.md), pois o ágil valoriza a flexibilidade e a entrega contínua de valor [(Cunningham, 2001)](referencias.md).

&emsp; Por essa razão, ao iterar sobre os requisitos ao longo do projeto, a equipe realizou atualizações, deleções e adições na entrega desta POC. Algumas delas serão incorporadas ao *roadmap* do projeto, enquanto outras, em razão do seu baixo valor agregado, foram excluídas. Delineamos essas atualizações abaixo.

## Deleções

&emsp; Os requisitos funcionais que se seguem foram deletados:

| RF05 | O sistema deve permitir a montagem da "Fita de Medicamentos", com a disposição correta dos medicamentos para cada paciente. | Alta |
| RF08 | O sistema deve permitir a geração de relatórios de desempenho, com dados sobre o uso de medicamentos, tempo de processamento e incidência de erros. | Baixa |

&emsp; O quinto foi deletado desde a primeira sprint, pois era fruto de um entendimento incorreto do projeto. O robô é incapaz de montar as fitas da maneira que pede o hospital (selando-as e imprimindo uma inscrição com os medicamentos contidos no pacote). Portanto, trata-se de uma funcionalidade restringida pela falta de recursos da equipe.

&emsp; Já o requisito funcional oito foi retirado devido à restrições de tempo. Por tratar-se de um requisito com baixa prioridade ele não foi implementado. Porém, recomenda-se implementá-lo para viabilizar o feedback do modelo no futuro. Trata-se de um item para o *roadmap*.

&emsp; Em relação aos requisitos não funcionais, apenas o que se segue foi deletado:

| RNF04 | O sistema deve ser acessível a usuários com deficiência visual, garantindo compatibilidade com leitores de tela. | Média | Usabilidade (Acessibilidade) |

&emsp; Apesar de reconhecer a importância da acessibilidade no desenvolvimento moderno de aplicações web, a PharmaTech cometeu o erro de não padronizar isso desde o início do desenvolvimento. Por conseguinte, a aplicação escalou demais para implementar essa compatibilidade a tempo. Admite-se que se trata de uma grave equívoco no desenvolvimento do PharmaBot, por isso, sugere-se aos futuros mantenedores do projeto priorizarem esse requisito.


## Atualizações

&emsp; Os requisitos **RF01**, **RF02**, **RF03**, **RF06** e **RF10** foram atualizados da maneira que se segue:

<p style={{textAlign: 'center'}}>Quadro 1 - Requisitos Funcionais Atualizados</p>
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF01 | Antes: O sistema deve permitir o cadastro de usuários, com diferentes tipos de permissões e acessos. <br/> <b> Depois: O sistema deve permitir o cadastro de usuários administradores e usuários comuns. </b> | Alta |
| RF02 | Antes: O sistema deve permitir o cadastro de medicamentos, com informações sobre dosagem, validade e forma de administração. <br/> <b> Depois: O sistema deve permitir o cadastro de medicamentos, com informações sobre dosagem, validade, fabricante e lote. </b> | Alta |
| RF03 | Antes: O sistema deve receber um pedido de separação de medicamentos, contendo informações sobre o paciente, a prescrição médica e a quantidade de medicamentos necessária. <br/> <b> Depois: O sistema deve receber um pedido de separação de medicamentos, contendo informações sobre o farmacêutico que o enviou, o paciente, a prescrição médica associada, medicamentos a serem separados e suas respectivas quantidades. </b> | Alta |
| RF06 | Antes: O sistema deve permitir a visualização em tempo real do processo de separação e montagem dos medicamentos. <br/> <b> Depois: O sistema deve permitir a visualização em tempo real do processo de separação feito pelo robô. </b> | Antes: Média <br/> <b> Depois: Alta </b> |
| RF10 | O sistema deve permitir a identificação de medicamentos vencidos ou em falta, para reposição imediata. <br/> <b> Depois: O sistema deve permitir a identificação de medicamentos vencidos antes de separá-lo. </b> | Antes: Baixa <br/> <b> Depois: Alta </b> |

&emsp; Essas atualizações foram feitas com base na melhor compreensão da equipe sobre as necessidades dos clientes. Por exemplo, inicialmente acreditava-se que era essencial separar os usuários em administradores, farmacêuticos e técnicos de farmácia. No entanto, com a atualização da arquitetura na sprint 2, que viabilizou a integração do PharmaBot com o sistema já utilizado por eles, essa exigência tornou-se menos relevante, pois os farmacêuticos deixaram de acessá-lo diretamente. 

&emsp; Por outro lado, o RF02 foi revisado devido à necessidade de mais informações sobre os remédios, enquanto que o RF03 se tornou mais preciso. Já o requisito funcional 6 foi atualizado devido às restrições de tempo da equipe que inviabilizou a montagem de fitas pelo braço.

&emsp; Em relação aos requisitos não funcionais, não houve atualizações.

## Adições

&emsp; Aos requisitos funcionais adicionou-se os seguintes requisitos:

<p style={{textAlign: 'center'}}>Quadro 2 - Requisitos Funcionais Adicionados</p>
Descrição | Prioridade |
-----------|------------|
O sistema deve conseguir manter a fila de pedidos a serem separados pelo robô | Alta |
O sistema deve permitir ao usuário ver a fila de pedidos a serem separados pelo robô | Alta |
O sistema deve permitir que o usuário pare o robô remotamente a qualquer momento | Média |
O sistema deve avisar por meio de notificações na plataforma quando o robô não conseguir capturar um remédio | Média |
O sistema deve avisar por meio de um buzzer quando o robô não conseguir capturar um remédio | Média |


&emsp; Essas adições aos requisitos funcionais visam permitir maior controle e monitoramento do usuário sobre o braço robótico.

&emsp; Já em relação aos requisitos não funcionais, foi adicionado o seguinte requisito:

<p style={{textAlign: 'center'}}>Quadro 3 - Requisitos Não Funcionais Adicionados</p>
Descrição | Prioridade |
-----------|------------|
O sistema deve manter um histórico das prescrições recebidas que não pode ser alterado, garantindo rastreabilidade para auditoria e segurança. | Alta | Segurança (Responsabilidade) |

&emsp; Esse requisito permite maior segurança e confiança do técnico no sistema, pois permite que ele guarde registros confiáveis de seus recebimentos.

## Requisitos Finais

&emsp; Essas mudanças permitem ao projeto se tornar mais alinhado com a visão e as necessidades do HC da Unicamp. Além disso, tratam os recursos da PharmaTech de forma mais realista, dado as restrições de recursos financeiros e tempo.

### Requisitos Funcionais Atualizados

&emsp; Após essas mudanças, os requisitos funcionais passaram a ser os seguintes:

<p style={{textAlign: 'center'}}>Quadro 4 - Requisitos Funcionais</p>
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF01 | O sistema deve permitir o cadastro de usuários administradores e usuários comuns. | Alta |
| RF02 | O sistema deve permitir o cadastro de medicamentos, com informações sobre dosagem, validade, fabricante e lote. | Alta |
| RF03 | O sistema deve receber um pedido de separação de medicamentos, contendo informações sobre o farmacêutico que o enviou, o paciente, a prescrição médica associada, medicamentos a serem separados e suas respectivas quantidades. | Alta |
| RF04 | O sistema deve permitir a separação automática de medicamentos, com base nas prescrições médicas. | Alta |
| RF05 | O sistema deve permitir a visualização em tempo real do processo de separação feito pelo robô. | Alta |
| RF06 | O sistema deve permitir a integração com o sistema de gestão hospitalar, para atualização automática de prescrições e controle de estoque. | Média |
| RF07 | O sistema deve permitir a rastreabilidade dos medicamentos, com informações sobre origem, validade e uso. | Baixa |
| RF08 | O sistema deve permitir a identificação de medicamentos vencidos ou em falta, para reposição imediata. | Baixa |
| RF09 | O sistema deve conseguir manter a fila de pedidos a serem separados pelo robô. | Alta |
| RF10 | O sistema deve permitir ao usuário ver a fila de pedidos a serem separados pelo robô. | Média |
| RF11 | O sistema deve permitir que o usuário pare o robô remotamente a qualquer momento. | Média |
| RF12 | O sistema deve avisar por meio de notificações na plataforma quando o robô não conseguir capturar um remédio. | Média |
| RF13 | O sistema deve avisar por meio de um buzzer quando o robô não conseguir capturar um remédio. | Baixa |

<!-- Lembra de arrumar a ordem, Heitor -->

### Requisitos Não Funcionais Atualizados

&emsp; Já em relação aos requisitos não funcionais, apenas acrescentou-se um último como se vê abaixo.

<p style={{textAlign: 'center'}}>Quadro 5 - Requisitos Não Funcionais Atualizados </p>
| ID   | Descrição | Prioridade | Aspecto de Qualidade |
|------|-----------|------------|----------------------|
| RNF01 | O sistema deve garantir a segurança e confidencialidade dos dados dos pacientes e do hospital. | Alta | Segurança (Confidencialidade) |
| RNF02 | O sistema deve garantir a integridade dos dados durante a transmissão e armazenamento, evitando inconsistências. | Alta | Segurança (Integridade) |
| RNF03 | O sistema deve operar de forma estável, minimizando falhas e interrupções inesperadas. | Alta | Confiabilidade (Maturidade) |
| RNF04 | O sistema deve permitir recuperação de dados e continuidade da operação em caso de falha. | Média | Confiabilidade (Recuperabilidade) |
| RNF05 | O sistema deve integrar-se com o sistema de gestão hospitalar utilizando APIs para garantir a interoperabilidade. | Alta | Compatibilidade (Interoperabilidade) |
| RNF06 | O sistema deve registrar logs detalhados de todas as operações realizadas pelo robô, garantindo rastreabilidade para auditoria e segurança. | Alta | Segurança (Responsabilidade) |
| RNF07 | O sistema deve permitir fácil manutenção e atualização modular para ajustes futuros. | Média | Manutenibilidade (Modificabilidade) |
| RNF08 | A interface do sistema deve seguir padrões de design responsivo para adaptação a diferentes dispositivos, incluindo tablets utilizados no hospital. | Baixa | Portabilidade (Adaptabilidade) |
| RNF09 | O sistema deve permitir instalação e operação em diferentes ambientes hospitalares sem necessidade de grandes ajustes. | Baixa | Portabilidade (Instalabilidade) |
| RNF10 | O sistema deve manter um histórico das prescrições recebidas que não pode ser alterado, garantindo rastreabilidade para auditoria e segurança. | Alta | Segurança (Responsabilidade) |

 
