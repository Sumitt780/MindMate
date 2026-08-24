import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { api } from "../api";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    const text = message.trim();

    if (!text || loading) return;

    setError("");

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const result = await api.chat(text);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: result.response,
          emotion: result.emotion?.emotion || null,
          sentiment: result.sentiment?.sentiment || null,
        },
      ]);
    } catch (err) {
      console.error("MindMate AI error:", err);

      setError(
        "MindMate AI is currently unavailable. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const getEmotionStyle = (emotion) => {
    const styles = {
      joy: {
        background: "#ECFDF5",
        border: "1px solid #A7F3D0",
        color: "#047857",
        emoji: "😊",
      },
      sadness: {
        background: "#EFF6FF",
        border: "1px solid #BFDBFE",
        color: "#1D4ED8",
        emoji: "😔",
      },
      anger: {
        background: "#FEF2F2",
        border: "1px solid #FECACA",
        color: "#B91C1C",
        emoji: "😠",
      },
      fear: {
        background: "#FFF7ED",
        border: "1px solid #FED7AA",
        color: "#C2410C",
        emoji: "😟",
      },
      surprise: {
        background: "#F5F3FF",
        border: "1px solid #DDD6FE",
        color: "#6D28D9",
        emoji: "😮",
      },
      disgust: {
        background: "#F7FEE7",
        border: "1px solid #D9F99D",
        color: "#4D7C0F",
        emoji: "😣",
      },
      neutral: {
        background: "#F5F5F4",
        border: "1px solid #D6D3D1",
        color: "#57534E",
        emoji: "😐",
      },
    };

    return (
      styles[emotion?.toLowerCase()] || {
        background: "#F5F5F4",
        border: "1px solid #D6D3D1",
        color: "#57534E",
        emoji: "💭",
      }
    );
  };

  const getSentimentStyle = (sentiment) => {
    const styles = {
      positive: {
        background: "#ECFDF5",
        border: "1px solid #A7F3D0",
        color: "#047857",
        emoji: "✨",
      },
      negative: {
        background: "#FEF2F2",
        border: "1px solid #FECACA",
        color: "#B91C1C",
        emoji: "📉",
      },
      neutral: {
        background: "#F5F5F4",
        border: "1px solid #D6D3D1",
        color: "#57534E",
        emoji: "➖",
      },
    };

    return (
      styles[sentiment?.toLowerCase()] || {
        background: "#F5F5F4",
        border: "1px solid #D6D3D1",
        color: "#57534E",
        emoji: "💬",
      }
    );
  };

  return (
    <section className="mm-card">
      {/* Header */}
      <h2
        className="mm-display"
        style={{
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        Talk to MindMate
      </h2>

      <p
        style={{
          fontSize: 13,
          color: "var(--muted)",
          marginBottom: 16,
        }}
      >
        Share what's on your mind.
      </p>

      {/* Chat Messages */}
      <div
        style={{
          minHeight: 160,
          maxHeight: 320,
          overflowY: "auto",
          marginBottom: 14,
          paddingRight: 4,
        }}
      >
        {/* Empty State */}
        {messages.length === 0 && (
          <div
            style={{
              padding: 18,
              borderRadius: 12,
              background: "var(--surface-2)",
              color: "var(--muted)",
              fontSize: 13,
            }}
          >
            Hi, I'm MindMate. How are you feeling today?
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "10px 13px",
                borderRadius: 12,
                background:
                  msg.role === "user"
                    ? "var(--surface-2)"
                    : "var(--background)",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              {/* Message */}
              <div>{msg.text}</div>

              {/* Emotion + Sentiment */}
              {msg.role === "ai" &&
                (msg.emotion || msg.sentiment) && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 12,
                    }}
                  >
                    {/* Emotion Badge */}
                    {msg.emotion && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "5px 10px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 600,
                          ...getEmotionStyle(msg.emotion),
                        }}
                      >
                        {getEmotionStyle(msg.emotion).emoji}
                        Emotion: {msg.emotion}
                      </span>
                    )}

                    {/* Sentiment Badge */}
                    {msg.sentiment && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "5px 10px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 600,
                          ...getSentimentStyle(msg.sentiment),
                        }}
                      >
                        {getSentimentStyle(msg.sentiment).emoji}
                        Sentiment: {msg.sentiment}
                      </span>
                    )}
                  </div>
                )}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              color: "var(--muted)",
              fontSize: 12,
            }}
          >
            <Loader2 className="mm-spin" size={14} />
            MindMate is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "flex-end",
        }}
      >
        <textarea
          className="mm-textarea"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell MindMate what's on your mind..."
          disabled={loading}
        />

        <button
          className="mm-save-btn"
          onClick={handleSend}
          disabled={!message.trim() || loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            minHeight: 42,
          }}
        >
          {loading ? (
            <Loader2 className="mm-spin" size={15} />
          ) : (
            <Send size={15} />
          )}

          Send
        </button>
      </div>

      {/* Error */}
      {error && (
        <p
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "var(--mood-5)",
          }}
        >
          {error}
        </p>
      )}
    </section>
  );
}