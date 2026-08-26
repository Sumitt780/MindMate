import {
  Settings as SettingsIcon,
  Bell,
  Palette,
  ShieldCheck,
  Info,
} from "lucide-react";

export default function Settings() {
  return (
    <section id="settings" className="mm-settings-card">
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

      <div className="mm-settings-list">

        <div className="mm-setting-item">
          <div className="mm-setting-icon">
            <Bell size={17} />
          </div>

          <div className="mm-setting-content">
            <strong>Notifications</strong>
            <span>
              Gentle reminders can help you keep your daily
              check-in habit.
            </span>
          </div>

          <label className="mm-toggle">
            <input type="checkbox" defaultChecked />
            <span className="mm-toggle-slider" />
          </label>
        </div>

        <div className="mm-setting-item">
          <div className="mm-setting-icon mm-setting-green">
            <Palette size={17} />
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

        <div className="mm-setting-item">
          <div className="mm-setting-icon mm-setting-purple">
            <ShieldCheck size={17} />
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

      <div className="mm-settings-info">
        <div className="mm-settings-info-icon">
          <Info size={16} />
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