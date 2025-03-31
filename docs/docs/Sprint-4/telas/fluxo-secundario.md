---
sidebar_position: 3
slug: /sprint-4/telas/fluxo-secundario
description: Fluxo secundário do usuário na aplicação
---

# Fluxo Secundário

&emsp; Nessa seção deve-se abordar as telas secundárias da aplicação, mencionando algumas de suas peculiaridades. Esse fluxo secundário é constituido por: **Estoque**, **Bins**, **Armazenamento de Logs**, **Histórico de Prescrições** e **Tela de Usuário**. Deve-se mencionar que a tela de estoque está em desenvolvimento e que ainda não é possível criar remédios além dos já cadastrados no sistema. A tela de armazenamento de logs deve ser apenas mencionada e linkada com sua seção na sprint anterior. No que tange ao restante, basta mencionar suas funcionalidades e suas tabelas respectivas no banco de dados. Além disso, deve-se mencionar a sua comparação com o **Prótotipo de Alta Fidelidade** e **User Stories**.

## Histórico de Prescrições
&emsp; A tela do Histórico de Prescrições foi desenvolvida com o intuito de manter um registro dos pedidos que já foram separados, uma vez que as fitas que passam pelo dashboard desaparecem após um dia da separação. Essa funcionalidade permite melhor controle e rastreabilidade dos pedidos processados. A imagem a seguir apresenta a versão final da tela:

<div align="center" width="100%">

<sub>Figura 1 - Frontend do Histórico de Prescrições</sub>

![Frontend do Histórico de Prescrições](/img/historico-prescricoes.png)

<sup>Fonte: Autoria própria </sup>

</div>

### Funcionalidades
&emsp; A tela do Histórico de Prescrições conta com diversas funcionalidades que facilitam a busca e gestão dos registros de prescrições processadas:

**1. Busca por texto:** 

&emsp; Permite a pesquisa rápida de prescrições específicas por meio da inserção de palavras-chave no campo de busca. Essa funcionalidade auxilia na localização de registros antigos de forma eficiente.

<div align="center" width="100%">

<sub>Figura 2 - Frontend do Histórico de Prescrições</sub>

![Funcionalidade de busca do histórico de prescrições](/img/prescricoes-pesquisa.png)

<sup>Fonte: Autoria própria </sup>

</div>

**2. Exportar para CSV:** 

&emsp; A opção de exportação permite que os usuários baixem os dados do histórico de prescrições em formato CSV, facilitando a análise e arquivamento dos registros. Com essa funcionalidade, é possível manipular os dados em planilhas eletrônicas para relatórios e auditorias.