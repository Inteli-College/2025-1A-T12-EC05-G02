
 # 1. Introdução
A Fita de Medicamentos é um processo essencial nas farmácias hospitalares, responsável por organizar e preparar os medicamentos necessários para a administração aos pacientes internados. Atualmente, essa montagem é feita de forma manual, exigindo atenção minuciosa de farmacêuticos e técnicos de farmácia para evitar erros. No entanto, esse método é suscetível a falhas, como separação incorreta, duplicação de medicamentos e atrasos, comprometendo tanto a segurança do paciente quanto a eficiência operacional do hospital.

Para solucionar esses desafios, este projeto propõe o desenvolvimento de um sistema automatizado de separação e montagem da Fita de Medicamentos, integrando nosso robô, sensores inteligentes e um sistema digital de controle. Com essa automação, buscamos reduzir o tempo de montagem em até 40%, minimizar erros, melhorar o rastreamento de estoque em tempo real e otimizar a produtividade da equipe hospitalar. Essa inovação tem o potencial de transformar a gestão de medicamentos nos hospitais, garantindo maior eficiência e segurança para todos os envolvidos.

# 2. Contextualização do Problema
Atualmente, a montagem da Fita de Medicamentos é realizada de forma totalmente manual pelos farmacêuticos e técnicos de farmácia dentro do hospital. Esse processo começa com a análise das prescrições médicas, seguida pela busca e separação dos medicamentos no estoque hospitalar. Cada medicamento precisa ser conferido individualmente para garantir que o paciente receba a dosagem correta no momento adequado. Além disso, é necessário verificar a validade dos medicamentos, evitando a administração de itens vencidos. O processo pode ser complementado pela bipagem (escaneamento de QR Codes ou códigos de barras), mas isso ainda depende de conferência humana, tornando-o sujeito a falhas.
Os principais desafios desse fluxo incluem tempo elevado de montagem, que pode comprometer a agilidade na administração dos medicamentos, e erros na separação, como trocas ou duplicações, que representam riscos diretos à saúde do paciente. Além disso, a necessidade de mão de obra especializada eleva os custos operacionais e reduz a eficiência geral do sistema hospitalar. A falta de rastreabilidade digital precisa também dificulta o monitoramento do estoque, podendo levar ao desperdício de medicamentos ou à escassez de itens essenciais no momento crítico. Esses gargalos evidenciam a necessidade de uma solução tecnológica para otimizar esse processo, tornando-o mais seguro e eficiente.

# 3. Benchmarking

## 3.1 Tecnologias relevantes na área da automação hospitalar

* **Manipuladores robóticos:** Utilizados para manusear medicamentos com precisão, os manipuladores robóticos reduzem o risco de contaminação e erros humanos. Eles são capazes de selecionar, separar e dispensar medicamentos de forma automatizada, aumentando a eficiência do processo.

* **Sensores inteligentes para controle de medicamentos:** Sensores avançados monitoram condições como temperatura, umidade e integridade das embalagens dos medicamentos. Isso garante que os medicamentos sejam armazenados e dispensados nas condições ideais, mantendo sua eficácia e segurança.

* **Integração com sistemas hospitalares:** A integração de sistemas de automação com os registros eletrônicos de saúde e outros sistemas hospitalares permite uma gestão unificada dos medicamentos. Isso facilita o acompanhamento das prescrições, controle de estoque e rastreabilidade dos medicamentos dispensados.

## 3.2 Soluções semelhantes ao nosso projeto
Atualmente, diversos hospitais e empresas estão implementando soluções automatizadas para a dispensação de medicamentos, visando aumentar a eficiência e a segurança no processo de distribuição. A seguir, apresentamos uma documentação detalhada sobre algumas dessas soluções:

* **1. Hospital Alemão Oswaldo Cruz (BD Rowa)**: O Hospital Alemão Oswaldo Cruz adotou o sistema BD Rowa, um robô que utiliza inteligência artificial para auxiliar na dispensação de medicamentos. Essa tecnologia permite a automação do armazenamento e da distribuição de medicamentos, garantindo maior precisão e eficiência no processo. O sistema é capaz de gerenciar o estoque de forma otimizada, reduzindo erros humanos e melhorando a segurança do paciente.

* **2. Qx-Dextron de Qx Robotics Pvt. Ltd.**: A empresa Qx Robotics Pvt. Ltd. desenvolveu o Qx-Dextron, um sistema automatizado de dispensação de medicamentos. Este sistema utiliza componentes como os trilhos drylin da igus para garantir movimentos precisos e confiáveis na distribuição dos medicamentos. A automação proporciona maior eficiência e reduz a possibilidade de erros na administração dos medicamentos aos pacientes.

* **3. Swisslog Healthcare**: A Swisslog Healthcare oferece soluções integradas para a gestão de medicamentos em ambientes hospitalares. Suas soluções incluem automação de farmácias centrais, sistemas de transporte de medicamentos e softwares abrangentes para garantir um atendimento contínuo e seguro. A empresa busca otimizar cada etapa do fornecimento de medicamentos, desde a dispensação até a entrega dentro da instituição, alinhando-se às necessidades dos pacientes e da equipe clínica.

* **4. Hospital Universitário Cassiano Antônio Moraes (HUCAM)**: O HUCAM implementou uma máquina que fraciona medicamentos, oferecendo maior segurança aos pacientes. Este equipamento permite a divisão precisa de doses, garantindo que os pacientes recebam a quantidade exata prescrita. Além disso, a automação do processo reduz o risco de contaminação e erros na administração dos medicamentos.

* **5. Separador Automatizado de Medicamentos para Farmácias Hospitalares**: Este projeto, apoiado pela FAPESP, visa desenvolver um separador automatizado de medicamentos para uso em farmácias hospitalares. O objetivo é aumentar a eficiência na separação e distribuição de medicamentos, reduzindo o tempo de preparo e os erros associados ao processo manual. A automação proposta busca melhorar a segurança do paciente e otimizar os recursos hospitalares.

* **6. Unibox – Dispensário Automático de Medicamentos e Insumos**: Desenvolvido pelo Grupo UniHealth, o Unibox é um dispensário automático que controla unitariamente os produtos de acordo com a prescrição médica. O sistema oferece rastreabilidade, segurança e transparência para gestores hospitalares e pacientes, integrando-se totalmente ao software UnilogWF. Entre seus diferenciais estão a dispensação unitária, controle de temperatura, acesso por biometria e a capacidade de armazenar diversos tipos de insumos hospitalares.

## 3.3 Diferenças entre os sistemas existentes e a proposta da PharmaTech

A proposta do PharmaTech foca na automação da separação de medicamentos para otimizar a eficiência e segurança no Hospital de Clínicas da Unicamp. O projeto busca desenvolver um sistema automatizado de separação e montagem da “Fita de Medicamentos”, integrando manipuladores robóticos, sensores inteligentes e um sistema digital de controle.

#### **Principais diferenças entre o TAPI - UNICAMP e outras soluções existentes**
| **Critério** | **Soluções Existentes** | **PharmaTech** |
|-------------|-----------------------|--------------------|
| **Automação** | Variável. Alguns sistemas, como o BD Rowa, automatizam a dispensação, enquanto outros são semiautomatizados. | Foco total na automação da montagem da "Fita de Medicamentos" com robôs e sensores inteligentes. |
| **Integração com Sistemas Hospitalares** | Algumas soluções possuem integração limitada com prontuários eletrônicos e sistemas de gestão de medicamentos. | Integração total com o sistema de gestão do hospital para buscar prescrições digitais e atualizar o estoque em tempo real. |
| **Precisão e Segurança** | Algumas soluções incluem checagem por código de barras e rastreamento de medicamentos. | Validação por sensores para leitura de código de barras, peso e volume, garantindo precisão na separação dos medicamentos. |
| **Escopo de Aplicação** | Maioria foca em dispensação automática ou fracionamento de doses. | Voltado especificamente para a montagem da “Fita de Medicamentos” na farmácia hospitalar. |
| **Testes e Validação** | Algumas soluções já são amplamente utilizadas em hospitais de grande porte. | Testes piloto na UTI do HC/Unicamp para validar a eficiência em um ambiente controlado. |
| **Custo-Benefício** | Investimentos elevados e dependência de fornecedores estrangeiros. | Busca um modelo escalável e mais acessível, reduzindo desperdícios e aumentando a produtividade da equipe hospitalar. |

# 4. Benefícios Esperados com a Solução (Conclusão)

Dessa forma, pode-se concluir que a implementação da solução trará melhorias significativas para o processo de separação e dispensação de medicamentos no hospital. A principal vantagem está na redução de erros, garantindo que os medicamentos corretos sejam selecionados e entregues, aumentando a segurança do paciente. Além disso, a eficiência operacional será aprimorada, reduzindo em até 40% o tempo necessário para a separação da “Fita de medicamentos”, o que otimiza a rotina da equipe de farmácia.

Outro benefício essencial é o rastreamento e controle aprimorado, permitindo o monitoramento em tempo real do estoque e das operações, garantindo maior precisão na gestão de medicamentos. Essa automação também contribuirá para a redução de custos, minimizando desperdícios e otimizando o uso dos recursos humanos, tornando o processo mais econômico. Por fim, a solução impactará diretamente a qualidade assistencial, proporcionando um atendimento mais ágil e seguro, com maior confiabilidade na dispensação dos medicamentos para os pacientes internados.