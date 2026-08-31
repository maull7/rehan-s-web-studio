import { cn } from "@/lib/utils";

export type ClayIconName = "code" | "bug" | "coffee" | "rocket" | "terminal" | "sparkle" | "toolbox" | "chart" | "folder" | "check" | "search" | "copy" | "book" | "mailbox";

interface ClayIconProps {
  name: ClayIconName;
  className?: string;
  tone?: "purple" | "pink" | "yellow" | "blue" | "orange" | "green";
}

const colors = {
  purple: ["#c9adff", "#8b5cf6", "#6d3fc2"],
  pink: ["#ffc7db", "#f472b6", "#c84b88"],
  yellow: ["#fff0a6", "#facc15", "#c89508"],
  blue: ["#bfeaff", "#38bdf8", "#1582b2"],
  orange: ["#ffd0a8", "#fb923c", "#c55b15"],
  green: ["#bcefcf", "#4ade80", "#269653"],
};

const ClayIcon = ({ name, className, tone = "purple" }: ClayIconProps) => {
  const [light, main, dark] = colors[tone];
  const id = `clay-${name}-${tone}`;
  return (
    <svg viewBox="0 0 96 96" className={cn("h-12 w-12", className)} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`${id}-fill`} x1="20" y1="12" x2="76" y2="84" gradientUnits="userSpaceOnUse"><stop stopColor={light} /><stop offset=".58" stopColor={main} /><stop offset="1" stopColor={dark} /></linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-20%" width="170%" height="170%"><feDropShadow dx="0" dy="6" stdDeviation="2" floodColor="#5b4670" floodOpacity=".22" /></filter>
      </defs>
      <g filter={`url(#${id}-shadow)`} stroke="#58456a" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        {name === "code" && <><rect x="14" y="22" width="68" height="52" rx="16" fill={`url(#${id}-fill)`} /><path d="m35 41-9 7 9 7M61 41l9 7-9 7M53 36l-9 25" stroke="#fff" strokeWidth="5" /></>}
        {name === "bug" && <><path d="M48 25c-12 0-20 10-20 25v8c0 10 9 17 20 17s20-7 20-17v-8c0-15-8-25-20-25Z" fill={`url(#${id}-fill)`} /><path d="M28 42H17m11 12H15m53-12h11M68 54h13M38 25l-6-9m26 9 6-9" /><circle cx="40" cy="44" r="3" fill="#58456a" stroke="none" /><circle cx="56" cy="44" r="3" fill="#58456a" stroke="none" /></>}
        {name === "coffee" && <><path d="M25 34h43v28c0 8-6 13-14 13H39c-8 0-14-5-14-13V34Z" fill={`url(#${id}-fill)`} /><path d="M68 42h8c11 0 11 17 0 17h-8M36 27c-4-8 7-9 3-18m14 18c-4-8 7-9 3-18" /><path d="M32 43h25" stroke="#fff" strokeOpacity=".7" /></>}
        {name === "rocket" && <><path d="M48 73c-14-9-21-22-13-38 5-10 13-15 21-18 3 9 2 18-3 27-6 11-4 20-5 29Z" fill={`url(#${id}-fill)`} /><path d="m32 49-12 4 10 10m34-14 12 4-10 10M44 74l-5 10m13-10 5 10" /><circle cx="51" cy="39" r="5" fill="#fff" /></>}
        {name === "terminal" && <><rect x="14" y="20" width="68" height="56" rx="14" fill="#26324a" /><path d="m28 42 9 8-9 8m17 0h18" stroke={light} strokeWidth="5" /><circle cx="29" cy="31" r="3" fill="#ff8c9e" stroke="none" /><circle cx="39" cy="31" r="3" fill="#ffe27a" stroke="none" /></>}
        {name === "sparkle" && <><path d="m48 14 7 27 27 7-27 7-7 27-7-27-27-7 27-7 7-27Z" fill={`url(#${id}-fill)`} /><path d="m77 17 3 10 10 3-10 3-3 10-3-10-10-3 10-3 3-10Z" fill="#fff1a8" /></>}
        {name === "toolbox" && <><path d="M18 36h60v35H18z" fill={`url(#${id}-fill)`} /><path d="M34 36v-8h28v8M14 48h68M42 48v8h12v-8" /></>}
        {name === "chart" && <><rect x="16" y="18" width="64" height="58" rx="14" fill={`url(#${id}-fill)`} /><path d="M28 61V48m14 13V37m14 24V43m14 18V30" stroke="#fff" strokeWidth="7" /></>}
        {name === "folder" && <><path d="M14 29c0-6 4-10 10-10h18l8 8h22c6 0 10 4 10 10v30c0 6-4 10-10 10H24c-6 0-10-4-10-10V29Z" fill={`url(#${id}-fill)`}/><path d="M14 35h68" stroke="#fff" strokeOpacity=".65" /></>}
        {name === "check" && <><circle cx="48" cy="48" r="31" fill={`url(#${id}-fill)`}/><path d="m32 49 11 11 22-25" stroke="#fff" strokeWidth="7" /></>}
        {name === "search" && <><circle cx="42" cy="42" r="22" fill={`url(#${id}-fill)`}/><path d="m58 58 18 18" strokeWidth="9" /></>}
        {name === "copy" && <><rect x="27" y="18" width="42" height="51" rx="8" fill={`url(#${id}-fill)`}/><path d="M36 29h23m-23 12h23m-23 12h14" stroke="#fff"/><path d="M20 30v43c0 5 4 9 9 9h35" /></>}
        {name === "book" && <><path d="M17 23c12-5 22-2 31 5v48c-9-7-19-10-31-5V23Zm62 0c-12-5-22-2-31 5v48c9-7 19-10 31-5V23Z" fill={`url(#${id}-fill)`}/><path d="M28 34h10m-10 12h10m30-12H58m12 12H58" stroke="#fff" /></>}
        {name === "mailbox" && <><path d="M20 40c0-13 9-23 21-23h28v48H20V40Z" fill={`url(#${id}-fill)`}/><path d="M69 17v48M20 65h62"/><path d="M32 36h19" stroke="#fff" strokeWidth="5" /></>}
      </g>
    </svg>
  );
};

export default ClayIcon;
