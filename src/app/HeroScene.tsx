"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const WavingPortfolioLanding = dynamic(() => import("./WavingPortfolioLanding"), { ssr: false });


type Peep = {
  x: number;
  lane: number;
  speed: number;
  direction: 1 | -1;
  frame: number;
  phase: number;
  height: number;
};

const SHEET_COLUMNS = 15;
const SHEET_ROWS = 7;

function createPeep(width: number, lane: number): Peep {
  const direction = Math.random() > 0.5 ? 1 : -1;
  return {
    x: Math.random() * width,
    lane,
    speed: 18 + Math.random() * 20,
    direction,
    frame: Math.floor(Math.random() * SHEET_COLUMNS * SHEET_ROWS),
    phase: Math.random() * Math.PI * 2,
    height: 34 + lane * 42,
  };
}

function WalkingCrowd() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const sheet = new Image();
    sheet.src = "/peeps/open-peeps-sheet.png";
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastTime = 0;
    let people: Peep[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      people = Array.from({ length: 9 }, (_, index) => ({
        ...createPeep(width, 0.18 + index * 0.095),
        x: ((index + 0.5) / 9) * width,
      }));
    };

    const draw = (now: number) => {
      const delta = lastTime ? Math.min(now - lastTime, 40) : 16;
      lastTime = now;
      context.clearRect(0, 0, width, height);

      if (sheet.complete && sheet.naturalWidth > 0) {
        const sourceWidth = sheet.naturalWidth / SHEET_COLUMNS;
        const sourceHeight = sheet.naturalHeight / SHEET_ROWS;
        people.sort((a, b) => a.lane - b.lane);

        people.forEach((person) => {
          if (!reducedMotion.matches) {
            person.x += person.direction * person.speed * (delta / 1000);
          }
          if (person.direction > 0 && person.x > width + 54) {
            Object.assign(person, createPeep(width, person.lane), { x: -40 });
          } else if (person.direction < 0 && person.x < -54) {
            Object.assign(person, createPeep(width, person.lane), { x: width + 40 });
          }

          const drawWidth = person.height * (sourceWidth / sourceHeight);
          const ground = height * (0.84 + person.lane * 0.1);
          const bob = reducedMotion.matches ? 0 : Math.sin(now * 0.003 + person.phase) * 5;
          const sourceX = (person.frame % SHEET_COLUMNS) * sourceWidth;
          const sourceY = Math.floor(person.frame / SHEET_COLUMNS) * sourceHeight;

          context.save();
          context.translate(person.x, ground + bob);
          context.scale(person.direction, 1);
          context.globalAlpha = 0.88;
          context.drawImage(
            sheet,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            -drawWidth / 2,
            -person.height,
            drawWidth,
            person.height,
          );
          context.restore();
        });
      }

      frameId = window.requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frameId = window.requestAnimationFrame(draw);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      sheet.onload = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="walking-crowd" aria-hidden="true" />;
}

export default function HeroScene() {
  return (
    <div className="hero-art" aria-label="Personagens ilustrados caminham por uma cena calma enquanto uma figura acena">
      <div className="art-grain" />
      <div className="sun" />
      <WalkingCrowd />
      <div className="hero-speech" role="note">
        Pode falar no seu tempo.<br />
        Estou aqui para escutar.
      </div>
      <WavingPortfolioLanding
        name="ENTRELINHAS"
        year="PSICOLOGIA"
        roles={["ONLINE", "PRESENCIAL"]}
        lettersLeft={["", ""]}
        giantLetter="O"
        lettersRight={["", ""]}
        title="O que você sente também merece ser escutado."
        greeting="OLÁ!"
        accent="#bd6cb9"
        paper="#e7e4d7"
        ink="#252a23"
        intro={false}
        height="100%"
        className="hero-waving-art"
      />
    </div>
  );
}
