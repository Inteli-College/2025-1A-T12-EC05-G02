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
Teste de Aceitação | O técnico se loga na plataforma. <br/>T01A: a página inicial exibe "Ativo", "Inativo" ou "Desligado" a depender do estado do robô  <br/>T01B: a página inicial não exibe qualquer estado ou exibe um estado inconsistente com a realidade. Errado, precisa ser corrigido
Critério de aceite 2 | Existe um botão para parar o robô.
Teste de Aceitação | O robô está separando remédios. <br/> T02A: o estado do robô exibe "Ativo" e existe um botão ativo escrito "Parar". <br/> T02B: O botão "Parar" está inativo quando o estado está ativo ou está ativo quando o robô está em outros estados. Errado, precisa ser corrigido
Critério de aceite 3 | O botão para o robô.
Teste de Aceitação | O técnico aperta em "Parar". <br/> T03A: o estado muda para "Inativo" e o robô para de separar fitas. <br/> T03B: O estado não muda ou o robô não para de separar. Errado, precisa ser corrigido
Critério de aceite 4 | A atual estado de separação da fita de medicamentos fica salvo quando o robô é parado
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
Teste de Aceitação | O técnico se loga na plataforma. <br/>T01A: a página inicial a prescrição completa  <br/>T01B: a página inicial não exibe qualquer prescrição ou a prescrição está incompleta. Errado, precisa ser corrigido
Critério de aceite 2 | A prescrição atual corresponde a fita sendo separada
Teste de Aceitação | O robô está separando os remédios. <br/> T02A: o robô está separando os remédios da prescrição exibida na página inicial. <br/> T02B: o robô não está separando os remédios da prescrição atual. Errado, precisa ser corrigido
Critério de aceite 3 | A prescrição atual sinaliza visualmente qual remédio está sendo separado
Teste de Aceitação | O robô está separando os remédios. <br/> T03A: a página exibe o remédio que o robô está separando. <br/> T03B: A página não sinaliza qual remédio está sendo separado ou o remédio que está sendo exibido não corresponde com a atualidade. Errado, precisa ser corrigido

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
Teste de Aceitação | O técnico navega até o histórico sem filtrar. <br/>T01A: é possível verificar todos os últimos pedidos guardados na plataforma. <br/>T01B: o histórico não exibe nenhum dados ou exibe dados inconsistentes com as últimas prescrições enviadas. Errado, precisa ser corrigido
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
Teste de Aceitação | O técnico se loga na plataforma. <br/>T01A: a página inicial exibe "Ativo", "Inativo" ou "Desligado" a depender do estado do robô  <br/>T01B: a página inicial não exibe qualquer estado ou exibe um estado inconsistente com a realidade. Errado, precisa ser corrigido
Critério de aceite 2 | Existe um botão para retomar o robô.
Teste de Aceitação | O robô está parado. <br/> T02A: o estado do robô exibe "Inativo" e existe um botão ativo escrito "Retomar". <br/> T02B: O botão "Retomar" está inativo quando o estado está inativo ou está ativo quando o robô está em outros estados. Errado, precisa ser corrigido
Critério de aceite 3 | O botão retoma a operação do robô.
Teste de Aceitação | O técnico aperta em "Retomar". <br/> T03A: o estado muda para "Ativo" e o robô volta a separar a fita em espera. <br/> T03B: O estado não muda, o robô não volta a separar ou não volta a separar a fita de medicamentos em espera. Errado, precisa ser corrigido

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
Teste de Aceitação | O farmacêutico tria um medicamento e envia para a plataforma. <br/>T01A: a página recebe e guarda corretamente a requisição do farmacêutico <br/>T01B: a página não recebe a requisição do farmacêutico ou a requisição está incompleta. Errado, precisa ser corrigido
Critério de aceite 2 | A fila de fita de medicamentos a serem separados aparecem na tela inicial
Teste de Aceitação | O técnico entra na página inicial. <br/> T02A: A página inicial exibe as requisições de separação enviadas pelo farmacêutico que ainda não foram separadas. <br/> T02B: a página não exibe as requisições de separação enviadas pelo farmacêutico ou as prescrições exibidas já foram separadas. Errado, precisa ser corrigido

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
Teste de Aceitação | O técnico navega até a página de configuração. <br/>T01A: a página exibe a localização atual do robô e permite que o farmacêutico responda itens de uma lista para o envio de uma nova localização de remédio <br/>T01B: a página não exibe a localização atual do robô ou não permite que o farmacêutico insira novas localizações. Errado, precisa ser corrigido
Critério de aceite 2 | Os itens para determinar uma localização podem ser preenchidos manualmente
Teste de Aceitação | O técnico navega até a página de configuração. <br/> T02A: na seção "Enviar Novas Localizações" é possível enviar o nome do remédio e as coordenadas x, y, z dos _bins_. <br/> T02B: Os itens "nome do remédio", "x", "y", "z" não constam ou não podem ser preenchidos pelo usuário. Errado, precisa ser corrigido
Critério de aceite 3 | O preenchimento manual das localizações tem restrições de segurança
Teste de Aceitação | O técnico tenta enviar uma coordernada contendo uma letra. <br/> T03A: O sistema exibe um aviso indicando erro no preenchimento do formulário. <br/> T03B: a localização é enviada para o microcontrolador ou não é enviada, mas nenhum aviso é exibido. Errado, precisa ser corrigido
Critério de aceite 4 | É possível enviar mais de uma localização
Teste de Aceitação | O técnico preenche uma localização. <br/> T04A: Aparece um botão indicando a possibilidade de criar mais um item na lista que quando clicado exibe um novo formulário. <br/> T04B: não aparece um botçao para adicionar item na lista ou quando clicado ele não exibe um novo formulário. Errado, precisa ser corrigido
Critério de aceite 5 | É possível enviar mais de uma localização
Teste de Aceitação | O técnico preenche uma localização. <br/> T05A: Aparece um botão indicando a possibilidade de criar mais um item na lista que quando clicado exibe um novo formulário. <br/> T05B: não aparece um botçao para adicionar item na lista ou quando clicado ele não exibe um novo formulário. Errado, precisa ser corrigido
Critério de aceite 6 | O robô recebe uma lista contendo as localizações x,y,z de cada remédio
Teste de Aceitação | O técnico envia as localizações de cada remédio clicando em "Enviar" na página de configuração. <br/> T06A: O microcontrolador recebe as novas localizações, guarda-as e substitui as localizações de um mesmo remédio pelas novas. <br/> T06B: O microcontrolador não recebe as novas localizações ou não substitui as antigas localizações de remédios com novas localizações. Errado, precisa ser corrigido

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
Teste de Aceitação | Por um minuto, o sensor de infravermelho não reconheceu que o robô pegou um remédio. <br/> T02A: O _buzzer_ na _protoboard_ emite um som. <br/> T02B: O _buzzer_ na _protoboard_ não emite som. Errado, precisa ser corrigido
Critério de aceite 3 | O robô tenta por mais um minuto após emitir o som
Teste de Aceitação | O _buzzer_ emitiu um som por não encontrar um remédio de localização conhecida. <br/> T03A: O robô continua tentando encontrar o remédio na localização requisitada durante um minuto <br/> T03B: O robô não continua tentando encontrar o remédio ou não para de procurá-lo após um minuto. Errado, precisa ser corrigido
Critério de aceite 4 | O robô emite um som se não conhecer a localização de um remédio
Teste de Aceitação | O robô tenta separar um remédio com localização desconhecida. <br/> T04A: O _buzzer_ na _protoboard_ emite um som. <br/> T04B: O _buzzer_ na _protoboard_ não emite som. Errado, precisa ser corrigido
Critério de aceite 5 | O robô passa para o próximo item
Teste de Aceitação | O robô não encontrou um item durante dois minutos ou não conhece sua localização. <br/> T05A: O robô começa a separar para o próximo remédio da lista. <br/> T05B: O robô não começa a separar o próximo item da lista. Errado, precisa ser corrigido

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