import os
from pathlib import Path

# Recreate the project structure after kernel reset
base_path = Path("./metaos_mistral")
folders = [
    "memory",
    "prompts",
    "flows",
    "ui"
]
files = {
    "memory/logs.json": "{}",
    "prompts/base_prompt.txt": "You are an agent reflecting user's emotional rhythm and suggesting next actions.",
    "flows/core_loop.py": "# Main logic loop for state-action-response",
    "flows/state_manager.py": "# State detection and update logic",
    "flows/emotion_router.py": "# Emotional context based routing logic",
    "ui/streamlit_app.py": "# Streamlit interface for testing"
}

# Create directories
for folder in folders:
    os.makedirs(base_path / folder, exist_ok=True)

# Create files with initial content
for filepath, content in files.items():
    with open(base_path / filepath, "w", encoding="utf-8") as f:
        f.write(content)

# Display the base path for download or use
base_path.name
