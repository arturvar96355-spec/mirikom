const R = 90;
const CX = 110;
const CY = 110;
const START = -210; // градусы: дуга 240°
const SWEEP = 240;
const pt = (deg: number, r = R) => [CX + r * Math.cos((deg * Math.PI) / 180), CY + r * Math.sin((deg * Math.PI) / 180)];
const arc = (a0: number, a1: number, r = R) => {
  const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r);
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
};

type Props = { step: number; total: number; label: string };

export function Gauge({ step, total, label, needleRef, arcRef }: Props & { needleRef: React.RefObject<SVGGElement | null>; arcRef: React.RefObject<SVGPathElement | null> }) {
  const ticks = Array.from({ length: 41 }, (_, i) => START + (i * SWEEP) / 40);
  return (
    <svg viewBox="0 0 220 200" className="w-full max-w-[300px]" role="img" aria-label={`Этап ${step + 1} из ${total}: ${label}`}>
      <defs>
        <linearGradient id="gaugeG" x1="0" x2="1"><stop offset="0" stopColor="#3d8bff" /><stop offset="1" stopColor="#9fd0ff" /></linearGradient>
      </defs>
      <path d={arc(START, START + SWEEP)} fill="none" stroke="#2a313b" strokeWidth="6" strokeLinecap="round" />
      <path ref={arcRef} d={arc(START, START + SWEEP)} pathLength={1} fill="none" stroke="url(#gaugeG)" strokeWidth="6" strokeLinecap="round" strokeDasharray="1" strokeDashoffset="1" />
      {ticks.map((a, i) => {
        const long = i % 10 === 0;
        const [x0, y0] = pt(a, R - 12), [x1, y1] = pt(a, R - (long ? 24 : 18));
        return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke={long ? "#d9dee5" : "#8a94a3"} strokeWidth={long ? 1.6 : 0.8} />;
      })}
      <g ref={needleRef} style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: "view-box", transform: `rotate(${START}deg)` }}>
        <path d={`M${CX - 4} ${CY} L${CX + R - 20} ${CY - 1.2} L${CX + R - 20} ${CY + 1.2} Z`} fill="#ff5a1f" />
      </g>
      <circle cx={CX} cy={CY} r="9" fill="#1a1f26" stroke="#d9dee5" strokeWidth="1.2" />
      <text x={CX} y={CY + 52} textAnchor="middle" className="fill-chrome" style={{ font: "500 34px var(--font-plex-mono)" }}>0{step + 1}</text>
      <text x={CX} y={CY + 72} textAnchor="middle" className="fill-mute" style={{ font: "400 10px var(--font-plex-mono)", letterSpacing: "0.18em" }}>{label.toUpperCase()}</text>
    </svg>
  );
}
export { START, SWEEP };
