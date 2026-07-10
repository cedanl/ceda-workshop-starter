#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "── Claude Code CLI installeren ──"
npm install -g @anthropic-ai/claude-code --allow-scripts=@anthropic-ai/claude-code

echo "── Entire CLI installeren ──"
curl -fsSL https://entire.io/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"

echo "── Entire inschakelen voor dit project ──"
entire enable 2>/dev/null || true

echo "── Live-preview server installeren ──"
npm install -g serve

# ── onboard + preview als echte executables in PATH ──
# Geen bashrc-functie nodig — werkt in elke terminal ongeacht shell-config.

cat > "$HOME/.local/bin/onboard" << SCRIPT
#!/usr/bin/env bash
source "${REPO_ROOT}/.devcontainer/onboard.sh"
SCRIPT
chmod +x "$HOME/.local/bin/onboard"

cat > "$HOME/.local/bin/preview" << 'SCRIPT'
#!/usr/bin/env bash
exec serve "${1:-.}" -l 3000
SCRIPT
chmod +x "$HOME/.local/bin/preview"

# ── Shell setup ──
cat >> ~/.bashrc << 'BASHRC'

# Entire CLI + onboard/preview
export PATH="$HOME/.local/bin:$PATH"

# Foundry credentials laden als die er zijn
if [[ -f "$HOME/.claude/secrets.sh" ]]; then
  source "$HOME/.claude/secrets.sh"
fi

# Tip bij eerste terminal als credentials nog niet ingesteld zijn
if [[ -z "${ANTHROPIC_FOUNDRY_API_KEY:-}" ]] && [[ -z "${_ONBOARD_PROMPTED:-}" ]]; then
  export _ONBOARD_PROMPTED=1
  echo ""
  echo -e "\033[1m\033[36m  Tip: typ 'onboard' om je Foundry-credentials in te stellen.\033[0m"
  echo ""
fi
BASHRC

echo "── Klaar ──"
echo "Open een nieuwe terminal en typ 'onboard' om je credentials in te stellen."
