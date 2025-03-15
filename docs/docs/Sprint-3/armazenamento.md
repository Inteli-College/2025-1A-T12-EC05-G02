---
sidebar_position: 3
slug: /sprint-3/armazenamento-dados
description: Funcionamento do armazenamento de logs pela PharmaTech
---

# Armazenamento de Logs

&emsp; Um dos requisitos mais comuns no desenvolvimento de plataforma web é o armazenamento de _logs_. Trata-se de uma lista (geralmente) longa do histórico de ações e requisições realizadas no e para o sistema. 

&emsp; O Armazenamento de Logs permite que os administradores da plataforma possam monitorar com precisão as atividades do usuário em seu sistema e, assim, assegurar desempenho, segurança e integridade dos seus sistemas. Isso porque, segundo Rizzo (2025), "Ao registrar e armazenar eventos e atividades, as empresas podem ter uma visão abrangente de suas operações e identificar padrões, tendências e anomalias que podem afetar a eficiência e a segurança.". 


&emsp; Ademais, o armazenamento de _logs_ é útil para identificar pontos de falha no sistema com usuários individuais, pois possui o carimbo Data/hora em cada um dos registros (AWS, 2024). Entretanto, evidencia-se que esses _logs_ devem estar em conformidade com a Lei Geral de Proteção de Dados (LGPD), protegendo principalmente dados pessoais do usuário, por meio de mascaramento (Zamproni, 2024). No caso da PharmaTech, não há armazenamento de dados pessoais sensíveis, pois cada usuário recebe um ID único, substituindo qualquer informação pessoal nos registros. Ademais, a plataforma conta com um controle de acesso para os _logs_ de forma que apenas administradores possam ter acesso a ele.

## Quais são os _logs_ guardados pela PharmaTech

&emsp; No que tange aos _logs_ guardados pela PharmaTech, os seguintes principais eventos são registrados por meio de uma tabela estruturada no banco de dados da equipe:
- Robô
    - Início da separação
    - Movimentos (_bin_, _home_ e caixa de separação)
    - Ativação/desativação do bico sugador
    - Validação via QRCode
    - Validação via Infravermelho
    - Coleção do medicamento
- Sistema
    - Cadastro de usuários
    - Atualização de usuários
    - Deleção de usuários
    - Login na plataforma
    - Logout da plataforma

&emsp; Esses eventos são guardados na tabela _logs_ cujos nomes amigáveis das colunas são:

- ID
- Data/Hora
- Ação
- Detalhes
- Responsável

&emsp; Como mencionado anteriormente o `responsável` da coluna tem apenas seu ID na plataforma revelado.

## Acesso aos _logs_

&emsp; Os _logs_ da solução podem ser acessados via Sistemas de Gerenciamento de Banco de Dados que aceitem Postgres (linguagem utilizada na criação do banco de dados) com o uso das informações enviadas pela PharmaTech de modo privado. Não obstante, para facilitar a visualização do armazenamento e consulta dos _logs_, a plataforma da PharmaTech disponibiliza uma interface intuitiva onde administradores podem acessar os registros diretamente. No vídeo abaixo, é demonstrado o funcionamento dessa interface, destacando como os _logs_ são apresentados e como os usuários com permissão podem interagir com essas informações.

<div align="center" width="100%">

<sup>Vídeo 1 - Armazenamento dos Logs</sup>

<iframe width="560" height="315" src="https://www.youtube.com/embed/Z0TPndBvrDs?si=GCy5Dn5n6a_6bga8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<br/>
<sub>Fonte: Autoria própria (2025) </sub>

</div>




