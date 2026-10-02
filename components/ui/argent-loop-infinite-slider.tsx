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

const CONFIG = { scrollSpeed: 0.72, lerpFactor: 0.075, maxVelocity: 120 };
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
const numberAt = (index: number) => String(index + 1).padStart(2, "0");

export function ArgentLoopInfiniteSlider() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const requestRef = React.useRef<number>(0);
  const projectsRef = React.useRef(new Map<number, HTMLElement>());
  const infoRef = React.useRef(new Map<number, HTMLElement>());
  const state = React.useRef({ currentY: 0, targetY: 0, height: 620, dragging: false, lastInput: 0, touchY: 0, touchStart: 0 });

  React.useEffect(() => {
    const resize = () => { state.current.height = containerRef.current?.clientHeight || 620; };
    const wheel = (event: WheelEvent) => {
      const current = state.current;
      const delta = Math.max(Math.min(event.deltaY * CONFIG.scrollSpeed, CONFIG.maxVelocity), -CONFIG.maxVelocity);
      const limit = -current.height * (CARE_MODES.length - 1);
      const nextTarget = Math.max(limit, Math.min(0, current.targetY - delta));

      // At either end, leave the wheel event to the page so visitors can continue reading.
      if (nextTarget === current.targetY) return;

      event.preventDefault();
      current.targetY = nextTarget;
      current.lastInput = Date.now();
    };
    const update = () => {
      const current = state.current;
      current.currentY = lerp(current.currentY, current.targetY, CONFIG.lerpFactor);
      projectsRef.current.forEach((element, index) => {
        const y = index * current.height + current.currentY;
        element.style.transform = `translateY(${y}px)`;
        const image = element.querySelector("img");
        if (image instanceof HTMLImageElement) image.style.transform = `translateY(${(-current.currentY - index * current.height) * 0.1}px) scale(1.08)`;
      });
      infoRef.current.forEach((element, index) => { element.style.transform = `translateY(${index * current.height + current.currentY}px)`; });
      const active = Math.max(0, Math.min(CARE_MODES.length - 1, Math.round(-current.targetY / current.height)));
      if (!current.dragging && Date.now() - current.lastInput > 140) current.targetY = lerp(current.targetY, -active * current.height, 0.14);
      requestRef.current = requestAnimationFrame(update);
    };
    resize();
    window.addEventListener("resize", resize);
    const slider = containerRef.current;
    slider?.addEventListener("wheel", wheel, { passive: false });
    requestRef.current = requestAnimationFrame(update);
    return () => { window.removeEventListener("resize", resize); slider?.removeEventListener("wheel", wheel); cancelAnimationFrame(requestRef.current); };
  }, []);

  const move = (direction: number) => {
    const current = state.current;
    const active = Math.max(0, Math.min(CARE_MODES.length - 1, Math.round(-current.targetY / current.height)));
    current.targetY = -Math.max(0, Math.min(CARE_MODES.length - 1, active + direction)) * current.height;
    current.lastInput = Date.now();
  };
  const touchStart = (event: React.TouchEvent) => { const current = state.current; current.dragging = true; current.touchY = event.touches[0].clientY; current.touchStart = current.targetY; };
  const touchMove = (event: React.TouchEvent) => { const current = state.current; if (!current.dragging) return; const limit = -current.height * (CARE_MODES.length - 1); current.targetY = Math.max(limit, Math.min(0, current.touchStart + (event.touches[0].clientY - current.touchY) * 1.25)); current.lastInput = Date.now(); };
  const touchEnd = (event: React.TouchEvent) => {
    const current = state.current;
    const distance = event.changedTouches[0].clientY - current.touchY;
    const lastIndex = CARE_MODES.length - 1;
    const active = Math.round(-current.targetY / current.height);
    current.dragging = false;
    current.lastInput = Date.now();
    if (active === lastIndex && distance < -50) containerRef.current?.parentElement?.nextElementSibling?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (active === 0 && distance > 50) containerRef.current?.parentElement?.previousElementSibling?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const indices = CARE_MODES.map((_, index) => index);

  const keyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
  };

  return (
    <div className="argent-slider" ref={containerRef} tabIndex={0} onKeyDown={keyDown} onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} aria-label="Modalidades de atendimento, role ou deslize para explorar">
      <div className="argent-slider__hint">role para explorar <span>↓</span></div>
      <div className="argent-slider__stage">
        {indices.map((index) => {
          const item = CARE_MODES[index];
          return <article className="argent-slider__project" key={index} ref={(element) => { if (element) projectsRef.current.set(index, element); else projectsRef.current.delete(index); }}>
            <img src={item.image} alt="" />
            <div className="argent-slider__veil" />
          </article>;
        })}
      </div>
      <div className="argent-slider__details" aria-live="polite">
        {indices.map((index) => {
          const item = CARE_MODES[index];
          return <div className="argent-slider__detail" key={index} ref={(element) => { if (element) infoRef.current.set(index, element); else infoRef.current.delete(index); }}>
            <p className="argent-slider__number">{numberAt(index)}</p>
            <p className="argent-slider__category">{item.category}</p>
            <h3>{item.title}</h3>
            <p className="argent-slider__format">{item.format}</p>
            <p className="argent-slider__description">{item.description}</p>
          </div>;
        })}
      </div>
      <div className="argent-slider__rail" aria-hidden="true"><span /></div>
      <div className="argent-slider__controls">
        <button type="button" onClick={() => move(-1)} aria-label="Ver modalidade anterior">↑</button>
        <button type="button" onClick={() => move(1)} aria-label="Ver próxima modalidade">↓</button>
      </div>
    </div>
  );
}
