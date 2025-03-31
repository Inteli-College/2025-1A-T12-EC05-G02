---
sidebar_position: 2
slug: /sprint-4/telas/fluxo-principal
description: Fluxo principal do usuário na aplicação
---

# Fluxo Principal

&emsp; Nessa seção deve-se abordar as telas principais da aplicação, mencionando algumas de suas peculiaridades. Esse fluxo principal é constituido por: **login**, **home** e **dashboard**. Deve-se mencionar que não há tela para esquecer a senha, apenas um modal com **comunique a administração**, dado o acesso restrito da aplicação. Na tela de home, deve-se mencionar o acesso a outras telas e o acesso rápido ao histórico de prescrições. Na tela de dashboard, deve-se mencionar apenas sua estilização afim de evitar a repetição com a seção de monitoramento. Além disso, deve-se mencionar a sua comparação com o **Prótotipo de Alta Fidelidade** e **User Stories**.

## Tela de Login

&emsp; A tela de login é o ponto de entrada da aplicação, oferecendo acesso restrito e personalizado aos técnicos de farmácia. Esta interface apresenta dois campos principais: email e senha, além de um botão "Entrar" para submissão das credenciais.

<div align="center" width="100%">

<sub>Figura 1 - Frontend do Login</sub>

![Frontend do Login](/img/docs/login-frontend.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp;Uma peculiaridade importante desta tela é a ausência de uma funcionalidade convencional de "Esqueci minha senha". Em seu lugar, existe um link "Esqueci a senha" que, ao ser clicado, exibe um modal com a mensagem "Comunique a administração". Esta abordagem foi adotada devido ao acesso restrito da aplicação. Além disso, caso o usuário tente fazer login com um email inválido, por exemplo, sem o "@" a plataforma irá notificá-lo para inserir um email váilido. Vale mencionar também que quando o login é feito com sucesso, o usuário é direcionado diretamente para a tela "home".

<div align="center" width="100%">

<sub>Figura 2 - Modal esqueci minha senha</sub>

![Modal esqueci minha senha](/img/docs/login-comunique-administracao.png)

<sup>Fonte: Autoria própria </sup>

</div>

<div align="center" width="100%">

<sub>Figura 3 - Email Inválido</sub>

![Email Inválido](/img/docs/login-email-valido.png)

<sup>Fonte: Autoria própria </sup>

</div>

### Tela de login e User Stories

&emsp; A implementação da tela de login atende integralmente à User Story do técnico de farmácia que necessita de "um acesso pessoal na plataforma para acessar apenas as páginas que lhe competem".

Todos os critérios de aceite foram contemplados na implementação:
- Existência de campos para email e senha
- Modal de orientação para esquecimento de senha
- Redirecionamento após autenticação bem-sucedida
- Orientação em caso de dados incorretos

A interface desenvolvida mantém fidelidade com o Protótipo de Alta Fidelidade, garantindo que a experiência de usuário planejada seja efetivamente entregue no produto final.

<div align="center" width="100%">

<sub>Figura 4 - Protótipo de Alta Fidelidade</sub>

![Protótipo de Alta Fidelidade](/img/docs/login-alta-fidelidade.png)

<sup>Fonte: Autoria própria </sup>

</div>

## Tela Home

&emsp; Seguindo o fluxo de usuário definido nas sprints anteriores, após *login* o usuário é direcionado à tela **home**, que apresenta alguns campos importantes para a navegação na plataforma WEB, como observado na figura 5. 

<div align="center" width="100%">

<sub>Figura 5 - Frontend página Home</sub>

![Frontend página Home](/img/docs/home.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp;Na lateral esquerda, observa-se uma *sidebar* de ações, com botões de redirecionamento para as telas de fluxo secundário do sistema. Adicionalmente, encontra-se dois identificadores numéricos indicando a quantidade de fitas médicas a **serem separadas** e **já separadas** pelo *PharmaBot*. Finalmente, a tela **home** apresenta os *logs* de prescrições do sistema, com a possibilidade de filtragem, pesquisa e exportação de arquivo CSV dos *logs* encontrados.

&emsp;Na *sidebar* da tela **home**, os botões de *Dashboard, Estoque, Histórico de Prescrições, Histórico de Logs, Bins, Usuários*, redirecionam o usuário para as telas autointituladas. Além desta funcionalidade, o botão de *"Verificar"*, encontrado abaixo dos indicadores numéricos, redirecionam para a página *Dashboard*, conforme *User Stories*. 

<div align="center" width="100%">

<sub>Figura 6 - Sidebar de redirecionamento</sub>

![Sidebar de redirecionamento](/img/docs/sidebar-redirecionamento.png)

<sup>Fonte: Autoria própria </sup>

</div>

<div align="center" width="100%">

<sub>Figura 7 - Botões de verificação da tela Dashboard</sub>

![Botões de verificação da tela Dashboard](/img/docs/cards-verificar.png)

<sup>Fonte: Autoria própria </sup>

</div>


### Tela home e User Stories

&emsp; A tela **home** estabelece um ponto fundamental na jornada do usuário durante o uso de nossa plataforma. Portanto, compreende-se sua contribuição indireta para a abrangência das *user stories* definidas anteriormente.

&emsp; A interface desenvolvida mantém fidelidade com o Protótipo de Alta Fidelidade, garantindo que a experiência de usuário planejada seja efetivamente entregue no produto final.

<div align="center" width="100%">

<sub>Figura 8 - Protótipo de Alta Fidelidade</sub>

![Botões de verificação da tela Dashboard](/img/docs/home-alta-fidelidade.png)

<sup>Fonte: Autoria própria </sup>

</div>

## Tela Dashboard

&emsp; Através do fluxo de usuário esperado, definido nas Jornadas de Usuário, o *user* terá à sua disposição o estado atual do robô na tela *Dashboard*. A tela concentra as fitas médicas a serem separadas, conforme recebimento de prescrições, em três categorias: **na fila**, **em preparo**, **separado**. Além disso, a tela dispõe informações em seu *header* personalizado, como localização atual do robô e um botão para pausar a atuação do robô e retomar seu funcionamento, caso necessário. Na figura 9, encontra-se o estado atual da página *Dashboard*.

<div align="center" width="100%">

<sub>Figura 9 - Frontend página Dashboard</sub>

![Frontend página Dashboard](/img/docs/dashboard.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp;Nos *cards* das fitas de montagens, presentes dentro do quadro *kanban*, encontram-se informações relacionadas ao paciente, como nome e leito, e os medicamentos a serem coletados, além de seu estado de urgência (baixo, moderado e crítico). É importante destacar a integração dos *cards* das fitas de separação com o processo de separação do robô, ou seja, os *cards* atualizam seu estado (sai da categoria "*na fila*" para "*em progresso*", por exemplo) enquanto o robô executa a separação. Finalmente, após finalização da coleta da fita, o *card* é movido automaticamente à categoria *separado*. Abaixo, destaca-se o *card* de fita de medicações.

<div align="center" width="100%">

<sub>Figura 10 - Card de fita de medicações</sub>

![Card de fita de medicações](/img/docs/card-kanban.png)

<sup>Fonte: Autoria própria </sup>

</div>

### Dashboard e User Stories

&emsp; A tela de *Dashboard* automaticamente atribui as fitas de medicamentos aos pacientes, mantendo registro de atualização do estado de separação das fitas.

&emsp; A interface desenvolvida mantém fidelidade com o Protótipo de Alta Fidelidade, garantindo que a experiência de usuário planejada seja efetivamente entregue no produto final.

<div align="center" width="100%">

<sub>Figura 12 - Protótipo de Alta Fidelidade</sub>

![Botões de verificação da tela Dashboard](/docs/static/img/docs/dashboard-alta-fidelidade.png)

<sup>Fonte: Autoria própria </sup>

</div>