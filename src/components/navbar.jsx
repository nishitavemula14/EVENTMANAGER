import { useState } from "react";

export default function Navbar({
  eventCount,
  theme,
  activePage,
  cartItems,
  onNavigate,
  onToggleTheme,
}) {
  const [profile, setProfile] = useState({
    firstName: "Nicky",
    lastName: "Stone",
    phone: "",
    email: "",
  });
  const [profileDraft, setProfileDraft] = useState(profile);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const profileInitials =
    `${profile.firstName.trim().charAt(0)}${profile.lastName.trim().charAt(0)}`.toUpperCase() ||
    "U";

  function openProfilePopup() {
    setProfileDraft(profile);
    setProfileMessage("");
    setShowProfilePopup(true);
  }

  function closeProfilePopup() {
    setProfileDraft(profile);
    setProfileMessage("");
    setShowProfilePopup(false);
  }

  function handleProfileChange(field, value) {
    setProfileDraft({
      ...profileDraft,
      [field]: field === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    });
  }

  function handleProfileSave(event) {
    event.preventDefault();

    const nextProfile = {
      firstName: profileDraft.firstName.trim(),
      lastName: profileDraft.lastName.trim(),
      phone: profileDraft.phone.trim(),
      email: profileDraft.email.trim(),
    };

    if (nextProfile.firstName === "" || nextProfile.lastName === "") {
      setProfileMessage("Enter first name and last name");
      return;
    }

    if (nextProfile.phone !== "" && !/^\d{10}$/.test(nextProfile.phone)) {
      setProfileMessage("Phone number must be 10 digits");
      return;
    }

    setProfile(nextProfile);
    setProfileMessage("");
    setShowProfilePopup(false);
  }

  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Task Manager</p>
        <h1>Tasks</h1>
      </div>

      <div className="navbar-actions">
        <nav className="page-nav" aria-label="Pages">
          <button
            className={activePage === "tasks" ? "page-link active" : "page-link"}
            type="button"
            onClick={() => onNavigate("tasks")}
          >
            Tasks
          </button>
          <button
            className={
              activePage === "products" ? "page-link active" : "page-link"
            }
            type="button"
            onClick={() => onNavigate("products")}
          >
            Products
          </button>
        </nav>
        <div className="event-count" aria-live="polite">
          <span className="event-count-number">{eventCount}</span>
          <span>{eventCount === 1 ? "Event" : "Events"}</span>
        </div>
        <button
          className="cart-button"
          type="button"
          onClick={() => setShowCartPopup(true)}
          aria-haspopup="dialog"
        >
          Cart
          <span>{cartItems.length}</span>
        </button>
        <button className="theme-toggle" type="button" onClick={onToggleTheme}>
          {theme === "light" ? "Dark" : "Light"}
        </button>

        <div className="user-profile" aria-label="Current user profile">
          <button
            className="user-button"
            type="button"
            onClick={openProfilePopup}
            aria-haspopup="dialog"
            aria-label="Edit current user"
          >
            <span className="user-icon" aria-hidden="true">
              {profileInitials}
            </span>
          </button>
          <div className="user-meta">
            <span className="user-name">{profile.firstName}</span>
            <span className="user-role">Organizer</span>
          </div>
        </div>
      </div>

      {showCartPopup && (
        <div className="cart-overlay" role="presentation">
          <div
            className="cart-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="cart-popup-header">
              <h3 id="cart-title">Cart</h3>
              <button
                className="profile-close"
                type="button"
                onClick={() => setShowCartPopup(false)}
                aria-label="Close cart popup"
              >
                x
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="empty-state">No products added</p>
            ) : (
              <div className="cart-items">
                {cartItems.map((item, index) => (
                  <figure className="cart-item" key={`${item.id}-${index}`}>
                    <img src={item.thumbnail} alt={item.title} />
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showProfilePopup && (
        <div className="profile-overlay" role="presentation">
          <form
            className="profile-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-title"
            onSubmit={handleProfileSave}
          >
            <div className="profile-popup-header">
              <h3 id="profile-title">Current user</h3>
              <button
                className="profile-close"
                type="button"
                onClick={closeProfilePopup}
                aria-label="Close profile popup"
              >
                x
              </button>
            </div>

            <div className="profile-fields">
              <label>
                <span>First name</span>
                <input
                  value={profileDraft.firstName}
                  onChange={(event) =>
                    handleProfileChange("firstName", event.target.value)
                  }
                  placeholder="First name"
                />
              </label>
              <label>
                <span>Last name</span>
                <input
                  value={profileDraft.lastName}
                  onChange={(event) =>
                    handleProfileChange("lastName", event.target.value)
                  }
                  placeholder="Last name"
                />
              </label>
              <label>
                <span>Phone number</span>
                <input
                  value={profileDraft.phone}
                  onChange={(event) =>
                    handleProfileChange("phone", event.target.value)
                  }
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]*"
                  placeholder="Optional"
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  value={profileDraft.email}
                  onChange={(event) =>
                    handleProfileChange("email", event.target.value)
                  }
                  type="email"
                  placeholder="Optional"
                />
              </label>
            </div>

            <p className="profile-message">{profileMessage}</p>

            <div className="profile-actions">
              <button
                className="profile-cancel"
                type="button"
                onClick={closeProfilePopup}
              >
                Cancel
              </button>
              <button className="profile-save" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
