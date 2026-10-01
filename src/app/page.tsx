import HeroScene from "./HeroScene";

const topics = [
  {
    n: "01",
    title: "Ansiedade",
    text: "Quando as preocupações ocupam espaço demais, a terapia pode ajudar você a compreender o que sente e a encontrar outras formas de lidar com o cotidiano.",
  },
  {
    n: "02",
    title: "Autoconhecimento",
    text: "Um espaço para reconhecer necessidades, limites e desejos — e perceber quais escolhas fazem sentido para você.",
  },
  {
    n: "03",
    title: "Relações",
    text: "Para olhar com cuidado para os vínculos, os limites e os modos de se relacionar, sem deixar de considerar a si mesma.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Entrelinhas, início">
          <span className="brand-mark">e<span>.</span></span>
          <span className="brand-name">
            entrelinhas<small>psicologia & cuidado</small>
          </span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#sobre">A terapia</a>
          <a href="#abordagem">Como posso ajudar</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="nav-cta" href="#contato">
          Vamos conversar <span>↗</span>
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><i /> Um espaço de escuta e cuidado</p>
          <h1 aria-label="Um espaço para falar, no seu tempo.">
            <span className="headline-line" aria-hidden="true"><span className="wave-word">Um espaço</span></span>
            <span className="headline-line" aria-hidden="true"><span className="wave-word">para falar,</span></span>
            <span className="headline-line" aria-hidden="true"><em className="wave-word">no seu tempo.</em></span>
          </h1>
          <p className="hero-text">
            A psicoterapia é um encontro para acolher o que você sente, compreender sua história e abrir caminhos possíveis — com respeito ao seu ritmo.
          </p>
          <a className="button" href="#contato">Dê o primeiro passo <span>↗</span></a>
          <p className="hero-note"><span>✳</span> Atendimento online e presencial</p>
        </div>
        <HeroScene />
        <div className="hero-index">01 <span>—</span> 03</div>
      </section>

      <section className="intro" id="sobre">
        <p className="eyebrow"><i /> Sobre a terapia</p>
        <div>
          <h2>Você não precisa<br />ter tudo <em>organizado.</em></h2>
          <p className="intro-text">
            Às vezes, o começo é simplesmente poder falar. Na terapia, sua experiência encontra uma escuta atenta e respeitosa. Aos poucos, podemos olhar para o que pesa, reconhecer o que você precisa e construir novos sentidos.
          </p>
          <a className="text-link" href="#abordagem">Conheça as possibilidades <span>→</span></a>
        </div>
        <div className="intro-asterisk" aria-hidden="true">✳</div>
      </section>

      <section className="approach" id="abordagem">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><i /> Como posso acompanhar você</p>
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
        <p className="approach-foot">
          Não há respostas prontas. A terapia é um espaço para escutar o que faz sentido para você.
        </p>
      </section>

      <section className="contact" id="contato">
        <div className="contact-orbit orbit-one" aria-hidden="true" />
        <div className="contact-orbit orbit-two" aria-hidden="true" />
        <p className="eyebrow"><i /> Quando você quiser</p>
        <h2>Podemos começar<br />com uma <em>conversa.</em></h2>
        <p>
          Quer saber como funciona o acompanhamento? Escreva para tirar suas dúvidas e contar, se quiser, o que trouxe você até aqui.
        </p>
        <a className="button button-light" href="mailto:oi@entrelinhaspsicologia.com.br?subject=Quero%20conversar">
          Escreva para mim <span>↗</span>
        </a>
        <span className="contact-note">Você pode começar com uma mensagem.</span>
      </section>

      <footer className="footer">
        <a className="brand brand-footer" href="#inicio">
          <span className="brand-mark">e<span>.</span></span>
          <span className="brand-name">entrelinhas<small>psicologia & cuidado</small></span>
        </a>
        <p>Um espaço de escuta, no seu tempo.</p>
        <div className="footer-meta">
          <span>© 2026 Entrelinhas Psicologia</span>
          <span>Atendimento online e presencial</span>
          <span>Ilustrações: Open Peeps · composição: Kedhareswer · movimento: Skiper UI</span>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
    </main>
  );
}
