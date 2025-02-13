---
sidebar_position: 1
slug: /sprint-1/Arquitetura/arquitetura
---

# Diagrama de Blocos

&emsp; Define-se como uma arquitetura de software as técnicas e padrões utilizados. Desta forma, a arquitetura tem como objetivo servir de *roadmap* para o desenvolvimento de uma aplicação, e leva em consideração as regras de negócios e quaisquer restrições tecnológicas aplicadas ao projeto [(RED HAT, 2023)](/docs/Sprint-1/referencias.md). A solução Pharmabot foi arquitetada em distintas camadas referentes ao nível de atuação dos componentes e tecnologias envolvidas na solução. A separação por camadas de aplicação permite uma organização mais clara e modular do código-fonte, o que facilita manutenções e futuras implementações no código. É importante destacar que, as funcionalidades e disposição geral da arquitetura são baseados nos requisitos funcionais e não-funcionais disponibilizados no arquivo de [requisitos](/Sprint-1/Arquitetura/requisitos.md). Abaixo se encontra o diagrama de blocos da arquitetura elaborada, viabilizando fácil entendimento sobre o sistema a ser desenvolvido.

<p style={{textAlign: 'center'}}>Figura 1 - Diagrama de Blocos da Arquitetura</p>

![Block Diagram](/img/arquitetura/block-diagram.png)

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

- **API:** Recebe as solicitações do front-end, como a autenticação de usuários e os pedidos das fitas de medicamentos, processa essas requisições e retorna uma resposta. Assim, o sistema permite o cadastro e a validação dos dados de medicamentos, usuários e pedidos, garantindo que apenas informações corretas sejam armazenadas e recuperadas do banco de dados. Além disso, a API também é responsável por comunicar-se com a API do robô.
    
- **Banco de dados:** Armazena as informações necessárias para o funcionamento do sistema, como os usuários cadastrados, histórico de pedidos das fitas de medicamentos e registros das saídas dos medicamentos.

## Camada de Atuadores Físicos

&emsp; A camada de atuadores físicos encapsula os componentes e dispositivos responsáveis pela interação com o ambiente de atuação da solução Pharmabot - referidos neste documento como *hardwares*. Desta forma, no escopo de desenvolvimento do projeto, os *hardwares* responsáveis pela comunicação entre a camada *cloud* e a separação dos medicamentos na farmácia são o **microcontrolador** e o **robô**. Abaixo, explora-se as funcionalidades e responsabilidades de cada dispositivo na performance da aplicação.

### Robô

Neste projeto, utiliza-se o **Magician Dobot** um braço robótico fixo, projetado para tarefas de automação de precisão. Sua estrutura consiste em uma base estável, que fixa o robô em uma superfície, e um braço articulado, capaz de se movimentar em diferentes eixos para manipular objetos. Ele é **atuador físico principal** da solução, responsável pela manipulação dos medicamentos para a montagem da **Fita de Medicamentos**. Integrado à arquitetura do projeto, o robô utiliza um **braço robótico com bico sugador**, permitindo a **captação precisa de medicamentos** a partir das informações recebidas do sistema.  

Para garantir a precisão e rastreabilidade dos medicamentos, o robô conta com dois sensores principais:
- **Sensor leitor de códigos (bipagem do medicamento)**: Verifica informações dos medicamentos capturados, garantindo que estejam corretos antes de serem alocados na fita.
- **Sensor infravermelho**: Confirma se o objeto foi devidamente capturado pelo braço robótico antes de continuar o processo. 


<p style={{textAlign: 'center'}}>Figura 1 - Diagrama de Blocos da Arquitetura</p>

<div align="center">

![Block Diagram](/img/arquitetura/dobot-magician.jpg)

</div>

<p style={{textAlign: 'center'}}>Fonte: Loja do Jangão. Disponível em: https://www.lojadojangao.com.br/us/products/dobot-magician-lite-robotic-arm/.(2025)</p>



O nosso robô recebe **comandos do microcontrolador ESP32**, que atua como intermediário entre a **camada *cloud*** e os **atuadores físicos**, garantindo a execução correta das tarefas conforme as prescrições médicas registradas no sistema.

### Microcontrolador

O **ESP32** é um **microcontrolador de alto desempenho** com conectividade e amplamente utilizado em aplicações embarcadas para automação, IoT e controle de dispositivos, devido à sua eficiência energética, capacidade de processamento e múltiplas interfaces de comunicação. Por isso, no projeto, desempenha um papel essencial na comunicação entre o **robô** e o **sistema digital na nuvem**. Ele funciona como um controlador central que:
1. **Recebe comandos da API do robô** e os traduz para ações mecânicas no Magician Dobot.
2. **Gerencia a máquina de estado do robô**, garantindo que cada comando seja executado corretamente e na ordem adequada.
3. **Consulta e transmite informações sobre o status do robô** para o sistema, permitindo monitoramento em tempo real.  

Através dessa integração, o ESP32 atua como a ponte entre a **inteligência digital (back-end e front-end)** e a **execução física (robô Magician Dobot)**, permitindo um fluxo eficiente e confiável na separação dos medicamentos. 