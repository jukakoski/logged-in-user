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

```python
import streamlit as st

from logged_in_user import logged_in_user

value = logged_in_user()

st.write(value)
```

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
