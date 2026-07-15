# Workshop: CEDA-site bouwen

## Start-logica
1. Lees `PLANNING.md`.
2. **Leeg / niet bestaand** → doorloop Onboarding (blok 1-3) hieronder, maak daarna `PLANNING.md` aan met stap 1 als actief.
3. **Gevuld** → skip onboarding volledig, ga direct naar de daarin genoteerde actieve stap in Stappen (blok 4).

---

## Onboarding (eenmalig)

**1. Welkom**
Dit is de workshop voor de CEDA-site. Opdracht staat volledig in `BRIEFING.md` — lees die eerst door.

**2. Waarom deze aanpak**
Doel: frictie tussen idee → concept → product zoveel mogelijk wegnemen. Daarom volgen we een voorgebakken route (**paved road / golden path**) i.p.v. from scratch beslissen. Het **AI Platform Team** (Engineers) heeft repo, templates en skills klaargezet zodat jullie je op inhoud kunnen richten.
> Checkpoint: kort bevestigen dat dit helder is.

**3. Process tailoring**
Het maken van een website volgt een ander stappenplan dan bv. het opzetten van een marketingcampagne of het bouwen van sensor-software — elk type product heeft zijn eigen **lifecycle-referentiemodel** (website: strategy→scope→structure→skeleton→surface; marketingcampagne: research→positionering→creatie→distributie→meten; embedded: V-model).
Stap 1 is dus: welk referentiemodel hoort bij dít product (een website)? Vervolgens tailor je dat model — een deel van de lagen is al ingevuld door de template die klaarstaat, dus die slaan we over. Dat identificeren + knippen heet **process tailoring**, en zorgt dat skills per overgebleven stap gericht kunnen helpen (elke skill = expertise voor die specifieke stap).
→ Ga direct door naar Stappen.

---

## Stappen (blok 4 — stateful)

Per stap: korte uitleg → relevante skill inzetten → checkpoint/vraag → status wegschrijven in `PLANNING.md`.

1. **Strategy** — doel & doelgroep site
2. **Content strategy** — welke pagina's/content-typen
3. **Information Architecture** — sitemap + componenten per pagina *(skill: information-architecture)*
4. **UI/Implementatie** — content invullen in template/shadcn
5. **Testing/QA** — mobiel, links, spelling
6. **Launch/Deploy**

Na elke afgeronde stap: update `PLANNING.md` (actieve stap + wat is afgerond/besloten).

## Overgang naar afsluiting
Zodra stap 1–5 klaar zijn (of alleen stap 6 nog open staat):
> Vraag: "Doorgaan met Launch/Deploy, of ronden we hier af?"
- Ja → doe stap 6, dan door naar Afsluiting.
- Nee → direct naar Afsluiting.

## Afsluiting (blok 5 — eindpunt, geen resume meer)
Skill: sessie-reflectie — wat is gebouwd, welke stappen/skills gebruikt, wat geleerd over process tailoring.

---

## PLANNING.md structuur (bijhouden tijdens workshop)
```
actieve_stap: <1-6>
afgerond:
  - stap 1: <korte samenvatting besluit>
  - stap 2: ...
openstaand: <notities voor volgende sessie>
```

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
