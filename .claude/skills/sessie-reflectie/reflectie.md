# Sessie Reflecties

---

## Reflectie #1 — 2026-07-23

**Naam/rol:** Muhammet (workshop-deelnemer)

### Wat is gebouwd
Een volledig werkende CEDA one-pager op http://localhost:4321, gebouwd vanaf een kale AstroDeck-starter. De pagina heeft 5 secties (Hero → Menukaart → Over CEDA → Meedoen → Footer) met de drie verplichte doorlinks naar GitHub, Npuls en de community. Nieuw component: CTAMulti. Rebrand van Header, Footer, Logo en SEO naar CEDA.

### Stappen en tools gebruikt

| Stap | Tool |
|------|------|
| S1 Strategy | Direct (target-audience skill niet beschikbaar in reset-repo) |
| S2 Content strategy | content-seo skill |
| S3 Information Architecture | astrodeck agent |
| S4 UI/Implementatie | astrodeck agent |
| S5 Testing/QA | /plenum (6 review-agents) + astrodeck agent voor fixes |
| S6 Launch/Deploy | Overgeslagen — bewust afgerond op concept |

### Werkwijze
Gevolgd wat Claude voorstelde — de paved road zijn werk laten doen. Stap-voor-stap door de lifecycle, elke stap een skill of agent gekozen via AskUserQuestion.

Tussendoor: een `git reset --hard origin/main` om gelijk te trekken met remote, waardoor eerder workshopwerk verdween en we opnieuw begonnen. Halverwege S5 gewisseld van model: Opus 4.8 → Sonnet 4.6.

### Wat ging goed
- **Snelheid van idee naar werkend concept** — binnen één sessie van niks naar een werkende CEDA-site
- **Kwaliteit eindresultaat** — KPI PASS, HTTP 200, 3 links aanwezig, 17 plenum-bevindingen gefixed
- **Stapsgewijze aanpak** — de S1–S6 structuur maakte voortgang inzichtelijk
- **Skills en agents werkten soepel** — weinig frictie, de paved road deed zijn werk

### Blinde vlekken
- **Plenum-agents kosten veel tijd** — 6 parallelle review-agents draaien is grondig maar traag; voor workshops met strakke tijdboxen is de lichtere `qa` skill een betere keuze
- **Deploy niet gedaan** — het concept draait alleen lokaal; S6 is bewust overgeslagen. Deploy-basis staat klaar (`site=cedanl.github.io/ceda-workshop-starter`), maar niemand buiten de machine kan het nu bekijken
- **OG-afbeelding nog AstroDeck** — `public/cover.png` toont de AstroDeck template; gedeelde links tonen de verkeerde preview. Niet gefixed omdat het een nieuwe afbeelding vereist

### Process tailoring — wat geleerd
Het lifecycle-model (strategy → content → IA → implementatie → QA → deploy) werkte goed voor een website-concept. De knip die de meeste tijd bespaarde: alles wat de template al had ingevuld (setup, componenten, theming) overgeslagen en direct naar de inhoudelijke stappen. De echte bottleneck zat niet in code schrijven maar in review (plenum). Voor een 30–40 min workshop: plenum vervangen door de `qa` skill of inperken tot 2–3 gerichte agents in plaats van alle 6.
