import { ArrowDown, ArrowUpRight, CircleCheck, HeartHandshake, MessageCircle, MoveRight } from "lucide-react";
import { ArgentLoopInfiniteSlider } from "@/components/ui/argent-loop-infinite-slider";

const reasons = [
  ["Ansiedade e exaustão", "Quando a urgência tomou conta dos seus dias e descansar deixou de ser simples."],
  ["Relações que doem", "Quando um vínculo pede limites, conversa, despedida ou uma nova forma de existir."],
  ["Mudanças de rota", "Quando uma perda, uma escolha ou uma fase nova faz você se perguntar por onde começar."],
];
const steps = [
  ["Você escreve", "Conte brevemente o que está procurando e quais horários costumam funcionar."],
  ["Nós conversamos", "A primeira conversa é um momento para conhecer a proposta e perceber se faz sentido para você."],
  ["O processo começa", "Definimos frequência, formato e combinados para que o cuidado tenha continuidade."],
];
const questions = [
  ["Como funciona a primeira conversa?", "É um encontro inicial para você apresentar o que está vivendo, conhecer a forma de trabalho e tirar dúvidas. Não há compromisso de continuidade."],
  ["O atendimento é online ou presencial?", "As duas modalidades estão disponíveis. No contato inicial, avaliamos qual delas faz mais sentido para a sua rotina e necessidade."],
  ["Qual é a frequência das sessões?", "Em geral, os encontros são semanais. Essa frequência pode ser conversada ao longo do processo, respeitando o momento de cada pessoa."],
  ["Como faço para saber se a terapia é para mim?", "Você não precisa ter uma resposta pronta. Se algo tem se repetido, machucado ou pedido espaço, a primeira conversa pode ajudar a compreender o próximo passo."],
];

export default function Home() {
  return <main>
    <section className="intro-hero" id="inicio">
      <header className="site-header"><a className="wordmark" href="#inicio" aria-label="Entrelinhas, página inicial"><span>e</span> entrelinhas</a><nav aria-label="Navegação principal"><a href="#atendimentos">Atendimentos</a><a href="#processo">Como funciona</a><a href="#sobre">Sobre</a></nav><a className="header-cta" href="#contato">Agendar conversa <ArrowUpRight size={16} /></a></header>
      <div className="hero-guides" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero-main"><div className="hero-left"><span className="hero-meta">Psicologia clínica</span><strong>PSICO</strong><p>Escuta com tempo<br />e presença.</p></div><div className="hero-center" aria-hidden="true"><div className="center-orbit orbit-a" /><div className="center-orbit orbit-b" /><div className="center-face"><i /><b /><em /></div><span>cuidar também<br />é se escutar</span></div><div className="hero-right"><span className="hero-meta">Online e presencial</span><strong>LOGIA</strong><p>Um caminho que<br />começa por você.</p></div></div>
      <a className="hero-scroll" href="#sobre">Conheça meu trabalho <ArrowDown size={17} /></a>
    </section>

    <section className="about-section" id="sobre"><div><p className="section-index">O que acontece aqui</p><h1>Nem tudo precisa fazer sentido <em>agora.</em></h1></div><div className="about-copy"><p>A psicoterapia oferece uma pausa para olhar com mais atenção para a própria história. Não para encontrar uma versão ideal de si, mas para construir relações mais honestas com o que você sente.</p><a href="#contato">Marcar uma primeira conversa <MoveRight size={18} /></a></div></section>
    <section className="reasons-section"><div className="reasons-title"><p className="section-index">Quando procurar terapia</p><h2>Há momentos em que falar com alguém muda a forma de atravessar o que está acontecendo.</h2></div><div className="reason-list">{reasons.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={20} /></article>)}</div></section>
    <section className="services-section" id="atendimentos"><div className="services-heading"><p className="section-index">Modalidades de cuidado</p><h2>O atendimento acompanha aquilo que você está vivendo.</h2><p>Deslize ou role dentro da seção para explorar.</p></div><ArgentLoopInfiniteSlider /></section>
    <section className="process-section" id="processo"><div className="process-intro"><p className="section-index">O começo, sem complicação</p><h2>Uma conversa de cada vez.</h2><p>O processo é construído em conjunto, com clareza sobre formato, frequência e valores desde o primeiro contato.</p></div><ol>{steps.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><CircleCheck size={20} /></li>)}</ol></section>
    <section className="principles-section"><HeartHandshake size={31} strokeWidth={1.5} /><blockquote>“Cuidado não é uma resposta pronta. É a possibilidade de não atravessar tudo sozinha.”</blockquote><p>Uma clínica com escuta ética, sigilo e respeito ao seu ritmo.</p></section>
    <section className="faq-section" aria-labelledby="faq-title"><div><p className="section-index">Dúvidas comuns</p><h2 id="faq-title">Antes de começar, é natural ter perguntas.</h2></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="contact-section" id="contato"><MessageCircle size={33} strokeWidth={1.4} /><p>Seu primeiro passo pode ser só uma mensagem.</p><h2>Vamos conversar<br />sobre o que você precisa?</h2><a href="mailto:ola@entrelinhas.psi.br">Agendar primeira conversa <ArrowUpRight size={19} /></a><small>Online e presencial · atendimento com hora marcada</small></section>
    <footer><a className="wordmark" href="#inicio"><span>e</span> entrelinhas</a><p>Psicologia clínica</p><p>© 2026</p></footer>
  </main>;
}
