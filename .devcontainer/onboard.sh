#!/usr/bin/env bash
# =============================================================================
# onboard.sh — Onboarding wizard (CEDA Workshop)
# =============================================================================
# Stelt Anthropic Foundry credentials in voor Claude Code en installeert
# de superpowers plugin.
#
# Starten via:  onboard
# =============================================================================

# Bewaar huidige shell-opties en herstel ze bij exit (voorkomt dat set -u
# de interactieve shell breekt wanneer dit script gesourced wordt).
_onboard_oldopts="$(set +o)"
set -uo pipefail
trap 'eval "$_onboard_oldopts"; unset _onboard_oldopts' RETURN 2>/dev/null || true

BOLD='\033[1m'
DIM='\033[2m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
RESET='\033[0m'

_done()    { echo -e "  ${GREEN}✔${RESET}  $*"; }
_skip()    { echo -e "  ${DIM}–${RESET}  $* ${DIM}(overgeslagen)${RESET}"; }
_info()    { echo -e "  ${CYAN}ℹ${RESET}  $*"; }

_claude_configured() {
  local secrets="$HOME/.claude/secrets.sh"
  [[ -f "$secrets" ]] \
    && grep -qE 'ANTHROPIC_FOUNDRY_API_KEY="[^"]+"' "$secrets" \
    && grep -qE 'ANTHROPIC_FOUNDRY_RESOURCE="[^"]+"' "$secrets"
}

_ask_yn() {
  local prompt="$1" default="${2:-Y}" hint
  if [[ "${default^^}" == "Y" ]]; then hint="[J/n]"; else hint="[j/N]"; fi
  while true; do
    read -r -p "$(echo -e "  ${YELLOW}?${RESET}  ${prompt} ${DIM}${hint}${RESET} ")" answer
    answer="${answer:-$default}"
    case "${answer^^}" in
      Y|J) return 0 ;; N) return 1 ;; *) echo "  Antwoord met j of n." ;;
    esac
  done
}

main() {
  echo ""
  echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════╗${RESET}"
  echo -e "${BOLD}${CYAN}║         CEDA Workshop — onboarding           ║${RESET}"
  echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════╝${RESET}"
  echo ""

  # ── Stap 1: Foundry credentials ──

  local run_creds=true

  if _claude_configured; then
    _done "Foundry-credentials zijn al ingesteld."
    echo ""
    if ! _ask_yn "Opnieuw instellen?" "N"; then
      _skip "Credential setup"
      echo ""
      run_creds=false
    fi
  fi

  if [[ "$run_creds" == true ]]; then
    _info "Claude Code gebruikt Azure Foundry om verbinding te maken met Anthropic-modellen."
    _info "Je hebt de credentials van de workshop-begeleider ontvangen."
    echo ""

    read -rsp "$(echo -e "  ${YELLOW}?${RESET}  Foundry API key (verborgen invoer): ")" api_key
    echo ""

    if [[ -z "$api_key" ]]; then
      _skip "Geen key ingevoerd. Typ ${BOLD}onboard${RESET} om opnieuw te proberen."
      echo ""
      return 0
    fi

    read -rp "$(echo -e "  ${YELLOW}?${RESET}  Foundry resource naam: ")" resource
    echo ""

    if [[ -z "$resource" ]]; then
      _skip "Geen resource naam ingevoerd. Typ ${BOLD}onboard${RESET} om opnieuw te proberen."
      echo ""
      return 0
    fi

    export ANTHROPIC_FOUNDRY_API_KEY="$api_key"
    export ANTHROPIC_FOUNDRY_RESOURCE="$resource"

    local secrets="$HOME/.claude/secrets.sh"
    mkdir -p "$(dirname "$secrets")"
    printf 'export ANTHROPIC_FOUNDRY_API_KEY="%s"\n' "$api_key" > "$secrets"
    printf 'export ANTHROPIC_FOUNDRY_RESOURCE="%s"\n' "$resource" >> "$secrets"
    chmod 600 "$secrets"

    echo ""
    _done "Credentials opgeslagen en geexporteerd."

    # Als het script als subshell draait (niet gesourced), werken de exports
    # niet in de aanroepende shell. Geef dan een hint.
    if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
      echo ""
      _info "Dit script draaide als subshell — voer dit uit om de credentials"
      _info "in je huidige terminal te laden:"
      echo ""
      echo -e "  ${BOLD}source ~/.claude/secrets.sh${RESET}"
      echo ""
      _info "Of open gewoon een nieuwe terminal."
    fi

    echo ""
  fi

  # ── Stap 2: Superpowers plugin ──

  if claude plugin list 2>/dev/null | grep -q 'superpowers'; then
    _done "Superpowers plugin is al geinstalleerd."
  else
    _info "Superpowers plugin installeren (TDD, debugging, planning skills)..."
    if claude plugin add obra/superpowers --yes; then
      _done "Superpowers plugin geinstalleerd."
    else
      _skip "Superpowers installatie mislukt — je kunt dit later handmatig doen:"
      _info "  claude plugin add obra/superpowers"
    fi
  fi

  echo ""
  _done "Alles klaar!"
  echo ""
  echo -e "${BOLD}  Beschikbare commando's:${RESET}"
  _info "Typ ${BOLD}claude${RESET}             om te beginnen met bouwen."
  _info "Typ ${BOLD}preview${RESET}            om je site lokaal te bekijken."
  _info "Typ ${BOLD}entire status${RESET}       om je sessie-opnames te zien."
  echo ""
  echo -e "${BOLD}${CYAN}  Over Entire:${RESET}"
  _info "Entire draait op de achtergrond en legt automatisch je AI-sessies vast"
  _info "(prompts, antwoorden, bestanden, tokens). Dit helpt om achteraf te zien"
  _info "hoe het concept tot stand is gekomen."
  _info "Bekijk opnames: ${BOLD}entire status${RESET} of ${BOLD}entire replay${RESET}"
  _info "Dashboard:      ${DIM}https://app.entire.io${RESET}"
  echo ""
}

main "$@"
