---
sidebar_position: 1
slug: /sprint-2/mapeamento/user-stories
---

# User Stories

&emsp; No método ágil, a satisfação do usuário ocupa um papel central, e uma das formas de torná-la visível é por meio das _User Stories_ ou histórias de usuário ([Domingo, 2021](../referencias.md)). Essas histórias são frases curtas, específicas e objetivas que funcionam como requisitos do usuário ([Domingo, 2021](../referencias.md); [Cohn, 2019](../referencias.md)). 

&emsp; Geralmente, essa histórias seguem o seguinte formato: "_Eu, enquanto [tipo de usuário], quero [algum objetivo] para que [alguma razão]_" ([Cohn, 2019](../referencias.md)). Esse modelo incentiva a empatia dos desenvolvedores, que passam a enxergar as necessidades do usuário, não obstante a realização ou não de uma _UX research_ ([Domingo, 2021](../referencias.md)).

&emsp; Segundo Jeffries (2001, apud [Cohn, 2019](../referencias.md)), uma boa User Story segue a estrutura conhecida como "Card, Conversation, Confirmation". No contexto deste documento, essas categorias correspondem às seguintes definições:
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
Teste de Aceitação | O técnico abre a plataforma. <br/>T01A: Aparece uma página de login em que é possível inserir dois inputs: email e senha.  <br/>T01B: Não aparece uma página de login ou a página de login não contém os campos de email e senha. Errado, precisa ser corrigido
Critério de aceite 2 | Há um _pop-up_ que orienta o usuário em caso de esquecimento de senha.
Teste de Aceitação | O técnico aperta em "Esqueci a senha". <br/> T02A: Aparece um _pop-up_ escrito "Comunique a administração". <br/> T02B: Não aparece um _pop-up_ ou a informação contida nele está incorreta. Errado, precisa ser corrigido
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
User Story | Eu, enquanto técnico de farmácia, quero poder parar o robô via software a qualquer momento para que eu possa fazer alterações manuais nas fitas.
Critérios de aceite 1 | A página inicial exibe o estado do robô.
Teste de Aceitação | O técnico se loga na plataforma. <br/>T01A: A página inicial exibe "Ativo", "Inativo" ou "Desligado" a depender do estado do robô  <br/>T01B: A página inicial não exibe qualquer estado ou exibe um estado inconsistente com a realidade. Errado, precisa ser corrigido
Critério de aceite 2 | Existe um botão para parar o robô.
Teste de Aceitação | O robô está separando remédios. <br/> T02A: O estado do robô exibe "Ativo" e existe um botão ativo escrito "Parar". <br/> T02B: O botão "Parar" está inativo quando o estado está ativo ou está ativo quando o robô está em outros estados. Errado, precisa ser corrigido
Critério de aceite 3 | O botão para o robô.
Teste de Aceitação | O técnico aperta em "Parar". <br/> T03A: O estado muda para "Inativo" e o robô para de separar fitas. <br/> T03B: O estado não muda ou o robô não para de separar. Errado, precisa ser corrigido
Critério de aceite 4 | O estado atual de separação da fita de medicamentos fica salvo quando o robô é parado
Teste de Aceitação | O técnico aperta em "Parar". <br/> T04A: A fita de medicamentos atual é posta em estado de espera. <br/> T04B: A fita de medicamentos não é salva, a fita de medicamentos não fica em espera. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 3 - User Story 003</sup>
</div>

Identificação | US003
--- | ---
User Story | Eu, enquanto técnico de farmácia, quero ver a fita que está atualmente em separação pelo robô para que eu possa ter uma melhor compreensão do processo.
Critérios de aceite 1 | A página inicial exibe a prescrição completa que está sendo separada
Teste de Aceitação | O técnico se loga na plataforma. <br/>T01A: A página inicial exibe a prescrição completa que está sendo preparada.  <br/>T01B: A página inicial não exibe qualquer prescrição ou a prescrição está incompleta. Errado, precisa ser corrigido
Critério de aceite 2 | A prescrição atual corresponde a fita sendo separada
Teste de Aceitação | O robô está separando os remédios. <br/> T02A: O robô está separando os remédios da prescrição exibida na página inicial. <br/> T02B: O robô não está separando os remédios da prescrição atual. Errado, precisa ser corrigido
Critério de aceite 3 | A prescrição atual sinaliza visualmente qual remédio está sendo separado
Teste de Aceitação | O robô está separando os remédios. <br/> T03A: A página exibe o remédio que o robô está separando. <br/> T03B: A página não sinaliza qual remédio está sendo separado ou o remédio que está sendo exibido não corresponde com a atualidade. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 4 - User Story 004</sup>
</div>

Identificação | US004
--- | ---
User Story | Eu, enquanto técnico de farmácia, quero filtrar as últimas fitas separadas para que eu possa checar as separações.
Critérios de aceite 1 | Todas as prescrições são guardadas na plataforma
Teste de Aceitação | O técnico navega até o histórico sem filtrar. <br/>T01A: É possível verificar todos os últimos pedidos guardados na plataforma. <br/>T01B: O histórico não exibe nenhum dados ou exibe dados inconsistentes com as últimas prescrições enviadas. Errado, precisa ser corrigido
Critério de aceite 2 | É possível filtrar as prescrições com base em remédio contido
Teste de Aceitação | O técnico seleciona um remédio no filtro de histórico. <br/> T02A: Apenas as prescrições que contém aquele remédio aparecem. <br/> T02B: Nenhuma prescrição aparece ou prescrições que não contém aquele remédio também aparecem. Errado, precisa ser corrigido
Critério de aceite 3 | As prescrições estão ordenadas por data
Teste de Aceitação | O técnico navega até histórico. <br/> T03A: As prescrições estão ordenadas do mais recente ao mais antigo<br/> T03B: As prescrições estão ordenadas de qualquer outro modo que não do mais recente ao mais antigo. Errado, precisa ser corrigido
Critério de aceite 4 | As prescrições contém uma identificação
Teste de Aceitação | O técnico navega até histórico. <br/> T04A: As prescrições contém um id que é a primeira coluna do histórico <br/> T04B: As prescrições não exibem o id ou este id não é a primeira coluna. Errado, precisa ser corrigido
Critério de aceite 5 | É possível filtrar por período
Teste de Aceitação | O técnico navega até histórico e seleciona filtro por período. <br/> T05A: As prescrições podem ser filtradas por uma data personalizada <br/> T05B: As presções não podem ser filtradas por período ou a data não é personalizável. Errado, precisa ser corrigido
Critério de aceite 6 | Os itens do histórico são interativos
Teste de Aceitação | O técnico seleciona um item do histórico. <br/> T06A: Um _pop-up_ aparece, contendo: data e hora recebida, data e hora separada, itens requisitados e itens separados. <br/> T06B: Não é possível selecionar um item, o _pop-up_ não aparece ou as informações estão incompletas. Errado, precisa ser corrigido
Critério de aceite 7 | O histórico contém paginação
Teste de Aceitação | O técnico navega até o histórico. <br/> T07A: As prescrições estão separadas em páginas, limitando os resultados exibidos por página padronizadamente. <br/> T07B: As prescrições não estão separadas por página ou um número limite padrão de itens não está estabelecido. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 5 - User Story 005</sup>
</div>

Identificação | US005
--- | ---
User Story | Eu, enquanto técnico de farmácia, quero poder retomar a operação do robô para que ele continue a separação
Critérios de aceite 1 | A página inicial exibe o estado do robô.
Teste de Aceitação | O técnico se loga na plataforma. <br/>T01A: A página inicial exibe "Ativo", "Inativo" ou "Desligado" a depender do estado do robô  <br/>T01B: A página inicial não exibe qualquer estado ou exibe um estado inconsistente com a realidade. Errado, precisa ser corrigido
Critério de aceite 2 | Existe um botão para retomar o robô.
Teste de Aceitação | O robô está parado. <br/> T02A: O estado do robô exibe "Inativo" e existe um botão ativo escrito "Retomar". <br/> T02B: O botão "Retomar" está inativo quando o estado está inativo ou está ativo quando o robô está em outros estados. Errado, precisa ser corrigido
Critério de aceite 3 | O botão retoma a operação do robô.
Teste de Aceitação | O técnico aperta em "Retomar". <br/> T03A: O estado muda para "Ativo" e o robô volta a separar a fita em espera. <br/> T03B: O estado não muda, o robô não volta a separar ou não volta a separar a fita de medicamentos em espera. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 6 - User Story 006</sup>
</div>

Identificação | US006
--- | ---
User Story | Eu, enquanto técnico de farmácia, quero ver as fitas que ainda serão separadas para que eu possa ter maior controle da operação
Critérios de aceite 1 | A página aceita diversas requisições
Teste de Aceitação | O farmacêutico tria um medicamento e envia para a plataforma. <br/>T01A: A página recebe e guarda corretamente a requisição do farmacêutico <br/>T01B: A página não recebe a requisição do farmacêutico ou a requisição está incompleta. Errado, precisa ser corrigido
Critério de aceite 2 | A fila de fita de medicamentos a serem separados aparecem na tela inicial
Teste de Aceitação | O técnico entra na página inicial. <br/> T02A: A página inicial exibe as requisições de separação enviadas pelo farmacêutico que ainda não foram separadas. <br/> T02B: A página não exibe as requisições de separação enviadas pelo farmacêutico ou as prescrições exibidas já foram separadas. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 7 - User Story 007</sup>
</div>

Identificação | US007
--- | ---
User Story | Eu, enquanto técnico de farmácia, quero poder configurar as _bins_ de cada remédio para que eu possa adaptar o sistema quando necessário
Critérios de aceite 1 | Existe uma página de configuração
Teste de Aceitação | O técnico navega até a página de configuração. <br/>T01A: A página exibe a localização atual do robô e permite que o farmacêutico responda itens de uma lista para o envio de uma nova localização de remédio <br/>T01B: A página não exibe a localização atual do robô ou não permite que o farmacêutico insira novas localizações. Errado, precisa ser corrigido
Critério de aceite 2 | Os itens para determinar uma localização podem ser preenchidos manualmente
Teste de Aceitação | O técnico navega até a página de configuração. <br/> T02A: Na seção "Enviar Novas Localizações" é possível enviar o nome do remédio e as coordenadas x, y, z dos _bins_. <br/> T02B: Os itens "nome do remédio", "x", "y", "z" não constam ou não podem ser preenchidos pelo usuário. Errado, precisa ser corrigido
Critério de aceite 3 | O preenchimento manual das localizações tem restrições de segurança
Teste de Aceitação | O técnico tenta enviar uma coordernada contendo uma letra. <br/> T03A: O sistema exibe um aviso indicando erro no preenchimento do formulário. <br/> T03B: A localização é enviada para o microcontrolador ou não é enviada, mas nenhum aviso é exibido. Errado, precisa ser corrigido
Critério de aceite 4 | É possível enviar mais de uma localização
Teste de Aceitação | O técnico preenche uma localização. <br/> T04A: Aparece um botão indicando a possibilidade de criar mais um item na lista que quando clicado exibe um novo formulário. <br/> T04B: Não aparece um botão para adicionar item na lista ou quando clicado ele não exibe um novo formulário. Errado, precisa ser corrigido
Critério de aceite 5 | O robô recebe uma lista contendo as localizações x,y,z de cada remédio
Teste de Aceitação | O técnico envia as localizações de cada remédio clicando em "Enviar" na página de configuração. <br/> T05A: O microcontrolador recebe as novas localizações, guarda-as e substitui as localizações de um mesmo remédio pelas novas. <br/> T05B: O microcontrolador não recebe as novas localizações ou não substitui as antigas localizações de remédios com novas localizações. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 8 - User Story 008</sup>
</div>

Identificação | US008
--- | ---
User Story | Eu, enquanto técnico de farmácia, quero que o robô emita um som caso não consiga achar um remédio para que eu possa auxiliar no processo.
Critérios de aceite 1 | O robô tenta procurar o remédio com localização conhecida
Teste de Aceitação | O robô inicia a separação de um remédio. <br/>T01A: O braço robótico vai até a localização correspondente ao remédio no seu sistema <br/>T01B: O braço robótico não vai até a localização correspondente ao remédio no seu sistema. Errado, precisa ser corrigido
Critério de aceite 2 | O robô emite um som após um minuto de tentativa
Teste de Aceitação | Por um minuto, o sensor de infravermelho não reconheceu que o robô pegou um remédio. <br/> T02A: O _buzzer_ na _protoboard_ emite um som curto. <br/> T02B: O _buzzer_ na _protoboard_ não emite som ou o som é longo. Errado, precisa ser corrigido
Critério de aceite 3 | O robô tenta por mais um minuto após emitir o som
Teste de Aceitação | O _buzzer_ emitiu um som por não encontrar um remédio de localização conhecida. <br/> T03A: O robô continua tentando encontrar o remédio na localização requisitada durante um minuto <br/> T03B: O robô não continua tentando encontrar o remédio ou não para de procurá-lo após um minuto. Errado, precisa ser corrigido
Critério de aceite 4 | O robô emite um som se não conhecer a localização de um remédio
Teste de Aceitação | O robô tenta separar um remédio com localização desconhecida. <br/> T04A: O _buzzer_ na _protoboard_ emite um som longo. <br/> T04B: O _buzzer_ na _protoboard_ não emite som ou o som é curto. Errado, precisa ser corrigido
Critério de aceite 5 | O robô passa para o próximo item
Teste de Aceitação | O robô não encontrou um item durante dois minutos ou não conhece sua localização. <br/> T05A: O robô começa a separar o próximo remédio da lista. <br/> T05B: O robô não começa a separar o próximo item da lista. Errado, precisa ser corrigido

<div style={{textAlign: 'center'}}>
<sub>Fonte: Autoria Própria (2025).</sub>
</div>

<br />

<div style={{textAlign: 'center'}}>
<sup>Tabela 9 - User Story 009</sup>
</div>

Identificação | US009
--- | ---
User Story | Eu, enquanto técnico de farmácia, quero que o sistema sinalize as separações incompletas para que eu possa ajustá-las manualmente.
Critérios de aceite 1 | Na fita de medicamentos atual, remédios não encontrados são sinalizados
Teste de Aceitação | O robô não conseguiu localizar um medicamento contido na prescrição atual. <br/>T01A: O sistema sinaliza de forma clara o medicamento que não foi separado <br/>T01B: O sistema não sinaliza de forma clara o medicamento que não foi separado. Errado, precisa ser corrigido
Critério de aceite 2 | Remédios não separados são sinalizados no histórico
Teste de Aceitação | O técnico seleciona um item do histórico que está incompleto. <br/> T02A: Os remédios que o robô não conseguiu separar são claramente sinalizados. <br/> T02B: Os remédios que o robô não conseguiu separar não são claramente sinalizados. Errado, precisa ser corrigido

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
Teste de Aceitação | A farmacêutica se loga na plataforma e vai até a página de estoque. <br/>T01A: a página de estoque mostra uma tabela com todos os medicamentos cadastrados no estoque, as informações do medicamento mostradas incluem ID, nome do medicamento, data de validade, lote, data de entrada, quantidade e ID do bin em que está localizado <br/>T01B: a página de estoque não mostra a tabela com medicamentos, ou os dados estão incompletos, incorretos ou desatualizados. Errado, precisa ser corrigido
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
User Story | Eu, como farmacêutica, desejo fazer pedidos de reposição do estoque, e desejo um relatório de todos os medicamentos do estoque, com informações como ID, nome do medicamento, data de validade, lote, data de entrada, quantidade e ID do bin em que está localizado
Critérios de aceite 1 | Através da página de estoque, é possível registrar a entrada de uma nova leva de medicamentos
Teste de Aceitação | A farmacêutica abre a página de estoque <br/>T01A: A página de estoque exibe as informações do estoque e as funcionalidades disponíveis <br/>T01B: A página de estoque não exibe as informações, ou não permite utilizar as funcionalidades da página. Errado, precisa ser corrigido
Critério de aceite 2 | A farmacêutica preenche os dados dos medicamentos que chegaram no estoque.
Teste de Aceitação | O sistema permite o preenchimento das informações sobre a nova leva de medicamentos <br/> T02A: A página mostra o formulário de preenchimento das informações <br/> T02B: A página não permite preencher as informações, ou não envia o registro. Errado, precisa ser corrigido
Critério de aceite 3 | A farmacêutica registra a nova leva de medicamentos e checa a adição deles ao banco de dados do estoque
Teste de Aceitação | O sistema confirma o registro dos medicamentos e atualiza tanto o banco de dados quanto a página de estoque com os medicamentos e quantidades atualizadas <br/> T03A: A farmacêutica consegue visualizar na página de estoque as alterações no banco de dados após o registro da nova leva de medicamentos <br/> T03B: Não é possível visualizar os novos medicamentos cadastrados, ou a página está desatualizada. Errado, precisa ser corrigido

