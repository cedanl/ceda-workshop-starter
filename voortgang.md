# Voortgang

Gedeeld tussen Builder en Engineer. Wordt gecommit — dit is het live overzicht van de sessie,
handoff.md en readiness.md zijn de eindsamenvattingen.

## Taken

| # | Wie | Rol | Status | Wat |
|---|-----|-----|--------|-----|
| 1 | Claude | Builder | ✅ Klaar | Briefing gelezen, brandbook verwerkt |
| 2 | Claude | Builder | ✅ Klaar | index.html gebouwd (static, één pagina) |
| 3 | Claude | Builder  | ✅ Klaar | Copy herschreven (toon: uitnodigend-persoonlijk) |
| 4 | Claude | Engineer | ✅ Klaar | Stack-advies geschreven |
| 5 | Claude | Builder  | ✅ Klaar | handoff.md geschreven |
| 6 | Claude | Engineer | 🔧 Bezig | readiness.md schrijven |

Status: 🆕 Nieuw · 🔧 Bezig · ✅ Klaar

## Beslissingen genomen
- Stijl: Npuls brandbook kleuren en vormentaal (brandbook.pdf aanwezig en gebruikt)
- Lay-out: één-pagina scroll met ankernavigatie
- Font: General Sans via FontShare CDN (fallback: system-ui)
- Secties: nav · hero · over · aanbod · ecosysteem · footer
- Alle drie de verplichte externe links uit briefing.md zijn opgenomen

## Stack-advies (Engineer — Claude)

**Type**: statisch HTML/CSS, geen build-stap, geen server nodig.

**Nu (workshop-succescriterium):**
Sleep `index.html` naar [vercel.com/drop](https://vercel.com/drop) → live URL in <30 seconden.
Geen account vereist voor een preview-link.

**Bonus (productie, buiten workshop-scope):**
- **GitHub Pages**: zet de repo op public, activeer Pages op `main` → gratis, automatisch, eigen domein mogelijk.
- **Vercel (via GitHub)**: koppel de repo aan Vercel voor preview-URLs per commit en een custom domein. Voordeel t.o.v. drop: automatische deploys bij elke wijziging.

**Open punten voor productie:**
1. **FontShare CDN** (General Sans): werkt prima online, maar valt weg bij trage verbinding. Self-hosten = robuuster. Alternatief: woff2-bestanden direct in repo.
2. **Npuls-logo**: het SVG-stippenlogo in de code is een benadering. Voor productie het officiële logobestand (SVG/PNG) van het Npuls brandteam opvragen.
3. **Geen contactformulier of login**: niet aanwezig in het concept — terecht, want dat vereist een backend. Als dit later nodig is: Formspree (formulieren) of een apart platform.

**Conclusie**: concept is productie-ready qua hosting-vorm. Vercel Drop werkt direct. Voor langdurig gebruik: GitHub Pages of Vercel via repo-koppeling.
