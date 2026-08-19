export const MOODS = [
  { id: "stormy", label: "Stormy", value: 1, color: "var(--mood-1)" },
  { id: "cloudy", label: "Cloudy", value: 2, color: "var(--mood-2)" },
  { id: "still", label: "Still", value: 3, color: "var(--mood-3)" },
  { id: "sunny", label: "Sunny", value: 4, color: "var(--mood-4)" },
  { id: "radiant", label: "Radiant", value: 5, color: "var(--mood-5)" },
];

export const ENERGY_LEVELS = [
  { id: 1, label: "Low" },
  { id: 2, label: "Steady" },
  { id: 3, label: "High" },
];

export function moodById(id) {
  return MOODS.find((m) => m.id === id);
}

export function formatKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function prettyDate(key) {
  const d = new Date(`${key}T00:00:00`);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
