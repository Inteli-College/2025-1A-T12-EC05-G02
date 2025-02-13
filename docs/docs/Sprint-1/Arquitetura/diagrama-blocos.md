---
sidebar_position: 1
slug: /sprint-1/Arquitetura/arquitetura
---

# Diagrama de Blocos

&emsp; Define-se como uma arquitetura de software as técnicas e padrões utilizados. Desta forma, a arquitetura tem como objetivo servir de *roadmap* para o desenvolvimento de uma aplicação, e leva em consideração as regras de negócios e quaisquer restrições tecnológicas aplicadas ao projeto [(RED HAT, 2023)](/docs/Sprint-1/referencias.md). A solução Pharmabot foi arquitetada em distintas camadas referentes ao nível te atuação dos componentes e tecnologias envolvidas na solução. A separação por camadas de aplicação permite uma organização mais clara e modular do código-fonte, o que facilita manutenções e futuras implementações no código. É importante destacar que, as funcionalidades e disposição geral da arquitetura são baseados nos requisitos funcionais e não-funcionais disponibilizados no arquivo de [requisitos](/Sprint-1/Arquitetura/requisitos.md). Abaixo se encontra o diagrama de blocos da arquitetura elaborada, viabilizando fácil entendimento sobre o sistema a ser desenvolvido.

<p style={{textAlign: 'center'}}>Figura 1 - Diagrama de Blocos da Arquitetura</p>

![Block Diagram](../../../static/img/arquitetura/block-diagram.jpeg)

<p style={{textAlign: 'center'}}>Fonte: Elaboração própria (2025)</p>

## Camada Cloud

### Front-End

### Back-End

## Camada de Atuadores Físicos

&emsp; A camada de atuadores físicos encapsula os componentes e dispositivos responsáveis pela interação com o ambiente de atuação da solução Pharmabot - referidos neste documento como *hardwares*. Desta forma, no escopo de desenvolvimento do projeto, os *hardwares* responsáveis pela comunicação entre a camada *cloud* e a separação dos medicamentos na farmácia são o **microcontrolador** e o **robô**. Abaixo, explora-se as funcionalidades e responsabilidades de cada dispositivo na performance da aplicação.

### Robô

### Microcontrolador