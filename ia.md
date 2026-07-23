# Information Architecture — CEDA-website

Stap S3 van de workshop. Bouwt voort op `strategy.md` en `content-strategy.md`.

---

## Beschikbare AstroDeck-componenten

### Layouts

| Component | Bestand | Gebruik |
|-----------|---------|---------|
| BaseLayout | `src/layouts/BaseLayout.astro` | Standaard: boxed, Header + Footer + SEO + ClientRouter + AnimationObserver |
| FullWidthLayout | `src/layouts/FullWidthLayout.astro` | Full-viewport breedte, Header + Footer |
| MinimalLayout | `src/layouts/MinimalLayout.astro` | Geen header/footer |
| ArticleLayout | `src/layouts/ArticleLayout.astro` | Blogposts |
| AuthLayout | `src/layouts/AuthLayout.astro` | Login/registreer |

### Shell-componenten (altijd aanwezig via layout)

| Component | Bestand | Props / opmerkingen |
|-----------|---------|---------------------|
| Header | `src/components/Header.astro` | `variant: boxed\|fullWidth` — nav links en GitHub-knop zijn **hardcoded** |
| Footer | `src/components/Footer.astro` | `variant: boxed\|fullWidth` — nav links en credits zijn **hardcoded** |
| Logo | `src/components/Logo.astro` | `showText`, `size` — tekst "AstroDeck" is **hardcoded** |
| SEO | `src/components/SEO.astro` | `title`, `description`, `image`, `type`, `publishedTime`, `author` |
| ThemeToggle | `src/components/ThemeToggle.astro` | Geen props |
| AnimationObserver | `src/components/AnimationObserver.astro` | Scroll-driven `data-animate` attrs |

### Sectie-componenten

| Component | Bestand | Props (kern) | Opmerking |
|-----------|---------|--------------|-----------|
| Hero | `src/components/sections/Hero.astro` | `title`, `subtitle`, `primaryCta`, `secondaryCta`, `badge`, `prompt` | GitHub-bijdragersgrid als achtergrond |
| HeroGradient | `src/components/sections/HeroGradient.astro` | `title`, `subtitle`, `primaryCta`, `secondaryCta`, `badge` | Geanimeerde gradient orbs, premium look |
| HeroSplit | `src/components/sections/HeroSplit.astro` | `title`, `subtitle`, `primaryCta`, `secondaryCta`, `tagline`, `image` | Tekst links, afbeelding/mockup rechts |
| Features | `src/components/sections/Features.astro` | `title`, `subtitle`, `features[]` (`icon`, `title`, `description`) | Grid van kaarten met SVG-icoon; **geen `href` per kaart** |
| ContentBlock | `src/components/sections/ContentBlock.astro` | `tagline`, `title`, `description`, `features[]` (bullets), `imageSide` | 2-kolom tekst + placeholder-afbeelding |
| CTA | `src/components/sections/CTA.astro` | `title`, `description`, `cta` (`href`, `label`) | **Slechts één knop** — niet geschikt voor 3 links |
| Stats | `src/components/sections/Stats.astro` | `title`, `subtitle`, `stats[]` (`value`, `label`, `description`) | Metriekenrij |
| LogoCloud | `src/components/sections/LogoCloud.astro` | `title` | Tech-logo's — inhoud is hardcoded |
| Team | `src/components/sections/Team.astro` | `title`, `subtitle`, `members[]` | Teamleden |
| Testimonials | `src/components/sections/Testimonials.astro` | `title`, `subtitle`, `testimonials[]` | Reviews/quotes |
| Pricing | `src/components/sections/Pricing.astro` | `title`, `subtitle`, `plans[]` | Prijskaarten |
| FAQ | `src/components/sections/FAQ.astro` | `title`, `subtitle`, `items[]` | Accordion |
| Newsletter | `src/components/sections/Newsletter.astro` | `title`, `description` | E-mailinschrijving |
| Comparison | `src/components/sections/Comparison.astro` | `title`, `subtitle`, `columns[]`, `features[]` | Vergelijkingstabel |
| Contact | `src/components/sections/Contact.astro` | `title`, `description` | Contactformulier |
| AIFeature | `src/components/sections/AIFeature.astro` | Geen props — volledig hardcoded | Niet relevant voor CEDA |

### UI-primitieven (shadcn/Radix)

`button.tsx`, `badge.tsx`, `card.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `input.tsx`, `label.tsx`, `select.tsx`, `tabs.tsx`, `tooltip.tsx`, `accordion.tsx`

---

## Sectie → Component mapping

### One-pager: `src/pages/index.astro`

De CEDA-site wordt een enkelvoudige scrollpagina in `src/pages/index.astro`, gewikkeld in `BaseLayout`.

| # | Sectie | Component | Props / inhoud | Status |
|---|--------|-----------|----------------|--------|
| — | Pagina-shell | `BaseLayout.astro` | `title="Data-analyse voor het hoger onderwijs"`, `description="CEDA bundelt open data-analyse-tools, standaarden en een community voor het Nederlandse hoger onderwijs. Bekijk de menukaart en doe mee via GitHub, Npuls of de community."`, `lang="nl"` | Bestaand — `lang` aanpassen naar `nl` |
| — | Navigatie | `Header.astro` | `variant="boxed"` — nav links aanpassen naar anchor-links (`#menukaart`, `#over`, `#meedoen`); GitHub-knop → `https://github.com/cedanl` | Bestaand, **inhoud aanpassen** |
| — | Logo | `Logo.astro` | Tekst "AstroDeck" vervangen door "CEDA" | Bestaand, **tekst aanpassen** |
| 1 | Hero | `Hero.astro` | `title="CEDA — data-analyse voor het hoger onderwijs"` · `subtitle="Open, herbruikbaar en samen gebouwd binnen Npuls."` · `primaryCta={ href: "[community-url]", label: "Doe mee via de community" }` · `secondaryCta={ href: "https://github.com/cedanl", label: "Bekijk op GitHub" }` · `badge="Onderdeel van Npuls"` | Bestaand |
| 2 | Menukaart | `Features.astro` + uitbreiding | `title="Wat CEDA biedt"` · `subtitle="Tools, standaarden en community voor data-professionals in het hoger onderwijs"` · 4 kaarten: zie tabel hieronder | Bestaand, **uitbreiding gewenst** (zie gaten) |
| 3 | Over CEDA | `ContentBlock.astro` | `tagline="Over CEDA"` · `title="Samen sterker in data-analyse"` · `description` (zie inhoud hieronder) · `features` (3 bullets) | Bestaand |
| 4 | Meedoen | `CTAMulti.astro` (nieuw) | 3 kaarten: GitHub · Npuls · Community — elk met titel, omschrijving, externe link | **Nieuw component** |
| 5 | Footer | `Footer.astro` | `variant="boxed"` — nav links en credits vervangen door CEDA-content | Bestaand, **inhoud aanpassen** |

---

## Props per sectie (gedetailleerd)

### Sectie 1 — Hero (`Hero.astro`)

```astro
<Hero
  title="CEDA — data-analyse voor het hoger onderwijs"
  subtitle="Open, herbruikbaar en samen gebouwd binnen Npuls."
  badge="Onderdeel van Npuls"
  primaryCta={{
    href: "https://community-data-ai.npuls.nl/groups/view/44d20066-53a8-48c2-b4e9-be348e05d273/project-center-for-educational-data-analytics-ceda",
    label: "Doe mee via de community"
  }}
  secondaryCta={{
    href: "https://github.com/cedanl",
    label: "Bekijk op GitHub"
  }}
/>
```

Keuze voor `Hero.astro` boven `HeroGradient.astro`: het GitHub-bijdragersgrid in de achtergrond past thematisch bij CEDA's open-source karakter.

---

### Sectie 2 — Menukaart (`Features.astro`)

```astro
<Features
  title="Wat CEDA biedt"
  subtitle="Tools, standaarden en community voor data-professionals in het hoger onderwijs"
  features={[
    {
      icon: "zap",
      title: "Open-source tools",
      description: "Herbruikbare data-analyse-scripts en tools voor IR, onderzoek en beleidswerk — direct van GitHub."
    },
    {
      icon: "shield",
      title: "Gedeelde standaarden",
      description: "Afspraken en formaten die samenwerking tussen instellingen mogelijk maken zonder het wiel opnieuw uit te vinden."
    },
    {
      icon: "users",
      title: "Community & kennisdeling",
      description: "Een actieve community van data-analisten en IR-medewerkers in het hoger onderwijs."
    },
    {
      icon: "chart",
      title: "Projecten",
      description: "Concrete projecten die door instellingen samen worden gedragen en openbaar beschikbaar zijn."
    }
  ]}
/>
```

**Let op:** het grid gebruikt `md:grid-cols-3`; bij 4 kaarten ontstaat een onbalans (3+1). Zie gaten.

---

### Sectie 3 — Over CEDA (`ContentBlock.astro`)

```astro
<ContentBlock
  tagline="Over CEDA"
  title="Samen sterker in data-analyse"
  description="CEDA — het Center for Educational Data Analytics — bundelt expertise en tools voor data-professionals in het Nederlandse hoger onderwijs. Als onderdeel van Npuls werken hogescholen en universiteiten samen aan open, herbruikbare oplossingen. Geen concurrentie, maar gedeelde kracht."
  features={[
    "Open source — alle code staat publiek op GitHub",
    "Onderdeel van het Npuls-samenwerkingsprogramma",
    "Actieve community van data-analisten en IR-medewerkers"
  ]}
  imageSide="right"
/>
```

---

### Sectie 4 — Meedoen (`CTAMulti.astro` — nieuw)

Drie naast elkaar geplaatste actiekaarten, elk met titel, omschrijving, icoon en externe link.

| Kaart | Titel | Omschrijving | Link | Icoon |
|-------|-------|--------------|------|-------|
| 1 | GitHub | Bekijk de code, fork projecten en lever bij. | https://github.com/cedanl | github |
| 2 | Npuls | Lees meer over het Npuls-programma en de context. | https://npuls.nl/ | globe |
| 3 | Community | Sluit je aan bij de community van data-professionals. | https://community-data-ai.npuls.nl/groups/view/... | users |

Props-interface (ontwerp voor het nieuwe component):

```typescript
interface CTACard {
  title: string;
  description: string;
  href: string;
  label: string;         // knoptekst
  icon?: string;         // optioneel SVG-icoon (zelfde set als Features)
  external?: boolean;    // true → target="_blank" + rel="noopener noreferrer"
}

interface Props {
  title?: string;
  subtitle?: string;
  cards: CTACard[];
}
```

---

### Sectie 5 — Footer (`Footer.astro`)

Aanpassen: nav-kolommen en credits vervangen door CEDA-inhoud.

| Kolom | Huidige inhoud | CEDA-inhoud |
|-------|---------------|-------------|
| Brand (col-span-2) | "AstroDeck" logo + omschrijving | Logo "CEDA" + kernboodschap |
| Kolom 2 | "AstroDeck" links (Home, Docs, …) | "Links" — GitHub · Npuls · Community |
| Kolom 3 | "Pages" links (Blog, Login, …) | Weglaten of: "Secties" (anchor-links) |
| Kolom 4 | "Creator" — Holger Könemann | "Initiatief van Npuls" met link |
| Copyright | "© AstroDeck. MIT License." | "© CEDA — Center for Educational Data Analytics. Onderdeel van Npuls." |

---

## Gaten (nieuwe of uitgebreide componenten)

| # | Sectie | Probleem | Oplossing | Scope |
|---|--------|----------|-----------|-------|
| G1 | Menukaart | `Features.astro` heeft geen `href`-prop per kaart — kaarten zijn niet klikbaar | Uitbreiding van `Features.astro`: optionele `href` per feature, link wrapping om de kaart | Klein — optionele prop toevoegen |
| G2 | Menukaart | Grid `md:grid-cols-3` leidt bij 4 kaarten tot een ongebalanceerd layout (rij van 3 + rij van 1) | Optionele `columns` prop toevoegen aan `Features.astro` (`2\|3\|4`), default blijft `3` | Klein |
| G3 | Meedoen | `CTA.astro` ondersteunt slechts één knop — onbruikbaar voor 3 gelijkwaardige externe links | Nieuw component `CTAMulti.astro`: 3-koloms kaartgrid met per kaart titel, omschrijving, link-knop | Middel — nieuw component |
| G4 | Header | Nav links hardcoded naar AstroDeck-demo-pagina's (`/docs`, `/sections`, …) | Nav-array aanpassen naar CEDA anchor-links of vereenvoudigen tot logo + ThemeToggle + GitHub-knop | Klein — data-aanpassing in component |
| G5 | Footer | Nav links en credits volledig hardcoded naar AstroDeck | Nav-kolommen en credits vervangen door CEDA-content | Klein — data-aanpassing in component |
| G6 | Logo | Tekst "AstroDeck" hardcoded | Tekst vervangen door "CEDA" | Triviaal |
| G7 | BaseLayout | `lang="en"` hardcoded in `<html>` | `lang="nl"` instellen voor Nederlandse site (accessibility + SEO) | Triviaal |

---

## Samenvatting

**Direct bruikbare componenten (geen wijziging nodig aan de componentlogica):**
- `BaseLayout.astro` — layout-shell
- `Hero.astro` — sectie 1, past prop-voor-prop
- `ContentBlock.astro` — sectie 3, past prop-voor-prop

**Bestaande componenten met kleine aanpassingen (data / inhoud):**
- `Header.astro` — nav links en GitHub-URL aanpassen (G4)
- `Footer.astro` — nav-kolommen en credits aanpassen (G5)
- `Logo.astro` — tekst "AstroDeck" → "CEDA" (G6)
- `Features.astro` — optionele `href` per kaart + optionele `columns`-prop (G1, G2)
- `BaseLayout.astro` — `lang="nl"` (G7)

**Nieuw te bouwen component:**
- `CTAMulti.astro` — sectie 4 "Meedoen": 3 actiekaarten naast elkaar met externe links (G3)

**Totaalschatting voor S4 (implementatie):**
- 3 triviale tekstaanpassingen (Logo, lang, Header-URL)
- 2 data-aanpassingen in bestaande componenten (Header nav, Footer content)
- 1 kleine feature-uitbreiding van `Features.astro`
- 1 nieuw component `CTAMulti.astro`
- 1 nieuwe pagina `src/pages/index.astro` die alles samenbrengt
