import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Bloom from "./Bloom";
import { MOODS, ENERGY_LEVELS } from "../constants";

export default function CheckIn({ existingToday, onSave }) {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(2);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingToday) {
      setMood(existingToday.mood);
      setEnergy(existingToday.energy);
      setNote(existingToday.note || "");
    }
  }, [existingToday]);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const handleSave = async () => {
    if (!mood) return;
    setSaving(true);
    setError(null);
    try {
      await onSave({ mood, energy, note: note.trim() });
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2200);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mm-card">
      <h1 className="mm-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
        {greeting}. How are you, today?
      </h1>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>
        {existingToday ? "You've already checked in — feel free to update it." : "Pick a bloom that matches how today feels."}
      </p>

      <div className="mm-mood-row">
        {MOODS.map((m) => {
          const active = mood === m.id;
          return (
            <button key={m.id} onClick={() => setMood(m.id)} className={`mm-mood-btn ${active ? "active" : ""}`} style={{ borderColor: active ? m.color : undefined }}>
              <Bloom moodId={m.id} energy={active ? energy : 2} size={30} title={m.label} />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", marginBottom: 8 }}>Energy</div>
        <div className="mm-energy-row">
          {ENERGY_LEVELS.map((lvl) => (
            <button key={lvl.id} onClick={() => setEnergy(lvl.id)} className={`mm-energy-btn ${energy === lvl.id ? "active" : ""}`}>
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      <textarea
        className="mm-textarea"
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What's blooming in your mind? (optional)"
      />

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="mm-save-btn" onClick={handleSave} disabled={!mood || saving}>
          {saving && <Loader2 className="mm-spin" size={14} />}
          {existingToday ? "Update today's entry" : "Plant today's entry"}
        </button>
        {justSaved && <span style={{ fontSize: 12, fontWeight: 500, color: "var(--mood-3)" }}>Saved ✓</span>}
        {error && <span style={{ fontSize: 12, fontWeight: 500, color: "var(--mood-5)" }}>{error}</span>}
      </div>
    </section>
  );
}
