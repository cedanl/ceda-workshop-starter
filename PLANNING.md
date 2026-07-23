# PLANNING — CEDA Concept Workshop

Stateful overzicht van de workshopstappen. Wordt bijgewerkt na elke afgeronde stap.

| ID | Titel | Type | Status | Deps | Skill | Output |
|----|-------|------|--------|------|-------|--------|
| S1 | Strategy — doel & doelgroep site | taak | done | — | direct (target-audience n/a) | strategy.md — doelgroep: data-professionals HO (+ beleid); doel: menukaart CEDA-aanbod met 3 CTA-links |
| S2 | Content strategy — pagina's/content-typen | taak | done | S1 | content-seo | content-strategy.md — one-pager met 5 secties (hero, menukaart, over, meedoen, footer) + SEO/meta |
| S3 | Information Architecture — sitemap + componenten | taak | done | S2 | astrodeck agent | ia.md — sectie→component mapping. Hergebruik: Hero, ContentBlock, Header/Footer/Logo/Features (aanpassen). Nieuw: CTAMulti |
| S4 | UI/Implementatie — content in template/shadcn | taak | done | S3 | astrodeck agent | index.astro one-pager + nieuw CTAMulti; rebrand Header/Footer/Logo/SEO naar CEDA (lang=nl). KPI PASS, HTTP 200, 3 links (7/8/4×) |
| S5 | Testing/QA — mobiel, links, spelling | taak | done | S4 | plenum (6 agents) | plenum-2026-07-23.md; 17 fixes doorgevoerd (C1-C5 + 12 important/a11y). KPI PASS, HTTP 200 |
| S6 | Launch/Deploy | taak | open | S5 | — | — |

## Model log
- 2026-07-23: gewisseld naar **claude-sonnet-4-6** (ingesteld via `/model`, opgeslagen als default in `.claude/settings.json`)

## Log
- Onboarding (blok 1–3) doorlopen. Dev server draait op http://localhost:4321.
- Stap S1 (Strategy) afgerond — lokale target-audience skill niet beschikbaar, direct uitgevoerd → strategy.md.
- Stap S2 (Content strategy) afgerond via content-seo skill → content-strategy.md (one-pager, 5 secties).
- Stap S3 (Information Architecture) afgerond via astrodeck-agent → ia.md. Nieuw component nodig: CTAMulti (3 gelijkwaardige CTA-links).
- Stap S4 (UI/Implementatie) afgerond via astrodeck-agent. Zelf geverifieerd: KPI PASS, HTTP 200, 3 verplichte links aanwezig (github.com/cedanl 7×, npuls.nl 8×, community 4×).
- Stap S5 (Testing/QA) via /plenum multi-agent review → rapport in system/reports/. 17 fixes doorgevoerd (5 critical + 12 important/a11y). KPI PASS, HTTP 200.
