# Content Strategy — CEDA-website

Stap S2 van de workshop. Bepaalt welke pagina's en content-typen de site krijgt. Bouwt voort op `strategy.md`.

## Formaat: one-pager

Eén scrollbare pagina. Past bij de appetite (30–40 min → concept), bij de "menukaart"-insteek (alles in één oogopslag), en bij de doelgroep (technisch, wil snel naar de bron doorklikken). Geen verborgen navigatie, geen losse subpagina's die onderhoud vragen.

## Pagina-opbouw (secties, in volgorde)

| # | Sectie | Content-type | Doel | Kernboodschap |
|---|--------|-------------|------|---------------|
| 1 | **Hero** | Kop + subkop + primaire CTA | Direct duidelijk maken wat CEDA is | "CEDA — data-analyse voor het hoger onderwijs. Open, herbruikbaar, samen gebouwd." + knop naar Community |
| 2 | **Menukaart** | Feature-grid (3–4 kaarten) | Tonen wat CEDA biedt | Bv. Open-source tools · Gedeelde standaarden · Community & kennisdeling · Projecten |
| 3 | **Over CEDA** | Tekstblok | Context geven (wat/waarom) | Korte uitleg: wie is CEDA, positie binnen Npuls, missie |
| 4 | **Meedoen** | CTA-blok met 3 links | Conversie: doorklikken | GitHub (code) · Npuls (programma) · Community (aansluiten) |
| 5 | **Footer** | Links + credits | Afsluiten + herhaling links | Verplichte links nogmaals, Npuls-context |

## Verplichte doorlinks (uit briefing)

- **GitHub**: https://github.com/cedanl
- **Npuls**: https://npuls.nl/
- **Community**: https://community-data-ai.npuls.nl/groups/view/44d20066-53a8-48c2-b4e9-be348e05d273/project-center-for-educational-data-analytics-ceda

Elke link komt minstens één keer prominent voor (Meedoen-sectie) en wordt herhaald in de footer.

## SEO / meta (per content-seo skill)

- **Titel** (zonder brand-suffix, layout voegt toe): `Data-analyse voor het hoger onderwijs`
- **Meta-description** (150–160 tekens): "CEDA bundelt open data-analyse-tools, standaarden en een community voor het Nederlandse hoger onderwijs. Bekijk de menukaart en doe mee via GitHub, Npuls of de community."
- Eén `<h1>` (in de Hero), rest `<h2>`/`<h3>`.
- Canonical URL + OG-tags via BaseLayout (automatisch).
- `site` in `astro.config.mjs` gezet t.b.v. sitemap.

## Toon

Helder Nederlands, actiegericht, geen jargon-overload. Concreet boven marketingtaal.
