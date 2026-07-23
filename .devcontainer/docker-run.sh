#!/usr/bin/env bash
# Start de CEDA-site in een container met port 4321 gepubliceerd.
# Gebruik: bash .devcontainer/docker-run.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

docker run -it --rm \
  -p 4321:4321 \
  -v "${REPO_ROOT}:/workspaces/ceda-workshop-starter" \
  -w /workspaces/ceda-workshop-starter \
  mcr.microsoft.com/devcontainers/base:debian \
  bash -c "
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs \
    && npm install \
    && npm run dev
  "
