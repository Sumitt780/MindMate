import {
  LayoutDashboard,
  BookOpen,
  MessageCircle,
  Sprout,
  BarChart3,
  History,
  User,
  Settings,
  LogOut,
  Flower2,
  X,
} from "lucide-react";

export default function Sidebar({
  activeItem = "Dashboard",
  onNavigate,
  onLogout,
  username,
  mobileOpen = false,
  onClose,
}) {
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Journal",
      icon: BookOpen,
    },
    {
      label: "Chat with AI",
      icon: MessageCircle,
    },
    {
      label: "My Garden",
      icon: Sprout,
    },
    {
      label: "Insights",
      icon: BarChart3,
    },
    {
      label: "History",
      icon: History,
    },
  ];

  const bottomItems = [
    {
      label: "Profile",
      icon: User,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];

  const handleNavigate = (label) => {
    if (onNavigate) {
      onNavigate(label);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="mm-sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`mm-sidebar ${
          mobileOpen ? "mm-sidebar-open" : ""
        }`}
      >
        {/* Logo */}
        <div className="mm-sidebar-brand">
          <div className="mm-sidebar-logo">
            <Flower2 size={21} strokeWidth={2.2} />
          </div>

          <div>
            <div className="mm-sidebar-title">
              MindMate
            </div>

            <div className="mm-sidebar-subtitle">
              Your wellness space
            </div>
          </div>

          <button
            className="mm-sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main navigation */}
        <nav className="mm-sidebar-nav">
          <div className="mm-sidebar-section-label">
            MENU
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const active =
              activeItem === item.label;

            return (
              <button
                key={item.label}
                type="button"
                className={`mm-sidebar-item ${
                  active ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigate(item.label)
                }
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2.3 : 2}
                />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom navigation */}
        <div className="mm-sidebar-bottom">
          <div className="mm-sidebar-section-label">
            ACCOUNT
          </div>

          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active =
              activeItem === item.label;

            return (
              <button
                key={item.label}
                type="button"
                className={`mm-sidebar-item ${
                  active ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigate(item.label)
                }
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2.3 : 2}
                />

                <span>{item.label}</span>
              </button>
            );
          })}

          {/* User */}
          <div className="mm-sidebar-user">
            <div className="mm-sidebar-avatar">
              {(username || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="mm-sidebar-user-info">
              <strong>
                {username || "User"}
              </strong>

              <span>MindMate member</span>
            </div>

            <button
              type="button"
              className="mm-sidebar-logout"
              onClick={onLogout}
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}