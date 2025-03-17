---
sidebar_position: 2
slug: /sprint-3/integracao/circuito-eletronico
---

# Circuito Eletrônico

&emsp; Para o nominal funcionamento do projeto *PharmaBot* conforme suas regras de negócio, um esquema eletrônico simplificado foi desenvolvido para assegurar correta conexão e comunicação entre os dispositivos. Para tal, as conexões eletrônicas foram fundamentadas no diagrama eletrônico abaixo (Figura 1). 

<p style={{textAlign: 'center'}}>Figura 1 - Circuito da Aplicação *PharmaBot*</p>

<div align="center">

![Circuito da Aplicação](/img/electronic/finished_circuit.png)

</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria (2025)</p>

&emsp; O diagrama presente na Figura 1 delineia as ligações eletrônicas do sistema *PharmaBot* e contém a identificação de cada um dos seus componentes principais: *Raspberry Pi 5*, *MH-ET LIVE Scanner* e o sensor *TCRT5000*.

<p style={{textAlign: 'center'}}>Figura 2 - Marcadores de VCC e Ground</p>

<div align="center">

![Marcadores VCC e GND](/img/electronic/markers_gnd_vcc.png)

</div>

<p style={{textAlign: 'center'}}>Fonte: Circuit Diagram Web Editor (2025)</p>

&emsp; **Observações:** compreende-se o uso do marcador *+5V* e *GND* para substituir a extensão de ligações de alimentação no diagrama eletrônico. Desta forma, utiliza-se as padronizações presentes na Figura 2 como maneira de facilitar a visualização das ligações eletrônicas do circuito, sendo o marcador superior, indicação de conexão com o terminal *+5V* do microcomputador *Raspberry Pi 5*, e o marcador inferior, indica conexão com o terminal *GND* do mesmo microcomputador

## Componentes utilizados

&emsp; Abaixo, lista-se todos os componentes utilizados no projeto e suas funções principais, de modo a destacar suas conexões e funcionamento básico:

### 1. *Raspberry Pi 5*

&emsp; O principal componente na aplicação *PharmaBot* refere-se ao *Raspberry Pi 5*, um microcomputador responsável por receber, identificar e tratar as leituras realizadas pelo sistema através dos sensores de leitura *QR code* e infravermelho. Além disso, o *Pi 5* também se compromete à processar os *inputs* do CLI e enviar as instruções necessárias para a movimentação do robô, conforme pode ser observado no [Diagrama de Arquitetura em Blocos do projeto](docs/Sprint-2/Arquitetura/diagrama.md).

&emsp; O *Raspberry Pi 5* contém um barramento de 40 pinos, os quais são explicitados, na Figura 2, a numeração de identificação de seus terminais e suas respectivas funções. Dentre os terminais mencionados, encontram-se pinos de alimentação *5V*, *GPIOs* (*Genreal-purpose Input/Output*), terminais de comunicação serial via *UART*, *SPI*, dentre outras funcionalidades. Abaixo, portanto, compreende-se o diagrama *pinout* do *Raspberry Pi 5*, utilizado como referência para as conexões realizadas.

<p style={{textAlign: 'center'}}>Figura 3 - Diagrama de pinos da *Raspberry Pi 5*</p>

<div align="center">

![Raspberry Pi 5 Pinout](/img/electronic/raspberry_pinout.jpg)

</div>

<p style={{textAlign: 'center'}}>Fonte: Hackatronic (2023)</p>

&emsp; OBSERVAÇÃO: No diagrama da Figura 3, utiliza-se o terminal *GPIO1*, do *Raspberry Pi 5* para a conexão com o terminal *Data*, do sensor infravermelho *TRCT5000*, no entanto, essa conexão pode ser estabelecida entre o terminal *Data* e qualquer *GPIO* do microcomputador - contanto que o algoritmo de execução também seja adequado para o terminal correto.

---

### 2. *MH-ET LIVE Scanner* (Leitor QR Code e código de barras)

&emsp; Para a leitura dos códigos de identificação dos medicamentos nas *bins*, utiliza-se o leitor de *QR Code* e código de barras **MH-ET LIVE Scanner**. O componente conta com um *scanner* infravermelho para identificação dos códigos a serem lidos, um *chip* para processamento interno das leituras realizadas (que permite um rápido envio da decodificação via seus terminais de saída). Finalmente, o eletrônico ainda permite o trabalho com duas interfaces de comunicação, *UART* e *HID*, configurados através de um conector amarelo, conforme identificação na Figura 3.

&emsp; Portanto, a Figura 3 detalha o diagrama *pinout* do *MH-ET LIVE Scanner*.

<p style={{textAlign: 'center'}}>Figura 4 - Identificação de pinos *MH-ET LIVE Scanner*</p>

<div align="center">

![MH-ET LIVE Scanner](/img/electronic/mh-et-live.png)

</div>

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria (2025)</p>

&emsp; Confirme indicado na Figura 4, encontram-se destacados o **Barramento de alimentação** e **Terminais de comunicação**.

* O **Barramento de Comunicação Serial** contém, dentre terminais de comunicação, os terminais de alimentação **VCC** e **GND**, responsáveis pela energização do circuito. Além dos terminais de alimentação, encontra-se também os pinos de comunicação serial **TX** e **RX**, para transmissão dos dados de acordo com a **Chave Seletora de Protocolo**.

* A **Chave Seletora de Protocolo**, por sua vez, comportam os pinos de seleção do protocolo de comunicação utilizado para envio dos dados processados pelo sensor **MH-ET LIVE Scanner**, responsáveis pela comunicação *UART* ou *HID*, conforme definido pelo posicionamento do jumper amarelo presente na Figura 4. Para o projeto *PharmaBot*, utiliza-se o protocolo *UART* para recepção do processamento das imagens adquiridas via *scanner* e envio dos dados decodificados para o [*Raspberry Pi 5*](#1-raspberry-pi-5).

---

### 3. Sensor infravermelho *TCRT5000*

&emsp; O TCRT5000, sensor ótico refletivo, comporta dois componentes, sendo um emissor e um receptor infravermelhos. Utiliza-se um divisor de tensão entre os terminais do receptor de luminosidade e GND para controle da corrente recebida pelo fotoresistor do receptor infravermelho. Assim, converte-se o sinal recebido pelos componentes de funcionamento do sensor TCRT5000 para um sinal adequado para processamento pelo microcomputador *Raspberry Pi 5*. 

&emsp; Na Figura 5, encontra-se o sensor TCRT5000. Destaca-se o emissor e receptor infravermelhos - componente circulares azul e preto, respectivamente.

<p style={{textAlign: 'center'}}>Figura 5 - Sensor infravermelho TCRT5000</p>

<div align="center">

![Raspberry Pi 5 Pinout](/img/electronic/ir_sensor.png)

</div>

<p style={{textAlign: 'center'}}>Fonte: Loja Mekanus (2025)</p>

---

## Demostração de todo o sistema integrado

&emsp;Na terceira sprint, o hardware *PharmaBot* foi aprimorado com a integração dos sensores de infravermelho e QR Code, elevando sua capacidade de identificação e separação automática das fitas de medicamentos conforme a demanda do Hospital das Clínicas. Com essa implementação, o sistema agora pode ler QR Codes ou códigos de barras, exibindo as informações do medicamento no terminal. Após a leitura, o sensor de infravermelho verifica a presença real do item coletado, garantindo maior controle durante todo o processo. Por fim, todo esse fluxo mencionado pode ser visualizado nesse [video](https://drive.google.com/file/d/1F46_raCgcBh_TuTKi6FLztHPZMw6Hi-A/view?usp=sharing).

<div align="center" width="100%">

<sub>Vídeo 1 - Video de funcionamento do braço robótico com integração dos sensores</sub>

<iframe width="560" height="315" src="https://www.youtube.com/embed/u1MBkP50Yxs?si=Su3Xpmw6FsNMHThp&start=30&end=61" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<br/>
<sup>Fonte: Autoria própria </sup>

</div>

---

## Considerações Finais

&emsp; Através do documento acima, compreende-se as ligações eletrônicas da componentização periférica aplicadas ao projeto *PharmaBot*. O circuito foi estruturado para garantir a correta integração entre os dispositivos, assegurando comunicação eficiente e confiável entre o *Raspberry Pi 5*, o leitor *MH-ET LIVE Scanner* e o sensor *TCRT5000*. A utilização de padrões de ligação, como os marcadores de alimentação e *GND*, bem como a escolha criteriosa dos componentes e suas conexões, possibilitam um funcionamento seguro da aplicação e alinhamento às necessidades do sistema.