# Sessie Reflecties

---

## Reflectie #1 — 2026-07-23

**Naam/rol:** oinkspook (workshop-deelnemer)
**Tijdstip:** einde sessie

### Aanpak
Gemengd — soms de voorgestelde stappen gevolgd, soms actief bijgestuurd. Bijvoorbeeld bij de keuze voor 4 pagina's in plaats van 3, en bij het verkennen van de devcontainer als academisch experiment naast de hoofdworkshop.

### Wat gebruikt
- **Skills ecosystem** (npx skills find/add): content-strategy (boraoztunc, 139 installs), information-architecture (owl-listener, 583 installs)
- **Ingebouwde skills**: qa, sessie-reflectie
- **Process model**: 5S-lifecycle (Strategy → Scope → Structure → Skeleton → Surface), waarvan de onderste lagen al door de AstroDeck-template waren ingevuld
- **PLANNING.md** als stateful voortgangsbewaker per stap
- **Devcontainer CLI** voor containerexperiment naast de hoofdflow

### Wat ging goed
De samenwerking met Claude voelde natuurlijk en productief. De interactie was responsief op keuzes — Claude stelde voor, de gebruiker stuurde bij, en het resultaat was concreter dan verwacht binnen de tijd. De volledige workshop (strategy t/m QA t/m PR) was afgerond in één sessie.

### Blinde vlekken
De devcontainer-complexiteit was onderschat. Port forwarding (`forwardedPorts` in devcontainer.json werkt alleen in VS Code, niet via de CLI), CRLF-fouten in shell scripts, en het ontbreken van een `--publish` flag in de devcontainer CLI zorgden voor meerdere omwegen. De oplossing (`docker run -p 4321:4321` direct) werkte, maar vereiste meer debuggen dan verwacht. Leerpunt: devcontainers zijn gebouwd voor VS Code — CLI-gebruik is second-class.

### Technische fixes die uit het experiment kwamen
- Port 4321 toegevoegd aan `devcontainer.json`
- `host: true` toegevoegd aan Astro config (bindt aan 0.0.0.0 in plaats van localhost)
- CRLF verwijderd uit alle shell scripts (hooks + devcontainer scripts)
- `.gitattributes` uitgebreid zodat `*.sh` en `.claude/hooks/*` altijd LF blijven
- `docker-run.sh` toegevoegd als werkend alternatief voor CLI-gebruikers
