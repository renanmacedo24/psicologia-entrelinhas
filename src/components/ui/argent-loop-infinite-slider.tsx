"use client";

import * as React from "react";
import "./argent-loop-infinite-slider.css";

interface CareMode {
  title: string;
  image: string;
  category: string;
  format: string;
  description: string;
}

const CARE_MODES: CareMode[] = [
  {
    title: "Psicoterapia individual",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85",
    category: "Um espaço só seu",
    format: "Online ou presencial",
    description: "Para olhar com mais clareza para sentimentos, relações e escolhas que pedem atenção.",
  },
  {
    title: "Ansiedade e autocobrança",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=85",
    category: "Ritmos que cansam",
    format: "Psicoterapia individual",
    description: "Quando a mente não desliga, a terapia pode ajudar a reconhecer gatilhos e encontrar outras formas de atravessar o dia.",
  },
  {
    title: "Relacionamentos",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85",
    category: "Vínculos em movimento",
    format: "Individual ou casal",
    description: "Conversas para compreender padrões, conflitos e o que cada relação desperta em você.",
  },
  {
    title: "Lutos e transições",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
    category: "Quando a vida muda",
    format: "Psicoterapia individual",
    description: "Mudanças, despedidas e novos começos merecem tempo, linguagem e companhia qualificada.",
  },
  {
    title: "Atendimento online",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    category: "Cuidado onde você estiver",
    format: "Por videochamada",
    description: "A mesma escuta clínica em um formato que se encaixa melhor na sua rotina e no seu lugar.",
  },
];

const numberAt = (index: number) => String(index + 1).padStart(2, "0");

export function ArgentLoopInfiniteSlider() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const pointerStart = React.useRef<{ x: number; y: number } | null>(null);
  const activeMode = CARE_MODES[activeIndex];

  const goTo = React.useCallback((nextIndex: number) => {
    const boundedIndex = Math.max(0, Math.min(CARE_MODES.length - 1, nextIndex));
    if (boundedIndex === activeIndex) return;
    setDirection(boundedIndex > activeIndex ? 1 : -1);
    setActiveIndex(boundedIndex);
  }, [activeIndex]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(CARE_MODES.length - 1);
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
    goTo(activeIndex + (deltaX < 0 ? 1 : -1));
  };

  return (
    <div
      className="argent-slider"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Modalidades de cuidado"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <article
        className={`argent-slider__slide ${direction > 0 ? "is-forward" : "is-backward"}`}
        role="group"
        aria-roledescription="slide"
        aria-label={`${numberAt(activeIndex)} de ${CARE_MODES.length}: ${activeMode.title}`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        <div className="argent-slider__media" aria-hidden="true">
          <img src={activeMode.image} alt="" draggable={false} />
          <span className="argent-slider__image-index">{numberAt(activeIndex)}</span>
        </div>

        <div className="argent-slider__content">
          <p className="argent-slider__category">{activeMode.category}</p>
          <h3>{activeMode.title}</h3>
          <p className="argent-slider__description">{activeMode.description}</p>
          <p className="argent-slider__format">{activeMode.format}</p>
        </div>
      </article>

      <div className="argent-slider__navigation" role="group" aria-label="Navegação das modalidades">
        <button
          className="argent-slider__control"
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label={activeIndex === 0 ? "Você está na primeira modalidade" : `Ver anterior: ${CARE_MODES[activeIndex - 1].title}`}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="argent-slider__progress-wrap">
          <p className="argent-slider__status" aria-live="polite" aria-atomic="true">
            <span aria-hidden="true">{numberAt(activeIndex)} / {String(CARE_MODES.length).padStart(2, "0")}</span>
            <span className="argent-slider__sr-only">{activeMode.title}</span>
          </p>
          <div
            className="argent-slider__progress"
            role="progressbar"
            aria-label="Progresso nas modalidades"
            aria-valuemin={1}
            aria-valuemax={CARE_MODES.length}
            aria-valuenow={activeIndex + 1}
            aria-valuetext={`${activeIndex + 1} de ${CARE_MODES.length}: ${activeMode.title}`}
          >
            <span style={{ transform: `scaleX(${(activeIndex + 1) / CARE_MODES.length})` }} />
          </div>
          <p className="argent-slider__hint">Use as setas ou deslize para explorar</p>
        </div>

        <button
          className="argent-slider__control"
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === CARE_MODES.length - 1}
          aria-label={activeIndex === CARE_MODES.length - 1 ? "Você está na última modalidade" : `Próxima: ${CARE_MODES[activeIndex + 1].title}`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
