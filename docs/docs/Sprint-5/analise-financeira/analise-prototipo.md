---
sidebar_position: 1
slug: /sprint-5/analise-financeira/analise-prototipo
description: Análise Financeira do Protótipo
---
# Análise do Protótipo 

## Protótipo

&emsp; Essa seção do documento apresenta a análise financeira detalhada referente ao desenvolvimento do **protótipo** de um sistema automatizado com braço robótico, baseado no **Dobot**, que realiza a **organização e separação de medicamentos**. O objetivo do projeto é automatizar processos logísticos em ambientes como farmácias ou hospitais, mais especificamente no Hospital de Clínica da Unicamp, utilizando tecnologias acessíveis e eficientes.

---

##  Custos Envolvidos

### 1. Mão de Obra

- Quantidade de funcionários: 8
- Custo mensal por funcionário: R$7.500
- Duração do projeto: 2,5 meses
- **Custo total:** 8 funcionários × R$7.500 × 2,5 meses = **R$150.000**

### 2. Equipamentos e Componentes
<p align="center"><strong>Tabela 1 - Custos dos Equipamentos e Componentes</strong></p>

| Item | Descrição | Custo |
| ------- | --- | --- |
| Dobot | Braço robótico responsável pela manipulação física | R$12.000 |
| Raspberry Pi 5 | Unidade de controle do sistema, 16GB RAM | R$1.600 |
| Sensores | Inclui câmera para leitura de QR Code e sensores de identificação de remédios | R$200 |
| Outros Gastos | Impressão 3d de bins, etiquetas e testes diversos | R$50 |

<p align="center">Fonte: Autoria Própria (2025)</p>

#### Comentários sobre os valores

- **Dobot (R$12.000):** Inclui impostos e frete nacional. Este modelo foi escolhido por ter boa precisão e ser compatível com controladores simples.
- **Raspberry Pi 5 (R$1.600):** A versão de 16GB foi utilizada para garantir desempenho em tarefas simultâneas, como leitura de sensores e controle de movimentos.
- **Sensores (R$200):** Valor estimado considerando sensores de baixo custo, incluindo câmera para QR Code e leitor IF para identificação de medicamentos.
- **Outros gastos (R$50):** Gasto mínimo com materiais auxiliares, como etiquetas e impressão 3D de recipientes de teste.

---

##  Resumo dos Custos
<p align="center">Tabela 2 - Resumo dos Custos</p>

<div style={{ display: 'flex', justifyContent: 'center' }}>

  <table>
    <thead>
      <tr>
        <th>Categoria</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mão de Obra</td>
        <td>R$150.000</td>
      </tr>
      <tr>
        <td>Equipamentos</td>
        <td>R$12.000</td>
      </tr>
      <tr>
        <td>Raspberry Pi 5</td>
        <td>R$1.600</td>
      </tr>
      <tr>
        <td>Sensores</td>
        <td>R$200</td>
      </tr>
      <tr>
        <td>Outros Gastos</td>
        <td>R$50</td>
      </tr>
      <tr>
        <td><strong>Total Investido</strong></td>
        <td><strong>R$163.850</strong></td>
      </tr>
    </tbody>
  </table>

</div>
<p align="center">Fonte: Autoria Própria (2025)</p>

:::tip[Aviso]
O valor foi arredondado para R$163.800 na estimativa global, considerando pequenas variações e arredondamentos para viabilidade de apresentação.
:::

## Resultado do Protótipo

O protótipo final desenvolvido possui as seguintes características:

- Utiliza um **braço robótico (Dobot)** para realizar a manipulação física dos remédios.
- Identificação dos medicamentos por meio de **QR Codes** e sensores de verificação.
- Processamento central utilizando um **Raspberry Pi 5** com 16GB, garantindo performance para controle em tempo real.
- Componentes integrados de forma modular e de baixo custo, mantendo a eficiência operacional.
- Interface totalmente integrado e funcional para utilizar o protótipo


&emsp;O investimento de aproximadamente **R$163.800** permitiria o desenvolvimento de um protótipo funcional e escalável para automação da logística farmacêutica. Com base nesses custos, é possível projetar uma estimativa de produção em escala, buscando redução de custos por unidade e incremento de funcionalidades para o produto final.
