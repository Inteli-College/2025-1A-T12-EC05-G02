---
sidebar_position: 3
slug: /sprint-1/UX/jornadas
---

# Jornadas de Usuário

## Introdução

&emsp; A Jornada do Usuário é uma representação visual do caminho que um usuário percorre ao interagir com um produto, serviço ou sistema. Nesse sentido, ela descreve as etapas, as emoções, as ações e os pontos de contato que o usuário experimenta ao longo de sua interação. Dessa maneira, a jornada do usuário é uma ferramenta valiosa para identificar oportunidades de melhoria, pontos de atrito e necessidades não atendidas, permitindo que a equipe de design e desenvolvimento crie soluções mais eficazes e centradas no usuário [(Kalbach, 2016)](https://brasil.uxdesign.cc/05-coisas-que-voc%C3%AA-deveria-saber-para-n%C3%A3o-errar-na-jornada-84599fa58dd4).

## Roberto Dias, Técnico de Farmácia

&emsp; Na elaboração da jornada de Roberto Dias, a Pharmatech optou pelo momento pós-implementação do braço robótico. Não logo após. Porém, tempos depois, quando o auxílio robótico já se tornou comum na vida do técnico. A partir disso, foi possível compreender a necessidade, por exemplo, de um sensor para identificar se as caixas estão vazias antes que o robô as use para separar medicamentos. Caso contrário, Roberto terá que verificar todas as vezes se o número de prescrições é igual o número de caixas usadas pelo robô. Abaixo, apresenta-se a jornada completa e recomenda-se especial atenção às oportunidades.

<div align="center" width="100%">

<sub>Figura 1 - Jornada do usuário: Técnico Roberto Dias</sub>

![Jornada de Usuário - Roberto Dias](/img/UX/roberto-dias-jornada.svg)

<sup>Fonte: Autoria própria </sup>

</div>

### Etapas da jornada de usuário de Roberto Dias

**1. Verificação**

- **Objetivo:** Verificar se o robô exibiu algum aviso

- **Ações:** 
    1. Verificar se a esteira está lotada
    2. Verificar se a plataforma indicou falta de algum medicamento
    3. Verificar se o número de caixas é igual o número de prescrições


- **Pensamentos:** 
    1. “Seria bom se o aviso de que a esteira está lotada fosse mais claro”
    2. “Como saber qual caixa apresentou erro?”

- **Dores:**
    1. Avisos são dados apenas na plataforma, sem sinalizalização visual ou sonora

- **Emoções:** Ansioso

- **Pontos de contato:**
    - Computador
    - Robô

- **Oportunidades:** 
    1. Implementar um buzzer no robô ou na esteira
    2. Verificar se a caixa está vazia


**2. Ajuste**

- **Objetivo:** Corrigir os erros feitos pelo robô 

- **Ações:** 
    1. Liberar espaço na esteira
    2. Sinalizar fita de medicamentos incompletas


- **Pensamentos:** 
    1. “Até que não foram muitos erros”
    2. “Os erros são difíceis de encontrar”

- **Dores:**
    1. Avisos são dados apenas na plataforma, sem sinalizalização visual ou sonora

- **Emoções:** Normal

- **Pontos de contato:**
    - Computador
    - Robô

- **Oportunidades:** 
    1. Treinamento para identificação de erros durante o processo de empacotamento


**3. Empacotamento**

- **Objetivo:** Empacotar todos as fitas de medicamentos 

- **Ações:** 
    1. Se posicionar na frente da esteira
    2. Retirar da impressora cada pedido
    3. Verificar inconsistência entre a fita e a prescrição
    4. Empacotar


- **Pensamentos:** 
    1. “Agora parece que está tudo certo!”
    2. “Tudo ficou bem mais fácil mesmo”

- **Dores:**
    1. Possibilidade de inconsistência entre prescrição e fita de medicamentos 

- **Emoções:** Feliz

- **Pontos de contato:**
    - Robô


**4. Conserto**

- **Objetivo:** Corrigir inconsistências nas fitas de medicamento 

- **Ações:** 
    1. Acessar manualmente a plataforma 
    2. Ajustar erros de separação pelo robô


- **Pensamentos:** 
    1. “Últimos ajustes...”
    2. “Esse processo nunca foi tão rápido!”

- **Emoções:** Feliz

- **Pontos de contato:**
    - Computador

- **Oportunidades:** 
    1. Permitir alteração manual de fita de medicamentos antes de processar a rastreabilidade


**5. Finalização**

- **Objetivo:** Deixar os pedidos no local designado para serem recebidos pelo (a)enfermeiro (a) 

- **Ações:** 
    1. Levar cada pacote para o local designado
    2. Reorganizar as caixas


- **Pensamentos:** 
    1. “Fim, com 48 minutos de sobra!”
    2. “Já já vou para minha pesquisa"

- **Dores:**
    1. Reorganizar as caixas

- **Emoções:** Feliz

- **Pontos de contato:**
    - Robô


## Lara Oliveira, Farmacêutica

&emsp; A jornada de usuário da persona farmacêutica Lara Oliveira foi planejada considerando suas atividades, desde o momento da procura de uma solução para os desafios encontrados na farmácia do Hospital de Clínicas da Unicamp, passando pelo momento de escolha e implementação da solução robótica, até o uso rotineiro da solução e a análise do impacto daquela solução no hospital.

<div align="center" width="100%">

<sub>Figura 2 - Jornada do usuário: Farmacêutica Lara Oliveira</sub>

![Jornada do Usuário - Lara Oliveira](/img/UX/lara-oliveira-journey.svg)

<sup>Fonte: Autoria própria </sup>

</div>

### Etapas da jornada de usuário da Lara Oliveira

**1. Descrição dos problemas do processo atual**

- **Objetivo:** Descrição dos problemas do processo atual

- **Ações:** 
    1. Listar os problemas que ocorrem na farmácia
    2. Separar os problemas por categoria e dificuldade de solução


- **Pensamentos:** 
    1. “O processo de separação de medicamentos é lento e suscetível a erros humanos”
    2. “A contagem do estoque é desorganizada e imprecisa”

- **Dores:**
    1. Estoque da farmácia desorganizado
    2. Processo de separação feito de forma manual e ineficaz

- **Emoções:** Frustrado

- **Pontos de contato:**
    - Computador
    - Pessoas

- **Oportunidades:** 
    1. Reconhecimento dos problemas da farmácia
    2. Compreensão das frustrações dos funcionários da farmácia


**2. Busca de soluções para os desafios encontrados**

- **Objetivo:** Busca de soluções para os desafios encontrados

- **Ações:** 
    1. Pesquisa de soluções para os problemas, como organizadores ou soluções robóticas.
    2. Avaliação dos valores e da capacidade de implementação de cada solução

- **Pensamentos:** 
    1. “Agora vejo que existem possíveis soluções para os desafios que encontramos”

- **Dores:**
    1. Escassez de soluções eficientes para os desafios
    2. Alto custo ou dificuldade de implementação

- **Emoções:** Pensativo

- **Pontos de contato:**
  - Computador
  - Celular
  - Pessoas

- **Oportunidades:** 
    1. Descoberta de soluções para os desafios da farmácia


**3. Escolha e implementação da solução robótica**

- **Objetivo:** Escolha e implementação da solução robótica

- **Ações:** 
    1. Escolha de implementar a solução robótica
    2. Implementação da solução robótica na farmácia do hospital

- **Pensamentos:** 
    1. “Finalmente uma solução está sendo implementada”
    2. “Espero que tenhamos tomado a decisão de solução correta”

- **Dores:**
    1. Medo de ter escolhido a solução errada
    2. Apreensiva sobre os resultados da solução

- **Emoções:** Esperançoso

- **Pontos de contato:**
  - Computador
  - Pessoas

- **Oportunidades:** 
    1. Melhora da qualidade de trabalho, uma vez que o trabalho manual e repetitivo está sendo automatizado
    2. Mais tempo disponível para lidar com tarefas mais importantes


**4. Utilização da solução robótica na rotina da farmácia**

- **Objetivo:** Utilização da solução robótica na rotina da farmácia

- **Ações:** 
    1. Utilização do sistema para verificar a quantidade de cada medicamento
    2. Utilizar relatórios sobre o estoque, gerados automaticamente pelo sistema

- **Pensamentos:** 
    1. “Através do uso da solução robótica, a contagem do estoque é muito mais rápida e precisa”
    2. “Estou feliz que não vejo erros humanos desde a instalação da solução”

- **Dores:**
    1. Apesar das suas observações, ainda não sabe se a solução robótica realmente melhorou a eficiência

- **Emoções:** Feliz

- **Pontos de contato:**
  - Computador
  - Pessoas

- **Oportunidades:** 
    1. Oportunidade de utilizar sistemas robóticos inovadores
    2. O conhecimento da solução robótica para a farmácia, a faz pensar sobre como implementar soluções robóticas em outras áreas do hospital

**5. Análise do impacto da solução e planos futuros**

- **Objetivo:** Análise do impacto da solução e planos futuros

- **Ações:** 
    1. Análise e estudo para determinar o impacto da implementação da solução robótica
    2. Determinação de planos futuros para a solução (expansão, customização, etc)

- **Pensamentos:** 
    1. “Estou surpresa com o impacto que a solução robótica teve na farmácia”
    2. “O tempo gasto com trabalho manual e os erros humanos diminuíram muito!”

- **Dores:**
    1. Preocupações com a manutenção do sistema
    2. Risco de dependência do sistema robótico

- **Emoções:** Surpreso

- **Oportunidades:** 
    1. Possibilidade de expandir a atuação de soluções automatizadas na farmácia

&emsp;&emsp;A jornada do usuário da farmacêutica Lara Oliveira exemplifica diversas situações na implementação e uso da solução robótica dentro da farmácia do Hospital de Clínicas da Unicamp, além de demonstrar todas suas ações, pensamentos, dores, emoções, pontos de contato e oportunidades durante cada etapa do processo.

---

## Melissa Grey, Enfermeira

&emsp; A imagem a seguir apresenta a jornada do usuário da Melissa Grey, uma enfermeira que utiliza a solução do braço robótico para a separação de medicamentos na etapa de retirada e devoluções de medicamentos.

<div align="center" width="100%">

<sub>Figura 3 - Jornada do usuário: Enfermeira Melissa Grey</sub>

![Jornada do usuário Melissa Grey](/img/UX/melissa-grey-journey.svg)

<sup>Fonte: Autoria própria </sup>

</div>

### Etapas da jornada da Melissa Grey

**1. Inicio do plantão**

- **Objetivo:** Obter todas as informações dos pacientes durante o plantão anterior.

- **Ações:** 
    1. Recebe as informações do plantão anterior e revisa o estado dos pacientes.
    2. Acessa o sistema do hospital para visualizar as doses e horários das medicações que precisarão ser aplicadas.


- **Pensamentos:** 
    1. “Como será que foi o plantão anterior?”
    2. “Será que algum paciente apresentou melhora ou piora?”

- **Dores:**
    1. Equipe anterior do plantão esquecer de comunicar alguma informação importante.

- **Emoções:** Animação

- **Oportunidades:** 
    1. Melhorar a integração dos sistemas do hospital com a criação de um painel com as principais mudanças de cada paciente 


**2. Retirada dos medicamentos**

- **Objetivo:** Retirar e preparar os medicamentos necessários

- **Ações:** 
    1. Vai na farmácia, onde o medicamento já foi preparado pelo o braço robótico no dia anterior.
    2. Confere os nomes, doses e etiquetas antes de levar para os pacientes.
    3. Prepara seringas, soros e medicamentos orais conforme a prescrição médica.

- **Pensamentos:** 
    1. “Ainda bem que o braço robótico já deixou todos separados! Isso facilitou minha vida!”
    2. “Tudo certo!”

- **Dores:**
    1. Falta de medicamentos ou equipamentos para a aplicação.

- **Emoções:** Determinação

- **Oportunidades:** 
    1. Sistema que otimize a rastreabilidade e estoque de cada medicamento da fármacia


**3. Aplicação dos medicamentos**

- **Objetivo:** Assegurar que cada paciente receba a medicação correta.

- **Ações:** 
    1. Vai em cada leito, checando a pulseira do paciente e os dados do prontuário.
    2. Explica a medicação que será administrada.
    3. Realiza a aplicação por via oral, intravenosa ou intramuscular.
    4. Atualiza o prontuário do paciente.

- **Pensamentos:** 
    1. “Hoje o hospital está tão lotado!”
    2. “Ainda bem que o braço robótico separou os medicamentos corretamente!”

- **Dores:**
    1. Alta lotação do hospital, a qual gera uma demanda inesperada.
    2. Resistência do paciente em receber a medicação.

- **Emoções:** Cansaço

- **Oportunidades:** 
    1. Preenchimento automático de prontuário do paciente por meio da bipagem da pulseira do paciente e dos medicamentos aplicados


**4. Acompanhamento dos pacientes**

- **Objetivo:** Identificar e reagir rapidamente a qualquer reação após a medicação.

- **Ações:** 
    1. Observa possíveis reações às medicações
    2. Um paciente apresenta reação alérgica após a administração de um medicamento específico.
    3. Aciona a equipe médica e aplica medicação de emergência conforme protocolo.
    4. Mantém o paciente sob observação e comunica a equipe sobre o ocorrido.

- **Pensamentos:** 
    1. “Vixe! Um paciente apresentou reação, será que o médico esqueceu de verificar as alergias?” 
    2. “Que bom que tudo deu certo!”

- **Dores:**
    1. Reações alérgicas inesperadas.
    2. Em caso de alguma reação, dificuldade de acionar toda a equipe rapidamente

- **Emoções:** Surpresa

- **Oportunidades:** 
    1. Integração do banco de dados do hospital com o braço robótico durante a separação dos medicamentos para verificar se o paciente possui alguma alergia.

**5. Encerramento do plantão**

- **Objetivo:** Passar as informações dos pacientes para a equipe do próximo plantão.

- **Ações:** 
    1. Revisa os prontuários para garantir que todas as medicações foram administradas corretamente.
    2. Passa o resumo do plantão para a próxima equipe, destacando o paciente que teve reação alérgica.

- **Pensamentos:** 
    1. “Preciso avisar a próxima equipe sobre o paciente que teve reação alérgica”
    2. "Plantão encerrado, partiu casa!"

- **Dores:**
    1. Erros na comunicação entre os turnos que podem influenciar o andamento dos atendimentos

- **Emoções:** Alívio

- **Oportunidades:** 
    1. O sistema criar um relatório automático com base nos registros dos medicamentos separados pelo braço robótico.


&emsp; A jornada do usuário da Melissa Grey destaca como a introdução de um braço robótico na separação de medicamentos pode otimizar o fluxo de trabalho, reduzir erros e melhorar a rotina de trabalho da equipe de enfermagem. Ao longo de sua rotina, Melissa enfrenta muitos desafios como a falta de informações na troca de plantões, reações alérgicas inesperadas e, principalmente, a alta demanda hospitalar. No entanto, a automação da separação de medicamentos contribui para um processo mais ágil para a equipe hospitalar e seguro para os pacientes.