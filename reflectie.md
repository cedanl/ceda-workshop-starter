# Sessie-reflectie

> Append-only. Elke reflectie is een nieuwe genummerde entry. Nooit overschrijven.

---

## Reflectie #1 — Maarten (Builder) — 2026-07-23 14:04

**Kosten (deze sessie):** $17.83 · actief 42m 33s · API-tijd 30m · +681 / −159 regels · model 100% Opus, 0% Haiku · cache hit 99%.

### Hoe je dit hebt aangepakt
Je kwam binnen zonder code-ervaring en met een losse opdracht ("clone dit en doe iets"). In plaats van een plan vooraf stuurde je met korte, concrete wensen: "Dilbert-stijl", "check op AI-patronen", "zet 'm live", "mijn foto als achtergrond", "maak er een skill van". Je liet het bouwen aan Claude Code en beoordeelde het resultaat. Prima werkwijze voor een eerste keer: je hoefde niets van de techniek te weten, je hoefde alleen te reageren op wat je zag.

### Wat je hebt gebruikt
- De **AstroDeck-template** als startpunt (de bumpers-bij-het-bowlen).
- **voice-filter** skill om de teksten op AI-patronen te checken.
- **skill-creator** skill om je eigen `ceda-comic-copywriting` skill te maken en te verpakken.
- De **browser-preview** om live mee te kijken tijdens het bouwen.
- **GitHub Pages + Actions** voor de publieke, zichzelf-updatende site.
- Onderweg geregeld: Node.js en de GitHub CLI geïnstalleerd, een fork gemaakt, een pull request ingediend.

### Wat goed ging
- Van niks naar een **werkende, publieke website** in één sessie, inclusief de hele ontwikkelaars-lus: bouwen, testen, opslaan, publiceren.
- De comic-copy landde zó goed dat het team 'm wilde hebben. We hebben 'r meteen tot herbruikbare, installeerbare skill gemaakt.
- Je stelde scherpe vervolgvragen ("is het ook live?") die de sessie eerlijk hielden.

### Blinde vlekken
- De **gestructureerde workshop-flow** (PLANNING.md, de stappen strategy → scope → structure → ...) hebben we overgeslagen. Prima voor snelheid, maar de "process tailoring"-oefening heb je daardoor niet bewust doorlopen.
- De **profielfoto is 200×200 pixels**, op de live site daardoor iets wazig. Bewust geaccepteerd, maar het staat er nog.
- Alles staat op **één branch en één grote PR**. Voor een concept prima; in een echt team zou je dit in kleinere stukken knippen.
- De site is **alleen de homepage**. De oude template-pagina's (/docs, /blog) bestaan nog en zijn niet opgeschoond.

### Resultaat van de sessie
- Live site: https://meadowgarderner.github.io/ceda-workshop-starter/
- Hand-in PR: https://github.com/cedanl/ceda-workshop-starter/pull/1
- Nieuwe skill: `.claude/skills/ceda-comic-copywriting/` (met installeerbaar `.skill`-bestand en INSTALL.md)
