import {
  Sprout,
  Flame,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import Bloom from "./Bloom";
import {
  moodById,
  prettyDate,
} from "../constants";

export default function GardenStrip({ entries }) {
  const days = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date();

    d.setDate(d.getDate() - i);

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    const key = `${y}-${m}-${day}`;

    days.push({
      key,
      entry: entries[key] || null,
    });
  }

  const isEmpty = days.every(
    (day) => !day.entry
  );

  let streak = 0;

  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].entry) {
      streak++;
    } else {
      break;
    }
  }

  const plantedDays = days.filter(
    (day) => day.entry
  ).length;

  return (
    <section className="mm-garden-card">

      {/* Header */}

      <div className="mm-garden-header">
        <div>
          <div className="mm-section-kicker">
            <Sprout size={14} />
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
          <Flame size={16} />

          <div>
            <strong>{streak}</strong>
            <span>
              {streak === 1
                ? "day streak"
                : "day streak"}
            </span>
          </div>
        </div>
      </div>

      {/* Garden */}

      <div className="mm-garden-preview">

        {isEmpty ? (
          <div className="mm-garden-empty">

            <div className="mm-garden-empty-icon">
              <Sprout size={25} />
            </div>

            <strong>
              Your garden is waiting
            </strong>

            <p>
              Plant your first mood above
              to start growing.
            </p>

          </div>
        ) : (
          <>
            <div className="mm-garden-row mm-garden-row-new">

              {days.map((day) => (
                <div
                  key={day.key}
                  className={`mm-garden-day ${
                    day.entry
                      ? "has-bloom"
                      : "empty-day"
                  }`}
                >
                  {day.entry ? (
                    <div className="mm-garden-bloom">
                      <Bloom
                        moodId={day.entry.mood}
                        energy={day.entry.energy}
                        title={`${prettyDate(
                          day.key
                        )} — ${
                          moodById(
                            day.entry.mood
                          ).label
                        }`}
                      />
                    </div>
                  ) : (
                    <div
                      className="mm-empty-bloom"
                      title={`${prettyDate(
                        day.key
                      )} — no check-in`}
                    >
                      +
                    </div>
                  )}
                </div>
              ))}

            </div>

            <div className="mm-garden-period">
              <span>
                <CalendarDays size={11} />
                Last 30 days
              </span>

              <strong>
                {plantedDays}/30 planted
              </strong>
            </div>
          </>
        )}

      </div>

      {/* Footer */}

      <div className="mm-garden-footer">

        <div>
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
            Small check-ins create lasting
            patterns.
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
          <ArrowRight size={15} />
        </button>

      </div>

    </section>
  );
}