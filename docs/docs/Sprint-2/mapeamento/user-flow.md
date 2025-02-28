---
sidebar_position: 3
slug: /sprint-2/mapeamento/user-flow
---

# User Flows

&emsp; O _User flow_, diferente da história de usuário que mostra uma sequência de passos afim de completar uma atividade de alto nível **utilizando** a solução - possivelmente através de canais diferentes e ao longo do tempo -, apresenta uma série de passos para completar uma tarefa curta no próprio produto [(Kaplan, 2023)](../referencias.md). Ela também é diferente em propósito e formato do Diagrama UML da seção [``API/Arquitetura da API``](../API/arquitetura-api.md), pois foca nos passos e "cliques" do usuário no sistema e não na reação deste em relação àquele.

&emsp; Os  _User flows_ são criados com base nas _user stories_ e, abaixo, pode-se visualizar as principais tarefas que um usuário pode realizar na aplicação da PharmaTech. Nos diagramas apresentados, o círculo representa o início ou fim de uma tarefa, o retângulo representa o processo e o losango representa uma decisão, seja do sistema ou do usuário (Creately, 2022).

<div align="center" width="100%">

<sub>Figura 1 - Login</sub>

![User flow: login](/img/UX/user-flow/login.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; Este fluxo diz respeito a [US001](./user-stories.md) e constitui a primeira tarefa do usuário em nossa plataforma. Ela conta com o _pop-up_ de "Contate a administração" quando o usuário esquece a senha e impõe a necessidade de páginas pessoais e não páginas estáticas para cada usuário.

<div align="center" width="100%">

<sub>Figura 2 - Parar ou Retomar Robô</sub>

![User flow: parar ou retomar robô](/img/UX/user-flow/parar_retomar.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; O fluxo acima fluxo foi criado com base nas [US002](./user-stories.md), [US003](./user-stories.md), [US005](./user-stories.md) e [US006](./user-stories.md) apresentando a possibilidade de parar ou retomar o robô dependendo do seu estado. Esse fluxo ajuda a PharmaTech a entender a necessidade de verificar o estado atual do robô afim de apresentar a opção correta ao usuário. Ademais, com relação às US003 e US006, elas são apresentadas no segundo processo, revelando que tanto as futuras separações quanto as atuais devem estar contidas no dashboard.

<div align="center" width="100%">

<sub>Figura 3 - Visualizar Histórico de Fitas Separadas</sub>

![User flow: visualizar histórico](/img/UX/user-flow/visualizar_historico.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; O fluxo de visualizar histórico de fitas separadas é curto, pois trata-se apenas da necessidade de apresentar organizadamente o trabalho realizado pela robô. Porém, frisa-se a necessidade de mecanismos de busca e filtros no histórico e a possibilidade de verificar mais informações como os medicamentos contidos na fita. Este fluxo pertence à [US004](./user-stories.md).

<div align="center" width="100%">

<sub>Figura 4 - Configurar bin</sub>

![User flow: configurar bin](/img/UX/user-flow/novo_bin.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; O fluxo apresentado na Figura 4 diz respeito à [US007](./user-stories.md) que apresenta a possibilidade de configurar novos bins. Além disso, o _user flow_ evidencia as restrições de segurança necessárias na decisão "Preenchimento correto" feito pela própria plataforma para que o usuário não insira caracteres inválidos ou posições impossíveis. Ademais, o fluxo apresenta claramente o critério de aceite 4, com a possibilidade de enviar mais de uma localização.

&emsp; Em relação as [US008](./user-stories.md) e [US009](./user-stories.md), essas não serão feitas via plataforma e, por isso, não foram apresentadas nesta seção.

<div align="center" width="100%">

<sub>Figura 5 - Devolver Medicamentos</sub>

![User flow: devolver medicamento](/img/UX/user-flow/devolucao.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; O _user flow_ acima representa as [US010](./user-stories.md) e [US012](./user-stories.md), pois permite ao usuário pesquisar por informações do medicamento e verificar detalhes dele. Ademais, é possível alterar informações do remédio, como a quantidade - necessária para a devolução de um medicamento.

<div align="center" width="100%">

<sub>Figura 6 - Adicionar Medicamentos</sub>

![User flow: adicionar medicamento](/img/UX/user-flow/adicionar_medicamento.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A Figura 6 demonstra a [US013](./user-stories.md), esta diz respeito a possibilidade de adicionar novos medicamentos. Evidencia-se, porém, que parte desta _user story_ também está contida na Figura 5 com a possibilidade de alterar a quantidade de um remédio. Como todos os preenchimentos de formulário, é tarefa do sistema verificar a validade das informações; isso acontece na decisão "Informações Válidas?" deste _user flow_.  

<div align="center" width="100%">

<sub>Figura 7 - Exportar Relatório</sub>

![User flow: exportar relatorio](/img/UX/user-flow/exportar_relatorio_estoque.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A Figura 7 apresenta um _user flow_ simples: a tarefa do farmacêutico de exportar relatório em csv. Esta tarefa está na [US014](user-stories.md).

&emsp; Todas esses diagramas juntos formam grande parte das tarefas possíveis no sistema da PharmaTech, principalmente as tarefas prioritárias do TAPI. A sequência no diagrama auxiliou também na construção do wireframe apresentada na [seção a seguir](./wireframe.md)


