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

### Relação com as User Stories

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
