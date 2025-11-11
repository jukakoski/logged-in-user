# logged-in-user

Shows logged in user and enables to logout using popover button.

## Installation instructions

```sh
uv pip install logged-in-user
```

### Development install (editable)

When developing this component locally, install it in editable mode so Streamlit picks up code changes without rebuilding a wheel. Run this from the directory that contains `pyproject.toml`:

```sh
uv pip install -e . --force-reinstall
```

## Usage instructions

### Basic Usage

Import and use the component in your Streamlit app by passing user authentication claims:

```python
import streamlit as st
from logged_in_user import logged_in_user

# Display the user menu with auth claims
result = logged_in_user(
    display_name="John Doe",
    email="john.doe@example.com",
    profile_photo_url="https://example.com/photo.jpg",  # Optional
    initials="JD",  # Optional - used as fallback if no profile photo
    logout_url="https://example.com/logout"  # Optional
)

# Check if logout was clicked
if result.get("logout_clicked"):
    st.info("User initiated logout")
```

### Parameters

- **display_name** (str, required): The display name of the logged-in user from auth claims
- **email** (str, required): The email address of the logged-in user from auth claims
- **profile_photo_url** (str, optional): URL to the user's profile photo. If not provided, initials will be displayed in a gradient avatar
- **initials** (str, optional): User initials to display in the avatar if `profile_photo_url` is not provided
- **logout_url** (str, optional): URL to redirect to when the user clicks the logout button
- **key** (str, optional): A unique identifier for this component instance (useful when using multiple instances)

### Returns

The component returns a dictionary with the following key:
- **logout_clicked** (bool): `True` when the logout button is clicked, `False` otherwise

### Advanced Example

```python
import streamlit as st
from logged_in_user import logged_in_user

# Example with dynamic user data
if "user_data" in st.session_state:
    user = st.session_state.user_data
    
    result = logged_in_user(
        display_name=user["name"],
        email=user["email"],
        profile_photo_url=user.get("photo_url"),
        initials=user.get("initials"),
        logout_url="/logout",
        key="main_user_menu"
    )
    
    if result.get("logout_clicked"):
        # Handle logout logic
        del st.session_state.user_data
        st.rerun()
```

### Development Usage

To see the component in action, run the example app:

```sh
streamlit run example.py
```

This will open a Streamlit app showing two example user menu instances with different configurations.

## Build a wheel

To package this component for distribution:

1. Build the frontend assets (from `logged_in_user/frontend`):

   ```sh
   npm i
   npm run build
   ```

2. Build the Python wheel using UV (from the project root):
   ```sh
   uv build
   ```

This will create a `dist/` directory containing your wheel. The wheel includes the compiled frontend from `logged_in_user/frontend/build`.

### Requirements

- Python >= 3.10
- Node.js >= 24 (LTS)

### Expected output

- `dist/logged_in_user-0.0.1-py3-none-any.whl`
- If you run `uv run --with build python -m build` (without `--wheel`), you’ll also get an sdist: `dist/logged-in-user-0.0.1.tar.gz`

### How to use in project

#### Installation from PyPI

Once published, you can install the component in your Streamlit project:

```sh
pip install logged-in-user
```

#### Installation from GitHub

To use the latest development version:

```sh
pip install git+https://github.com/yourusername/logged-in-user.git
```

#### In your Streamlit app (`app.py`):

```python
import streamlit as st
from logged_in_user import logged_in_user

st.title("My App with User Authentication")

# Example: Use with OAuth or session state
if "user" in st.session_state:
    result = logged_in_user(
        display_name=st.session_state.user["name"],
        email=st.session_state.user["email"],
        profile_photo_url=st.session_state.user.get("photo_url"),
        initials=st.session_state.user.get("initials"),
        logout_url="/logout"
    )
    
    if result.get("logout_clicked"):
        # Clear session and redirect
        del st.session_state.user
        st.rerun()
else:
    st.info("Please log in to continue")
```

### Development Setup

#### Prerequisites

- Python >= 3.10
- Node.js >= 24 (LTS)
- npm or yarn

#### Local Development

1. Clone the repository and navigate to the project directory:

   ```sh
   git clone https://github.com/yourusername/logged-in-user.git
   cd logged-in-user
   ```

2. Create a Python virtual environment (optional but recommended):

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies in editable mode:

   ```sh
   uv pip install -e . --force-reinstall
   ```

4. Build the frontend assets (from `logged_in_user/frontend`):

   ```sh
   cd logged_in_user/frontend
   npm install
   npm run start  # Start the dev server with hot reload
   ```

5. In a new terminal, run the example Streamlit app:

   ```sh
   streamlit run example.py
   ```

6. The Streamlit app will automatically reflect frontend changes as you develop

### Component Features

- **User Avatar Display**: Shows profile photo if available, otherwise displays initials in a styled gradient avatar
- **Hover Effects**: Avatar scales on hover for better interactivity
- **Popover Menu**: Click-activated dropdown menu showing account info
- **Logout Button**: Styled logout button with hover effects
- **Click-Outside Handling**: Menu automatically closes when clicking outside
- **Responsive Design**: Works on various screen sizes
- **Auth Claims Integration**: Displays user information from authentication claims

### Architecture

This is a **bi-directional Streamlit Component**, meaning it can:
- Receive data from Python (auth claims and logout URL)
- Send data back to Python (logout click events)

The component consists of:
- **Frontend**: React + TypeScript component built with Vite
- **Backend**: Python wrapper using Streamlit's custom component API