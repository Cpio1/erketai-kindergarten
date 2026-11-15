"use client";

import { useId } from "react";

export type ArtKind = "sun" | "star" | "cloud" | "book" | "food" | "taekwondo" | "dance" | "speech" | "schoolPrep" | "vocal" | "piano" | "english" | "world";

/** Original layered vector artwork. Unique paint IDs allow multiple instances on a page. */
export function PlayArt({ kind, className = "" }: { kind: ArtKind; className?: string }) {
  const id = useId().replace(/:/g, "");
  const paint = (name: string) => `url(#${id}-${name})`;
  return (
    <svg viewBox="0 0 160 150" className={`play-art ${className}`} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-yellow`} x1="35" y1="25" x2="110" y2="125" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE993"/><stop offset=".6" stopColor="#FFD84D"/><stop offset="1" stopColor="#F4AD36"/></linearGradient>
        <linearGradient id={`${id}-blue`} x1="30" y1="25" x2="125" y2="125" gradientUnits="userSpaceOnUse"><stop stopColor="#C2ECFF"/><stop offset="1" stopColor="#64C8FF"/></linearGradient>
        <linearGradient id={`${id}-coral`} x1="35" y1="25" x2="110" y2="125" gradientUnits="userSpaceOnUse"><stop stopColor="#FFB6A5"/><stop offset="1" stopColor="#FF846B"/></linearGradient>
        <linearGradient id={`${id}-purple`} x1="35" y1="25" x2="110" y2="125" gradientUnits="userSpaceOnUse"><stop stopColor="#DACFFF"/><stop offset="1" stopColor="#9C7DE5"/></linearGradient>
      </defs>
      <ellipse cx="82" cy="133" rx="45" ry="7" fill="#253451" opacity=".08"/>
      {kind === "sun" ? <g stroke="#E8AB32" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => <path key={i} d="M80 12v12" transform={`rotate(${i * 45} 80 72)`}/>)}
        <circle cx="82" cy="77" r="37" fill="#EAB139" stroke="none"/><circle cx="79" cy="70" r="37" fill={paint("yellow")} stroke="none"/>
        <path d="M58 51c5-7 12-10 20-10" stroke="#FFF5C7"/><g stroke="#253451" strokeWidth="3"><path d="M66 68v3m25-3v3M70 83q10 9 20-1"/></g><g stroke="#FF9D76" strokeWidth="7"><path d="M57 81h3m35 0h3"/></g>
      </g> : kind === "star" ? <g className="art-star" strokeLinejoin="round"><path d="m81 21 17 32 36 7-25 27 4 39-32-17-34 15 7-37-24-29 37-5Z" fill="#E9A83A"/><path d="m77 14 17 32 36 7-25 27 4 39-32-17-34 15 7-37-24-29 37-5Z" fill={paint("yellow")} stroke="#E8B43F" strokeWidth="2"/><path d="m65 51 12-23 8 17" stroke="#FFF4C2" strokeWidth="5" strokeLinecap="round"/><path d="M65 70v3m24-3v3m-20 12q9 7 16-1" stroke="#253451" strokeWidth="3" strokeLinecap="round"/><path className="art-tail" d="m114 100 12 10m-9-25 16 2" stroke="#B5A0F5" strokeWidth="5" strokeLinecap="round"/></g>
      : kind === "cloud" ? <g><path d="M37 108C7 103 22 65 45 70 45 25 102 21 113 63c32-5 43 44 13 49Z" fill="#78B9D9"/><path d="M35 101C5 96 20 58 43 63 43 18 100 14 111 56c32-5 43 44 13 49Z" fill={paint("blue")} stroke="#68B4D8" strokeWidth="2"/><path d="M56 52q8-18 26-14" stroke="#E6F7FF" strokeWidth="6" strokeLinecap="round"/><path d="M64 78v3m27-3v3m-22 11q10 8 18-1" stroke="#253451" strokeWidth="3" strokeLinecap="round"/></g>
      : kind === "book" || kind === "schoolPrep" || kind === "english" ? <g stroke="#253451" strokeWidth="2" strokeLinejoin="round"><path d="m24 45 54 13 58-17-1 72-56 18-55-16Z" fill="#748EAB"/><path d="m22 36 56 14 57-18v74l-57 18-56-16Z" fill={paint("purple")}/><path d="m29 30 49 15 49-16v70l-49 17-49-15Z" fill="#FFFAF0"/><path d="M78 45v71"/><path d="m41 53 23 7m-23 9 23 7m29-19 21-7m-21 23 21-7" stroke="#B5A0F5" strokeWidth="4" strokeLinecap="round"/><path d="m106 18 12 8-23 38-13 6 1-15Z" fill={paint("coral")}/><path d="m82 70 4-15 9 9Z" fill="#FFD84D"/></g>
      : kind === "food" ? <g><ellipse cx="80" cy="87" rx="59" ry="39" fill="#59B887"/><ellipse cx="80" cy="79" rx="59" ry="39" fill="#79D9A5"/><ellipse cx="80" cy="79" rx="45" ry="29" fill="#FFFAF0"/><ellipse cx="80" cy="80" rx="35" ry="22" fill="#FFF0C9"/><path d="M56 74c-18-29 14-44 26-25 20-21 42 2 24 27-14 22-39 20-50-2Z" fill={paint("coral")}/><path d="M81 51q-4-19 13-23" stroke="#476A48" strokeWidth="5" strokeLinecap="round"/><path d="M84 41q-22 3-21-13 20-3 21 13" fill="#79D9A5"/><path d="M59 60q-4 9 1 14" stroke="#FFE0D6" strokeWidth="5" strokeLinecap="round"/><path d="M12 50v60m-7-60v20h14V50m128 0v60m0-60q-13 15 0 29" stroke="#8097AE" strokeWidth="4" strokeLinecap="round"/></g>
      : kind === "piano" ? <g stroke="#253451" strokeWidth="2"><path d="m28 60 90-13 18 16-2 57-103 9Z" fill="#9077D2"/><path d="m26 52 93-14 15 18-104 15Z" fill={paint("purple")}/><path d="m30 71 104-15-2 55-100 13Z" fill="#FFFAF0"/>{[49,68,87,106].map(x=><path key={x} d={`m${x} 68-1 53`} />)}{[46,65,103].map(x=><path key={x} d={`m${x} 67-1 28 8-1 1-28Z`} fill="#253451"/>)}<path d="m58 29 17-5v19m-17-14v19" strokeWidth="4" strokeLinecap="round"/><ellipse cx="53" cy="49" rx="6" ry="4" fill="#FFD84D"/><ellipse cx="70" cy="44" rx="6" ry="4" fill="#FFD84D"/></g>
      : kind === "vocal" || kind === "speech" ? <g stroke="#253451" strokeWidth="2"><rect x="57" y="22" width="43" height="64" rx="22" fill={paint(kind === "vocal" ? "purple" : "blue")} transform="rotate(12 78 54)"/><path d="M52 65q-7 38 29 34 24-1 28-25M79 100v23m-20 2h39" strokeWidth="5" strokeLinecap="round"/><path d="m66 39 23 5m-25 7 23 5m-24 7 22 5" stroke="#FFF" strokeWidth="4" strokeLinecap="round"/><path d="m120 37 10-7m-10 23 15 1M34 41l-9-6" stroke="#FF846B" strokeWidth="5" strokeLinecap="round"/></g>
      : kind === "dance" || kind === "taekwondo" ? <g stroke="#253451" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="81" cy="34" r="15" fill={paint("yellow")}/><path d="m70 53 22 1 8 35-42 1Z" fill={paint(kind === "dance" ? "coral" : "blue")}/><path d={kind === "dance" ? "m68 59-22 8-17-21m64 14 24-13 7-20M70 92l-14 29m32-29 23 23" : "m69 58-22 9-13-11m60 3 20 5 14-15M69 91l-13 30m32-31 26 12 15-22"} strokeWidth="10"/><path d="m65 78 31 1m-17 1 8 17" stroke={kind === "dance" ? "#B5A0F5" : "#FFD84D"} strokeWidth="7"/><path d="M75 32h1m11 0h1"/><path d="m72 22 13-3" stroke="#FFF0C7" strokeWidth="4"/></g>
      : <g stroke="#253451" strokeWidth="2" strokeLinejoin="round"><path d="M17 109q64-26 127 0v20H17Z" fill="#79D9A5" stroke="none"/><path d="M36 65h88v54H36Z" fill="#FFF5D9"/><path d="m26 67 54-43 55 43Z" fill={paint("coral")}/><path d="M69 88h23v31H69Z" fill={paint("purple")}/><path d="M46 77h15v18H46Zm54 0h15v18h-15Z" fill={paint("blue")}/><circle cx="80" cy="56" r="8" fill="#FFD84D"/><path d="M80 50v6h4"/><path d="M23 111V91m-7 0q-12-27 6-30 22 0 10 30Z" fill="#79D9A5"/><path d="M132 108V92m-7 0q-12-27 6-30 22 0 10 30Z" fill="#B5A0F5"/></g>}
    </svg>
  );
}

export function PlayWorld() {
  return <div className="play-world" aria-hidden="true"><div className="world-orbit"/><div className="world-hill"/><PlayArt kind="world" className="world-school"/><PlayArt kind="sun" className="world-sun"/><PlayArt kind="cloud" className="world-cloud"/><PlayArt kind="book" className="world-book"/><span className="world-trail"/></div>;
}
