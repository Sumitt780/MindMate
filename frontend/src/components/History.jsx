import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  BookOpen,
  CalendarDays,
} from "lucide-react";

import Bloom from "./Bloom";
import { moodById, prettyDate } from "../constants";

export default function History({ entries, onDelete }) {
  const [expanded, setExpanded] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  const history = Object.entries(entries).sort((a, b) =>
    a[0] < b[0] ? 1 : -1
  );

  const toggleExpanded = (key) => {
    setExpanded((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleDelete = (key) => {
    onDelete(key);
    setConfirmDelete(null);
  };

  return (
    <section className="mm-history-card">
      <div className="mm-history-header">
        <div className="mm-history-heading">
          <div className="mm-history-icon">
            <BookOpen size={18} />
          </div>

          <div>
            <div className="mm-section-kicker">
              <CalendarDays size={13} />
              JOURNAL
            </div>

            <h2 className="mm-history-title">
              Your reflections
            </h2>

            <p className="mm-history-subtitle">
              Look back at the moments you've captured.
            </p>
          </div>
        </div>

        <div className="mm-history-count">
          {history.length}
          <span>
            {history.length === 1 ? "entry" : "entries"}
          </span>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="mm-history-empty">
          <div className="mm-history-empty-icon">
            <BookOpen size={22} />
          </div>

          <strong>Your journal is waiting.</strong>

          <p>
            Entries you save will appear here so you can
            revisit your journey.
          </p>
        </div>
      ) : (
        <div className="mm-history-list">
          {history.map(([key, entry]) => {
            const mood = moodById(entry.mood);
            const isOpen = !!expanded[key];
            const deleting = confirmDelete === key;

            return (
              <article
                key={key}
                className={`mm-history-entry ${
                  isOpen ? "expanded" : ""
                }`}
              >
                <div className="mm-history-entry-row">
                  <div className="mm-history-bloom">
                    <Bloom
                      moodId={entry.mood}
                      energy={entry.energy}
                      size={31}
                    />
                  </div>

                  <div className="mm-history-entry-info">
                    <div className="mm-history-entry-top">
                      <strong>{mood.label}</strong>

                      <span>{prettyDate(key)}</span>
                    </div>

                    {entry.note && !isOpen && (
                      <p className="mm-history-preview">
                        {entry.note}
                      </p>
                    )}
                  </div>

                  <div className="mm-history-actions">
                    {entry.note && (
                      <button
                        type="button"
                        className="mm-history-action"
                        onClick={() => toggleExpanded(key)}
                        aria-label={
                          isOpen
                            ? "Collapse note"
                            : "Expand note"
                        }
                      >
                        {isOpen ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    )}

                    {!deleting ? (
                      <button
                        type="button"
                        className="mm-history-action mm-history-delete"
                        onClick={() => setConfirmDelete(key)}
                        aria-label="Delete entry"
                      >
                        <Trash2 size={15} />
                      </button>
                    ) : (
                      <div className="mm-history-confirm">
                        <button
                          type="button"
                          onClick={() => handleDelete(key)}
                        >
                          Delete
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfirmDelete(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isOpen && entry.note && (
                  <div className="mm-history-note-expanded">
                    <div className="mm-history-note-line" />

                    <p>{entry.note}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}