import { ComponentArgs } from "@streamlit/component-v2-lib";
import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type MyComponentStateShape = {
  logout_clicked: boolean;
};

export type MyComponentDataShape = {
  display_name: string;
  email: string;
  profile_photo_url?: string;
  initials?: string;
  logout_url?: string;
};

export type MyComponentProps = Pick<
  ComponentArgs<MyComponentStateShape, MyComponentDataShape>,
  "setStateValue"
> &
  MyComponentDataShape;

/**
 * User menu component showing logged in user based on auth claims
 * with popover button to enable logging out
 *
 * @param props.display_name - User's display name from auth claims
 * @param props.email - User's email from auth claims
 * @param props.profile_photo_url - Optional profile photo URL
 * @param props.initials - Optional user initials for avatar fallback
 * @param props.logout_url - URL to redirect to for logout
 * @param props.setStateValue - Function to send state updates back to Streamlit
 * @returns The rendered component
 */
const MyComponent: FC<MyComponentProps> = ({
  display_name,
  email,
  profile_photo_url,
  initials,
  logout_url,
  setStateValue,
}): ReactElement => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!showMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // small delay to allow menu click events to process
        setTimeout(() => {
          setShowMenu(false);
        }, 100);
        //
      }
    };

    // Add a small delay to prevent immediate closure when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, true);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showMenu]);

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Close the menu first
    setShowMenu(false);

    // Notify Streamlit that logout was clicked
    setStateValue("logout_clicked", true);

    if (logout_url) {
      // Delay to allow Streamlit to register the state change before redirecting
      setTimeout(() => {
        window.location.href = logout_url;
      }, 300);
    }
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: "relative",
        display: "inline-block",
        textAlign: "right",
      }}
    >
      {/* User info and avatar */}
      <div
        onClick={handleAvatarClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: "1.2",
            }}
          >
            {display_name}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#888",
              lineHeight: "1.2",
            }}
          >
            {email}
          </div>
        </div>

        {/* Avatar */}
        {profile_photo_url ? (
          <div
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #667eea",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={profile_photo_url}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "14px",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {initials || "?"}
          </div>
        )}
      </div>

      {/* Dropdown menu */}
      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "0",
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
            minWidth: "200px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "12px",
              color: "#888",
            }}
          >
            ACCOUNT
          </div>
          <div style={{ padding: "12px 16px" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: "2px",
              }}
            >
              {display_name}
            </div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              {email}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #f0f0f0", padding: "8px 0" }}>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                color: "#d32f2f",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              🚪 Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
