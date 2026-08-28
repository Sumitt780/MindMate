import { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Palette,
  ShieldCheck,
  Info,
  Check,
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <section id="settings" className="mm-settings-card">

      {/* Header */}
      <div className="mm-settings-header">
        <div>
          <div className="mm-section-kicker">
            <SettingsIcon size={14} />
            SETTINGS
          </div>

          <h2 className="mm-settings-title">
            Personalize MindMate
          </h2>

          <p className="mm-settings-subtitle">
            Keep your wellness space comfortable and private.
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="mm-settings-list">

        {/* Notifications */}
        <div className="mm-setting-item">
          <div className="mm-setting-icon">
            <Bell size={18} />
          </div>

          <div className="mm-setting-content">
            <strong>Notifications</strong>

            <span>
              Gentle reminders can help you keep your daily
              check-in habit.
            </span>
          </div>

          <button
            type="button"
            className={`mm-toggle ${
              notifications ? "active" : ""
            }`}
            onClick={() =>
              setNotifications(!notifications)
            }
            aria-label="Toggle notifications"
            aria-pressed={notifications}
          >
            <span className="mm-toggle-slider">
              {notifications && (
                <Check size={12} />
              )}
            </span>
          </button>
        </div>

        {/* Calm Interface */}
        <div className="mm-setting-item">
          <div className="mm-setting-icon mm-setting-green">
            <Palette size={18} />
          </div>

          <div className="mm-setting-content">
            <strong>Calm interface</strong>

            <span>
              MindMate uses a soft, low-distraction visual
              style for your wellness space.
            </span>
          </div>

          <span className="mm-setting-status">
            Active
          </span>
        </div>

        {/* Privacy */}
        <div className="mm-setting-item">
          <div className="mm-setting-icon mm-setting-purple">
            <ShieldCheck size={18} />
          </div>

          <div className="mm-setting-content">
            <strong>Private wellness data</strong>

            <span>
              Your journal entries and mood history are tied
              to your account.
            </span>
          </div>

          <span className="mm-setting-status">
            Protected
          </span>
        </div>

      </div>

      {/* About */}
      <div className="mm-settings-info">
        <div className="mm-settings-info-icon">
          <Info size={17} />
        </div>

        <div>
          <strong>About MindMate</strong>

          <p>
            MindMate is designed to help you reflect on your
            mood, track patterns, and build better self-awareness
            through small daily check-ins.
          </p>

          <span>
            Version 1.0.0
          </span>
        </div>
      </div>

    </section>
  );
}