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

## Farmacêutica: Lara Oliveira

<div style={{textAlign: 'center'}}>
<sup>Tabela 10 - User Story 010</sup>
</div>

Identificação | US010
--- | ---
User Story | Eu, enquanto farmacêutica, quero ter acesso a informações do estoque em tempo real, como a quantidade disponível de cada medicamento, assim como quero um registro de todas as entradas e saídas de medicamentos, feito de forma automatizada
Critérios de aceite 1 | O site exibe uma página que mostra uma tabela com dados do estoque de medicamentos em tempo real
Teste de Aceitação | A farmacêutica se loga na plataforma e vai até a página de estoque. <br/>T01A: a página de estoque mostra uma tabela com todos os medicamentos cadastrados no estoque, as informações do medicamento mostradas incluem nome, data de validade, lote e data de entrada <br/>T01B: a página de estoque não mostra a tabela com medicamentos, ou os dados estão incompletos, incorretos ou desatualizados. Errado, precisa ser corrigido
Critério de aceite 2 | Existe uma barra de pesquisa para pesquisar medicamentos específicos
Teste de Aceitação | Consigo pesquisar medicamentos específicos pelo nome ou lote <br/> T02A: É possível encontrar e clicar na barra de pesquisa, mostrando o resultado da pesquisa na tabela após digitar o nome ou lote de algum medicamento <br/> T02B: Não é possível encontrar a barra de pesquisa ou a pesquisa retorna resultados errados/incompletos. Errado, precisa ser corrigido
Critério de aceite 3 | A farmacêutica deseja registrar manualmente o registro de saída de um kit de medicamentos
Teste de Aceitação | A farmacêutica faz o registro da quantidade e dos medicamentos que foram retirados do estoque manualmente <br/> T03A: o registro é enviado ao banco de dados e as informações do estoque de medicamentos são atualizadas <br/> T03B: o registro não é enviado ao banco de dados, ou é enviado com informações incorretas/incompletas. Errado, precisa ser corrigido
Critério de aceite 4 | A farmacêutica deseja registrar manualmente a chegada de uma nova leva de medicamentos no estoque
Teste de Aceitação | A farmacêutica faz o registro da quantidade e dos medicamentos que chegaram no estoque <br/> T04A: o registro é enviado ao banco de dados e as informações do estoque de medicamentos são atualizadas <br/> T04B: o registro não é enviado ao banco de dados, ou é enviado com informações incorretas/incompletas. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 11 - User Story 011</sup>
</div>

Identificação | US011
--- | ---
User Story | Eu, enquanto farmacêutica, quero checar informações sobre o processo de bipagem automática, assim como desejo ter conhecimento sobre qualquer ocorrido fora do comum no processo de separação, como falta de medicamentos ou outros problema no processo de separação
Critérios de aceite 1 | Através da página inicial, é possível ver os kits em que a separação e bipagem já foram concluidas
Teste de Aceitação | A farmacêutica abre a página inicial, visando verificar as informações do sistema <br/>T01A: A página inicial exibe todas as informações relacionadas ao estado atual do robô e a fila de pedidos <br/>T01B: A página inicial não exibe as informações, ou exibe informações incompletas ou desatualizadas. Errado, precisa ser corrigido
Critério de aceite 2 | Ao analisar a lista de kits com medicamentos separados e bipados, é possível saber quais kits precisam passar pelo processo de triagem
Teste de Aceitação | A farmacêutica checa no sistema a lista de kits concluídos <br/> T02A: A página mostra em tempo real a lista de kits que já foram separados e bipados<br/> T02B: A página não mostra os kits que já foram separados ou bipados, ou mostra as informações desatualizadas ou erradas. Errado, precisa ser corrigido
Critério de aceite 3 | A farmacêutica faz a triagem manual dos kits, com a lista fornecida pelo sistema
Teste de Aceitação | A farmacêutica faz a triagem, pegando cada medicamento do kit e verificando se ele condiz com a receita <br/> T03A: A triagem é concluída com sucesso, garantindo que o kit foi montado corretamente <br/> T03B: A triagem não é concluída, ou, após a triagem, a farmacêutica chega a conclusão que o kit foi montado de forma incorreta. Errado, precisa ser corrigido
Critério de aceite 4 | O processo de triagem é concluído, e agora os kits estão prontos para envio aos pacientes
Teste de Aceitação | A farmacêutica libera o kit de medicamentos para envio aos pacientes <br/>T04A: O kit é liberado para uso dos pacientes <br/> T04B: O kit não é liberado, por uma variedade de motivos, como kit incompleto, medicamentos fora da validade e etc. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 12 - User Story 012</sup>
</div>

Identificação | US012
--- | ---
User Story | Eu, como farmacêutica, recebi medicamentos que foram retirados da farmácia, porém não foram utilizados, logo devem ser devolvidos e contabilizados no estoque.
Critérios de aceite 1 | Através da página de estoque, é possível abrir uma requisição de retorno de medicamentos ao estoque
Teste de Aceitação | A página de estoque exibe a opção de registrar a devolução de medicamentos ao estoque <br/>T01A: A página de estoque permite que você encontre a opção de devolver medicamentos <br/>T01B: A página de estoque não exibe todas as funcionalidades, ou não permite o acesso. Errado, precisa ser corrigido
Critério de aceite 2 | A farmacêutica, registra os medicamentos que estão sendo devolvidos, e envia o registro.
Teste de Aceitação | Existe uma página para envio dos dados dos medicamentos devolvidos <br/> T02A: O registro de devolução de medicamentos foi enviado e cadastrado com sucesso <br/> T02B: A página não permite o registro da devolução de medicamentos. Errado, precisa ser corrigido
Critério de aceite 3 | Os medicamentos são cadastrados como devoluções, são armazenados no estoque, e o sistema volta a contabilizar-los.
Teste de Aceitação | O sistema cadastra a devolução e registra os medicamentos no estoque <br/> T03A: O banco de dados do estoque é atualizado, e os medicamentos são marcados como devolução <br/> T03B: O banco de dados não é atualizado, ou os medicamentos não são marcados como devolução. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 13 - User Story 013</sup>
</div>

Identificação | US013
--- | ---
User Story | Eu, como farmacêutica, desejo fazer pedidos de reposição do estoque, e desejo um relatório de todos os medicamentos do estoque, com informações como nome, lote, validade, quantidade disponível e data do último pedido
Critérios de aceite 1 | Através da página de estoque, é possível registrar a entrada de uma nova leva de medicamentos
Teste de Aceitação | A farmacêutica abre a página de estoque <br/>T01A: A página de estoque exibe as informações do estoque e as funcionalidades disponíveis <br/>T01B: A página de estoque não exibe as informações, ou não permite utilizar as funcionalidades da página. Errado, precisa ser corrigido
Critério de aceite 2 | A farmacêutica preenche os dados dos medicamentos que chegaram no estoque.
Teste de Aceitação | O sistema permite o preenchimento das informações sobre a nova leva de medicamentos <br/> T02A: A página mostra o formulário de preenchimento das informações <br/> T02B: A página não permite preencher as informações, ou não envia o registro. Errado, precisa ser corrigido
Critério de aceite 3 | A farmacêutica registra a nova leva de medicamentos e checa a adição deles ao banco de dados do estoque
Teste de Aceitação | O sistema confirma o registro dos medicamentos e atualiza tanto o banco de dados quanto a página de estoque com os medicamentos e quantidades atualizadas <br/> T03A: A farmacêutica consegue visualizar na página de estoque as alterações no banco de dados após o registro da nova leva de medicamentos <br/> T03B: Não é possível visualizar os novos medicamentos cadastrados, ou a página está desatualizada. Errado, precisa ser corrigido

