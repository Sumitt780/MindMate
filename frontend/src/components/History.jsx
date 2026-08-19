import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import Bloom from "./Bloom";
import { moodById, prettyDate } from "../constants";

export default function History({ entries, onDelete }) {
  const [expanded, setExpanded] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  const history = Object.entries(entries).sort((a, b) => (a[0] < b[0] ? 1 : -1));

  return (
    <section>
      <h2 className="mm-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
        Journal history
      </h2>
      {history.length === 0 ? (
        <p style={{ fontSize: 14, color: "var(--faint)" }}>Entries you save will show up here.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {history.map(([key, e]) => {
            const mood = moodById(e.mood);
            const isOpen = expanded[key];
            return (
              <div key={key} className="mm-history-item">
                <div className="mm-history-row">
                  <Bloom moodId={e.mood} energy={e.energy} size={26} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{mood.label}</span>
                      <span className="mm-mono" style={{ fontSize: 12, color: "var(--faint)" }}>
                        {prettyDate(key)}
                      </span>
                    </div>
                    {e.note && !isOpen && <p className="mm-history-note">{e.note}</p>}
                  </div>
                  {e.note && (
                    <button className="mm-icon-btn" onClick={() => setExpanded((s) => ({ ...s, [key]: !s[key] }))} aria-label="Toggle note">
                      {isOpen ? <ChevronUp size={16} color="#8A8393" /> : <ChevronDown size={16} color="#8A8393" />}
                    </button>
                  )}
                  {confirmDelete === key ? (
                    <div style={{ display: "flex", gap: 4 }}>
                      <button
                        onClick={() => {
                          onDelete(key);
                          setConfirmDelete(null);
                        }}
                        style={{ background: "transparent", fontSize: 12, fontWeight: 600, color: "var(--mood-5)", padding: "4px 8px" }}
                      >
                        Confirm
                      </button>
                      <button onClick={() => setConfirmDelete(null)} style={{ background: "transparent", fontSize: 12, color: "var(--faint)", padding: "4px 8px" }}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button className="mm-icon-btn" onClick={() => setConfirmDelete(key)} aria-label="Delete entry">
                      <Trash2 size={15} color="#B9B3C9" />
                    </button>
                  )}
                </div>
                {isOpen && e.note && (
                  <p style={{ fontSize: 14, marginTop: 8, paddingLeft: 38, color: "var(--ink)" }}>{e.note}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
