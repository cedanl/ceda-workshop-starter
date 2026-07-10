# Handoff — Builder → Engineer

Datum: 2026-07-10
Builder: Claude (autonoom, branch `workshop/claude-solo`)

---

## Wat is gebouwd

Eén losstaand HTML-bestand: `index.html` (726 regels, inline CSS, geen externe bestanden behalve een font-CDN).

**Secties op de pagina (van boven naar beneden):**

| Sectie | Inhoud |
|--------|--------|
| Nav | Sticky navigatiebalk met CEDA-logo (SVG stippenmark), Npuls-badge, ankermenu en GitHub CTA-knop |
| Hero | Grote kop + subtekst + pay-off "Onderwijs bewegen." + twee CTA-knoppen + 3×3 grid met geometrische vormen (Npuls vormentaal) + decoratieve boog |
| Over CEDA | Inleidende tekst in twee kolommen + vier stats-kaarten (40+, 100%, 1, ∞) |
| Aanbod | Vier kaarten: Open Source Tools (blauw), Data Analyse (groen), Kennisdeling (oranje), Innovatie & Onderzoek (geel) |
| Ecosysteem | Drie externe links als klikbare kaarten: GitHub, Npuls, Community |
| Footer | CEDA-naam + pay-off + drie links |

**Gekozen stijl:** Npuls brandbook (brandbook.pdf, aanwezig in repo):
- Kleuren: oranje `#DD784B`, blauw `#3D68EC`, groen `#00AF81`, geel `#F4D74B`, roze `#F4D9DC` + lichte varianten
- Font: General Sans (via FontShare CDN), fallback `system-ui`
- Vormentaal: geometrische tiles in hero, decoratieve bogen
- Toon copy: uitnodigend-persoonlijk

---

## Tech stack

| Onderdeel | Keuze |
|-----------|-------|
| HTML | Plain HTML5, één bestand |
| CSS | Inline `<style>`, CSS custom properties voor kleuren |
| JavaScript | Geen — niet nodig |
| Font | General Sans via `api.fontshare.com` (CDN) |
| Afbeeldingen | Geen — alles SVG inline |
| Build-stap | **Nee** — direct droppable |

**Droppable op vercel.com/drop?** Ja. `index.html` is een volledig zelfstandig bestand. Sleep het naar vercel.com/drop en het werkt direct. Enige externe afhankelijkheid is het FontShare CDN (font laadt niet bij geen internet; fallback is `system-ui`).

---

## Vergelijking met briefing.md

| Briefing-onderdeel | Status |
|--------------------|--------|
| Moderne website | ✅ Gebouwd |
| Doorlink GitHub (`github.com/cedanl`) | ✅ In nav, hero, aanbodkaart én ecosysteem |
| Doorlink Npuls (`npuls.nl`) | ✅ In ecosysteem + footer |
| Doorlink Community | ✅ In hero, aanbodkaart én ecosysteem |
| Werkend op localhost zonder configuratie | ✅ Open `index.html` in browser, klaar |
| Droppable op vercel.com/drop | ✅ Ja, geen build-stap |
| No-Gos | Geen No-Gos gedefinieerd in briefing — geen conflicten |

**Niet gebouwd (buiten scope):**
- Contactformulier (vereist backend, staat niet in briefing)
- Zoekfunctie
- Login / account

---

## Waarom deze keuzes

**Eén pagina (scroll):** Simpelste weg naar het succescriterium. Eén bestand = één URL = makkelijkst te droppen en te delen. Bij meer content later op te splitsen.

**Npuls brandbook als stijlbasis:** Het brandbook lag al in de repo — logisch om te volgen voor herkenbaarheid binnen het Npuls-ecosysteem.

**Inline CSS:** Geen aparte stylesheet nodig voor één pagina. Minder bestanden = makkelijker te droppen.

**Geen JavaScript:** De pagina heeft geen interactieve functionaliteit nodig. Minder = sneller, minder foutgevoelig.

**General Sans via FontShare CDN:** Het Npuls-primaire lettertype, maar niet beschikbaar op Google Fonts. FontShare is de officiële CDN voor dit font. Nadeel: vereist internetverbinding.

**Uitnodigend-persoonlijke toon:** CEDA is een community-initiatief. Een warme, directe toon past beter dan institutioneel-zakelijk.

---

## Open vragen voor de Engineer

### 1. FontShare CDN-afhankelijkheid
Het font General Sans wordt geladen via `https://api.fontshare.com`. Dit werkt prima online, maar valt weg bij een trage of afwezige verbinding (de pagina valt dan terug op `system-ui`).

**Opties:**
| Optie | Pro | Con |
|-------|-----|-----|
| Huidige aanpak (CDN) | Nul extra bestanden, altijd de nieuwste versie | Vereist internet; externe afhankelijkheid |
| Self-hosten (woff2 in repo) | Werkt altijd, geen externe afhankelijkheid | Fontbestanden in repo (~100-200kb); licentie controleren |
| Systeemfont als primair | Nul afhankelijkheid, razendsnel | Niet on-brand; ziet er generiek uit |

**Beslissing:** _(in te vullen door Engineer)_

### 2. Npuls-logo SVG
Het logo in nav en ecosysteem-kaart is een handgebouwde SVG-benadering van het Npuls stippenmark — niet het officiële bestand.

**Opties:**
| Optie | Pro | Con |
|-------|-----|-----|
| Huidige SVG-benadering | Nul extra bestanden; geen licentievraag | Niet pixel-perfect; kan afwijken van merk |
| Officieel SVG-bestand (opvragen bij Npuls) | 100% merkconform | Bestand opvragen kost tijd; mogelijke gebruiksrechten |
| PNG fallback | Makkelijk te regelen | Minder scherp op hoge resolutie |

**Beslissing:** _(in te vullen door Engineer)_
