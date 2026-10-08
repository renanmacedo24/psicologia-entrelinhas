import HeroScene from "./HeroScene";
import { ArgentLoopInfiniteSlider } from "@/components/ui/argent-loop-infinite-slider";

const topics = [
  {
    n: "01",
    title: "Ansiedade e autocobrança",
    text: "Quando as preocupações ocupam espaço demais, a terapia pode ajudar você a compreender o que sente e a encontrar outras formas de lidar com o cotidiano.",
  },
  {
    n: "02",
    title: "Relações e limites",
    text: "Um espaço para olhar com cuidado para os vínculos, reconhecer seus limites e perceber o que faz sentido para você.",
  },
  {
    n: "03",
    title: "Mudanças e perdas",
    text: "Escolhas, despedidas e fases novas podem trazer perguntas. Você não precisa ter todas as respostas para começar a conversar.",
  },
];

const steps = [
  ["Você escreve", "Conte brevemente o que está procurando e quais horários costumam funcionar para você."],
  ["Nós conversamos", "A primeira conversa é um momento para conhecer a proposta, tirar dúvidas e perceber se faz sentido continuar."],
  ["Combinamos o caminho", "Se decidir seguir, conversamos sobre formato, frequência e os próximos passos do acompanhamento."],
];

const questions = [
  ["Como funciona a primeira conversa?", "É um encontro inicial para você apresentar o que está vivendo, conhecer a forma de trabalho e tirar dúvidas. Depois, você decide com calma se deseja continuar."],
  ["O atendimento é online ou presencial?", "Há opções online e presencial. No primeiro contato, podemos conversar sobre qual formato combina melhor com sua rotina."],
  ["Qual é a frequência das sessões?", "A frequência é combinada de acordo com o processo e a disponibilidade de cada pessoa. Em muitos acompanhamentos, os encontros são semanais."],
  ["Como saber se a terapia é para mim?", "Você não precisa ter uma resposta pronta. Se algo tem se repetido, pesado ou despertado perguntas, uma primeira conversa pode ajudar a entender o próximo passo."],
];

export default function Home() {
  return (
    <main>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Entrelinhas, início">
          <span className="brand-mark">e<span>.</span></span>
          <span className="brand-name">entrelinhas<small>psicologia &amp; cuidado</small></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#sobre">A terapia</a>
          <a href="#atendimentos">Atendimentos</a>
          <a href="#processo">Como funciona</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <a className="nav-cta" href="#contato">Vamos conversar <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><i /> Um espaço de escuta e cuidado</p>
          <h1 aria-label="Um espaço para falar, no seu tempo.">
            <span className="headline-line" aria-hidden="true"><span className="wave-word">Um espaço</span></span>
            <span className="headline-line" aria-hidden="true"><span className="wave-word">para falar,</span></span>
            <span className="headline-line" aria-hidden="true"><em className="wave-word">no seu tempo.</em></span>
          </h1>
          <p className="hero-text">A psicoterapia é um encontro para acolher o que você sente, compreender sua história e abrir caminhos possíveis, com respeito ao seu ritmo.</p>
          <a className="button" href="#contato">Dê o primeiro passo <span aria-hidden="true">↗</span></a>
          <p className="hero-note"><span aria-hidden="true">✳</span> Atendimento online e presencial</p>
        </div>
        <HeroScene />
        <div className="hero-index" aria-hidden="true">01 <span>—</span> 03</div>
      </section>

      <section className="intro" id="sobre">
        <p className="eyebrow"><i /> Sobre a terapia</p>
        <div>
          <h2>Você não precisa<br />ter tudo <em>organizado.</em></h2>
          <p className="intro-text">Às vezes, o começo é simplesmente poder falar. Na terapia, sua experiência encontra uma escuta atenta e respeitosa. Aos poucos, podemos olhar para o que pesa, reconhecer o que você precisa e construir novos sentidos.</p>
          <a className="text-link" href="#atendimentos">Conheça as possibilidades <span aria-hidden="true">→</span></a>
        </div>
        <div className="intro-asterisk" aria-hidden="true">✳</div>
      </section>

      <section className="approach" id="temas">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><i /> Quando procurar terapia</p>
            <h2>Um processo<br />construído <em>com você.</em></h2>
          </div>
          <p className="section-side">Sua história importa.<br />O caminho começa por você.</p>
        </div>
        <div className="topic-list">
          {topics.map((topic) => (
            <article className="topic" key={topic.n}>
              <span className="topic-number">{topic.n}</span>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
              <span className="topic-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
        <p className="approach-foot">Não há respostas prontas. A terapia é um espaço para escutar o que faz sentido para você.</p>
      </section>

      <section className="services" id="atendimentos" aria-labelledby="services-title">
        <div className="services-heading">
          <p className="eyebrow"><i /> Modalidades de cuidado</p>
          <h2 id="services-title">O atendimento acompanha aquilo que você está vivendo.</h2>
          <p>Explore alguns temas e formatos de acompanhamento.</p>
        </div>
        <ArgentLoopInfiniteSlider />
      </section>

      <section className="process" id="processo">
        <div className="process-intro">
          <p className="eyebrow"><i /> O começo, sem complicação</p>
          <h2>Uma conversa<br />de cada vez.</h2>
          <p>Você pode tirar suas dúvidas antes de decidir. Se fizer sentido continuar, construímos os combinados em conjunto.</p>
        </div>
        <ol>
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span className="process-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="process-arrow" aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="principles" aria-label="Princípios do acompanhamento">
        <span className="principles-mark" aria-hidden="true">✳</span>
        <blockquote>“Cuidado também é poder falar sem precisar ter tudo resolvido.”</blockquote>
        <p>Escuta ética, sigilo e respeito ao seu ritmo.</p>
      </section>

      <section className="faq" id="duvidas" aria-labelledby="faq-title">
        <div>
          <p className="eyebrow"><i /> Dúvidas comuns</p>
          <h2 id="faq-title">Antes de começar, é natural ter perguntas.</h2>
        </div>
        <div className="faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-orbit orbit-one" aria-hidden="true" />
        <div className="contact-orbit orbit-two" aria-hidden="true" />
        <p className="eyebrow"><i /> Quando você quiser</p>
        <h2>Podemos começar<br />com uma <em>conversa.</em></h2>
        <p>Quer saber como funciona o acompanhamento? Escreva para tirar suas dúvidas e contar, se quiser, o que trouxe você até aqui.</p>
        <a className="button button-light" href="mailto:oi@entrelinhaspsicologia.com.br?subject=Quero%20conversar">Escreva para mim <span aria-hidden="true">↗</span></a>
        <span className="contact-note">Você pode começar com uma mensagem.</span>
      </section>

      <footer className="footer">
        <a className="brand brand-footer" href="#inicio">
          <span className="brand-mark">e<span>.</span></span>
          <span className="brand-name">entrelinhas<small>psicologia &amp; cuidado</small></span>
        </a>
        <p>Um espaço de escuta, no seu tempo.</p>
        <div className="footer-meta">
          <span>© 2026 Entrelinhas Psicologia</span>
          <span>Atendimento online e presencial</span>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
    </main>
  );
}
