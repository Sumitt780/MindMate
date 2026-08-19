import { moodById } from "../constants";

export default function Bloom({ moodId, energy = 2, size, title }) {
  const mood = moodById(moodId);
  const s = size ?? 22 + energy * 6;
  const petalR = s * 0.2;
  const centerR = s * 0.13;
  const dist = s * 0.27;
  const angles = [0, 72, 144, 216, 288];

  if (!mood) {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} role="img" aria-label={title || "No entry"}>
        <title>{title || "No entry"}</title>
        <line x1={s / 2} y1={s * 0.55} x2={s / 2} y2={s} stroke="var(--mist)" strokeWidth="1.5" />
        <circle cx={s / 2} cy={s * 0.4} r={s * 0.06} fill="var(--mist)" />
      </svg>
    );
  }

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} role="img" aria-label={title || mood.label}>
      <title>{title || mood.label}</title>
      <line x1={s / 2} y1={s * 0.78} x2={s / 2} y2={s} stroke={mood.color} strokeWidth="1.5" opacity="0.5" />
      {angles.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const cx = s / 2 + dist * Math.cos(rad);
        const cy = s / 2 + dist * Math.sin(rad) * 0.85;
        return <circle key={i} cx={cx} cy={cy} r={petalR} fill={mood.color} opacity="0.92" />;
      })}
      <circle cx={s / 2} cy={s / 2 - s * 0.06} r={centerR} fill="var(--paper)" stroke={mood.color} strokeWidth="1.4" />
    </svg>
  );
}
