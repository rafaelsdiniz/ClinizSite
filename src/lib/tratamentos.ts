export type Tratamento = {
  slug: string;
  nome: string;
  chamada: string;
  resumo: string;
  imagem: string;
  imagemAlt: string;
  /** posição do recorte da foto (object-position) */
  foco?: string;
  destaque: boolean;
  fatos: { rotulo: string; valor: string }[];
  introducao: string[];
  indicacoes: string[];
  etapas: { titulo: string; texto: string }[];
  beneficios: { titulo: string; texto: string }[];
  cuidados: string[];
  perguntas: { p: string; r: string }[];
};

export const TRATAMENTOS: Tratamento[] = [
  {
    slug: "implantes-dentarios",
    nome: "Implantes dentários",
    chamada: "Dente fixo de volta, com planejamento guiado.",
    resumo:
      "Reposição de um ou mais dentes com implantes de titânio e coroas sob medida, planejados em 3D para mais previsibilidade e conforto.",
    imagem: "/img/implante.webp",
    imagemAlt: "Modelo didático de implante dentário ao lado de uma coroa sobre fundo claro",
    foco: "50% 60%",
    destaque: true,
    fatos: [
      { rotulo: "Planejamento", valor: "Tomografia e guia digital" },
      { rotulo: "Etapas", valor: "Cirurgia, integração e coroa" },
      { rotulo: "Prazo", valor: "Definido no seu plano" },
    ],
    introducao: [
      "O implante é uma pequena peça de titânio posicionada no osso, no lugar da raiz do dente perdido. Depois da integração com o osso, ele recebe uma coroa feita sob medida, com cor e formato pensados para o seu sorriso.",
      "Na Cliniz, todo implante começa com tomografia e planejamento digital. Assim conseguimos prever a posição ideal antes da cirurgia, com procedimentos mais rápidos e uma recuperação mais tranquila.",
    ],
    indicacoes: [
      "Quem perdeu um ou mais dentes",
      "Quem usa prótese removível e quer mais firmeza",
      "Quem tem pontes antigas que precisam ser substituídas",
      "Quem deseja mastigar e sorrir com segurança",
    ],
    etapas: [
      { titulo: "Avaliação e tomografia", texto: "Exame clínico, imagens 3D e conversa sobre o que você espera do tratamento." },
      { titulo: "Planejamento digital", texto: "Definimos a posição do implante no computador e, quando indicado, produzimos um guia cirúrgico." },
      { titulo: "Instalação do implante", texto: "Procedimento com anestesia local, feito com calma e orientações claras para os dias seguintes." },
      { titulo: "Coroa definitiva", texto: "Após a integração, a coroa é moldada digitalmente e ajustada até ficar natural e confortável." },
    ],
    beneficios: [
      { titulo: "Firmeza para mastigar", texto: "Funciona como um dente natural, sem encaixes soltos." },
      { titulo: "Estética natural", texto: "Coroa com cor e formato combinados aos seus dentes." },
      { titulo: "Preserva o osso", texto: "Ajuda a manter o volume ósseo da região." },
    ],
    cuidados: [
      "Higiene diária com escova, fio e escova interdental",
      "Revisões periódicas para acompanhar o implante e a gengiva",
      "Atenção redobrada para quem fuma ou tem bruxismo",
    ],
    perguntas: [
      { p: "O procedimento dói?", r: "A instalação é feita com anestesia local e costuma ser bem tolerada. Nos dias seguintes, o desconforto é controlado com as orientações e medicações indicadas pelo dentista." },
      { p: "Qualquer pessoa pode fazer implante?", r: "A maioria das pessoas pode. A avaliação e a tomografia mostram a quantidade de osso e a saúde geral, e com isso indicamos o caminho mais seguro, inclusive enxertos quando necessários." },
      { p: "Fico sem dente durante o tratamento?", r: "Na maior parte dos casos, não. Usamos soluções provisórias para você seguir a rotina com tranquilidade enquanto o implante se integra." },
    ],
  },
  {
    slug: "lentes-de-contato-dental",
    nome: "Lentes de contato dental",
    chamada: "Um sorriso harmônico, desenhado com você.",
    resumo:
      "Lâminas finas de cerâmica que corrigem cor, formato e pequenos espaços, com simulação do resultado antes de qualquer desgaste.",
    imagem: "/img/lentes.webp",
    imagemAlt: "Dentista comparando a cor dos dentes de uma paciente sorridente com escala de cores",
    foco: "50% 35%",
    destaque: true,
    fatos: [
      { rotulo: "Material", valor: "Cerâmica de alta estética" },
      { rotulo: "Simulação", valor: "Ensaio do sorriso na boca" },
      { rotulo: "Desgaste", valor: "Mínimo ou nenhum, se possível" },
    ],
    introducao: [
      "As lentes de contato dental são lâminas cerâmicas muito finas, cimentadas na frente dos dentes. Elas permitem ajustar cor, formato, comprimento e pequenas assimetrias de forma conservadora.",
      "Antes de começar, fazemos o planejamento digital e um ensaio do novo sorriso direto na sua boca. Você vê, opina e aprova. O objetivo é um resultado natural, que combine com o seu rosto e a sua personalidade.",
    ],
    indicacoes: [
      "Dentes com manchas que não saem com clareamento",
      "Pequenos espaços entre os dentes",
      "Dentes desgastados, curtos ou com formato irregular",
      "Quem busca harmonia sem aparência artificial",
    ],
    etapas: [
      { titulo: "Fotos e escaneamento", texto: "Registramos o sorriso em fotos e em 3D para estudar proporções e cor." },
      { titulo: "Desenho do sorriso", texto: "Criamos o projeto digital e ajustamos junto com você." },
      { titulo: "Ensaio na boca", texto: "Uma simulação provisória mostra o resultado antes de qualquer etapa definitiva." },
      { titulo: "Cimentação", texto: "As lentes são produzidas, provadas e cimentadas com acabamento detalhado." },
    ],
    beneficios: [
      { titulo: "Resultado previsível", texto: "Você aprova o desenho antes de começar." },
      { titulo: "Conservador", texto: "Preparo mínimo dos dentes, sempre que o caso permite." },
      { titulo: "Cor estável", texto: "A cerâmica mantém o brilho e resiste a manchas." },
    ],
    cuidados: [
      "Escovação e fio dental como nos dentes naturais",
      "Evitar morder objetos duros, como canetas e gelo",
      "Placa de proteção noturna para quem range os dentes",
    ],
    perguntas: [
      { p: "As lentes ficam com aparência artificial?", r: "Não precisam ficar. A cor, a transparência e o formato são escolhidos com base no seu rosto, e o ensaio na boca serve exatamente para garantir um resultado natural." },
      { p: "Preciso desgastar os dentes?", r: "Depende do caso. Muitas vezes o preparo é mínimo ou desnecessário. Isso é avaliado com cuidado e explicado antes de qualquer decisão." },
      { p: "Quanto tempo duram?", r: "Com higiene e revisões em dia, as lentes cerâmicas têm ótima durabilidade. O dentista explica na consulta os cuidados que fazem diferença no seu caso." },
    ],
  },
  {
    slug: "clareamento-dental",
    nome: "Clareamento dental",
    chamada: "Dentes mais claros, com segurança e conforto.",
    resumo:
      "Clareamento supervisionado, no consultório ou em casa com moldeiras sob medida, com controle de sensibilidade em cada etapa.",
    imagem: "/img/clareamento.webp",
    imagemAlt: "Paciente sorrindo em cadeira odontológica enquanto se olha em um espelho de mão",
    foco: "60% 40%",
    destaque: true,
    fatos: [
      { rotulo: "Técnicas", valor: "Consultório, caseiro ou combinado" },
      { rotulo: "Moldeiras", valor: "Feitas sob medida" },
      { rotulo: "Acompanhamento", valor: "Do início ao fim" },
    ],
    introducao: [
      "O clareamento deixa os dentes naturais mais claros com géis específicos, aplicados na concentração certa para o seu caso. A orientação profissional faz toda a diferença no resultado e no conforto.",
      "Começamos com uma avaliação para tratar o que precisa vir antes, como cáries ou sensibilidade. Depois, indicamos a técnica ideal e acompanhamos cada etapa de perto.",
    ],
    indicacoes: [
      "Dentes amarelados pelo tempo, café ou vinho",
      "Quem vai fazer lentes e quer ajustar a cor base",
      "Quem deseja um sorriso mais iluminado sem desgaste",
      "Preparação para eventos importantes",
    ],
    etapas: [
      { titulo: "Avaliação", texto: "Checamos gengiva, restaurações e sensibilidade antes de começar." },
      { titulo: "Registro de cor", texto: "Fotografamos e medimos a cor inicial para acompanhar a evolução." },
      { titulo: "Aplicação", texto: "Sessões no consultório, uso de moldeiras em casa ou a combinação das duas." },
      { titulo: "Revisão", texto: "Conferimos o resultado e passamos as orientações para manter a cor." },
    ],
    beneficios: [
      { titulo: "Sem desgaste", texto: "Atua na cor do dente natural, sem alterar a estrutura." },
      { titulo: "Personalizado", texto: "Concentração e tempo ajustados à sua sensibilidade." },
      { titulo: "Acompanhado", texto: "Você nunca faz o tratamento às cegas." },
    ],
    cuidados: [
      "Reduzir café, vinho e alimentos com corante nas primeiras semanas",
      "Usar o creme dental indicado para sensibilidade, se necessário",
      "Manter limpezas periódicas para preservar o resultado",
    ],
    perguntas: [
      { p: "Clareamento causa sensibilidade?", r: "Pode causar uma sensibilidade passageira em algumas pessoas. Ajustamos a concentração e o tempo de uso e indicamos produtos que deixam o processo bem mais confortável." },
      { p: "Restaurações e lentes também clareiam?", r: "Não. O gel age apenas no dente natural. Por isso avaliamos antes se alguma restauração precisará ser trocada depois para acompanhar a nova cor." },
      { p: "O resultado é permanente?", r: "O resultado é duradouro, mas a cor pode mudar aos poucos com a alimentação. Pequenos retoques orientados mantêm o sorriso claro por muito mais tempo." },
    ],
  },
  {
    slug: "ortodontia",
    nome: "Ortodontia",
    chamada: "Dentes alinhados e uma mordida que funciona.",
    resumo:
      "Aparelhos fixos metálicos ou estéticos para alinhar os dentes e corrigir a mordida, em adolescentes e adultos.",
    imagem: "/img/ortodontia.webp",
    imagemAlt: "Mulher sorrindo com aparelho ortodôntico fixo",
    foco: "50% 30%",
    destaque: true,
    fatos: [
      { rotulo: "Aparelhos", valor: "Metálico ou estético" },
      { rotulo: "Para quem", valor: "Adolescentes e adultos" },
      { rotulo: "Consultas", valor: "Manutenções agendadas" },
    ],
    introducao: [
      "A ortodontia corrige a posição dos dentes e a relação entre as arcadas. Mais do que estética, uma mordida equilibrada protege os dentes, facilita a higiene e reduz desgastes ao longo dos anos.",
      "Trabalhamos com aparelhos metálicos e estéticos, de braquetes cerâmicos, com planejamento feito a partir de fotos, radiografias e escaneamento digital.",
    ],
    indicacoes: [
      "Dentes tortos, apinhados ou com espaços",
      "Mordida cruzada, aberta ou profunda",
      "Preparação para implantes ou lentes",
      "Adolescentes em fase de crescimento",
    ],
    etapas: [
      { titulo: "Documentação", texto: "Radiografias, fotos e escaneamento para estudar o caso." },
      { titulo: "Plano ortodôntico", texto: "Explicamos objetivos, tipo de aparelho e a previsão de tempo." },
      { titulo: "Instalação", texto: "Colagem do aparelho com orientações de higiene e alimentação." },
      { titulo: "Manutenções e contenção", texto: "Ajustes periódicos e, ao final, contenção para manter o resultado." },
    ],
    beneficios: [
      { titulo: "Saúde da mordida", texto: "Menos desgaste e mais conforto ao mastigar." },
      { titulo: "Higiene mais fácil", texto: "Dentes alinhados acumulam menos placa." },
      { titulo: "Opção discreta", texto: "Braquetes cerâmicos quase da cor do dente." },
    ],
    cuidados: [
      "Escovação caprichada após as refeições",
      "Evitar alimentos muito duros ou pegajosos",
      "Não faltar às manutenções para manter o ritmo do tratamento",
    ],
    perguntas: [
      { p: "Existe idade certa para usar aparelho?", r: "Não há idade limite. Em crianças e adolescentes, o crescimento ajuda em algumas correções. Em adultos, o tratamento é igualmente possível e muito comum." },
      { p: "O aparelho incomoda?", r: "Nos primeiros dias é normal sentir pressão nos dentes. Passamos orientações e cera de proteção para deixar a adaptação mais tranquila." },
      { p: "Aparelho fixo ou alinhador?", r: "Os dois funcionam muito bem. A escolha depende do tipo de correção, da rotina e da sua preferência. Na avaliação, mostramos as opções possíveis para o seu caso." },
    ],
  },
  {
    slug: "alinhadores-invisiveis",
    nome: "Alinhadores invisíveis",
    chamada: "Ortodontia discreta que acompanha a sua rotina.",
    resumo:
      "Placas transparentes e removíveis, trocadas em sequência, com o movimento dos dentes planejado em 3D desde o primeiro dia.",
    imagem: "/img/alinhador.webp",
    imagemAlt: "Mulher sorrindo enquanto coloca um alinhador transparente",
    foco: "40% 40%",
    destaque: true,
    fatos: [
      { rotulo: "Visual", valor: "Transparente e discreto" },
      { rotulo: "Rotina", valor: "Removível para comer" },
      { rotulo: "Planejamento", valor: "Simulação 3D do resultado" },
    ],
    introducao: [
      "Os alinhadores são placas transparentes feitas sob medida. Cada conjunto movimenta os dentes um pouco, seguindo um planejamento digital que mostra o resultado esperado antes do início.",
      "Por serem removíveis, você tira para comer e escovar os dentes. É uma alternativa confortável para quem quer alinhar o sorriso sem mudar a rotina profissional e social.",
    ],
    indicacoes: [
      "Adultos que preferem um tratamento discreto",
      "Apinhamentos e espaços leves a moderados",
      "Recidivas de quem já usou aparelho",
      "Quem tem rotina com muitas reuniões e fotos",
    ],
    etapas: [
      { titulo: "Escaneamento 3D", texto: "Sem massa de moldagem: um scanner registra os dentes em minutos." },
      { titulo: "Simulação do tratamento", texto: "Você vê no computador a sequência de movimentos e o resultado previsto." },
      { titulo: "Entrega dos alinhadores", texto: "Orientamos o uso, a troca das placas e os cuidados de limpeza." },
      { titulo: "Acompanhamento", texto: "Consultas periódicas para conferir se tudo segue como o planejado." },
    ],
    beneficios: [
      { titulo: "Quase invisível", texto: "Pouca gente percebe que você está em tratamento." },
      { titulo: "Removível", texto: "Alimentação e higiene sem restrições." },
      { titulo: "Previsível", texto: "Planejamento digital do início ao fim." },
    ],
    cuidados: [
      "Usar as placas pelo tempo diário orientado",
      "Escovar os dentes antes de recolocar os alinhadores",
      "Guardar sempre no estojo para não perder ou deformar",
    ],
    perguntas: [
      { p: "Quanto tempo por dia preciso usar?", r: "O uso é praticamente o dia todo, retirando apenas para comer e fazer a higiene. A disciplina no uso é o que garante o resultado planejado." },
      { p: "Alinhador resolve qualquer caso?", r: "Resolve a maioria dos casos de alinhamento, mas nem todos. Na avaliação, indicamos com honestidade se o alinhador é a melhor opção para você." },
      { p: "Atrapalha a fala?", r: "Pode haver uma leve diferença nos primeiros dias, que costuma desaparecer rapidamente com o uso." },
    ],
  },
  {
    slug: "odontopediatria",
    nome: "Odontopediatria",
    chamada: "Cuidado leve para quem está aprendendo a cuidar.",
    resumo:
      "Atendimento para bebês, crianças e adolescentes, com acolhimento, prevenção e orientação para toda a família.",
    imagem: "/img/odontopediatria.webp",
    imagemAlt: "Menina sorridente sentada em uma cadeira odontológica azul",
    foco: "50% 35%",
    destaque: false,
    fatos: [
      { rotulo: "Idade", valor: "Desde os primeiros dentes" },
      { rotulo: "Foco", valor: "Prevenção e acolhimento" },
      { rotulo: "Família", valor: "Orientação para os pais" },
    ],
    introducao: [
      "A primeira experiência com o dentista marca a relação da criança com a saúde bucal. Por isso, o atendimento infantil na Cliniz é feito sem pressa, com linguagem adequada e muito acolhimento.",
      "Cuidamos da prevenção, das restaurações e do acompanhamento do crescimento, e orientamos os pais sobre escovação, alimentação e hábitos como chupeta e mamadeira.",
    ],
    indicacoes: [
      "Primeira consulta do bebê",
      "Prevenção de cáries com flúor e selantes",
      "Tratamento de cáries em dentes de leite",
      "Acompanhamento da troca dos dentes",
    ],
    etapas: [
      { titulo: "Ambientação", texto: "A criança conhece o espaço e a equipe antes de qualquer procedimento." },
      { titulo: "Exame lúdico", texto: "Avaliação com calma, explicando cada passo de um jeito simples." },
      { titulo: "Prevenção", texto: "Limpeza, aplicação de flúor e selantes quando indicados." },
      { titulo: "Orientação aos pais", texto: "Dicas práticas de higiene e alimentação para o dia a dia." },
    ],
    beneficios: [
      { titulo: "Relação positiva", texto: "Menos medo de dentista ao longo da vida." },
      { titulo: "Prevenção real", texto: "Problemas identificados cedo, com tratamentos simples." },
      { titulo: "Família junto", texto: "Pais participam e entendem cada etapa." },
    ],
    cuidados: [
      "Escovação supervisionada até a criança ganhar autonomia",
      "Atenção ao consumo de açúcar entre as refeições",
      "Consultas de rotina conforme a orientação do dentista",
    ],
    perguntas: [
      { p: "Quando levar a criança ao dentista pela primeira vez?", r: "O ideal é logo após o nascimento dos primeiros dentes. A consulta é leve e ajuda os pais com orientações desde o início." },
      { p: "E se meu filho tiver medo?", r: "É comum e respeitamos o tempo de cada criança. A ambientação e a conversa vêm antes dos procedimentos." },
      { p: "Os pais podem acompanhar?", r: "Sim. A presença de um responsável costuma trazer segurança, e combinamos juntos a melhor forma de conduzir a consulta." },
    ],
  },
  {
    slug: "prevencao-e-limpeza",
    nome: "Prevenção e limpeza",
    chamada: "A base de qualquer sorriso saudável.",
    resumo:
      "Consulta de rotina com profilaxia, avaliação da gengiva e orientação de higiene, para evitar problemas antes que eles comecem.",
    imagem: "/img/limpeza.webp",
    imagemAlt: "Dentista realizando limpeza nos dentes de uma paciente",
    foco: "50% 40%",
    destaque: false,
    fatos: [
      { rotulo: "Inclui", valor: "Exame, limpeza e orientação" },
      { rotulo: "Gengiva", valor: "Avaliação periodontal" },
      { rotulo: "Frequência", valor: "Indicada caso a caso" },
    ],
    introducao: [
      "A consulta de prevenção é o momento de cuidar do que ainda não dói. Removemos placa e tártaro, avaliamos a saúde da gengiva e conferimos restaurações, sempre com delicadeza.",
      "Também revisamos a sua rotina de higiene e indicamos escovas, fios e produtos que façam sentido para você. Pequenos ajustes fazem uma grande diferença.",
    ],
    indicacoes: [
      "Todas as idades, como rotina",
      "Sangramento ao escovar ou usar fio",
      "Mau hálito ou sensação de tártaro",
      "Quem usa aparelho, implantes ou lentes",
    ],
    etapas: [
      { titulo: "Exame clínico", texto: "Avaliação de dentes, gengiva, mucosas e restaurações." },
      { titulo: "Profilaxia", texto: "Remoção de placa e tártaro com instrumentos delicados." },
      { titulo: "Polimento", texto: "Superfícies lisas, que acumulam menos placa." },
      { titulo: "Plano de cuidado", texto: "Orientações personalizadas e próximo retorno combinado." },
    ],
    beneficios: [
      { titulo: "Menos tratamentos", texto: "Problemas detectados cedo são mais simples de resolver." },
      { titulo: "Gengiva saudável", texto: "Controle da inflamação e do sangramento." },
      { titulo: "Hálito fresco", texto: "Boca limpa e sensação de bem-estar." },
    ],
    cuidados: [
      "Escovar os dentes pelo menos duas vezes ao dia",
      "Usar fio dental ou escova interdental diariamente",
      "Manter as consultas de rotina na frequência indicada",
    ],
    perguntas: [
      { p: "A limpeza desgasta os dentes?", r: "Não. A profilaxia remove placa e tártaro sem desgastar o esmalte. O polimento final deixa a superfície lisa." },
      { p: "De quanto em quanto tempo devo voltar?", r: "Depende da sua saúde bucal. Para muitas pessoas, a cada seis meses é suficiente. Quem tem gengiva sensível ou usa aparelho pode precisar de intervalos menores." },
      { p: "A limpeza dói?", r: "Em geral é tranquila. Se houver sensibilidade, ajustamos a técnica e podemos usar anestesia tópica para mais conforto." },
    ],
  },
];

export function getTratamento(slug: string) {
  return TRATAMENTOS.find((t) => t.slug === slug);
}

export const OUTRAS_ESPECIALIDADES = [
  "Clínica geral",
  "Endodontia (tratamento de canal)",
  "Periodontia",
  "Próteses sobre dente e implante",
  "Placas para bruxismo",
  "Restaurações estéticas",
];
