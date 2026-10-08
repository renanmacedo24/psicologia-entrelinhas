"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const WavingPortfolioLanding = dynamic(() => import("./WavingPortfolioLanding"), { ssr: false });


type Peep = {
  x: number;
  homeX: number;
  lane: number;
  speed: number;
  direction: 1 | -1;
  frame: number;
  phase: number;
  height: number;
};

const SHEET_COLUMNS = 15;
const SHEET_ROWS = 7;

function createPeep(width: number, lane: number, slot: number): Peep {
  const direction = Math.random() > 0.5 ? 1 : -1;
  const homeX = width * slot;
  return {
    x: homeX,
    homeX,
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
      const slots = [0.13, 0.28, 0.39, 0.61, 0.72, 0.87];
      people = slots.map((slot, index) => createPeep(width, 0.2 + index * 0.12, slot));
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);

      if (sheet.complete && sheet.naturalWidth > 0) {
        const sourceWidth = sheet.naturalWidth / SHEET_COLUMNS;
        const sourceHeight = sheet.naturalHeight / SHEET_ROWS;
        people.sort((a, b) => a.lane - b.lane);

        people.forEach((person) => {
          const pace = now * (0.0004 + person.speed * 0.000012) + person.phase;
          const sway = reducedMotion.matches ? 0 : Math.sin(pace) * Math.min(width * 0.012, 8);
          person.x = person.homeX + sway;
          person.direction = Math.cos(pace) >= 0 ? 1 : -1;

          const drawWidth = person.height * (sourceWidth / sourceHeight);
          const ground = height * 0.89;
          const bob = reducedMotion.matches ? 0 : Math.sin(pace * 2.4) * 2;
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
  const [speechVisible, setSpeechVisible] = useState(false);

  return (
    <div className="hero-art" aria-label="Personagens ilustrados caminham por uma cena calma enquanto uma figura acena">
      <div className="art-grain" />
      <div className="sun" />
      <div className="hero-orbit hero-orbit-rose" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-blue" aria-hidden="true" />
      <div className="hero-art-wordmark" aria-hidden="true"><span>PSICO</span><span>LOGIA</span></div>
      <div className="hero-ground" aria-hidden="true" />
      <WalkingCrowd />
      <div className={`hero-speech${speechVisible ? " is-visible" : ""}`} role="status" aria-live="polite" aria-hidden={!speechVisible}>
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
        characterOffset={-36}
        onWaveChange={setSpeechVisible}
        height="100%"
        className="hero-waving-art"
      />
    </div>
  );
}
