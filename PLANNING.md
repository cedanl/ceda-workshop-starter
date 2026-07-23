# PLANNING.md – CEDA Workshop

## Model log
- 2026-07-23: claude-sonnet-4-6 (default)

## Ontwerp-beslissingen (sessie 2026-07-23)

**Concept**: Voorzieningenwijzer-stijl tool voor CEDA
**Artifact (preview)**: https://claude.ai/code/artifact/d7446e5e-0231-413c-a5e6-3c9f86c23cc0
**Design file**: `system/ceda-design-concept.html`

### Structuur
- Horizontale student-reis tabs (waardestroom)
- Cards grid per stadium (use cases)
- Detail panel rechts: Omschrijving + Data & methoden
- Totaaloverzicht databronnen onderaan

### Student-reis stadia
Werving → Selectie & Matching (GAP) → Inschrijving → Onderwijs → Evaluatie (GAP) → Arbeidsmarkt (GAP)

### Databronnen
| Bron | Status |
|------|--------|
| SIS | Beschikbaar |
| 1CHO | Beschikbaar |
| CBS Microdata | Beschikbaar |
| DUO Open Data | Beschikbaar |
| HBO-Monitor | Beschikbaar |
| IguideME | Beschikbaar |
| LRS | In ontwikkeling |
| UWV Data | In ontwikkeling |
| BRON | Nog niet ontsloten |
| MBO Transparant | Nog niet ontsloten |

---

## Stappentabel

| ID | Titel | Type | Status | Deps | Skill | Output |
|----|-------|------|--------|------|-------|--------|
| S1 | Strategy | besluit | done | — | — | CEDA = voorzieningenwijzer voor educatieve data analytics |
| S2 | Content strategy | besluit | done | S1 | — | 6 stadia, 12 use cases, databronnen overzicht |
| S3 | Information Architecture | besluit | done | S2 | — | Tabs + cards + detail panel + totaaloverzicht |
| S4 | UI/Implementatie | taak | actief | S3 | astrodeck | Design in `system/ceda-design-concept.html`, bouwen in src/ |
| S5 | Testing/QA | taak | open | S4 | qa | — |
| S6 | Launch/Deploy | taak | open | S5 | — | — |
