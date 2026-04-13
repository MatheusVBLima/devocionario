import React from "react"
import { Cross, BookOpen, HandHeart, CalendarHeart } from "lucide-react"

export const homeFeatures = [
  {
    icon: <Cross className="size-5" />,
    title: "Santo Rosário",
    description:
      "Explore os mistérios gloriosos, gozosos, luminosos e dolorosos com uma navegação direta e clara.",
    href: "/rosario",
  },
  {
    icon: <BookOpen className="size-5" />,
    title: "Liturgia Diária",
    description:
      "Acompanhe as leituras do dia, salmo, evangelho e orações com uma estrutura pensada para leitura.",
    href: "/liturgia",
  },
  {
    icon: <HandHeart className="size-5" />,
    title: "Orações",
    description:
      "Encontre orações católicas por categoria, com acesso rápido e leitura confortável em qualquer tela.",
    href: "/oracoes",
  },
  {
    icon: <CalendarHeart className="size-5" />,
    title: "Rotina Católica",
    description:
      "Descubra inspirações para a vida espiritual diária e conheça o santo celebrado em cada data.",
    href: "/rotina",
  },
] as const

export const homePartners = [
  {
    name: "Padre Paulo Ricardo",
    description:
      "Padre Paulo Ricardo é um sacerdote católico, escritor e professor universitário brasileiro. Foi ordenado sacerdote no dia 14 de junho de 1992, pelo Papa João Paulo II.",
    image: "/amigo-1.avif",
  },
  {
    name: "Padre Leonardo Wagner",
    description:
      "Sacerdote católico dedicado à evangelização e formação espiritual. Com mais de 20 anos de ministério sacerdotal.",
    image: "/amigo-2.avif",
  },
  {
    name: "Padre José Eduardo",
    description:
      "José Eduardo de Oliveira e Silva O.T.C é um sacerdote católico brasileiro, pároco da Paróquia São Domingos \"O Pregador\" em Osasco, professor e influencer, conhecido por sua atuação virtual.",
    image: "/amigo-3.avif",
  },
  {
    name: "Instituto do Verbo Encarnado",
    description:
      "Uma associação de leigos que buscam a perfeição cristã e compartilham missão e carisma com os membros do Instituto.",
    image: "/amigo-4.avif",
  },
] as const

export const homeTestimonials = [
  {
    name: "Maria Silva",
    text: "Este site tem sido uma bênção para minha vida espiritual. Recomendo a todos.",
  },
  {
    name: "João Oliveira",
    text: "Uso o Devocionário todos os dias para acompanhar a liturgia. Excelente ferramenta.",
  },
  {
    name: "Ana Costa",
    text: "As orações disponíveis me ajudaram muito nos momentos difíceis. Muito obrigada.",
  },
  {
    name: "Carlos Santos",
    text: "O guia do rosário é completo e didático. Ajudou minha família inteira.",
  },
  {
    name: "Pedro Almeida",
    text: "O conteúdo sobre os santos me inspira diariamente. Parabéns pela iniciativa.",
  },
  {
    name: "Lúcia Ferreira",
    text: "Indico para todos os meus amigos do grupo de oração. Material de qualidade.",
  },
] as const

export const homeFaqItems = [
  {
    question: "Como posso rezar o Santo Rosário?",
    answer:
      "Na seção do Santo Rosário há um guia completo com a ordem das orações, os mistérios e reflexões para cada etapa.",
    value: "item-1",
  },
  {
    question: "Como acompanho a liturgia diária?",
    answer:
      "A página de liturgia reúne as leituras do dia, salmo, evangelho, orações e antífonas em uma interface organizada.",
    value: "item-2",
  },
  {
    question: "Posso encontrar orações por tema?",
    answer:
      "Sim. A seção de orações permite navegar por categorias e encontrar rapidamente conteúdos para diferentes momentos da vida espiritual.",
    value: "item-3",
  },
] as const
