import { useState, useEffect } from "react";
import {
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import Bloom from "./Bloom";
import {
  MOODS,
  ENERGY_LEVELS,
} from "../constants";

export default function CheckIn({
  existingToday,
  onSave,
}) {
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

  const handleSave = async () => {
    if (!mood) return;

    setSaving(true);
    setError(null);

    try {
      await onSave({
        mood,
        energy,
        note: note.trim(),
      });

      setJustSaved(true);

      setTimeout(() => {
        setJustSaved(false);
      }, 2200);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mm-checkin-card">
      {/* Header */}

      <div className="mm-checkin-header">
        <div>
          <div className="mm-section-kicker">
            <Sparkles size={14} />
            DAILY CHECK-IN
          </div>

          <h2 className="mm-checkin-title">
            How are you feeling today?
          </h2>

          <p className="mm-checkin-subtitle">
            Choose the bloom that best matches
            how today feels.
          </p>
        </div>

        {existingToday && (
          <div className="mm-checkin-complete">
            <CheckCircle2 size={15} />
            Checked in
          </div>
        )}
      </div>

      {/* Mood */}

      <div className="mm-checkin-block">
        <div className="mm-checkin-label">
          <span>Your mood</span>

          <span className="mm-checkin-hint">
            {mood
              ? "Nice choice"
              : "Select one"}
          </span>
        </div>

        <div className="mm-mood-row mm-mood-row-large">
          {MOODS.map((m) => {
            const active = mood === m.id;

            return (
              <button
                key={m.id}
                type="button"
                onClick={() =>
                  setMood(m.id)
                }
                className={`mm-mood-btn ${
                  active ? "active" : ""
                }`}
                style={{
                  borderColor: active
                    ? m.color
                    : undefined,
                }}
              >
                <div className="mm-mood-bloom">
                  <Bloom
                    moodId={m.id}
                    energy={
                      active
                        ? energy
                        : 2
                    }
                    size={active ? 42 : 36}
                    title={m.label}
                  />
                </div>

                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Energy */}

      <div className="mm-checkin-block">
        <div className="mm-checkin-label">
          <span>Energy level</span>

          <span className="mm-checkin-hint">
            {ENERGY_LEVELS.find(
              (item) =>
                item.id === energy
            )?.label || ""}
          </span>
        </div>

        <div className="mm-energy-row mm-energy-row-large">
          {ENERGY_LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              type="button"
              onClick={() =>
                setEnergy(lvl.id)
              }
              className={`mm-energy-btn ${
                energy === lvl.id
                  ? "active"
                  : ""
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Journal */}

      <div className="mm-checkin-block">
        <div className="mm-checkin-label">
          <span>
            What's on your mind?
          </span>

          <span className="mm-checkin-hint">
            Optional
          </span>
        </div>

        <textarea
          className="mm-textarea mm-journal-textarea"
          rows={4}
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
          placeholder="Write a few words about how you're feeling..."
        />
      </div>

      {/* Footer */}

      <div className="mm-checkin-footer">
        <div>
          {justSaved && (
            <span className="mm-save-success">
              <CheckCircle2 size={15} />
              Saved successfully
            </span>
          )}

          {error && (
            <span className="mm-save-error">
              {error}
            </span>
          )}
        </div>

        <button
          type="button"
          className="mm-save-btn mm-checkin-save"
          onClick={handleSave}
          disabled={!mood || saving}
        >
          {saving && (
            <Loader2
              className="mm-spin"
              size={15}
            />
          )}

          {existingToday
            ? "Update check-in"
            : "Save today's check-in"}
        </button>
      </div>
    </section>
  );
}