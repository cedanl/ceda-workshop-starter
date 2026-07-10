#!/usr/bin/env bash
# Geen set -e: individuele fouten mogen de rest niet blokkeren.
set -uo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "── Claude Code CLI installeren ──"
npm install -g @anthropic-ai/claude-code --allow-scripts=@anthropic-ai/claude-code || echo "⚠ Claude Code installatie mislukt"

echo "── Entire CLI installeren ──"
curl -fsSL https://entire.io/install.sh | bash || echo "⚠ Entire CLI installatie mislukt"
export PATH="$HOME/.local/bin:$PATH"

echo "── Entire inschakelen voor dit project ──"

echo "── Live-preview server installeren ──"
npm install -g serve || echo "⚠ serve installatie mislukt"

# ── onboard + preview als executables in PATH ──

cat > "$HOME/.local/bin/onboard" << SCRIPT
#!/usr/bin/env bash
source "${REPO_ROOT}/.devcontainer/onboard.sh"
SCRIPT
chmod +x "$HOME/.local/bin/onboard"

cat > "$HOME/.local/bin/preview" << 'SCRIPT'
#!/usr/bin/env bash
exec npx -y serve "${1:-.}" -l 3000
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
echo "Typ 'onboard' om je credentials in te stellen."
