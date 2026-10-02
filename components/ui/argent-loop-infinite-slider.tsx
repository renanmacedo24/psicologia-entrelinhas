"use client";

import * as React from "react";
import "./argent-loop-infinite-slider.css";

interface CareMode { title: string; image: string; category: string; format: string; description: string; }

const CARE_MODES: CareMode[] = [
  { title: "Psicoterapia individual", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85", category: "Um espaço só seu", format: "Online ou presencial", description: "Para olhar com mais clareza para sentimentos, relações e escolhas que pedem atenção." },
  { title: "Ansiedade e autocobrança", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=85", category: "Ritmos que cansam", format: "Psicoterapia individual", description: "Quando a mente não desliga, a terapia pode ajudar a reconhecer gatilhos e encontrar outras formas de atravessar o dia." },
  { title: "Relacionamentos", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85", category: "Vínculos em movimento", format: "Individual ou casal", description: "Conversas para compreender padrões, conflitos e o que cada relação desperta em você." },
  { title: "Lutos e transições", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85", category: "Quando a vida muda", format: "Psicoterapia individual", description: "Mudanças, despedidas e novos começos merecem tempo, linguagem e companhia qualificada." },
  { title: "Atendimento online", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85", category: "Cuidado onde você estiver", format: "Por videochamada", description: "A mesma escuta clínica em um formato que se encaixa melhor na sua rotina e no seu lugar." },
];

export function ArgentLoopInfiniteSlider() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const touchStartX = React.useRef<number | null>(null);
  const item = CARE_MODES[activeIndex];
  const move = (direction: number) => setActiveIndex((index) => Math.max(0, Math.min(CARE_MODES.length - 1, index + direction)));

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  };
  const onTouchStart = (event: React.TouchEvent) => { touchStartX.current = event.touches[0].clientX; };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) > 44) move(distance > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  return (
    <section className="argent-slider" tabIndex={0} onKeyDown={onKeyDown} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} aria-roledescription="carrossel" aria-label="Modalidades de atendimento">
      <div className="argent-slider__stage"><img key={item.image} src={item.image} alt="" /><div className="argent-slider__veil" /></div>
      <div className="argent-slider__details" aria-live="polite"><div className="argent-slider__detail" key={item.title}>
        <p className="argent-slider__number">{String(activeIndex + 1).padStart(2, "0")} <span>/ {String(CARE_MODES.length).padStart(2, "0")}</span></p>
        <p className="argent-slider__category">{item.category}</p><h3>{item.title}</h3><p className="argent-slider__description">{item.description}</p><p className="argent-slider__format">{item.format}</p>
      </div></div>
      <div className="argent-slider__navigation" aria-label="Navegação das modalidades">
        <button type="button" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Ver modalidade anterior">Anterior</button>
        <div className="argent-slider__dots" aria-hidden="true">{CARE_MODES.map((mode, index) => <span className={index === activeIndex ? "is-active" : ""} key={mode.title} />)}</div>
        <button type="button" onClick={() => move(1)} disabled={activeIndex === CARE_MODES.length - 1} aria-label="Ver próxima modalidade">Próxima</button>
      </div>
    </section>
  );
}
