# Arquitetura

&emsp;&emsp;Após a apresentação do diagrama de arquitetura para os colaboradores do Hospital de Clínicas da Unicamp durante a Sprint 1. Foi decidido a alteração de parte da arquitetura do projeto.

<p style={{textAlign: 'center'}}>Figura 1 - Diagrama de Blocos da Arquitetura Atualizado</p>

![Block Diagram](/img/arquitetura/block-diagram-update.png)

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria (2025)</p>

Principais modificações na arquitetura e suas motivações:

- **Front-end:** Kit de Pedidos > Fila de Pedidos:

&emsp;&emsp;No **Front-end** (localizado em **Cloud > Front-end**), existia uma página chamada Kit de Pedidos, e ela era responsável por receber as receitas, e permitir que o usuário faça um pedido de kit para o robô bipar e separar os medicamentos da receita em um kit.

&emsp;&emsp;Uma vez que, segundo o parceiro, o sistema desenvolvido será integrado ao AGHUse, que é o sistema já implementado na farmácia do hospital, do qual já possui um sistema de pedido de kits. Conclui-se que não existe a necessidade de uma página para fazer o pedido de kits, basta integrar o Front-end do AGHUse com o nosso sistema, que se utiliza do braço robótico para automatizar as tarefas de separação e triagem dos medicamentos.

&emsp;&emsp;Por fim, foi decidido criar uma nova página no lugar, que servirá como um dashboard para acompanhar o status atual do sistema e do robô, permitindo ver quais kits já foram montados, quais estão sendo montados e quais estão na fila de espera. Além de permitir tomar ações emergenciais em relação ao robô, como parar todo o sistema em situações que isso se faça necessário.

- **Microcontrolador:** ESP-32 > Raspberry Pi 5

&emsp;&emsp;No **Microcontrolador** (localizado em **Atuadores físicos > Microcontrolador**), existe o microcontrolador que será utilizado para enviar comandos ao robô, hospedar a API do robô e para manter a comunicação com a API do sistema hospedada na Cloud.

&emsp;&emsp;Neste caso, foi decidido alterar o microcontrolador utilizado, o ESP-32 foi trocado pelo Raspberry Pi 5, essa alteração se deu por razões de compatibilidade de linguagens de programação entre robô e microcontrolador, além de facilitar o desenvolvimento da API do Robô para uma linguagem de programação que os membros da equipe possuem maior facilidade e familiaridade.

