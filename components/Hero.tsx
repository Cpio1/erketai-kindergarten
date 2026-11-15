"use client";

import { ArrowRight, Baby, Building2, Languages, MessageCircleHeart, UtensilsCrossed, Video } from "lucide-react";
import Image from "next/image";
import { useSite } from "./Providers";
import { Reveal } from "./ui";
import { PlayArt, PlayWorld } from "./PlayArt";

const FEATURES = [
  { key: "branches", icon: Building2 }, { key: "ages", icon: Baby },
  { key: "langs", icon: Languages }, { key: "english", icon: MessageCircleHeart },
  { key: "meals", icon: UtensilsCrossed }, { key: "cameras", icon: Video },
] as const;

export function Hero({ hero }: { hero: string | null }) {
  const { t, setEnrollOpen } = useSite();
  return (
    <section id="top" aria-label="Erketai" className="hero-section">
      <div className="wrap">
        <div className="hero-layout">
          <div className="hero-copy">
            <Reveal><span className="eyebrow"><span className="status-dot"/>{t.hero.eyebrow}</span></Reveal>
            <Reveal delay={0.04}>
              <div className="hero-wordmark" aria-hidden="true">erketai<span>✳</span></div>
              <h1><span>{t.hero.titleLead}</span> <span className="hero-highlight">{t.hero.titleAccent}</span></h1>
            </Reveal>
            <Reveal delay={0.08}><p className="lead mt-5 max-w-lg">{t.hero.text}</p></Reveal>
            <Reveal delay={0.12} className="hero-actions">
              <button type="button" onClick={() => setEnrollOpen(true)} className="btn btn-primary">{t.hero.enroll}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden/></button>
              <a href="#branches" className="btn btn-ghost">{t.hero.branches}</a>
            </Reveal>
            <div className="hero-notes"><span><Baby size={17} aria-hidden/>{t.hero.badgeAges}</span><span><Languages size={17} aria-hidden/>{t.hero.badgeLangs}</span></div>
          </div>
          <Reveal delay={0.08} className="hero-visual">
            <div className="hero-photo-frame">
              {hero ? <Image src={hero} alt={t.hero.photoAlt} fill priority sizes="(min-width:1280px) 530px, (min-width:768px) 46vw, 92vw" className="object-cover"/> : <PlayWorld/>}
            </div>
            <PlayArt kind="star" className="hero-star"/>
            <div className="hero-photo-label"><span className="label-number">2</span><span>{t.features.branches.title}<small>{t.features.branches.text}</small></span></div>
          </Reveal>
        </div>
        <ul className="feature-ribbon">
          {FEATURES.map(({key, icon: Icon}, i) => <li key={key}><span className={`feature-icon feature-tone-${i}`}><Icon size={21} aria-hidden/></span><span><strong>{t.features[key].title}</strong><small>{t.features[key].text}</small></span></li>)}
        </ul>
      </div>
    </section>
  );
}
