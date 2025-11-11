import streamlit as st
from logged_in_user import logged_in_user

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run logged_in_user/example.py`

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
)

if result.get("logout_clicked"):
    st.warning("Logout button was clicked!")

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

if result2.get("logout_clicked"):
    st.warning("Logout button was clicked for user 2!")
