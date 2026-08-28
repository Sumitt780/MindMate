import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Loader2,
  Send,
  Trash2,
  Sparkles,
  User,
} from "lucide-react";

import { api } from "../api";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  /* =========================
     Load chat history
     ========================= */

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

        setError(
          "Unable to load previous conversations."
        );
      } finally {
        setHistoryLoading(false);
      }
    };

    loadChatHistory();
  }, []);

  /* =========================
     Auto scroll chat only
     ========================= */

  useEffect(() => {
    const container =
      chatContainerRef.current;

    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTop =
        container.scrollHeight;
    });
  }, [
    messages,
    loading,
    historyLoading,
  ]);

  /* =========================
     Send message
     ========================= */

  const handleSend = async () => {
    const text = message.trim();

    if (!text || loading) return;

    setError("");

    const userMessage = {
      role: "user",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");
    setLoading(true);

    try {
      await api.saveChat(userMessage);

      const result =
        await api.chat(text);

      const aiMessage = {
        role: "ai",
        text:
          result?.response ||
          "I'm here with you. Tell me a little more.",
        emotion:
          result?.emotion?.emotion ||
          null,
        sentiment:
          result?.sentiment?.sentiment ||
          null,
        timestamp: Date.now(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      await api.saveChat(aiMessage);

    } catch (err) {
      console.error(
        "MindMate AI error:",
        err
      );

      setError(
        "MindMate AI is currently unavailable. Please try again in a moment."
      );

    } finally {
      setLoading(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  /* =========================
     Clear chat
     ========================= */

  const handleClearChat = async () => {
    if (
      loading ||
      messages.length === 0
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to clear your chat history?"
      );

    if (!confirmed) return;

    try {
      setError("");

      await api.clearChat();

      setMessages([]);

    } catch (err) {
      console.error(
        "Clear chat error:",
        err
      );

      setError(
        "Unable to clear chat history."
      );
    }
  };

  /* =========================
     Keyboard
     ========================= */

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSend();
    }
  };

  /* =========================
     Time
     ========================= */

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    return new Date(
      timestamp
    ).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  /* =========================
     Emotion styles
     ========================= */

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
        emoji: "🙂",
      },
    };

    return (
      styles[emotion] ||
      styles.neutral
    );
  };

  return (
    <section className="mm-ai-card">

      {/* =========================
          Header
          ========================= */}

      <div className="mm-ai-header">

        <div className="mm-ai-heading">

          <div className="mm-ai-icon">
            <Bot size={19} />
          </div>

          <div>

            <div className="mm-section-kicker">
              <Sparkles size={13} />
              MINDMATE AI
            </div>

            <h2 className="mm-ai-title">
              Talk it out
            </h2>

            <p className="mm-ai-subtitle">
              A private space to reflect,
              explore, and be heard.
            </p>

          </div>

        </div>

        <button
          type="button"
          className="mm-ai-clear"
          onClick={handleClearChat}
          disabled={
            loading ||
            messages.length === 0
          }
          aria-label="Clear chat"
          title="Clear chat"
        >
          <Trash2 size={15} />
          <span>Clear</span>
        </button>

      </div>

      {/* =========================
          Chat messages
          ========================= */}

      <div
        ref={chatContainerRef}
        className="mm-ai-messages"
      >

        {historyLoading ? (

          <div className="mm-ai-loading-history">

            <Loader2
              className="mm-spin"
              size={18}
            />

            <span>
              Loading your conversations...
            </span>

          </div>

        ) : messages.length === 0 ? (

          <div className="mm-ai-empty">

            <div className="mm-ai-empty-icon">
              <Bot size={24} />
            </div>

            <strong>
              What's on your mind?
            </strong>

            <p>
              You can talk about your day,
              your feelings, or anything
              you'd like to reflect on.
            </p>

            <div className="mm-ai-suggestions">

              <button
                type="button"
                onClick={() =>
                  setMessage(
                    "I'm feeling a little stressed today."
                  )
                }
              >
                I'm feeling stressed
              </button>

              <button
                type="button"
                onClick={() =>
                  setMessage(
                    "I had a good day and want to reflect on it."
                  )
                }
              >
                I had a good day
              </button>

            </div>

          </div>

        ) : (

          <div className="mm-ai-message-list">

            {messages.map(
              (msg, index) => {

                const isUser =
                  msg.role === "user";

                const emotionStyle =
                  !isUser &&
                  msg.emotion
                    ? getEmotionStyle(
                        msg.emotion
                      )
                    : null;

                return (
                  <div
                    key={
                      `${msg.timestamp || "message"}-${index}`
                    }
                    className={`mm-ai-message ${
                      isUser
                        ? "user"
                        : "ai"
                    }`}
                  >

                    <div className="mm-ai-message-avatar">

                      {isUser ? (
                        <User size={14} />
                      ) : (
                        <Bot size={14} />
                      )}

                    </div>

                    <div className="mm-ai-message-content">

                      <div className="mm-ai-message-meta">

                        <strong>
                          {isUser
                            ? "You"
                            : "MindMate"}
                        </strong>

                        <span>
                          {formatTime(
                            msg.timestamp
                          )}
                        </span>

                      </div>

                      <div
                        className="mm-ai-bubble"
                        style={
                          emotionStyle
                            ? {
                                background:
                                  emotionStyle.background,

                                border:
                                  emotionStyle.border,

                                color:
                                  emotionStyle.color,
                              }
                            : undefined
                        }
                      >
                        {msg.text}
                      </div>

                      {!isUser &&
                        msg.emotion && (

                          <div
                            className="mm-ai-emotion"
                            style={{
                              color:
                                emotionStyle.color,

                              background:
                                emotionStyle.background,

                              border:
                                emotionStyle.border,
                            }}
                          >

                            <span>
                              {
                                emotionStyle.emoji
                              }
                            </span>

                            <span>
                              {msg.emotion}
                            </span>

                            {msg.sentiment && (
                              <>
                                <span>
                                  ·
                                </span>

                                <span>
                                  {
                                    msg.sentiment
                                  }
                                </span>
                              </>
                            )}

                          </div>

                        )}

                    </div>

                  </div>
                );
              }
            )}

            {/* Typing indicator */}

            {loading && (

              <div className="mm-ai-message ai">

                <div className="mm-ai-message-avatar">
                  <Bot size={14} />
                </div>

                <div className="mm-ai-message-content">

                  <div className="mm-ai-message-meta">

                    <strong>
                      MindMate
                    </strong>

                    <span>
                      thinking...
                    </span>

                  </div>

                  <div className="mm-ai-typing">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>

              </div>

            )}

          </div>

        )}

      </div>

      {/* =========================
          Error
          ========================= */}

      {error && (
        <div className="mm-ai-error">
          {error}
        </div>
      )}

      {/* =========================
          Input
          ========================= */}

      <div className="mm-ai-input-area">

        <textarea
          ref={inputRef}
          className="mm-ai-input"
          value={message}
          onChange={(event) =>
            setMessage(
              event.target.value
            )
          }
          onKeyDown={handleKeyDown}
          placeholder="Write what's on your mind..."
          rows={2}
          disabled={loading}

          /* =========================
             IMPORTANT:
             Force typed text visibility
             ========================= */

          style={{
            color: "#ffffff",
            WebkitTextFillColor: "#ffffff",
            caretColor: "#ffffff",
          }}
        />

        <button
          type="button"
          className="mm-ai-send"
          onClick={handleSend}
          disabled={
            !message.trim() ||
            loading
          }
          aria-label="Send message"
        >

          {loading ? (
            <Loader2
              className="mm-spin"
              size={17}
            />
          ) : (
            <Send size={17} />
          )}

        </button>

      </div>

      <div className="mm-ai-hint">
        Press Enter to send · Shift + Enter
        for a new line
      </div>

    </section>
  );
}