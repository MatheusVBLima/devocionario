import { notFound } from 'next/navigation';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

// Dados dos mistérios do Rosário
const misteriosData = {
  'gloriosos': {
    nome: 'Mistérios Gloriosos',
    descricao: 'Celebram a vitória de Jesus sobre a morte e a glorificação de Nossa Senhora.',

    dias: 'Quartas e Domingos',
    misteriosDetalhados: [
      {
        titulo: 'A Ressurreição de Jesus',
        descricao: 'Jesus ressuscita glorioso, vencendo a morte e o pecado.',
        reflexao: 'A ressurreição de Jesus é o fundamento da nossa fé e esperança. Ela nos dá a certeza de que a morte não é o fim.',
        oracao: 'Senhor Jesus, que pela sua ressurreição nos trouxe esperança e vida nova, ajude-nos a ressuscitar diariamente para uma vida de fé e amor.'
      },
      {
        titulo: 'A Ascensão de Jesus ao Céu',
        descricao: 'Jesus sobe ao céu para preparar um lugar para nós.',
        reflexao: 'A ascensão de Jesus nos lembra que nosso destino final é o céu, onde Ele prepara um lugar para cada um de nós.',
        oracao: 'Senhor Jesus, que subiu aos céus, eleve nossos corações e mentes para as realidades celestiais.'
      },
      {
        titulo: 'A Vinda do Espírito Santo',
        descricao: 'O Espírito Santo desce sobre os apóstolos, dando início à missão da Igreja.',
        reflexao: 'O Espírito Santo nos fortalece para a missão, enche-nos de coragem e nos ajuda a compreender as verdades da fé.',
        oracao: 'Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do Vosso amor.'
      },
      {
        titulo: 'A Assunção de Nossa Senhora',
        descricao: 'Maria é elevada ao céu em corpo e alma.',
        reflexao: 'A Assunção de Maria nos mostra o destino final de todos os que seguem fielmente a Cristo: participar da glória celeste.',
        oracao: 'Maria, que foi elevada ao céu, interceda por nós para que também possamos participar da glória celeste.'
      },
      {
        titulo: 'A Coroação de Nossa Senhora',
        descricao: 'Maria é coroada como Rainha do céu e da terra.',
        reflexao: 'A coroação de Maria é a manifestação de sua dignidade singular e de sua intercessão poderosa junto a Deus.',
        oracao: 'Maria, Rainha do céu e da terra, interceda por nós e nos ajude a perseverar no caminho da fé.'
      }
    ]
  },
  'dolorosos': {
    nome: 'Mistérios Dolorosos',
    descricao: 'Meditam os sofrimentos de Jesus durante sua Paixão.',

    dias: 'Terças e Sextas',
    misteriosDetalhados: [
      {
        titulo: 'A Agonia de Jesus no Horto',
        descricao: 'Jesus reza no Jardim das Oliveiras e aceita a vontade do Pai.',
        reflexao: 'Na agonia, Jesus mostra-nos a importância da oração nos momentos de dificuldade e como aceitar a vontade de Deus.',
        oracao: 'Senhor Jesus, que aceitou a vontade do Pai no Horto das Oliveiras, ajude-nos a aceitar as dificuldades da vida com fé.'
      },
      {
        titulo: 'A Flagelação de Jesus',
        descricao: 'Jesus é flagelado pelos soldados romanos.',
        reflexao: 'Na flagelação, Jesus sofre por nossos pecados e nos ensina a suportar as dores com paciência.',
        oracao: 'Senhor Jesus, que sofreu a dor da flagelação por amor a nós, ajude-nos a carregar nossas cruzes diárias.'
      },
      {
        titulo: 'A Coroação de Espinhos',
        descricao: 'Jesus é coroado com espinhos e zombado como rei.',
        reflexao: 'A coroação de espinhos nos lembra as humilhações que Jesus sofreu por nós e como devemos aceitar as humilhações com humildade.',
        oracao: 'Senhor Jesus, que foi humilhado com a coroa de espinhos, ajude-nos a aceitar as humilhações por amor a Vós.'
      },
      {
        titulo: 'Jesus carrega a Cruz',
        descricao: 'Jesus carrega a cruz até o Calvário.',
        reflexao: 'Ao carregar a cruz, Jesus nos mostra que também devemos carregar nossas cruzes com fé e perseverança.',
        oracao: 'Senhor Jesus, que carregou a cruz por amor a nós, ajude-nos a carregar nossas cruzes diárias com amor.'
      },
      {
        titulo: 'A Crucificação e Morte de Jesus',
        descricao: 'Jesus é crucificado e morre na cruz por nossa salvação.',
        reflexao: 'Na crucificação, Jesus dá sua vida por nós, mostrando o amor infinito de Deus pela humanidade.',
        oracao: 'Senhor Jesus, que morreu na cruz por nossos pecados, conceda-nos a graça da perseverança final.'
      }
    ]
  },
  // Adicione outros mistérios...
  'gozosos': {
    nome: 'Mistérios Gozosos',
    descricao: 'Contemplam a alegria da encarnação e infância de Jesus.',

    dias: 'Segundos e Sábados',
    misteriosDetalhados: [
      {
        titulo: 'A Anunciação do Anjo a Nossa Senhora',
        descricao: 'O anjo Gabriel anuncia a Maria que ela será a Mãe de Deus.',
        reflexao: 'Na Anunciação, Maria nos ensina a aceitar a vontade de Deus com fé e disponibilidade.',
        oracao: 'Maria, que aceitou a vontade de Deus na Anunciação, ajude-nos a dizer "sim" ao Senhor.'
      },
      {
        titulo: 'A Visitação de Nossa Senhora a Isabel',
        descricao: 'Maria visita sua prima Isabel, que está grávida de João Batista.',
        reflexao: 'Na Visitação, Maria nos ensina a servir ao próximo com alegria e amor.',
        oracao: 'Maria, que visitou Isabel com caridade, ajude-nos a servir ao próximo com amor.'
      },
      {
        titulo: 'O Nascimento de Jesus',
        descricao: 'Jesus nasce em Belém, trazendo a salvação ao mundo.',
        reflexao: 'No Nascimento de Jesus, contemplamos a humildade de Deus que se faz homem por amor a nós.',
        oracao: 'Jesus, que nasceu em Belém, nasça em nosso coração e traga sua luz ao mundo.'
      },
      {
        titulo: 'A Apresentação de Jesus no Templo',
        descricao: 'Maria e José apresentam Jesus no Templo, cumprindo a Lei.',
        reflexao: 'Na Apresentação, Maria e José nos ensinam a obediência a Deus e o respeito às tradições religiosas.',
        oracao: 'Jesus, que foi apresentado no Templo, ajude-nos a cumprir os mandamentos com fidelidade.'
      },
      {
        titulo: 'O Encontro de Jesus no Templo',
        descricao: 'Jesus, aos 12 anos, é encontrado no Templo, discutindo com os doutores da Lei.',
        reflexao: 'No Encontro no Templo, Jesus nos mostra a importância de buscar as coisas de Deus.',
        oracao: 'Jesus, que foi encontrado no Templo, ajude-nos a colocar Deus em primeiro lugar em nossa vida.'
      }
    ]
  },
  'luminosos': {
    nome: 'Mistérios Luminosos',
    descricao: 'Contemplam a vida pública de Jesus e seu ministério.',

    dias: 'Quintas',
    misteriosDetalhados: [
      {
        titulo: 'O Batismo de Jesus no Jordão',
        descricao: 'Jesus é batizado por João Batista, e o Espírito Santo desce sobre Ele.',
        reflexao: 'No Batismo, Jesus nos mostra a importância de viver como filhos de Deus.',
        oracao: 'Jesus, que foi batizado no Jordão, ajude-nos a viver nosso batismo com fidelidade.'
      },
      {
        titulo: 'As Bodas de Caná',
        descricao: 'Jesus realiza seu primeiro milagre, transformando água em vinho.',
        reflexao: 'Nas Bodas de Caná, Jesus nos mostra sua preocupação com as necessidades humanas e o papel de Maria como intercessora.',
        oracao: 'Jesus, que transformou água em vinho, transforme nosso coração e nossa vida.'
      },
      {
        titulo: 'O Anúncio do Reino de Deus',
        descricao: 'Jesus anuncia o Reino de Deus e convida à conversão.',
        reflexao: 'No anúncio do Reino, Jesus nos chama à conversão e à mudança de vida.',
        oracao: 'Jesus, que anunciou o Reino de Deus, ajude-nos a construir um mundo mais justo e fraterno.'
      },
      {
        titulo: 'A Transfiguração de Jesus',
        descricao: 'Jesus revela sua glória divina aos apóstolos no monte Tabor.',
        reflexao: 'Na Transfiguração, Jesus nos mostra um vislumbre de sua glória e fortalece nossa fé.',
        oracao: 'Jesus, que foi transfigurado no monte Tabor, transforme-nos à sua imagem e semelhança.'
      },
      {
        titulo: 'A Instituição da Eucaristia',
        descricao: 'Jesus institui a Eucaristia na Última Ceia.',
        reflexao: 'Na instituição da Eucaristia, Jesus nos deixa o sacramento de seu Corpo e Sangue como alimento espiritual.',
        oracao: 'Jesus, presente na Eucaristia, seja o centro de nossa vida e o alimento de nossa alma.'
      }
    ]
  }
};

export default async function MisterioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const misterio = misteriosData[id as keyof typeof misteriosData];
  
  if (!misterio) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Santo Rosário', href: '/rosario' },
    { label: misterio.nome }
  ];

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className={`text-4xl font-bold mb-4`}>{misterio.nome}</h1>
      <p className="text-lg text-foreground mb-8">{misterio.descricao}</p>
      <p className="text-sm text-muted-foreground mb-12">Dias recomendados: {misterio.dias}</p>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Como rezar o Rosário</h2>
        <div className="bg-muted p-6 rounded-lg">
          <ol className="list-decimal pl-5 space-y-3">
            <li>Comece com o Sinal da Cruz</li>
            <li>Reze o Credo</li>
            <li>Reze um Pai-Nosso</li>
            <li>Reze três Ave-Marias, pedindo o aumento das virtudes da fé, esperança e caridade</li>
            <li>Reze um Glória ao Pai</li>
            <li>Para cada um dos cinco mistérios:
              <ul className="list-disc pl-8 mt-2">
                <li>Anuncie o mistério</li>
                <li>Reze um Pai-Nosso</li>
                <li>Reze dez Ave-Marias</li>
                <li>Reze um Glória ao Pai</li>
                <li>Reze a oração de Fátima</li>
              </ul>
            </li>
            <li>Finalize com a Salve Rainha e o Sinal da Cruz</li>
          </ol>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mb-6">Os Cinco Mistérios</h2>
      <div className="space-y-8">
        {misterio.misteriosDetalhados.map((detalhe, index) => (
          <div key={index} className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">{`${index + 1}. ${detalhe.titulo}`}</h3>
            <p className="text-foreground mb-4">{detalhe.descricao}</p>
            
            <h4 className="font-medium text-foreground mb-2">Reflexão:</h4>
            <p className="text-muted-foreground mb-4 italic">{detalhe.reflexao}</p>
            
            <h4 className="font-medium text-foreground mb-2">Oração:</h4>
            <p className="text-muted-foreground">{detalhe.oracao}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 