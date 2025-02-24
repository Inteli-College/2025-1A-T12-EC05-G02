# Arquitetura da API
&emsp;A seção a seguir aborda os Diagramas de Sequência UML dos procedimentos da API do sistema que será utilizado para controlar o processo da triagem e separação.

### Diagrama de Sequência dos Usuários
&emsp;O primeiro diagrama descreve as interações entre os usuários e o sistema, incluindo processos como autenticação, cadastro, atualização de dados e permissões.

<div align="center" width="100%">

<sub>Figura 1 - Diagrama de Sequência dos Usuários</sub>

![Diagrama UML - Usuários](/img/diagramas-uml/usuarios.svg)

<sup>Fonte: Autoria própria </sup>

</div>

### Diagrama de Sequência do Estoque
&emsp;Este diagrama detalha o fluxo de requisições relacionadas à gestão de estoque de medicamentos, como entrada, saída e atualização de quantidades disponíveis

<div align="center" width="100%">

<sub>Figura 2 - Diagrama de Sequência do Estoque</sub>

![Diagrama UML - Estoque](/img/diagramas-uml/estoque.svg)

<sup>Fonte: Autoria própria </sup>

</div>

### Diagrama de Sequência da Fila de Medicamentos
&emsp;Esse diagrama ilustra o gerenciamento da fila de pedidos de medicamentos, incluindo a ordem de processamento e priorização dos itens a serem separados.

<div align="center" width="100%">

<sub>Figura 3 - Diagrama de Sequência da Fila de Medicamentos</sub>

![Diagrama UML - Fila de Medicamentos](/img/diagramas-uml/fila.svg)

<sup>Fonte: Autoria própria </sup>

</div>

### Diagrama de Sequência dos Procedimentos com o Robô
&emsp;O último diagrama apresenta as interações entre o sistema e o robô responsável pela separação e entrega dos medicamentos, garantindo a automação do processo.

<div align="center" width="100%">

<sub>Figura 4 - Diagrama de Sequência dos Procedimentos com o Robô</sub>

![Diagrama UML - Procedimentos com o Robô](/img/diagramas-uml/robo.svg)

<sup>Fonte: Autoria própria </sup>

</div>

### Conclusão
&emsp;Os diagramas apresentados detalham a arquitetura da API e seu funcionamento nos processos essenciais do sistema. A estrutura modular permite escalabilidade e manutenção simplificada, garantindo um fluxo eficiente de informações e automação de tarefas na gestão de medicamentos.