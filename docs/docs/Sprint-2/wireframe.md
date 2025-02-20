
# Wiframes do sistema

&emsp; Os wireframes são representações visuais de baixa/média fidelidade que servem para planejar e estruturar a interface do usuário antes da implementação do sistema. No projeto do Hospital de Clínicas da UNICAMP, os wireframes são fundamentais para garantir que todas as interações do usuário estejam claramente definidas, organizadas e funcionais.

&emsp; A criação dos wireframes possibilita:
- Melhor visualização do fluxo de navegação do usuário.
- Antecipação de possíveis problemas de usabilidade.
- Alinhamento entre equipe de design, desenvolvimento e stakeholders.
- Definição clara das funcionalidades antes da implementação.

&emsp; Para o desenvolvimento do projeto, os wireframes foram criados utilizando a ferramenta Figma disponível [aqui](https://www.figma.com/design/VC279wQYR3rNGB6Fq039xc/Wireframe?node-id=54-1974&t=BtGMs9saMKxiIiXU-1), permitindo colaboração e ajustes rápidos durante a fase de planejamento.

## Telas desenvolvidas: 

&emsp; A **tela do administrador** foi desenvolvida para permitir o gerenciamento eficiente do sistema por administradores. Nessa interface, os administradores podem cadastrar novos usuários, remover usuários, permitindo colaboração e ajustes rápidos durante a fase de planejamento existentes e acessar o **Log do Sistema**, que contém o histórico detalhado das ações realizadas. Ao clicar no botão romover, pergunta-se se realmente deja excluir mesmo o usuário antes de realizar a operação.

<div align="center" width="100%">

<sub>Figura 1 - Tela do administrador</sub>

![Tela do administrador](/img/UX/TelaADM.png)

<sup>Fonte: Autoria própria </sup>

</div>

<div align="center" width="100%">

<sub>Figura 2 - Remover o usuario ja cadastrado </sub>

![Remover o usuario ja cadastrado](/img/UX/TelaRemover.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A **tela de cadastro** tem como objetivo permitir que o administrador cadastre novos usuários no sistema de maneira intuitiva. A interface inclui campos para preenchimento do nome, e-mail e senha. Essa funcionalidade é essencial para manter a organização e o controle de acesso ao sistema.

<div align="center" width="100%">

<sub>Figura 3 - Tela de cadastro</sub>

![Tela de cadastro](/img/UX/TelaCadastro.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A **tela de login** possibilita que os usuários acessem o sistema de maneira segura. Para isso, apresenta campos para inserção de e-mail e senha. O botão "Entrar" valida as credenciais e direciona o usuário para a tela inicial caso as informações estejam corretas. Esse fluxo garante um acesso restrito ao sistema, impedindo o uso por pessoas não autorizadas.

<div align="center" width="100%">

<sub>Figura 4 - Tela de login</sub>

![Tela de Login](/img/UX/TelaLogin.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A **tela inicial** funciona como um hub central que direciona os usuários para diferentes seções do sistema. Nela, há botões que permitem acessar o **Dashboard**, o **Histórico de Medicamentos**, a **Configuração do sistema**, a seção de **FAQ (perguntas frequentes)** e o **Registro de Logs**. Essa estrutura facilita a navegação e melhora a experiência do usuário, permitindo que ele encontre rapidamente a funcionalidade desejada.

<div align="center" width="100%">

<sub>Figura 5 - Tela inicial</sub>

![Tela Inicial](/img/UX/TelaInicial.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A **tela de dashboard** exibe informações essenciais para os operadores do sistema. Ela permite visualizar as receitas médicas pendentes para separação, acompanhar o status dos medicamentos que já foram separados e conferir aqueles que ainda estão em separação. Além disso, a tela apresenta indicadores do **status do robô**, informando se está ativo e funcionando corretamente. Esse painel fornece uma visão geral das operações e ajuda a otimizar o fluxo de trabalho.

<div align="center" width="100%">

<sub>Figura 6 - Tela de dashboard</sub>

![Tela de Dashboard](/img/UX/TelaDashboard.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A **tela de histórico de medicamentos retirados** permite que os operadores e administradores acompanhem quais medicamentos foram separados e retirados. Nessa tela, há uma **tabela com registros detalhados**, incluindo a data da retirada, a quantidade de medicamento e o responsável pela operação. Além disso, há filtros que possibilitam buscas por período e tipo de medicamento. Essa funcionalidade garante total rastreabilidade dos medicamentos processados, contribuindo para maior segurança e controle.

<div align="center" width="100%">

<sub>Figura 7 - Tela de histórico de medicamentos retirados</sub>

![Tela de Histórico de Medicamentos Retirados](/img/UX/TelaHistorico.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A **tela de perguntas frequentes** foi desenvolvida para fornecer suporte aos usuários, apresentando informações detalhadas sobre o funcionamento do sistema. Ela contém uma explicação sobre o fluxo de separação de medicamentos, além de uma lista de perguntas frequentes e suas respectivas respostas. Também há informações sobre suporte técnico e formas de contato com a equipe responsável. Essa tela ajuda a reduzir dúvidas operacionais e melhora a autonomia dos usuários no uso do sistema.

<div align="center" width="100%">

<sub>Figura 8 - Tela de perguntas frequentes</sub>

![Tela de perguntas frequentes](/img/UX/TelaPerguntas.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A **tela de configuração do sistema** permite ajustes técnicos fundamentais para o funcionamento correto do robô e da separação de medicamentos. Nessa interface, os usuários podem visualizar as coordenadas de cada medicamento no **bin**, além de configurar e ajustar manualmente essas posições conforme necessário. Também há um botão para salvar as configurações feitas. Essa funcionalidade garante que a movimentação do robô ocorra com precisão e de acordo com a organização dos medicamentos armazenados.

<div align="center" width="100%">


<sub>Figura 9 - Tela de configuração do sistema</sub>

![Tela de configuração do sistema](/img/UX/TelaConfiguracao.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A **tela de registro de log** garante total transparência e rastreabilidade sobre as ações realizadas no sistema. Essa interface contém uma **tabela que exibe registros detalhados**, incluindo a **data e hora da ação**, o **ID do usuário responsável**, a **ação realizada** e possíveis **detalhes adicionais**. Também há filtros para buscar registros por usuário, tipo de ação e período, além da opção de exportar os logs em **CSV/JSON** para auditoria e análise externa. Essa funcionalidade é essencial para controle de segurança e análise de desempenho do sistema.

<div align="center" width="100%">

<sub>Figura 10 - Tela de registro de log</sub>

![Tela de registro de log](/img/UX/TelaLog.png)

<sup>Fonte: Autoria própria </sup>

</div>

&emsp; A criação dos wireframes no Figma permitiu estruturar toda a experiência do usuário, garantindo que o sistema seja funcional, intuitivo e bem planejado antes do desenvolvimento.



