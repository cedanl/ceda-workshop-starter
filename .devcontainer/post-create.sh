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

# ── Shell setup ──
# Onboard-pad wordt apart geschreven (heeft build-time expansie nodig),
# de rest gebruikt een quoted heredoc om escaping-fouten te voorkomen.
echo "" >> ~/.bashrc
echo "# Onboard shortcut" >> ~/.bashrc
echo "onboard() { source \"${REPO_ROOT}/.devcontainer/onboard.sh\"; }" >> ~/.bashrc

cat >> ~/.bashrc << 'BASHRC'

# Entire CLI
export PATH="$HOME/.local/bin:$PATH"

# Foundry credentials laden als die er zijn
if [[ -f "$HOME/.claude/secrets.sh" ]]; then
  source "$HOME/.claude/secrets.sh"
fi

# Preview shortcut — start een lokale server voor de statische site
preview() { serve "${1:-.}" -l 3000; }

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
