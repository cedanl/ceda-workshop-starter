# Design Spec: Nav + Accordion + Nieuwe Pagina's

**Datum:** 2026-07-24  
**Status:** Goedgekeurd (mondeling)

---

## Scope

Vier samenhangende wijzigingen:

1. **Header navigatie** — 5 items toevoegen aan `Header.astro`
2. **Doelgroepen accordion** — tabs/pills in `ValueStream.tsx` vervangen door uitklapbare kaarten met persona-afbeeldingen
3. **Nieuwe pagina's** — `/over-ons`, `/data-ondersteund`, `/randvoorwaarden`, `/meedoen`
4. **Tool → doelgroep link** — in slide-out panel (tier 3) een link naar de doelgroep-accordion

---

## 1. Header navigatie

### Wijziging
`src/components/Header.astro` — 5 nav-items toevoegen aan bestaande header.

### Items

| Label | Href | Gedrag |
|-------|------|--------|
| Over ons | `/over-ons` | Interne pagina |
| Doelgroepen | `/#doelgroepen` | Anchor-scroll naar accordion sectie |
| Data-ondersteund | `/data-ondersteund` | Interne pagina |
| Randvoorwaarden | `/randvoorwaarden` | Interne pagina |
| Meedoen | `/meedoen` | Interne pagina |

### Constraints
- Mobiel: hamburger-menu of stacked nav (afhankelijk van bestaand patroon in Header.astro)
- Actieve pagina visueel onderscheiden (bestaande stijl volgen)

---

## 2. Doelgroepen accordion

### Wijziging
`src/components/ceda/ValueStream.tsx` — doelgroep-switcher (pill tabs) vervangen door verticale accordion.

### Patroon
- 5 uitklapbare kaarten, gestapeld verticaal
- Default: eerste kaart (lll) open
- Slechts één kaart tegelijk open (mutual exclusion)
- Accordion-sectie krijgt `id="doelgroepen"` voor anchor-navigatie

### Kaartheader (collapsed + expanded)
```
[persona-afbeelding 64px] [Doelgroepnaam] [sub-label] [chevron ▼/▲]
```

### Kaartheader expanded → toont:
1. Inzicht-tekst (`dg.inzicht`)
2. Thema-chips (`dg.themas`)
3. Horizontale waardestroom (bestaande stream-content, ongewijzigd)

### Persona-afbeeldingen
Hotlink van doe-meer-met-studiedata.nl (WordPress uploads, zelfde Npuls ecosysteem):

| Doelgroep id | Afbeelding URL |
|---|---|
| lll | `https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Student-1.png` |
| docent | `https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Docent-1.png` |
| manager | `https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Opleidind.png` |
| bestuurder | `https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Bestuurder-1.png` |
| onderzoeker | `https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Onderzoeker-1.png` |

### State
- `activeDg: string` blijft (wordt nu "open accordion item" i.p.v. "geselecteerde tab")
- Overige state (hover, panelId, etc.) ongewijzigd

---

## 3. Tool → doelgroep link

### Wijziging
In het tier-3 slide-out panel (in `ValueStream.tsx`) — link toevoegen boven het detailpaneel.

### Gedrag
```
Bekijk alle tools voor [Doelgroepnaam] →
```
- `href="/#doelgroepen"` + bij klik: zet accordion open op juiste doelgroep (via state of URL hash)
- Positie: boven de status-badge in het paneel

---

## 4. Nieuwe pagina's

### 4a. `/over-ons`
**Bron:** Community page content (geselecteerd)

Secties:
1. **Hero** — "Over CEDA" + missie-alinea (co-creatie mbo/hbo/wo, van data naar inzichten)
2. **Wat CEDA doet** — tools ophalen, praktisch toegankelijk maken, documentatie + best practices (ML, visualisatie, data-analyse). Tech: Python, R, Power BI, Azure.
3. **Doelgroep** — data-analisten, Institutional Researchers, BI-specialisten, informatiemanagers
4. **Actieve projecten** — kaarten of lijst met naam, onderwerp, instelling
5. **Afgeronde projecten** — compactere lijst
6. **CTA** → link naar `/meedoen`

**Actieve projecten:**
- Theo Bakker — Kansengelijkheid — Haagse Hogeschool
- Shirley Kalkers-Van de Ven — Schooluitval dashboard — Graafschap College
- Steven Ramondt — Uitnodigingsregel obv uitvalprognose — ROC Mondriaan
- Amir Khodaie — Studenttevredenheid analyse — Radboud Universiteit
- Tomer Iwan — 1CijferHO Package — Vrije Universiteit
- Ash Sewnandan — Data Engineering — Haagse Hogeschool

**Afgeronde projecten:**
- Amir Khodaie — Instroomprognose — Radboud Universiteit
- Martine Jansen — Wisselstroom package — Fontys Hogeschool
- Tony Ritzen — Inschrijvingen dashboard — Universiteit Maastricht
- Tomer Iwan — Data Engineering — Vrije Universiteit
- Bram Enning — kernteam hub Studiedata & AI

---

### 4b. `/data-ondersteund`
**Bron:** `system/reference/datagedreven-werken/datagedreven-werken-ho.md` + `wat-zijn-studiedata.md`

Secties:
1. **Hero** — "Data-ondersteund werken"
2. **Wat zijn studiedata?** — definitie, onderscheid Learning Analytics (LMS/primair) vs Student Analytics (SIS/administratief)
3. **Van data naar inzicht** — ruwe data → ethische principes → opschaling
4. **Van data naar acties** — 5-staps pipeline: Data → Informatie → Kennis → Inzicht → Acties (met het "cijfer 6" voorbeeld)
5. **Niveaus van aggregatie** — opleiding / landelijk / persoonlijk niveau

---

### 4c. `/randvoorwaarden`
**Bron:** `system/reference/datagedreven-werken/datagedreven-werken-ho.md`

Secties:
1. **Hero** — "Randvoorwaarden voor studiedata"
2. **Waarom** — onderwijs verbeteren op basis van feiten
3. **Waarmee** — wat er mis gaat zonder randvoorwaarden (pilots die sneuvelen)
4. **Randvoorwaarden** — alle onderdelen moeten op gelijk niveau
5. **Organisatieniveaus** — 3 lagen: Richten (strategisch) / Inrichten (tactisch) / Verrichten (operationeel)
6. **Ethische principes** — identiteit instelling, privacy eerst, ethiek vroeg verankeren
7. **Opschaling** — klein experiment → instellingsbreed, rol privacy officer

---

### 4d. `/meedoen`
**Bron:** Community page (selectie)

Secties:
1. **Hero** — "Doe mee met CEDA"
2. **3 manieren:**
   - Werkgroep — lid worden van een CEDA werkgroep (onderwerpen: Instroomprognose, Tekstanalyse Studenttevredenheid, PowerBI)
   - Workshop of regionale sessie — samen organiseren
   - Zelf aan de slag — tools + documentatie op GitHub (github.com/cedanl)
3. **Contact** — ceda@surf.nl + aanmeldformulier (link naar community)
4. **Link door** naar community pagina voor volledige info

---

## Bestanden overzicht

| Actie | Bestand |
|-------|---------|
| Wijzigen | `src/components/Header.astro` |
| Wijzigen | `src/components/ceda/ValueStream.tsx` |
| Nieuw | `src/pages/over-ons.astro` |
| Nieuw | `src/pages/data-ondersteund.astro` |
| Nieuw | `src/pages/randvoorwaarden.astro` |
| Nieuw | `src/pages/meedoen.astro` |

---

## Niet in scope

- Doelgroep-specifieke subpagina's (`/doelgroepen/lll` etc.)
- Persona-afbeeldingen lokaal hosten (hotlink volstaat voor nu)
- Content voor Data-ondersteund / Randvoorwaarden verder uitbreiden dan de bestaande MD-bestanden
- Animaties of page-transitions
