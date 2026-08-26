import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { getUsername } from "../api";

export default function Profile() {
  const username = getUsername() || "User";
  const initial = username.charAt(0).toUpperCase();

  return (
    <section
      id="profile"
      className="mm-profile-card"
    >
      {/* Header */}
      <div className="mm-profile-header">
        <div>
          <div className="mm-section-kicker">
            <User size={14} />
            PROFILE
          </div>

          <h2 className="mm-profile-title">
            Your profile
          </h2>

          <p className="mm-profile-subtitle">
            Manage your MindMate identity and
            wellness space.
          </p>
        </div>
      </div>

      {/* Profile identity */}
      <div className="mm-profile-identity">
        <div className="mm-profile-large-avatar">
          {initial}
        </div>

        <div className="mm-profile-info">
          <h3>{username}</h3>

          <span className="mm-profile-member">
            MindMate member
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="mm-profile-details">

        <div className="mm-profile-detail">
          <div className="mm-profile-detail-icon">
            <User size={17} />
          </div>

          <div className="mm-profile-detail-content">
            <span>Username</span>
            <strong>{username}</strong>
          </div>
        </div>

        <div className="mm-profile-detail">
          <div className="mm-profile-detail-icon">
            <Mail size={17} />
          </div>

          <div className="mm-profile-detail-content">
            <span>Account</span>
            <strong>
              Personal MindMate account
            </strong>
          </div>
        </div>

        <div className="mm-profile-detail">
          <div className="mm-profile-detail-icon">
            <ShieldCheck size={17} />
          </div>

          <div className="mm-profile-detail-content">
            <span>Privacy</span>
            <strong>
              Your wellness data stays private
            </strong>
          </div>
        </div>

        <div className="mm-profile-detail">
          <div className="mm-profile-detail-icon">
            <CalendarDays size={17} />
          </div>

          <div className="mm-profile-detail-content">
            <span>Journey</span>
            <strong>
              Keep checking in every day
            </strong>
          </div>
        </div>

      </div>

      {/* Wellness note */}
      <div className="mm-profile-note">
        <div className="mm-profile-note-icon">
          <Sparkles size={17} />
        </div>

        <div>
          <strong>
            Your wellness journey
          </strong>

          <p>
            MindMate is your personal space to
            reflect, understand your emotions,
            and build healthy self-awareness
            through small daily check-ins.
          </p>
        </div>
      </div>
    </section>
  );
}