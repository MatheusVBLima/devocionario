export type BlogPost = {
  id: number
  title: string
  summary: string
  date: string
  author: string
  category: string
  image: string | null
  tags: string[]
  contentHtml?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Papa Francisco convoca Jubileu de 2025 com o tema "Peregrinos de Esperança"',
    summary:
      "O Vaticano divulgou detalhes sobre o próximo Ano Santo que atrairá milhões de peregrinos a Roma.",
    date: "15 de março de 2024",
    author: "Redação",
    category: "Vaticano",
    image: null,
    tags: ["Jubileu", "Papa Francisco", "Vaticano", "Peregrinação", "Ano Santo"],
    contentHtml: `
      <p>O Papa Francisco anunciou oficialmente que o Jubileu de 2025 terá como tema “Peregrinos de Esperança”, convidando a Igreja a renovar a esperança em tempos de crise e incerteza.</p>
      <p>Segundo o Vaticano, o Ano Santo será um tempo de oração, peregrinação, conversão e redescoberta da misericórdia de Deus. A proposta é que dioceses do mundo inteiro promovam celebrações e iniciativas locais, além das grandes celebrações em Roma.</p>
      <p>Os preparativos incluem reformas em importantes basílicas e organização de acolhimento para peregrinos. A abertura oficial ocorrerá com a abertura da Porta Santa da Basílica de São Pedro.</p>
    `,
  },
  {
    id: 2,
    title: "Concluído importante trabalho de restauração na Basílica da Natividade em Belém",
    summary:
      "Após 10 anos de trabalho, a histórica igreja construída sobre o local de nascimento de Jesus voltou a revelar detalhes antes ocultos.",
    date: "12 de março de 2024",
    author: "Redação",
    category: "Terra Santa",
    image: null,
    tags: ["Terra Santa", "Belém", "Restauração", "Basílica da Natividade", "Patrimônio"],
    contentHtml: `
      <p>A Basílica da Natividade, em Belém, concluiu um extenso processo de restauração que revelou mosaicos, estruturas e detalhes históricos antes encobertos pelo tempo.</p>
      <p>O trabalho envolveu especialistas de diferentes países e destacou o valor espiritual, artístico e cultural do santuário para toda a tradição cristã.</p>
      <p>A expectativa é que a restauração fortaleça ainda mais a peregrinação à Terra Santa e contribua para a preservação desse patrimônio de valor universal.</p>
    `,
  },
  {
    id: 3,
    title: "Anunciadas duas novas canonizações para outubro",
    summary:
      "Foram divulgadas as datas para novas canonizações, reforçando o testemunho de santidade na vida da Igreja.",
    date: "8 de março de 2024",
    author: "Redação",
    category: "Santos",
    image: null,
    tags: ["Canonizações", "Santos", "Igreja"],
  },
  {
    id: 4,
    title: "Como se preparar espiritualmente para o Jubileu de 2025",
    summary:
      "Orientações práticas para viver o Ano Santo com oração, penitência e esperança cristã.",
    date: "5 de março de 2024",
    author: "Pe. Carlos Oliveira",
    category: "Espiritualidade",
    image: null,
    tags: ["Jubileu", "Espiritualidade", "Preparação"],
  },
  {
    id: 5,
    title: "Diocese promove romaria ao Santuário Nacional de Aparecida",
    summary:
      "Fiéis participarão de uma peregrinação anual ao maior santuário mariano do Brasil.",
    date: "28 de fevereiro de 2024",
    author: "Colaboradores",
    category: "Brasil",
    image: null,
    tags: ["Romaria", "Aparecida", "Brasil"],
  },
  {
    id: 6,
    title: "Documentário sobre vida monástica recebe prêmio internacional",
    summary:
      "Produção dedicada ao cotidiano monástico foi reconhecida por sua profundidade espiritual e qualidade estética.",
    date: "22 de fevereiro de 2024",
    author: "Redação",
    category: "Cultura",
    image: null,
    tags: ["Documentário", "Vida Monástica", "Cultura"],
  },
  {
    id: 7,
    title: "Peregrinações quaresmais ganham força em comunidades do interior",
    summary:
      "Paróquias e movimentos locais intensificam caminhadas penitenciais e momentos comunitários de oração.",
    date: "20 de fevereiro de 2024",
    author: "Redação",
    category: "Espiritualidade",
    image: null,
    tags: ["Quaresma", "Peregrinação", "Comunidade"],
  },
  {
    id: 8,
    title: "Nova iniciativa catequética busca aproximar jovens da vida sacramental",
    summary:
      "Projeto propõe formação acessível e acompanhamento pastoral para adolescentes e jovens adultos.",
    date: "18 de fevereiro de 2024",
    author: "Colaboradores",
    category: "Formação",
    image: null,
    tags: ["Catequese", "Jovens", "Sacramentos"],
  },
  {
    id: 9,
    title: "Mosteiro brasileiro amplia programa de retiros espirituais",
    summary:
      "Casa religiosa passa a oferecer novos períodos de recolhimento e silêncio para leigos.",
    date: "14 de fevereiro de 2024",
    author: "Redação",
    category: "Brasil",
    image: null,
    tags: ["Retiro", "Mosteiro", "Silêncio"],
  },
  {
    id: 10,
    title: "A importância da leitura espiritual na rotina católica",
    summary:
      "Diretores espirituais reforçam o valor de uma leitura diária que alimente a oração e a vida interior.",
    date: "11 de fevereiro de 2024",
    author: "Pe. Carlos Oliveira",
    category: "Espiritualidade",
    image: null,
    tags: ["Leitura Espiritual", "Rotina Católica", "Oração"],
  },
  {
    id: 11,
    title: "Comunidades retomam encontros de formação bíblica em pequenos grupos",
    summary:
      "A proposta reúne estudo da Escritura, partilha e aprofundamento da fé em ambiente comunitário.",
    date: "7 de fevereiro de 2024",
    author: "Colaboradores",
    category: "Formação",
    image: null,
    tags: ["Bíblia", "Comunidade", "Formação"],
  },
  {
    id: 12,
    title: "Santuários registram aumento de visitantes em datas marianas",
    summary:
      "Locais de devoção mariana têm recebido mais peregrinos em celebrações especiais ao longo do ano.",
    date: "2 de fevereiro de 2024",
    author: "Redação",
    category: "Brasil",
    image: null,
    tags: ["Santuários", "Maria", "Peregrinação"],
  },
] as const

export function getBlogPostById(id: number) {
  return blogPosts.find((post) => post.id === id)
}

export function getBlogPostContent(post: BlogPost) {
  return (
    post.contentHtml ??
    `<p>${post.summary}</p><p>Este conteúdo faz parte do acervo editorial do Devocionário e será ampliado em futuras atualizações do projeto.</p>`
  )
}
