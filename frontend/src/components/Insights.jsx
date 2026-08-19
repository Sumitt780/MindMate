import Bloom from "./Bloom";
import Sparkline from "./Sparkline";
import { moodById } from "../constants";

export default function Insights({ stats }) {
  if (!stats) return null;
  const { streak, topMood, trend14, avg7 } = stats;
  const mood = topMood ? moodById(topMood) : null;

  return (
    <section className="mm-insights-grid">
      <div className="mm-stat-dark">
        <div className="label" style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
          Current streak
        </div>
        <div className="value mm-mono">
          {streak} {streak === 1 ? "day" : "days"}
        </div>
      </div>

      <div className="mm-stat-light">
        <div className="label">Most common this month</div>
        {mood ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Bloom moodId={mood.id} energy={2} size={22} />
            <span className="mm-display" style={{ fontSize: 16, fontWeight: 600 }}>
              {mood.label}
            </span>
          </div>
        ) : (
          <div style={{ fontSize: 14, color: "var(--faint)" }}>Not enough data yet</div>
        )}
      </div>

      <div className="mm-stat-light">
        <div className="label">
          14-day trend {avg7 && <span className="mm-mono">· avg {avg7}/5</span>}
        </div>
        {trend14 && trend14.length > 1 ? (
          <Sparkline points={trend14} />
        ) : (
          <div style={{ fontSize: 14, color: "var(--faint)" }}>Log a few more days to see a trend</div>
        )}
      </div>
    </section>
  );
}
