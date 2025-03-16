import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

const oracoesData = [
  {
    id: 1,
    titulo: 'Pai Nosso',
    descricao: 'A oração que Jesus Cristo nos ensinou',
    categoria: 'Básicas',
    icone: '🙏',
    tempo: '1 min',
    tags: ['Fundamental', 'Jesus'],
    texto: `Pai nosso que estais nos céus,
santificado seja o vosso nome,
venha a nós o vosso reino,
seja feita a vossa vontade
assim na terra como no céu.
O pão nosso de cada dia nos dai hoje,
perdoai-nos as nossas ofensas,
assim como nós perdoamos
a quem nos tem ofendido,
e não nos deixeis cair em tentação,
mas livrai-nos do mal.
Amém.`,
    historia: 'O Pai Nosso é a oração que Jesus ensinou aos seus discípulos quando eles lhe pediram que os ensinasse a rezar. Esta oração aparece em duas passagens do Evangelho: no Sermão da Montanha em Mateus (Mt 6,9-13) e em Lucas (Lc 11,2-4). É considerada a oração perfeita, pois foi ensinada pelo próprio Jesus Cristo.',
    origem: 'Evangelho de São Mateus 6,9-13 e Lucas 11,2-4',
    momentos: ['Em qualquer momento do dia', 'No início e no final de outras orações', 'Durante o Santo Rosário'],
    referencias: ['Catecismo da Igreja Católica, 2759-2865']
  },
  {
    id: 2,
    titulo: 'Ave Maria',
    descricao: 'Oração dedicada à Nossa Senhora',
    categoria: 'Básicas',
    icone: '👑',
    tempo: '1 min',
    tags: ['Fundamental', 'Nossa Senhora'],
    texto: `Ave Maria, cheia de graça, 
o Senhor é convosco.
Bendita sois vós entre as mulheres,
e bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus,
rogai por nós, pecadores,
agora e na hora da nossa morte.
Amém.`,
    historia: 'A Ave Maria é composta de duas partes. A primeira parte contém as palavras do Arcanjo Gabriel (Lc 1,28) "Ave, cheia de graça, o Senhor é contigo" e as palavras de Isabel a Maria (Lc 1,42) "Bendita és tu entre as mulheres e bendito é o fruto do teu ventre". A segunda parte da oração foi acrescentada pela Igreja, invocando Maria como "Santa Maria, Mãe de Deus" e pedindo sua intercessão "agora e na hora de nossa morte".',
    origem: 'Evangelho de São Lucas 1,28 e 1,42',
    momentos: ['Na recitação do Santo Rosário', 'No Angelus', 'Em momentos de necessidade'],
    referencias: ['Catecismo da Igreja Católica, 2676-2677']
  },
  {
    id: 3,
    titulo: 'Salve Rainha',
    descricao: 'Antiga oração mariana da tradição católica',
    categoria: 'Marianas',
    icone: '👑',
    tempo: '2 min',
    tags: ['Nossa Senhora', 'Intercessão'],
    texto: `Salve Rainha, Mãe de misericórdia,
vida, doçura, esperança nossa, salve!
A vós bradamos, os degredados filhos de Eva.
A vós suspiramos, gemendo e chorando
neste vale de lágrimas.
Eia, pois, advogada nossa,
esses vossos olhos misericordiosos a nós volvei.
E depois deste desterro,
mostrai-nos Jesus, bendito fruto do vosso ventre.
Ó clemente, ó piedosa, ó doce Virgem Maria.
Rogai por nós, Santa Mãe de Deus,
para que sejamos dignos das promessas de Cristo.
Amém.`,
    historia: 'A Salve Rainha é uma das mais antigas orações marianas da Igreja. Tradicionalmente atribuída a Hermann de Reichenau (1013-1054), foi popularizada pelos monges cistercienses no século XII. São Bernardo de Claraval, grande devoto de Nossa Senhora, acrescentou as últimas invocações: "Ó clemente, ó piedosa, ó doce Virgem Maria".',
    origem: 'Século XI, atribuída a Hermann de Reichenau',
    momentos: ['No fim do Santo Rosário', 'Em momentos de angústia e necessidade', 'Ao final de devoções marianas'],
    referencias: ['Compêndio do Catecismo da Igreja Católica, 198']
  },
  {
    id: 4,
    titulo: 'Credo Apostólico',
    descricao: 'Profissão de fé dos cristãos',
    categoria: 'Básicas',
    icone: '✝️',
    tempo: '2 min',
    tags: ['Fundamental', 'Fé'],
    texto: `Creio em Deus Pai todo-poderoso, 
Criador do céu e da terra;
e em Jesus Cristo, seu único Filho, nosso Senhor;
que foi concebido pelo poder do Espírito Santo;
nasceu da Virgem Maria;
padeceu sob Pôncio Pilatos,
foi crucificado, morto e sepultado;
desceu à mansão dos mortos;
ressuscitou ao terceiro dia;
subiu aos céus;
está sentado à direita de Deus Pai todo-poderoso,
de onde há de vir a julgar os vivos e os mortos.
Creio no Espírito Santo,
na santa Igreja Católica,
na comunhão dos santos,
na remissão dos pecados,
na ressurreição da carne,
na vida eterna.
Amém.`,
    historia: 'O Credo Apostólico é uma das mais antigas profissões de fé cristãs. Embora tradicionalmente atribuído aos Apóstolos, sua forma atual desenvolveu-se gradualmente nos primeiros séculos da Igreja. Foi utilizado como base para o ensino catequético e como profissão de fé batismal.',
    origem: 'Tradição apostólica, séculos I-II',
    momentos: ['Durante a Missa', 'Na recitação do Rosário', 'Como renovação da fé batismal'],
    referencias: ['Catecismo da Igreja Católica, 185-197']
  },
  {
    id: 5,
    titulo: 'Oração a São Miguel Arcanjo',
    descricao: 'Poderosa oração de proteção contra o mal',
    categoria: 'Santos',
    icone: '⚔️',
    tempo: '1 min',
    tags: ['Proteção', 'Anjos'],
    texto: `São Miguel Arcanjo, defendei-nos no combate,
sede o nosso refúgio contra as maldades e ciladas do demônio.
Ordene-lhe Deus, instantemente o pedimos,
e vós, príncipe da milícia celeste,
pela virtude divina, precipitai no inferno a Satanás
e a todos os espíritos malignos
que andam pelo mundo para perder as almas.
Amém.`,
    historia: 'Esta oração foi composta pelo Papa Leão XIII após uma visão alarmante que teve durante uma Missa em 1884. Ele instituiu que esta oração fosse recitada após todas as Missas sem canto, prática que perdurou até as reformas do Concílio Vaticano II. Em 1994, o Papa João Paulo II incentivou os fiéis a recitarem esta oração novamente, destacando sua importância para os tempos atuais.',
    origem: 'Composta pelo Papa Leão XIII em 1884',
    momentos: ['Em momentos de tentação', 'Para proteção espiritual', 'No fim da oração individual'],
    referencias: ['Documentos do Papa Leão XIII', 'Exortações do Papa João Paulo II']
  },
  {
    id: 6,
    titulo: 'Magnificat',
    descricao: 'Cântico de Nossa Senhora',
    categoria: 'Marianas',
    icone: '👑',
    tempo: '2 min',
    tags: ['Nossa Senhora', 'Louvor'],
    texto: `A minha alma engrandece o Senhor
e o meu espírito exulta em Deus, meu Salvador,
porque olhou para a humildade de sua serva.
Doravante todas as gerações me chamarão bem-aventurada.
O Todo-poderoso fez em mim maravilhas
e Santo é o seu nome!
Sua misericórdia se estende, de geração em geração,
sobre os que o temem.
Agiu com a força de seu braço:
dispersou os soberbos de coração.
Derrubou do trono os poderosos
e elevou os humildes.
Encheu de bens os famintos
e despediu os ricos de mãos vazias.
Socorreu Israel, seu servo,
lembrando-se de sua misericórdia,
como tinha prometido a nossos pais,
em favor de Abraão e sua descendência, para sempre.
Glória ao Pai e ao Filho e ao Espírito Santo.
Como era no princípio, agora e sempre. Amém.`,
    historia: 'O Magnificat é o cântico pronunciado por Maria quando visitou sua prima Isabel, que a saudou como "Mãe do meu Senhor". Estas palavras de louvor e gratidão de Maria estão registradas no Evangelho de Lucas e tornaram-se uma das mais belas e profundas orações da tradição cristã, sendo recitadas diariamente nas Vésperas, a oração da tarde na Liturgia das Horas.',
    origem: 'Evangelho de São Lucas 1,46-55',
    momentos: ['Na Liturgia das Horas (Vésperas)', 'Em celebrações marianas', 'Como oração de agradecimento'],
    referencias: ['Catecismo da Igreja Católica, 2619']
  },
  {
    id: 7,
    titulo: 'Ato de Contrição',
    descricao: 'Oração de arrependimento dos pecados',
    categoria: 'Penitenciais',
    icone: '💔',
    tempo: '1 min',
    tags: ['Arrependimento', 'Confissão'],
    texto: `Meu Deus, eu me arrependo de todo o coração
de vos ter ofendido, porque sois tão bom
e amável, e o pecado vos desagrada.
Prometo, com a vossa graça,
fazer todo o possível para não mais pecar
e fugir das ocasiões de pecado.
Senhor Jesus Cristo, que por nós morrestes na cruz,
tende piedade de mim.`,
    historia: 'O Ato de Contrição é uma oração que expressa arrependimento pelos pecados cometidos. É recitada especialmente antes ou durante o Sacramento da Confissão. A contrição perfeita, movida pelo amor a Deus, associada à intenção de se confessar, já obtém o perdão dos pecados mortais.',
    origem: 'Tradição da Igreja',
    momentos: ['No Sacramento da Confissão', 'No exame de consciência diário', 'Em momentos de arrependimento sincero'],
    referencias: ['Catecismo da Igreja Católica, 1451-1454']
  },
  {
    id: 8,
    titulo: 'Angelus',
    descricao: 'Oração que relembra a Anunciação',
    categoria: 'Marianas',
    tempo: '3 min',
    icone: '👼',
    tags: ['Nossa Senhora', 'Tradição'],
    texto: `V. O Anjo do Senhor anunciou a Maria.
R. E ela concebeu do Espírito Santo.

Ave Maria...

V. Eis aqui a serva do Senhor.
R. Faça-se em mim segundo a vossa palavra.

Ave Maria...

V. E o Verbo se fez carne.
R. E habitou entre nós.

Ave Maria...

V. Rogai por nós, santa Mãe de Deus.
R. Para que sejamos dignos das promessas de Cristo.

Oremos: Infundi, Senhor, nós vos pedimos, a vossa graça em nossas almas, para que nós, que pela anunciação do Anjo conhecemos a encarnação de Jesus Cristo, vosso Filho, pela sua paixão e cruz cheguemos à glória da ressurreição. Por Cristo, nosso Senhor. Amém.`,
    historia: 'O Angelus é uma devoção tradicional que comemora a Anunciação, quando o Anjo Gabriel anunciou a Maria que ela conceberia e daria à luz Jesus. Esta oração é tradicionalmente recitada três vezes ao dia: às 6h, ao meio-dia e às 18h, ao som dos sinos das igrejas. O Papa reza o Angelus publicamente todos os domingos ao meio-dia na Praça de São Pedro.',
    origem: 'Século XIII, desenvolveu-se a partir da prática monástica',
    momentos: ['Pela manhã (6h)', 'Ao meio-dia (12h)', 'Ao anoitecer (18h)'],
    referencias: ['Compêndio do Catecismo da Igreja Católica, 546']
  }
];

export default async function OracaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const oracaoId = parseInt(id);
  const oracao = oracoesData.find(o => o.id === oracaoId);
  
  if (!oracao) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Orações', href: '/oracoes' },
    { label: oracao.titulo }
  ];

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <div >
        {/* Botão de voltar */}
        <BreadcrumbNav items={breadcrumbItems} />
        
        {/* Cabeçalho da oração */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl">{oracao.icone}</div>
          <div>
            <h1 className="text-3xl font-bold text-primary">{oracao.titulo}</h1>
            <p className="text-xl text-muted-foreground">{oracao.descricao}</p>
          </div>
        </div>
        
        {/* Tags e categoria */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="text-sm">{oracao.categoria}</Badge>
          <Badge variant="secondary" className="text-sm">{oracao.tempo}</Badge>
          {oracao.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Texto da oração */}
        <Card className="mb-12 bg-primary/5">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Texto da Oração</h2>
            <div className="text-lg whitespace-pre-line leading-relaxed">
              {oracao.texto}
            </div>
          </CardContent>
        </Card>
        
        {/* História */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-primary">História</h2>
          <p className="mb-4">{oracao.historia}</p>
          <p className="text-muted-foreground italic">Origem: {oracao.origem}</p>
        </div>
        
        <Separator className="my-8" />
        
        {/* Quando rezar */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-primary">Quando Rezar</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {oracao.momentos.map((momento, index) => (
              <li key={index}>{momento}</li>
            ))}
          </ul>
        </div>
        
        {/* Referências */}
        {oracao.referencias && oracao.referencias.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-primary">Referências</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {oracao.referencias.map((referencia, index) => (
                <li key={index}>{referencia}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Botão de voltar */}
        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/oracoes">Voltar para todas as orações</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 