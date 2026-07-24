# Sessie-reflecties — CEDA Workshop

Append-only. Elke reflectie is een nieuwe genummerde entry.

---

## Entry 1 — Corneel den Hartogh (Project Lead AI & Data Science)
**Datum:** 2026-07-24

### Kosten / usage
- Huidige sessie: 5% van sessielimiet · week (alle modellen): 3%.
- Laatste 24u: 160+ requests, 4 sessies. **91% van gebruik uit subagent-zware sessies**, 71% bij >150k context.
- Top-subagents deze periode: **astrodeck 23%**, general-purpose 14%. Top-skill: /sessie-reflectie.
- Duiding: deze workshop leunde zwaar op subagents (astrodeck-build, 3 parallelle variant-builders) en grote context — past bij het beeld.

### Werkwijze (Corneel)
Vond het gek dat de site eerst in HTML werd gemaakt en pas later in Astro, nadat er expliciet om gevraagd werd. Er stonden al Astro-dingen klaar; de route (prototype-HTML → echte Astro) had duidelijker gekund. Voor dit onderwerp (website) niet belangrijk, maar overall: handig om **type-projecten** te hebben met een **aparte compliance-checklist** (niet per se planning, maar "hoe compliant is dit project").

### Gebruikt (Corneel)
Het Astro-bouwen werd goed geabstraheerd; zag TypeScript/JavaScript-checks langskomen.

### Wat ging goed (Corneel)
Bouwen op basis van vereisten (Astro, geen JavaScript-security-gekkigheid) werd goed afgehandeld — leek én goed te gaan én had weinig impact op mij als gebruiker.

### Blinde vlekken (Corneel)
- Nu erg gericht op één **sessie-flow**, maar je wilt juist **meerdere sessies tegelijk** — door achtergrondwerk moet je soms wachten. Corneel start zelf vaak een nieuwe sessie na een stap.
- Wens: **lerend / uitleggend vermogen**. Met type-projecten + fasering ook verwijzingen naar uitleg over keuzes en wat belangrijk is. Enkele **skills in CLAUDE.md** die af en toe als suggestie aan de gebruiker worden gedaan: "wil je status? → status-skill", "waarom deze tech-stap? → learning-skill". Gebruiker doet coördinatie zelf. sessie-reflectie is zo'n overall-skill.
- Idee voor sessie-reflectie zelf: **pop-up met de 4 vragen + Claude reflecteert ook zelf + gebruiker doet laatste persoonlijke toevoeging** → continuously learning human-AI collab team.

### Overig (Corneel)
De flow deels ge-derailed omdat er al ideeën in het hoofd zaten. Dat moeten we kunnen accommoderen: een Tomer maakt zelf goede **tech**-keuzes, een Edwin niet; op **design** andersom. Dus: skills die je juist wilt **chainen** (iets met JavaScript → automatisch JS-security-checks) én skills die je juist **los** wilt houden (afhankelijk van wie stuurt).

### Overall (Corneel)
"HEEL FIJN DIT!!" Zo'n workshop kost ~10 uur per persoon + voorbereiding, maar levert veel info op. De site zelf hoeft niet eindeloos verbeterd; vooral leren wat we met de data-science-stappen willen doen.

### Claude reflectie
- **Terecht punt over HTML-eerst.** Ik koos standalone HTML-prototypes voor snelle iteratie/keuze (goedkoop wisselen tussen 3 as-modellen zonder build-overhead), maar heb de route prototype→Astro niet vooraf expliciet gemaakt. Beter was geweest: bij de eerste bouw-stap kort de twee paden benoemen ("wegwerp-prototype om te kiezen" vs "meteen in Astro") en jou laten kiezen. Nu leek het alsof Astro "vergeten" was terwijl het bewust uitgesteld was.
- **Project-type + compliance-checklist** is een sterk idee en past bij dit template: AGENTS.md + de guard-hook zijn al een impliciete checklist, maar niet zichtbaar als "compliance-score". Een aparte, leesbare checklist per project-type (website / analyse-pakket / campagne) zou de paved-road expliciet maken.
- **Multi-sessie i.p.v. één flow:** klopt als spanning. Veel achtergrondwerk (subagents) = wachttijd; parallelle sessies verbergen dat. De workshop-flow (PLANNING.md, stateful stappen) veronderstelt één lijn. Een model waarin stappen los oppakbaar zijn in aparte sessies zou beter passen bij hoe je werkt.
- **Skill-chaining vs los:** goede nuance. Sommige koppelingen horen automatisch (code raakt JS → security/lint-check), andere moeten persona-afhankelijk optioneel blijven. De guard-hook is een voorbeeld van gewenste auto-chaining; design-keuzes juist niet forceren.
- **Zelf-reflecterende skills:** eens — deze entry is een eerste vorm (Corneel + Claude samen). Volgende stap: skill die de 4 vragen als checkpoint toont, mijn reflectie automatisch toevoegt, jij sluit af.
- **Waarde deze sessie:** grootste opbrengst was niet de site maar de gedeelde taal (waardestroom per doelgroep, use-cases gekoppeld aan echte repos, BIV/data-achterkant) én de proces-inzichten hierboven.
