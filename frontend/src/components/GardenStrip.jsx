import Bloom from "./Bloom";
import { moodById, prettyDate } from "../constants";

export default function GardenStrip({ entries }) {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const key = `${y}-${m}-${day}`;
    days.push({ key, entry: entries[key] || null });
  }

  const isEmpty = days.every((d) => !d.entry);

  return (
    <section>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
        <h2 className="mm-display" style={{ fontSize: 18, fontWeight: 600 }}>
          Your garden
        </h2>
        <span className="mm-mono" style={{ fontSize: 12, color: "var(--faint)" }}>
          last 30 days
        </span>
      </div>
      <div className="mm-garden-box">
        {isEmpty ? (
          <p style={{ fontSize: 14, color: "var(--faint)", padding: "16px 4px" }}>
            Your garden is empty — plant your first mood above to get it growing.
          </p>
        ) : (
          <div className="mm-garden-row">
            {days.map((d) => (
              <div key={d.key} style={{ width: 34, display: "flex", justifyContent: "center" }}>
                <Bloom
                  moodId={d.entry?.mood}
                  energy={d.entry?.energy}
                  title={`${prettyDate(d.key)}${d.entry ? " — " + moodById(d.entry.mood).label : " — no entry"}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
