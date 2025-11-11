import streamlit as st
from logged_in_user import logged_in_user

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run logged_in_user/example.py`

# Initialize session state for logout tracking
if "logout_clicked_1" not in st.session_state:
    st.session_state.logout_clicked_1 = False

if "logout_clicked_2" not in st.session_state:
    st.session_state.logout_clicked_2 = False

st.subheader("User Menu Component with Mock Data")

# Mock data for testing the user menu component
mock_user_data = {
    "display_name": "John Doe",
    "email": "john.doe@example.com",
    "profile_photo_url": "https://i.pravatar.cc/150?img=12",
    "initials": "JD",
    "logout_url": "https://example.com/logout",
}

# Create an instance of our component with mock user data
result = logged_in_user(
    display_name=mock_user_data["display_name"],
    email=mock_user_data["email"],
    profile_photo_url=mock_user_data["profile_photo_url"],
    initials=mock_user_data["initials"],
    logout_url=mock_user_data["logout_url"],
    key="user1",
)

st.write(f"Result: `{result}`")

# Check for state change
if result and result.get("logout_clicked") and not st.session_state.logout_clicked_1:
    st.warning("✅ Logout button was clicked!")
    st.session_state.logout_clicked_1 = True

# Reset logic
if (
    result
    and not result.get("logout_clicked")
    and st.session_state.logout_clicked_1
    and False
):
    st.session_state.logout_clicked_1 = False


st.markdown("---")
st.subheader("User Menu without Profile Photo")

# Test with user without profile photo (will show initials)
mock_user_no_photo = {
    "display_name": "Jane Smith",
    "email": "jane.smith@example.com",
    "initials": "JS",
    "logout_url": "https://example.com/logout",
}

result2 = logged_in_user(
    display_name=mock_user_no_photo["display_name"],
    email=mock_user_no_photo["email"],
    initials=mock_user_no_photo["initials"],
    logout_url=mock_user_no_photo["logout_url"],
    key="user2",
)

st.write(f"Result 2: `{result2}`")

# Check for state change
if result2 and result2.get("logout_clicked") and not st.session_state.logout_clicked_2:
    st.warning("✅ Logout button was clicked for user 2!")
    st.session_state.logout_clicked_2 = True

# Reset logic
if result2 and not result2.get("logout_clicked") and st.session_state.logout_clicked_2:
    st.session_state.logout_clicked_2 = False
