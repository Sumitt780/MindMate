import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Trash2 } from "lucide-react";
import { api } from "../api";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");

  // Chat container reference
  const chatContainerRef = useRef(null);

  // Load chat history
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        setHistoryLoading(true);
        setError("");

        const history = await api.getChat();

        if (Array.isArray(history)) {
          setMessages(history);
        }
      } catch (err) {
        console.error("Chat history error:", err);
        setError("Unable to load previous conversations.");
      } finally {
        setHistoryLoading(false);
      }
    };

    loadChatHistory();
  }, []);

  // Auto-scroll ONLY inside chat container
  useEffect(() => {
    const container = chatContainerRef.current;

    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages, loading, historyLoading]);

  const handleSend = async () => {
    const text = message.trim();

    if (!text || loading) return;

    setError("");

    const userMessage = {
      role: "user",
      text,
      timestamp: Date.now(),
    };

    // Show user message immediately
    setMessages((prev) => [...prev, userMessage]);

    setMessage("");
    setLoading(true);

    try {
      // Save user message
      await api.saveChat(userMessage);

      // Get AI response
      const result = await api.chat(text);

      const aiMessage = {
        role: "ai",
        text: result.response,
        emotion: result.emotion?.emotion || null,
        sentiment: result.sentiment?.sentiment || null,
        timestamp: Date.now(),
      };

      // Show AI response
      setMessages((prev) => [...prev, aiMessage]);

      // Save AI response
      await api.saveChat(aiMessage);
    } catch (err) {
      console.error("MindMate AI error:", err);

      setError(
        "MindMate AI is currently unavailable. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (loading || messages.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear your chat history?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await api.clearChat();

      setMessages([]);
    } catch (err) {
      console.error("Clear chat error:", err);

      setError("Unable to clear chat history.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    return new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div>
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
              margin: 0,
            }}
          >
            Share what's on your mind.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            disabled={loading}
            title="Clear chat history"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              border: "none",
              background: "transparent",
              color: "var(--muted)",
              fontSize: 11,
              cursor: loading ? "not-allowed" : "pointer",
              padding: "5px 7px",
            }}
          >
            <Trash2 size={13} />
            Clear
          </button>
        )}
      </div>

      {/* Chat area */}
      <div
        ref={chatContainerRef}
        style={{
          minHeight: 160,
          maxHeight: 360,
          overflowY: "auto",
          marginBottom: 14,
          paddingRight: 4,
          scrollBehavior: "smooth",
        }}
      >
        {/* History loading */}
        {historyLoading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              color: "var(--muted)",
              fontSize: 12,
              padding: 10,
            }}
          >
            <Loader2 className="mm-spin" size={14} />
            Loading conversation...
          </div>
        )}

        {/* Empty state */}
        {!historyLoading && messages.length === 0 && (
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
        {!historyLoading &&
          messages.map((msg, index) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={`${msg.timestamp || "message"}-${index}`}
                style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 13px",
                    borderRadius: isUser
                      ? "14px 14px 4px 14px"
                      : "14px 14px 14px 4px",
                    background: isUser
                      ? "var(--surface-2)"
                      : "var(--background)",
                    border: isUser
                      ? "1px solid transparent"
                      : "1px solid var(--surface-2)",
                    fontSize: 13,
                    lineHeight: 1.55,
                  }}
                >
                  {/* Message text */}
                  <div>{msg.text}</div>

                  {/* Emotion + Sentiment */}
                  {!isUser &&
                    (msg.emotion || msg.sentiment) && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                          marginTop: 11,
                        }}
                      >
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

                  {/* Timestamp */}
                  {msg.timestamp && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 9,
                        color: "var(--muted)",
                        textAlign: isUser ? "right" : "left",
                      }}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        {/* AI loading */}
        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              color: "var(--muted)",
              fontSize: 12,
              marginBottom: 8,
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
          disabled={loading || historyLoading}
        />

        <button
          className="mm-save-btn"
          onClick={handleSend}
          disabled={!message.trim() || loading || historyLoading}
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