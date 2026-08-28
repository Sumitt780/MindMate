import { useState, useEffect } from "react";
import {
  Loader2,
  Sparkles,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

import Bloom from "./Bloom";
import {
  MOODS,
  ENERGY_LEVELS,
} from "../constants";

/* =====================================================
   MOOD MEANINGS
   ===================================================== */

const MOOD_MEANINGS = {
  Stormy: {
    description:
      "Feeling overwhelmed, stressed, anxious, or emotionally disturbed.",

    feelings: [
      "Overwhelmed",
      "Stressed",
      "Anxious",
      "Irritable",
      "Restless",
      "Upset",
    ],

    reminder:
      "It's okay to not be okay. Take a moment for yourself.",
  },

  Cloudy: {
    description:
      "Feeling low, uncertain, tired, or lacking motivation.",

    feelings: [
      "Uncertain",
      "Tired",
      "Low",
      "Unmotivated",
      "Confused",
      "Down",
    ],

    reminder:
      "Give yourself some space and take things one step at a time.",
  },

  Still: {
    description:
      "Feeling calm, balanced, peaceful, or emotionally neutral.",

    feelings: [
      "Calm",
      "Peaceful",
      "Balanced",
      "Neutral",
      "Relaxed",
    ],

    reminder:
      "A calm moment matters too. Enjoy where you are right now.",
  },

  Sunny: {
    description:
      "Feeling good, positive, comfortable, and energized.",

    feelings: [
      "Positive",
      "Good",
      "Hopeful",
      "Energetic",
      "Comfortable",
      "Content",
    ],

    reminder:
      "Notice what is making today feel good and carry that feeling forward.",
  },

  Radiant: {
    description:
      "Feeling amazing, grateful, inspired, or deeply positive.",

    feelings: [
      "Amazing",
      "Grateful",
      "Inspired",
      "Joyful",
      "Confident",
      "Excited",
    ],

    reminder:
      "Celebrate this moment and remember what helped you feel this way.",
  },
};

/* =====================================================
   INDIVIDUAL FEELING MEANINGS
   ===================================================== */

const FEELING_MEANINGS = {
  Overwhelmed:
    "You may feel like there is too much happening at once and it is difficult to manage everything.",

  Stressed:
    "You may feel under pressure, tense, or mentally overloaded.",

  Anxious:
    "You may feel worried, nervous, or uncertain about what might happen.",

  Irritable:
    "Small things may feel frustrating or annoying more easily than usual.",

  Restless:
    "You may find it difficult to relax, settle down, or stay still.",

  Upset:
    "Something may have affected you emotionally and left you feeling unsettled.",

  Uncertain:
    "You may feel unsure about a situation, decision, or what comes next.",

  Tired:
    "You may feel physically or mentally drained and in need of rest.",

  Low:
    "Your mood may feel lower than usual, with less emotional energy.",

  Unmotivated:
    "You may find it difficult to start things or feel interested in usual activities.",

  Confused:
    "You may feel unsure about what something means or which direction to take.",

  Down:
    "You may feel a little sad, discouraged, or emotionally low.",

  Calm:
    "You may feel peaceful, relaxed, and comfortable with the moment.",

  Peaceful:
    "You may feel free from pressure and emotionally settled.",

  Balanced:
    "Your emotions may feel steady and manageable.",

  Neutral:
    "You may not feel strongly positive or negative right now.",

  Relaxed:
    "You may feel comfortable, unworried, and able to take things slowly.",

  Positive:
    "You may be experiencing an optimistic and good emotional state.",

  Good:
    "You may feel comfortable, content, and generally positive.",

  Hopeful:
    "You may feel optimistic that things can improve or work out.",

  Energetic:
    "You may feel active, motivated, and ready to do things.",

  Comfortable:
    "You may feel safe, settled, and at ease.",

  Content:
    "You may feel satisfied and comfortable with how things are.",

  Amazing:
    "You may feel exceptionally happy, excited, or fulfilled.",

  Grateful:
    "You may feel thankful for people, experiences, or things in your life.",

  Inspired:
    "You may feel motivated by an idea, person, experience, or possibility.",

  Joyful:
    "You may feel strong happiness, warmth, and enjoyment.",

  Confident:
    "You may feel sure of yourself and your ability to handle things.",

  Excited:
    "You may feel enthusiastic and energized about something.",
};

/* =====================================================
   CHECK-IN COMPONENT
   ===================================================== */

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

  /* Mood information popup */
  const [infoMood, setInfoMood] = useState(null);

  /* Selected feeling inside popup */
  const [selectedFeeling, setSelectedFeeling] =
    useState(null);

  /* =====================================================
     LOAD EXISTING CHECK-IN
     ===================================================== */

  useEffect(() => {
    if (existingToday) {
      setMood(existingToday.mood);
      setEnergy(existingToday.energy);
      setNote(existingToday.note || "");
    }
  }, [existingToday]);

  /* =====================================================
     SAVE CHECK-IN
     ===================================================== */

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
      setError(
        err.message ||
          "Unable to save your check-in."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     CLOSE MOOD INFORMATION
     ===================================================== */

  const closeMoodInfo = () => {
    setInfoMood(null);
    setSelectedFeeling(null);
  };

  /* =====================================================
     SELECT MOOD
     ===================================================== */

  const handleMoodSelect = (moodId) => {
    setMood(moodId);

    /* Close previous popup */
    setInfoMood(null);

    /* Clear previously selected feeling */
    setSelectedFeeling(null);
  };

  /* =====================================================
     TOGGLE FEELING
     ===================================================== */

  const handleFeelingClick = (feeling) => {
    setSelectedFeeling((current) =>
      current === feeling
        ? null
        : feeling
    );
  };

  return (
    <section className="mm-checkin-card">

      {/* =================================================
          HEADER
          ================================================= */}

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

      {/* =================================================
          MOOD SECTION
          ================================================= */}

      <div className="mm-checkin-block mm-mood-info-container">

        <div className="mm-checkin-label">

          <span>
            Your mood
          </span>

          <span className="mm-checkin-hint">
            {mood
              ? "Nice choice"
              : "Select one"}
          </span>

        </div>

        <div className="mm-mood-row mm-mood-row-large">

          {MOODS.map((m) => {

            const active =
              mood === m.id;

            const moodMeaning =
              MOOD_MEANINGS[m.label];

            return (
              <div
                key={m.id}
                className="mm-mood-card-wrapper"
              >

                {/* ==============================
                    MOOD SELECTION
                    ============================== */}

                <button
                  type="button"
                  onClick={() =>
                    handleMoodSelect(
                      m.id
                    )
                  }
                  className={`mm-mood-btn ${
                    active
                      ? "active"
                      : ""
                  }`}
                  style={{
                    borderColor:
                      active
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
                      size={
                        active
                          ? 42
                          : 36
                      }
                      title={m.label}
                    />

                  </div>

                  <span>
                    {m.label}
                  </span>

                </button>

                {/* ==============================
                    INFORMATION BUTTON
                    ============================== */}

                <button
                  type="button"
                  className={`mm-mood-info-btn ${
                    infoMood ===
                    m.label
                      ? "active"
                      : ""
                  }`}
                  onClick={(event) => {

                    event.stopPropagation();

                    if (
                      !moodMeaning
                    ) {
                      return;
                    }

                    if (
                      infoMood ===
                      m.label
                    ) {
                      closeMoodInfo();
                    } else {
                      setInfoMood(
                        m.label
                      );
                      setSelectedFeeling(
                        null
                      );
                    }
                  }}
                  aria-label={`About ${m.label} mood`}
                  aria-expanded={
                    infoMood ===
                    m.label
                  }
                >

                  <Info size={15} />

                </button>

              </div>
            );
          })}

        </div>

        {/* =================================================
            MOOD INFORMATION POPUP
            ================================================= */}

        {infoMood &&
          MOOD_MEANINGS[infoMood] && (
            <>
              {/* Backdrop */}

              <div
                className="mm-mood-info-backdrop"
                onClick={
                  closeMoodInfo
                }
              />

              {/* Popup */}

              <div
                className="mm-mood-info-popup"
                role="dialog"
                aria-modal="true"
                aria-label={`${infoMood} mood meaning`}
              >

                {/* ==========================
                    POPUP HEADER
                    ========================== */}

                <div className="mm-mood-info-header">

                  <div className="mm-mood-info-title-wrap">

                    <div className="mm-mood-info-icon">

                      <Bloom
                        moodId={
                          MOODS.find(
                            (item) =>
                              item.label ===
                              infoMood
                          )?.id
                        }
                        energy={2}
                        size={30}
                        title={
                          infoMood
                        }
                      />

                    </div>

                    <h3>
                      {infoMood}
                    </h3>

                  </div>

                  <button
                    type="button"
                    className="mm-mood-info-close"
                    onClick={
                      closeMoodInfo
                    }
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>

                </div>

                {/* ==========================
                    DESCRIPTION
                    ========================== */}

                <p className="mm-mood-info-description">

                  {
                    MOOD_MEANINGS[
                      infoMood
                    ].description
                  }

                </p>

                <div className="mm-mood-info-divider" />

                {/* ==========================
                    FEELINGS
                    ========================== */}

                <h4>
                  You might feel:
                </h4>

                <div className="mm-mood-feelings">

                  {MOOD_MEANINGS[
                    infoMood
                  ].feelings.map(
                    (feeling) => {

                      const activeFeeling =
                        selectedFeeling ===
                        feeling;

                      return (
                        <button
                          type="button"
                          key={feeling}
                          className={`mm-mood-feeling ${
                            activeFeeling
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleFeelingClick(
                              feeling
                            )
                          }
                          aria-pressed={
                            activeFeeling
                          }
                        >
                          {feeling}
                        </button>
                      );
                    }
                  )}

                </div>

                {/* ==========================
                    SELECTED FEELING DETAIL
                    ========================== */}

                {selectedFeeling &&
                  FEELING_MEANINGS[
                    selectedFeeling
                  ] && (
                    <div className="mm-feeling-detail">

                      <div className="mm-feeling-detail-icon">

                        <Info size={15} />

                      </div>

                      <div>

                        <strong>
                          {selectedFeeling}
                        </strong>

                        <p>
                          {
                            FEELING_MEANINGS[
                              selectedFeeling
                            ]
                          }
                        </p>

                      </div>

                    </div>
                  )}

                <div className="mm-mood-info-divider" />

                {/* ==========================
                    REMINDER
                    ========================== */}

                <div className="mm-mood-info-reminder">

                  <span className="mm-mood-reminder-icon">
                    💡
                  </span>

                  <div>

                    <strong>
                      A gentle reminder
                    </strong>

                    <p>
                      {
                        MOOD_MEANINGS[
                          infoMood
                        ].reminder
                      }
                    </p>

                  </div>

                </div>

              </div>
            </>
          )}

      </div>

      {/* =================================================
          ENERGY
          ================================================= */}

      <div className="mm-checkin-block">

        <div className="mm-checkin-label">

          <span>
            Energy level
          </span>

          <span className="mm-checkin-hint">

            {ENERGY_LEVELS.find(
              (item) =>
                item.id === energy
            )?.label || ""}

          </span>

        </div>

        <div className="mm-energy-row mm-energy-row-large">

          {ENERGY_LEVELS.map(
            (lvl) => (

              <button
                key={lvl.id}
                type="button"
                onClick={() =>
                  setEnergy(
                    lvl.id
                  )
                }
                className={`mm-energy-btn ${
                  energy ===
                  lvl.id
                    ? "active"
                    : ""
                }`}
              >

                {lvl.label}

              </button>

            )
          )}

        </div>

      </div>

      {/* =================================================
          JOURNAL
          ================================================= */}

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
            setNote(
              e.target.value
            )
          }
          placeholder="Write a few words about how you're feeling..."
        />

      </div>

      {/* =================================================
          FOOTER
          ================================================= */}

      <div className="mm-checkin-footer">

        <div>

          {justSaved && (
            <span className="mm-save-success">

              <CheckCircle2
                size={15}
              />

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
          disabled={
            !mood || saving
          }
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