import {
  Flame,
  TrendingUp,
  Heart,
  BarChart3,
} from "lucide-react";

import Bloom from "./Bloom";
import Sparkline from "./Sparkline";
import { moodById } from "../constants";

export default function Insights({ stats }) {
  if (!stats) return null;

  const {
    streak,
    topMood,
    trend14,
    avg7,
  } = stats;

  const mood = topMood
    ? moodById(topMood)
    : null;

  return (
    <section className="mm-insights-section">

      {/* Header */}

      <div className="mm-insights-header">
        <div>
          <div className="mm-section-kicker">
            <BarChart3 size={14} />
            YOUR INSIGHTS
          </div>

          <h2 className="mm-insights-title">
            A little reflection
          </h2>

          <p className="mm-insights-subtitle">
            Small patterns can tell you a lot.
          </p>
        </div>
      </div>

      {/* Insight cards */}

      <div className="mm-insights-cards">

        {/* Streak */}

        <div className="mm-insight-card mm-insight-streak">

          <div className="mm-insight-top">
            <div className="mm-insight-icon">
              <Flame size={17} />
            </div>

            <span className="mm-insight-mini-label">
              RHYTHM
            </span>
          </div>

          <div className="mm-insight-label">
            Current streak
          </div>

          <div className="mm-insight-value">
            {streak}

            <span>
              {streak === 1
                ? "day"
                : "days"}
            </span>
          </div>

          <p className="mm-insight-description">
            Keep checking in to build
            your rhythm.
          </p>

        </div>

        {/* Mood */}

        <div className="mm-insight-card">

          <div className="mm-insight-top">
            <div className="mm-insight-icon mm-insight-icon-green">
              <Heart size={17} />
            </div>

            <span className="mm-insight-mini-label">
              MOOD
            </span>
          </div>

          <div className="mm-insight-label">
            Most common mood
          </div>

          {mood ? (
            <div className="mm-insight-mood">

              <div className="mm-insight-mood-bloom">
                <Bloom
                  moodId={mood.id}
                  energy={2}
                  size={31}
                />
              </div>

              <span>
                {mood.label}
              </span>

            </div>
          ) : (
            <div className="mm-insight-empty">
              Not enough data yet
            </div>
          )}

          <p className="mm-insight-description">
            Your most frequent mood recently.
          </p>

        </div>

        {/* Trend */}

        <div className="mm-insight-card mm-insight-trend">

          <div className="mm-insight-top">
            <div className="mm-insight-icon mm-insight-icon-purple">
              <TrendingUp size={17} />
            </div>

            <span className="mm-insight-mini-label">
              TREND
            </span>
          </div>

          <div className="mm-insight-label">
            14-day mood trend
          </div>

          {trend14 &&
          trend14.length > 1 ? (
            <>
              <div className="mm-insight-chart">
                <Sparkline
                  points={trend14}
                />
              </div>

              {avg7 && (
                <div className="mm-insight-average">
                  <strong>
                    {avg7}/5
                  </strong>

                  <span>
                    7-day average
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="mm-insight-empty">
              Log a few more days to see
              your trend.
            </div>
          )}

          <p className="mm-insight-description">
            Your mood pattern over time.
          </p>

        </div>

      </div>

    </section>
  );
}