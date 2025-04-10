---
sidebar_position: 2
slug: /sprint-5/analise-financeira/analise-futura
description: Análise Financeira do Projeto Futuro
---

# Análise Futura

## Implementação do Projeto

&emsp; Até o momento, a PharmaTech desenvolveu um protótipo do projeto a ser implementado no Hospital de Clínicas da Unicamp (HC). Contudo, ao se considerar a efetiva implantação do PharmaBot nas enfermarias do hospital, novos custos devem ser levados em conta, relacionados ao espaço físico, à disposição dos medicamentos, à necessidade de etiquetagem individual e à adaptação do sistema às especificidades do ambiente hospitalar.

&emsp; Considerando o tamanho do espaço e, consequentemente, a quantidade de medicamentos armazenados, estima-se ser necessária a instalação de dois sistemas de esteiras posicionadas diante das prateleiras: uma destinada ao robô e outra às caixas de separação. Tal configuração já havia sido prevista na elaboração das [jornadas do usuário do PharmaBot](../../Sprint-1/UX/jornada-do-usuario.md), porém não foi incluída no orçamento do protótipo em razão de limitações de recursos.

&emsp; Além disso, foi constatado que os medicamentos não estão dispostos horizontalmente na farmácia, mas sim em diferentes níveis verticais. O modelo atual, o Dobot Magician Lite, possui quatro graus de liberdade e é adequado para tarefas gerais. Contudo, para maior eficiência no contexto do HC, seria necessário um robô industrial com maior precisão nos movimentos verticais, ainda que possua menos graus de liberdade.

&emsp; Em relação à etiquetagem dos medicamentos, trata-se de uma exigência, uma vez que os fármacos não são entregues em suas embalagens originais, mas sim em doses unitarizadas. Para possibilitar sua identificação individual, cada dose precisa ser acompanhada de um código de barras ou QR Code legível pelo robô. Em 2015, foram emitidas aproximadamente 1.318.850 doses unitarizadas (comprimidos ou xaropes) pelas farmácias do HC [(Hospital de Clínicas - Unicamp, 2024)](../referencias.md). Ressalta-se que cada uma dessas doses requer uma etiqueta própria e que, atualmente, esse número provavelmente é ainda maior.

&emsp; Por fim, a programação do robô e das esteiras precisará ser adaptada às condições específicas das farmácias hospitalares, o que demandará tempo adicional de desenvolvimento para o PharmaBot.

---

## Custos Envolvidos

&emsp; Diante dessas necessidades, elaborou-se a seguinte tabela de custos para a implementação do projeto no HC ao longo de 12 meses.

### 1. Mão de Obra

- Quantidade de funcionários: 8  
- Custo médio por funcionário: R$ 7.500  
- Duração do projeto: 12 meses  
- **Custo total:** 8 funcionários × R$ 7.500,00 × 12 meses = **R$ 720.000**

### 2. Equipamentos e Componentes

<p style={{textAlign: 'center'}}>Tabela 1 - Custos dos Equipamentos e Componentes</p>

| Item              | Descrição                                                      | Custo Estimado         |
|-------------------|----------------------------------------------------------------|-------------------------|
| Robô              | Braço robótico industrial com 4 DOF           | R$ 80.000 – R$ 150.000  |
| Microcontrolador  | Microcontrolador compatível com o robô                         | R$ 1.600                |
| Esteiras          | Sistema de uma esteira para o robô e as caixas               | R$ 20.000 – R$50.000  |
| Periféricos       | Sensor de infravermelho e leitor de QR Code                    | R$ 200                  |
| Etiquetas         | Material de etiquetagem de cada dose unitarizada              | R$ 75.000               |

<p style={{textAlign: 'center'}}>Fonte: Autoria própria (2025)</p>

**Comentários sobre os valores:**

- **Robô:** estimado com base nos robôs oferecidos pela manufatura alemã [igus®](https://www.igus.com.br/robolink/robot-arms).
- **Microcontrolador:** baseado no valor do Raspberry Pi 5.
- **Esteiras:** baseado em informações dos artigos da [Kalatec Automação](../referencias.md) e [CTA Equipamentos](../referencias.md).
- **Periféricos:** baseado nos dispositivos utilizados no protótipo.
- **Etiquetas:** considerando 1,5 milhão de etiquetas ao custo de R$ 0,05 cada.

---

## Resumo dos Custos

<p style={{textAlign: 'center'}}>Tabela 2 - Resumo dos Custos</p>

<div style={{ display: 'flex', justifyContent: 'center' }}>

<table>
    <tr>
      <th>Categoria</th>
      <th>Valor Estimado</th>
    </tr>
    <tr>
      <td>Mão de Obra</td>
      <td>R$ 720.000</td>
    </tr>
    <tr>
      <td>Equipamentos e Componentes</td>
      <td>R$ 176.800 – R$ 276.800</td>
    </tr>
    <tr>
      <td>Outros Gastos</td>
      <td>R$ 2.000</td>
    </tr>
    <tr>
      <td><strong>Total Estimado</strong></td>
      <td><strong>R$ 898.800 – R$ 998.800</strong></td>
    </tr>
  </table>

</div>

<p style={{textAlign: 'center'}}>Fonte: Autoria própria (2025)</p>

:::warning[Manutenção]
Deve-se considerar um preço de manutenção, supervisão e treinamento do equipamento por até um ano de R$100.000.
:::

## Resultado do Projeto

&emsp; Percebe-se que a implementação plena do PharmaBot no Hospital de Clínicas da Unicamp demanda investimentos significativos, sobretudo em infraestrutura, automação e adaptação às especificidades do ambiente hospitalar.

&emsp; O projeto completo possuiria as seguintes características:
- Robô com 4 DOF, capaz de segurar o remédio e colocá-lo em uma bandeja
- Componentes de segurança integrados de forma modular e de baixo custo, mantendo a eficiência operacional.
- 1 esteira para a movimentação do robô ao longo da farmácia
- Integração com a plataforma utilizada pelo hospital para triagem

&emsp; A estimativa de custos apresentada evidencia a complexidade técnica e logística do projeto, reforçando a necessidade de planejamento detalhado e investimento estratégico. No entanto, percebe-se que os benefícios potenciais — como a redução de erros na dispensação de medicamentos, a otimização de tempo da equipe de farmácia e o aumento da rastreabilidade dos fármacos — justificam o investimento proposto.