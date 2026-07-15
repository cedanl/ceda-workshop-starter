# Workshop: CEDA-site bouwen

## Start-logica

**Stap 0 — Dev server opstarten (altijd, vóór alles)**
1. Controleer of `node_modules/` bestaat. Zo niet: voer `npm install` uit en wacht tot het klaar is.
2. Start `npm run dev` op de achtergrond (background process — niet wachten tot het stopt).
3. Meld aan de gebruiker (vriendelijk, zonder jargon):
   > "De site draait nu lokaal op **http://localhost:4321** — open dat adres in je browser en houd het tabblad open. Elke wijziging die we straks maken is meteen zichtbaar, je hoeft de pagina niet te verversen."

**Stap 1–3 — PLANNING.md check**
1. Lees `PLANNING.md`.
2. **Leeg / niet bestaand** → doorloop Onboarding (blok 1-3) hieronder, maak daarna `PLANNING.md` aan met stap 1 als actief.
3. **Gevuld** → skip onboarding volledig, ga direct naar de daarin genoteerde actieve stap in Stappen (blok 4).

---

## Onboarding (eenmalig)

> **Regel**: na elk blok MOET je de `AskUserQuestion` tool gebruiken als checkpoint — nooit tekst-alleen. Wacht op bevestiging voor je verdergaat naar het volgende blok.

**1. Welkom**
Dit is de workshop voor de CEDA-site. Opdracht staat volledig in `BRIEFING.md` — lees die eerst door en vat de kern samen.
→ **AskUserQuestion**: "Is blok 1 helder?" met opties [Ja, door naar blok 2 / Nee, ik heb een vraag]

**2. Waarom deze aanpak**
Doel: frictie tussen idee → concept/MVP zoveel mogelijk wegnemen. We volgen een **paved road / golden path**: het AI Platform Team heeft repo, templates en skills alvast klaargezet — zoals bumpers bij bowlen. Je gooit altijd een strike.
→ **AskUserQuestion**: "Is blok 2 helder?" met opties [Ja, door naar blok 3 / Nee, ik heb een vraag]

**3. Process tailoring**
Elk type product heeft een eigen **lifecycle-referentiemodel** (website: strategy→scope→structure→skeleton→surface; marketingcampagne: research→positionering→creatie→distributie→meten; embedded: V-model). We kiezen het model dat bij dít product hoort, en knippen de lagen die de template al heeft ingevuld. Wat overblijft zijn de stappen die wij doorlopen — elke stap heeft een skill als expertise-tool.
→ **AskUserQuestion**: "Is blok 3 helder?" met opties [Ja, door naar Stappen / Nee, ik heb een vraag]

---

## Stappen (blok 4 — stateful)

**Stapprotocol** — doe dit bij elke stap, in volgorde:
1. Leg de stap kort uit.
2. **Skill discovery**: gebruik de `find-skills` skill om relevante externe skills te zoeken (`npx skills find <stap-onderwerp>`). Controleer daarnaast ook of een ingebouwde agent geschikt is voor deze stap.
3. Presenteer de gevonden opties (externe skills + ingebouwde agents) via `AskUserQuestion` zodat de gebruiker kan kiezen welke tool ingezet wordt.
4. Voer de stap uit met de gekozen tool.
5. Update `PLANNING.md`: zet Status op `done`, vul Output in.

**Stappen:**
1. **Strategy** — doel & doelgroep site
2. **Content strategy** — welke pagina's/content-typen
3. **Information Architecture** — sitemap + componenten per pagina
4. **UI/Implementatie** — content invullen in template/shadcn
5. **Testing/QA** — mobiel, links, spelling
6. **Launch/Deploy**

## Overgang naar afsluiting
Zodra stap 1–5 klaar zijn (of alleen stap 6 nog open staat):
> Vraag: "Doorgaan met Launch/Deploy, of ronden we hier af?"
- Ja → doe stap 6, dan door naar Afsluiting.
- Nee → direct naar Afsluiting.

## Afsluiting (blok 5 — eindpunt, geen resume meer)
Skill: sessie-reflectie — wat is gebouwd, welke stappen/skills gebruikt, wat geleerd over process tailoring.

---

## PLANNING.md structuur (bijhouden tijdens workshop)

Tabel met kolommen: ID · Titel · Type · Status · Deps · Skill · Output

- **ID**: S1, S1.1, S1.2 etc. (sub-issues via punt-notatie)
- **Type**: epic / taak / besluit / blocker
- **Status**: open / actief / review / done / blocked
- **Deps**: ID's waarvan deze taak afhankelijk is (input)
- **Skill**: welke Claude-skill ingezet wordt
- **Output**: kort wat opgeleverd is (besluit, bestandsnaam, etc.)

Na elke afgeronde stap: update Status + Output in de tabel.

---

## Auto-commit (overschrijft globale regel)

In dit project wordt **automatisch gecommit** na elke Claude-sessie via een Stop hook. De globale regel "commit nooit zonder opdracht" geldt hier **niet** — de Stop hook regelt dit.

## Git & code conventies

- **Atomic commits**: één logische wijziging per commit. Splits meerdere concerns altijd in aparte commits — nooit "add feature + fix bug + cleanup" in één commit.
- **Conventional commits**: gebruik altijd `type(scope?): beschrijving` formaat. De hook valideert dit automatisch via Haiku en geeft feedback als het niet klopt. Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`.
- **Separation of concerns**: elke module/component heeft één verantwoordelijkheid. Meng niet UI, business logic en data fetching in dezelfde file.
- **Loose coupling, high cohesion**: componenten communiceren via props/interfaces, niet via directe interne afhankelijkheden. Gerelateerde code staat bij elkaar.

---

## Project conventions

This project follows the [AGENTS.md standard](https://agents.md).

1. Read **`AGENTS.md`** — all project conventions, patterns, and code standards.
2. Check **`PROJECT.md`** — project-specific customizations that **override** AGENTS.md defaults.

## AI layer quick reference

| What | Where |
|------|-------|
| Main agent (quality guardian) | `.claude/agents/astrodeck.md` |
| Multi-agent review | `/plenum` (`.claude/commands/plenum.md` + 6 review agents) |
| Commands | `/audit`, `/launch-check`, `/new-page`, `/new-section`, `/theme`, `/plenum` |
| Domain skills (KPIs + learnings) | `.claude/skills/` |
| Static convention checks | `npm run check:kpis` (single source of truth) |
| Convention guard hook | `.claude/hooks/guard-conventions.mjs` (auto-blocks deprecated patterns) |
| Canonical design decisions | `system/globals/` |
| Portable audit prompts (any AI tool) | `system/prompts/` |
