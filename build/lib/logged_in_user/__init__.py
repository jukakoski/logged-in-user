import streamlit as st

out = st.components.v2.component(
    "logged-in-user.logged_in_user",
    js="index-*.js",
    html='<div class="react-root"></div>',
)


def on_logout_clicked_change():
    """Callback function for when the logout button is clicked in the frontend."""
    pass


# Create a wrapper function for the component.
#
# This is an optional best practice. We could simply expose the component
# function returned by `st.components.v2.component` and call it done.
#
# The wrapper allows us to customize our component's API: we can pre-process its
# input args, post-process its output value, and add a docstring for users.
def logged_in_user(
    display_name,
    email,
    profile_photo_url=None,
    initials=None,
    logout_url=None,
    key=None,
):
    """Create a new instance of "logged_in_user".

    Parameters
    ----------
    display_name: str
        The display name of the logged-in user from auth claims.
    email: str
        The email of the logged-in user from auth claims.
    profile_photo_url: str, optional
        URL to the user's profile photo. If not provided, initials will be displayed.
    initials: str, optional
        User initials to display in the avatar if profile_photo_url is not provided.
    logout_url: str, optional
        URL to redirect to when the user clicks the logout button.
    key: str or None
        An optional key that uniquely identifies this component.

    Returns
    -------
    dict
        A dictionary containing:
        - logout_clicked (bool): Whether the logout button was clicked

    """
    # Call through to our private component function. Arguments we pass here
    # will be sent to the frontend, where they'll be available in an "args"
    # dictionary.
    #
    # "default" is a special argument that specifies the initial return
    # value of the component before the user has interacted with it.
    component_value = out(
        key=key,
        default={"logout_clicked": False},
        data={
            "display_name": display_name,
            "email": email,
            "profile_photo_url": profile_photo_url,
            "initials": initials,
            "logout_url": logout_url,
        },
        on_logout_clicked_change=on_logout_clicked_change,
    )

    return component_value
