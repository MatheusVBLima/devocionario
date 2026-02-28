export type RosarioPrayerStep = {
  titulo: string
  descricao: string
  reflexao: string
  oracao: string
}

export type RosarioMystery = {
  id: string
  nome: string
  descricao: string
  dias: string
  misteriosDetalhados: RosarioPrayerStep[]
}

export const rosarioMysteries: RosarioMystery[] = [
  {
    id: "gloriosos",
    nome: "Mistérios Gloriosos",
    descricao:
      "Celebram a vitória de Jesus sobre a morte e a glorificação de Nossa Senhora.",
    dias: "Quartas e Domingos",
    misteriosDetalhados: [
      {
        titulo: "A Ressurreição de Jesus",
        descricao: "Jesus ressuscita glorioso, vencendo a morte e o pecado.",
        reflexao:
          "A ressurreição de Jesus é o fundamento da fé cristã e da esperança na vida eterna.",
        oracao:
          "Senhor Jesus, que pela ressurreição nos destes vida nova, fortalecei a nossa esperança.",
      },
      {
        titulo: "A Ascensão de Jesus ao Céu",
        descricao: "Jesus sobe ao céu para preparar um lugar para nós.",
        reflexao:
          "A ascensão recorda que o nosso destino final está em Deus e que a vida cristã tem horizonte eterno.",
        oracao:
          "Senhor Jesus, elevai o nosso coração às realidades do céu e sustentai nossa perseverança.",
      },
      {
        titulo: "A Vinda do Espírito Santo",
        descricao:
          "O Espírito Santo desce sobre os apóstolos, fortalecendo a missão da Igreja.",
        reflexao:
          "O Espírito Santo ilumina, consola e envia cada fiel a testemunhar o Evangelho.",
        oracao:
          "Vinde, Espírito Santo, acendei em nós o fogo do vosso amor e renovai a face da Terra.",
      },
      {
        titulo: "A Assunção de Nossa Senhora",
        descricao: "Maria é elevada ao céu em corpo e alma.",
        reflexao:
          "A Assunção aponta para a vocação de todos os que permanecem fiéis a Cristo.",
        oracao:
          "Maria, elevada ao céu, intercedei por nós e conduzi-nos à santidade.",
      },
      {
        titulo: "A Coroação de Nossa Senhora",
        descricao: "Maria é coroada Rainha do céu e da terra.",
        reflexao:
          "A realeza de Maria manifesta sua proximidade com Deus e sua intercessão materna em favor da Igreja.",
        oracao:
          "Maria, Rainha do céu e da terra, rogai por nós e ajudai-nos a permanecer fiéis.",
      },
    ],
  },
  {
    id: "dolorosos",
    nome: "Mistérios Dolorosos",
    descricao: "Meditam os sofrimentos de Jesus durante sua Paixão.",
    dias: "Terças e Sextas",
    misteriosDetalhados: [
      {
        titulo: "A Agonia de Jesus no Horto",
        descricao: "Jesus reza no Getsêmani e aceita a vontade do Pai.",
        reflexao:
          "No horto, Cristo ensina a rezar com confiança e obediência mesmo na provação.",
        oracao:
          "Senhor Jesus, dai-nos coragem para aceitar a vontade do Pai com humildade e amor.",
      },
      {
        titulo: "A Flagelação de Jesus",
        descricao: "Jesus sofre por amor a toda a humanidade.",
        reflexao:
          "A flagelação recorda o preço da redenção e convida à conversão do coração.",
        oracao:
          "Jesus manso e humilde, curai nossas feridas e ensinai-nos a amar como vós.",
      },
      {
        titulo: "A Coroação de Espinhos",
        descricao: "Jesus é humilhado e coroado como rei de zombaria.",
        reflexao:
          "Cristo transforma a humilhação em entrega amorosa e revela a realeza da cruz.",
        oracao:
          "Senhor Jesus, ajudai-nos a suportar humilhações com mansidão e fidelidade.",
      },
      {
        titulo: "Jesus carrega a Cruz",
        descricao: "Cristo segue para o Calvário levando a cruz.",
        reflexao:
          "No caminho do Calvário aprendemos que a cruz, unida a Cristo, torna-se caminho de salvação.",
        oracao:
          "Senhor Jesus, fortalecei-nos nas cruzes de cada dia e fazei-nos perseverantes.",
      },
      {
        titulo: "A Crucificação e Morte de Jesus",
        descricao: "Jesus oferece a própria vida pela salvação do mundo.",
        reflexao:
          "Na cruz se revela o amor extremo de Deus, que entrega o Filho para nossa redenção.",
        oracao:
          "Senhor Jesus crucificado, atraí-nos ao vosso coração e concedei-nos amor fiel até o fim.",
      },
    ],
  },
  {
    id: "gozosos",
    nome: "Mistérios Gozosos",
    descricao: "Contemplam a alegria da encarnação e infância de Jesus.",
    dias: "Segundas e Sábados",
    misteriosDetalhados: [
      {
        titulo: "A Anunciação do Anjo a Nossa Senhora",
        descricao: "Maria acolhe com fé o anúncio do anjo Gabriel.",
        reflexao:
          "Maria ensina a disponibilidade total à vontade de Deus e a confiança na graça.",
        oracao:
          "Maria, ajudai-nos a responder com fidelidade ao chamado do Senhor.",
      },
      {
        titulo: "A Visitação de Nossa Senhora a Isabel",
        descricao: "Maria visita Isabel e leva Cristo em seu ventre.",
        reflexao:
          "A visitação revela a caridade de Maria e a alegria que brota da presença de Jesus.",
        oracao:
          "Maria, fazei-nos servidores atentos e disponíveis às necessidades dos irmãos.",
      },
      {
        titulo: "O Nascimento de Jesus",
        descricao: "Jesus nasce em Belém para a salvação do mundo.",
        reflexao:
          "O presépio manifesta a humildade do Verbo encarnado e convida à adoração.",
        oracao:
          "Menino Jesus, nascei em nosso coração e renovai nossa vida.",
      },
      {
        titulo: "A Apresentação de Jesus no Templo",
        descricao: "Maria e José apresentam Jesus ao Senhor.",
        reflexao:
          "A apresentação recorda a entrega da vida a Deus e a obediência confiante da Sagrada Família.",
        oracao:
          "Senhor, ensinai-nos a oferecer tudo com generosidade e confiança.",
      },
      {
        titulo: "O Encontro de Jesus no Templo",
        descricao: "Jesus é encontrado entre os doutores da Lei.",
        reflexao:
          "Buscar Jesus e permanecer com Ele é a prioridade fundamental da vida cristã.",
        oracao:
          "Senhor Jesus, atraí-nos sempre para as coisas do Pai e guardai-nos em vossa presença.",
      },
    ],
  },
  {
    id: "luminosos",
    nome: "Mistérios Luminosos",
    descricao: "Contemplam a vida pública de Jesus e seu ministério.",
    dias: "Quintas",
    misteriosDetalhados: [
      {
        titulo: "O Batismo de Jesus no Jordão",
        descricao: "Jesus é batizado e manifesta sua missão.",
        reflexao:
          "O batismo de Cristo ilumina a dignidade do próprio batismo e a vida de filhos de Deus.",
        oracao:
          "Senhor Jesus, renovai em nós a graça do batismo e a fidelidade ao Evangelho.",
      },
      {
        titulo: "As Bodas de Caná",
        descricao: "Jesus realiza o primeiro sinal por intercessão de Maria.",
        reflexao:
          "Caná revela a mediação materna de Maria e a ação transformadora de Cristo.",
        oracao:
          "Jesus, transformai nossa pobreza em confiança e alegria no vosso amor.",
      },
      {
        titulo: "O Anúncio do Reino de Deus",
        descricao: "Jesus anuncia o Reino e chama à conversão.",
        reflexao:
          "O Reino cresce onde há conversão, escuta da Palavra e caridade concreta.",
        oracao:
          "Senhor, convertei nosso coração e tornai-nos testemunhas do vosso Reino.",
      },
      {
        titulo: "A Transfiguração de Jesus",
        descricao: "Jesus manifesta sua glória no monte Tabor.",
        reflexao:
          "A transfiguração fortalece a fé e prepara os discípulos para o escândalo da cruz.",
        oracao:
          "Senhor Jesus, ilumina-nos com a vossa luz e sustentai-nos nas provações.",
      },
      {
        titulo: "A Instituição da Eucaristia",
        descricao: "Jesus se oferece como alimento de vida eterna.",
        reflexao:
          "Na Eucaristia, Cristo permanece conosco e alimenta a Igreja com seu Corpo e Sangue.",
        oracao:
          "Jesus eucarístico, sede o centro de nossa vida e o alimento de nossa alma.",
      },
    ],
  },
] as const

export function getRosarioMystery(id: string) {
  return rosarioMysteries.find((mystery) => mystery.id === id)
}
