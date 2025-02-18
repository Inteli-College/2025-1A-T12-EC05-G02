---
sidebar_position: 1
slug: /sprint-2/mapeamento/user-stories
---

# User Stories

&emsp; No método ágil, a satisfação do usuário ocupa um papel central, e uma das formas de torná-la visível é por meio das _User Stories_ ou histórias de usuário ([Domingo, 2020](https://www.interaction-design.org/literature/article/user-stories-as-a-ux-designer-i-want-to-embrace-agile-so-that-i-can-make-my-projects-user-centered)). Essas histórias são frases curtas, específicas e objetivas que funcionam como requisitos do usuário ([Domingo, 2020](https://www.interaction-design.org/literature/article/user-stories-as-a-ux-designer-i-want-to-embrace-agile-so-that-i-can-make-my-projects-user-centered); [Cohn, 2019](https://www.mountaingoatsoftware.com/agile/user-stories)). 

&emsp; Geralmente, essa histórias seguem o seguinte formato: "_Eu, enquanto [tipo de usuário], quero [algum objetivo] para que [alguma razão]_" ([Cohn, 2019](https://www.mountaingoatsoftware.com/agile/user-stories)). Esse modelo incentiva a empatia dos desenvolvedores, que passam a enxergar as necessidades do usuário, não obstante a realização ou não de uma _UX research_ ([Domingo, 2020](https://www.interaction-design.org/literature/article/user-stories-as-a-ux-designer-i-want-to-embrace-agile-so-that-i-can-make-my-projects-user-centered)).

&emsp; Segundo Jeffries (2001, apud [Cohn, 2019](https://www.mountaingoatsoftware.com/agile/user-stories)), uma boa User Story segue a estrutura conhecida como "Card, Conversation, Confirmation". No contexto deste documento, essas categorias correspondem às seguintes definições:
- **User Story**: descrição curta utilizando o formato padrão;
- **Critérios de Aceite**: detalhes que definem quando uma história pode ser considerada completa; 
- **Testes de aceitação**: testes para validar os critérios de aceite mencionados.

&emsp; Essas informações foram organizadas em formato de tabela, apresentando as necessidades dos usuários no projeto de automação PharmaBot.

## Técnico de Farmácia: Roberto Dias

<div style={{textAlign: 'center'}}>
<sup>Tabela 1 - User Story 001</sup>
</div>

Identificação | US001
--- | ---
User Story | Eu, enquanto técnico de farmácia, quero ter um acesso pessoal na plataforma para que eu acesse apenas as páginas que me competem.
Critérios de aceite 1 | Existe uma página de login que possibilita inserir email e senha.
Teste de Aceitação | O técnico abre a plataforma. <br/>T01A: aparece uma página de login em que é possível inserir dois inputs: email e senha.  <br/>T01B: não aparece uma página de login ou a página de login não contém os campos de email e senha. Errado, precisa ser corrigido
Critério de aceite 2 | Há um _pop-up_ que orienta o usuário em caso de esquecimento de senha.
Teste de Aceitação | O técnico aperta em "Esqueci a senha". <br/> T02A: Aparece um _pop-up_ escrito "Contate a administração". <br/> T02B: Não aparece um _pop-up_ ou a informação contida nele está incorreta. Errado, precisa ser corrigido
Critério de aceite 3 | A página de login redireciona o usuário para outra página.
Teste de Aceitação | O técnico insere seu email e senha cadastrados e clica em "Entrar". <br/> T03A: O usuário é redirecionado para outra página. <br/> T03B: O usuário não é redirecionado para outra página. Errado, precisa ser corrigido
Critério de aceite 4 | O usuário é redirecionado para sua página pessoal.
Teste de Aceitação | O técnico aperta em "Entrar" na página de login. <br/> T04A: O usuário é redirecionado para sua página pessoal. <br/> T04B: O usuário não é redirecionado para sua página pessoal. Errado, precisa ser corrigido
Critério de aceite 5 | A página de login orienta o usuário, caso ele tenha inserido dados errados.
Teste de Aceitação | O técnico aperta em "Entrar" tendo inserido com informações incorretas de cadastro. <br/> T05A: A página exibe o erro "Email e/ou senha incorretos". <br/> T05B: A página não exibe um erro ou redireciona o usuário para outra página. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 2 - User Story 002</sup>
</div>

Identificação | US002
--- | ---
User Story | Eu, enquanto técnico de farmácia, quero poder parar o robô via software a qualquer momento para que eu possa fazer alterações manuais nos pedidos.
Critérios de aceite 1 | A página inicial exibe o estado do robô.
Teste de Aceitação | O técnico se loga na plataforma. <br/>T01A: a página inicial exibe "Ativo", "Inativo" ou "Desligado" a depender do estado do robô  <br/>T01B: a página inicial não exibe qualquer estado ou exibe um estado inconsistente com a realidade. Errado, precisa ser corrigido
Critério de aceite 2 | Existe um botão para parar o robô.
Teste de Aceitação | O robô está separando pedidos. <br/> T02A: o estado do robô exibe "Ativo" e existe um botão ativo escrito "Parar". <br/> T02B: O botão "Parar" está inativo quando o estado está ativo ou está ativo quando o robô está em outros estados. Errado, precisa ser corrigido
Critério de aceite 3 | O botão para o robô.
Teste de Aceitação | O técnico aperta em "Parar". <br/> T03A: o estado muda para "Inativo" e o robô para de separar fitas. <br/> T03B: O estado não muda ou o robô não para de separar. Errado, precisa ser corrigido
Critério de aceite 4 | A atual estado de separação da fita de medicamentos fica salvo quando o robô é parado
Teste de Aceitação | O técnico aperta em "Parar". <br/> T04A: A fita de medicamentos atual é posta em estado de espera e o robô a retoma quando volta a atividade. <br/> T04B: A fita de medicamentos não é salva, a fita de medicamentos não fica em espera ou o robô não a retoma quando volta a atividade. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>