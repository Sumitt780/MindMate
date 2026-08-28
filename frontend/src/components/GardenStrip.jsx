import {
  Sprout,
  Flame,
  ArrowRight,
  CalendarDays,
  Flower2,
} from "lucide-react";

import Bloom from "./Bloom";

import {
  moodById,
  prettyDate,
} from "../constants";

export default function GardenStrip({ entries }) {
  const days = [];

  // Last 30 days
  for (let i = 29; i >= 0; i--) {
    const d = new Date();

    d.setDate(d.getDate() - i);

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    const key = `${y}-${m}-${day}`;

    days.push({
      key,
      entry: entries?.[key] || null,
    });
  }

  // Planted days
  const plantedDays = days.filter(
    (day) => day.entry
  ).length;

  // Current streak
  let streak = 0;

  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].entry) {
      streak++;
    } else {
      break;
    }
  }

  const progress = Math.min(
    (plantedDays / 30) * 100,
    100
  );

  return (
    <section className="mm-garden-card">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="mm-garden-header">

        <div>
          <div className="mm-section-kicker">
            <Sprout size={15} />
            YOUR GARDEN
          </div>

          <h2 className="mm-garden-title">
            Growing with you
          </h2>

          <p className="mm-garden-subtitle">
            Every check-in plants a bloom.
          </p>
        </div>

        <div className="mm-garden-streak">

          <Flame size={18} />

          <div>
            <strong>{streak}</strong>
            <span>day streak</span>
          </div>

        </div>

      </div>


      {/* =================================================
          GARDEN
          ================================================= */}

      <div className="mm-garden-preview">

        <div className="mm-garden-grid">

          {days.map((day) => {

            const mood = day.entry
              ? moodById(day.entry.mood)
              : null;

            return (
              <div
                key={day.key}
                className={`mm-garden-day ${
                  day.entry
                    ? "has-bloom"
                    : "empty-day"
                }`}
                title={
                  day.entry
                    ? `${prettyDate(day.key)} — ${
                        mood?.label || ""
                      }`
                    : `${prettyDate(day.key)} — no check-in`
                }
              >

                {day.entry ? (

                  /* ======================================
                     PLANTED DAY
                     FLOWER REPLACES + COMPLETELY
                     ====================================== */

                  <div
                    className="mm-garden-bloom planted"
                    style={{
                      "--bloom-color":
                        mood?.color || "#a878ff",
                    }}
                  >

                    <Bloom
                      moodId={day.entry.mood}
                      energy={day.entry.energy}
                      size={40}
                      title={`${prettyDate(
                        day.key
                      )} — ${
                        mood?.label || ""
                      }`}
                    />

                  </div>

                ) : (

                  /* ======================================
                     EMPTY DAY
                     FLOWER INSTEAD OF +
                     ====================================== */

                  <div className="mm-empty-flower">

                    <Flower2
                      size={18}
                      strokeWidth={1.5}
                    />

                  </div>

                )}

              </div>
            );
          })}

        </div>


        {/* =================================================
            PROGRESS
            ================================================= */}

        <div className="mm-garden-progress">

          <div className="mm-garden-period">

            <span>
              <CalendarDays size={14} />
              Last 30 days
            </span>

            <strong>
              <b>{plantedDays}</b>/30 planted
            </strong>

          </div>

          <div className="mm-garden-progress-track">

            <div
              className="mm-garden-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>


      {/* =================================================
          FOOTER
          ================================================= */}

      <div className="mm-garden-footer">

        <div className="mm-garden-growth">

          <strong>
            {plantedDays === 0
              ? "Start your garden"
              : `${plantedDays} ${
                  plantedDays === 1
                    ? "day"
                    : "days"
                } of growth`}
          </strong>

          <span>
            Small check-ins create lasting patterns.
          </span>

        </div>


        <button
          type="button"
          className="mm-garden-action"
          onClick={() => {

            const element =
              document.getElementById(
                "journal"
              );

            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }

          }}
        >

          Check in

          <ArrowRight size={17} />

        </button>

      </div>

    </section>
  );
}