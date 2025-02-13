---
sidebar_position: 1
slug: /sprint-1/Arquitetura/arquitetura
---

# Diagrama de Blocos

&emsp; A aplicação Pharmabot foi arquitetada em distintas camadas referentes ao nível te atuação dos componentes e tecnologias envolvidas na solução. A separação por camadas de aplicação permite uma organização mais clara e modular do código-fonte, o que facilita manutenções e futuras implementações no código. Abaixo se encontra o diagrama de blocos da arquitetura elaborada, viabilizando fácil entendimento sobre o sistema a ser desenvolvido.

<p style={{textAlign: 'center'}}>Figura 1 - Diagrama de Blocos da Arquitetura</p>

![Block Diagram](../../../static/img/arquitetura/block-diagram.jpeg)

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria (2025)</p>

## Camada Cloud

&emsp; A [arquitetura de nuvem](https://cloud.google.com/learn/what-is-cloud-architecture?hl=pt-BR) se refere a como vários componentes de tecnologia de nuvem, como hardware, recursos virtuais, capacidades de software e sistemas de rede virtual interagem e se conectam para criar ambientes de computação em nuvem. Nesse contexto, o sistema segue uma arquitetura cliente-servidor baseada em nuvem em que o  front-end atua como cliente, enviando solicitações e o back-end processa essas solicitações e interage com a API do robô.

### Front-End

&emsp; As plataformas de front-end contêm a infraestrutura do cliente, ou seja,  com a qual as pessoas interagem, como menus de navegação, elementos de design, botões, imagens e gráficos. Nesse sentido, o front-end da nossa aplicação será utilizado pelos enfermeiros e farmacêuticos, por exemplo para a solicitação de medicamentos. Assim, segue as principais funcionalidades do front-end:

- **Autenticação de Usuários:** Os usuários precisarão passar por um processo de autenticação, por meio do login, para conseguirem se conectar ao sistema do hospital e ter acesso às funcionalidades disponíveis conforme o perfil solicitante.


- **Pedido das fitas de medicamentos:** Após estar logado e autenticado, o sistema permite que o usuário solicite as fitas de medicamentos, assim, esses pedidos são enviados para o back-end, onde serão processados antes de serem enviados para o robô.  
    
- **Gerenciamento de Estoque:** Após estar logado e autenticado, o usuário pode consultar o estoque de cada medicamento, além dos registros de cada saída de medicamento registrada pelo robô.
    
- **Registro e Consulta de Pessoas:** Após estar logado e autenticado, o sistema armazena as informações sobre o usuário cadastrado, além disso, essas informações são enviadas para o back-end e utilizadas para autenticação e gestão dos pedidos de medicamentos.


### Back-End

&emsp; O back-end, também conhecido como o lado do servidor,  gerencia a funcionalidade geral de uma aplicação. Nesse sentido, quando o usuário interage com o front-end, a interação envia uma solicitação para o back-end. Em seguida, o  back-end processa a solicitação e retorna uma resposta, além de gerenciar a base de dados e se comunicar com a API do robô. Assim, segue as principais funcionalidades do back-end:

- **API:** Recebe as solicitações advindas do front-end, como a autenticação dos usuários e o pedido das fitas de medicamentos, processa esses pedidos e retorna uma resposta. Além disso, é responsável por interagir com o banco de dados e pela comunicação com a API do robô.
    
- **Cadastro, Consulta e Validação de Dados:** O sistema permite que os dados de medicamentos, usuários e pedidos sejam cadastrados e validados, garantindo que apenas informações corretas sejam buscadas e  enviadas para o banco de dados.  
    
- **Banco de dados:** Armazena as informações necessárias para o funcionamento do sistema, como os usuários cadastrados, histórico de pedidos das fitas de medicamentos e registros das saídas dos medicamentos.

## Camada dos Atuadores Físicos

&emsp; 

### Robô

### Microcontrolador