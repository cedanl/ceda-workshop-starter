/**
 * CEDA canonical data — ported (unchanged content) from system/ceda-data.js.
 *
 * Doelgroep-gecentreerd: elke use case heeft een `doelgroep` en een `fase`.
 * Gebruikt door de ValueStream-island en de "Alle databronnen"-sectie.
 */

export interface Doelgroep {
  id: string;
  label: string;
  sub: string;
  inzicht: string;
  themas: string[];
}

export interface Fase {
  id: string;
  icon: string;
  label: string;
}

export type UseCaseStatus = 'beschikbaar' | 'ontw' | 'idee';

export interface UseCaseSource {
  name: string;
  avail: boolean;
}

export type BivLevel = 'laag' | 'midden' | 'hoog';

export interface UseCaseCategory {
  name: string;
  biv: BivLevel;
  fields: string[];
}

export interface UseCaseInterface {
  icon: string;
  label: string;
  active: boolean;
}

export interface UseCaseLink {
  icon: string;
  label: string;
  href: string;
}

export interface UseCase {
  id: string;
  doelgroep: string;
  fase: string;
  title: string;
  status: UseCaseStatus;
  tagline: string;
  desc: string;
  sources: UseCaseSource[];
  categories: UseCaseCategory[];
  vormen: string[];
  methoden: string[];
  interfaces: UseCaseInterface[];
  links: UseCaseLink[];
}

export interface StreamStep {
  label: string;
  tools: string[];
}

export type Streams = Record<string, StreamStep[]>;

export type BronStatus = 'beschikbaar' | 'dev' | 'niet';

export interface Bron {
  name: string;
  type: string;
  status: BronStatus;
}

export const DOELGROEPEN: Doelgroep[] = [
  {
    id: 'lll',
    label: 'Leven-lang-lerende',
    sub: '(+ begeleider)',
    inzicht:
      'Grip op de eigen ontwikkeling en betere keuzes op korte én lange termijn — maar data is versnipperd, niet actueel en zonder duidelijke privacy-/ethiek-afspraken.',
    themas: ['Voortgang', 'Gedrag', 'Welzijn'],
  },
  {
    id: 'docent',
    label: 'Docent',
    sub: '(+ ondersteuner)',
    inzicht:
      'Kwalitatief beter onderwijs ontwerpen en lesmateriaal aantoonbaar effectiever inzetten — maar data ontbreekt, is versnipperd en zonder heldere kaders.',
    themas: ['Begripsproblemen', 'Betrokkenheid', 'Effectiviteit lesmateriaal', 'Kwaliteit vak'],
  },
  {
    id: 'manager',
    label: 'Manager & Directeur',
    sub: '',
    inzicht:
      'De organisatie toekomstbestendig maken en alle medewerkers ontlasten en versterken — maar besluitvorming steunt op versnipperde, foutgevoelige data.',
    themas: [
      'Operationele sturing',
      'Financiële sturing',
      'Medewerkers versterken',
      'Toekomstbestendige organisatie',
    ],
  },
  {
    id: 'bestuurder',
    label: 'Bestuurder & Beleidmaker',
    sub: '',
    inzicht:
      'De sector toekomstbestendig maken en beleid onderbouwen met actuele data die past bij publieke waarden — maar rapporten sluiten niet aan op nieuwe beleidsvragen.',
    themas: [
      'Strategische sturing',
      'Financiële sturing',
      'Werkgelegenheid',
      'Toekomstbestendige sector',
    ],
  },
  {
    id: 'onderzoeker',
    label: 'Onderzoeker & Minister',
    sub: '',
    inzicht:
      'Werk dat bijdraagt aan wetenschappelijke inzichten én maatschappelijke verbetering — maar data is niet altijd beschikbaar, actueel of vergelijkbaar tussen instellingen.',
    themas: ['Sectorbrede trends', 'Benchmarking', 'Beleidsevaluatie'],
  },
];

export const FASES: Fase[] = [
  { id: 'werving', icon: '🎯', label: 'Werving' },
  { id: 'matching', icon: '🔗', label: 'Selectie & Matching' },
  { id: 'inschrijving', icon: '📋', label: 'Inschrijving' },
  { id: 'onderwijs', icon: '📚', label: 'Onderwijs' },
  { id: 'evaluatie', icon: '📊', label: 'Evaluatie' },
  { id: 'arbeidsmarkt', icon: '💼', label: 'Arbeidsmarkt' },
];

// status: beschikbaar | ontw | idee
export const USE_CASES: UseCase[] = [
  {
    id: 'uitnodigingsregel',
    doelgroep: 'lll',
    fase: 'onderwijs',
    title: 'Uitnodigingsregel',
    status: 'beschikbaar',
    tagline: 'Vroegsignalering studentuitval',
    desc: 'Rangschikt studenten vroeg in jaar 1 op uitvalrisico, zodat de studieloopbaanbegeleider risicogevallen in de juiste volgorde spreekt. Model draait lokaal — data verlaat de instelling niet; alleen metrics worden federatief gedeeld voor benchmarking.',
    sources: [
      { name: 'SIS (Eduarte/Osiris)', avail: true },
      { name: 'Verzuimregistratie', avail: true },
      { name: 'DWH', avail: false },
    ],
    categories: [
      {
        name: 'Registratie data',
        biv: 'laag',
        fields: [
          'Inschrijfdatum',
          'Aanwezigheid/verzuim',
          'Examencijfers vooropleiding',
          'Uitkomst: uitval ja/nee',
        ],
      },
      {
        name: 'Persoonseigenschappen',
        biv: 'hoog',
        fields: ['Demografie', 'Voorgeschiedenis vooropleiding'],
      },
    ],
    vormen: ['Individueel (synthetisch)', 'Geaggregeerd'],
    methoden: ['Logistische regressie', 'Random Forest', 'Federatieve benchmark (JSON-metrics)'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: true },
      { icon: '💬', label: 'Chat', active: false },
    ],
    links: [
      {
        icon: '📦',
        label: 'GitHub: cedanl/Uitnodigingsregel',
        href: 'https://github.com/cedanl/Uitnodigingsregel',
      },
      {
        icon: '📖',
        label: 'Onderzoek Irene Eegdeman (toolkit mbo-pilots)',
        href: 'https://github.com/cedanl/Uitnodigingsregel',
      },
    ],
  },
  {
    id: 'samenwijzer_gids',
    doelgroep: 'lll',
    fase: 'matching',
    title: 'SamenWijzer – digitale gids',
    status: 'ontw',
    tagline: 'Planner leerloopbaan (MVP)',
    desc: 'Digitale gids die de student en de studieloopbaanbegeleider helpt de leerloopbaan te plannen: inzicht in studievoortgang en advies over leermogelijkheden en ondersteuning, zodat de student zijn eigen leerpad vorm kan geven. Onderdeel van SamenWijzer, nu als losse MVP.',
    sources: [
      { name: 'SIS', avail: true },
      { name: 'LRS', avail: false },
      { name: 'IguideME', avail: true },
    ],
    categories: [
      {
        name: 'Onderwijs data',
        biv: 'midden',
        fields: ['Studievoortgang', 'Leerdoelen', 'Ondersteuningsaanbod'],
      },
      { name: 'Registratie data', biv: 'laag', fields: ['Opleiding', 'Cohort'] },
    ],
    vormen: ['Individueel (synthetisch)'],
    methoden: ['Aanbevelingsregels', 'Beschrijvende statistiek'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: false },
      { icon: '💬', label: 'Chat', active: true },
    ],
    links: [
      {
        icon: '🔗',
        label: 'Stuurgroep-info use case SamenWijzer',
        href: 'https://datagedrevenonderzoekmbo.nl/stuurgroep-informatie-use-case-samenwijzer-slimme-hulp-voor-jouw-studiepad/',
      },
    ],
  },
  {
    id: 'koerskiezer',
    doelgroep: 'lll',
    fase: 'onderwijs',
    title: 'Koerskiezer',
    status: 'idee',
    tagline: 'Programma-keuzes maken (SamenWijzer fase 2) — werknaam',
    desc: 'Voortgangsmonitor die de student ondersteunt bij het maken van programma-/keuzevakkeuzes op basis van voortgang en interesses. Fase 2 van SamenWijzer; naam is een werknaam en mag nog wijzigen.',
    sources: [
      { name: 'SIS', avail: true },
      { name: 'IguideME', avail: true },
      { name: 'LRS', avail: false },
    ],
    categories: [
      {
        name: 'Onderwijs data',
        biv: 'midden',
        fields: ['Voortgang per programma-onderdeel', 'Keuzevakken', 'Interesseprofiel'],
      },
      { name: 'Registratie data', biv: 'laag', fields: ['Opleiding', 'Cohort'] },
    ],
    vormen: ['Individueel (synthetisch)'],
    methoden: ['Aanbevelingsregels', 'Beschrijvende statistiek'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: true },
      { icon: '💬', label: 'Chat', active: true },
    ],
    links: [
      {
        icon: '💡',
        label: 'Idee — draag bij via Community',
        href: 'https://community-data-ai.npuls.nl/groups/view/44d20066-53a8-48c2-b4e9-be348e05d273/project-center-for-educational-data-analytics-ceda',
      },
    ],
  },
  {
    id: 'hallostudent',
    doelgroep: 'lll',
    fase: 'onderwijs',
    title: 'HalloStudent!',
    status: 'idee',
    tagline: 'Dagelijkse check-in voor welzijn & motivatie',
    desc: 'Een korte dagelijkse check-in waarin studenten aangeven hoe ze zich voelen, of ze goed geslapen hebben en hoe hun motivatie is — zodat welzijns- en motivatiesignalen vroegtijdig herkend worden en ondersteuning geboden kan worden. (Regiobijeenkomsten MBO — thema Studentwelzijn.)',
    sources: [
      { name: 'Check-in app', avail: false },
      { name: 'SIS', avail: true },
    ],
    categories: [
      {
        name: 'Welzijn data',
        biv: 'hoog',
        fields: ['Stemming', 'Slaap', 'Motivatie', 'Ervaren belasting'],
      },
      { name: 'Registratie data', biv: 'laag', fields: ['Aanwezigheid', 'Deelname'] },
    ],
    vormen: ['Individueel (synthetisch)', 'Geaggregeerd'],
    methoden: ['Signaaldetectie', 'Trendanalyse'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: false },
      { icon: '💬', label: 'Chat', active: true },
    ],
    links: [
      {
        icon: '💡',
        label: 'Idee — draag bij via Community',
        href: 'https://community-data-ai.npuls.nl/groups/view/44d20066-53a8-48c2-b4e9-be348e05d273/project-center-for-educational-data-analytics-ceda',
      },
    ],
  },
  {
    id: 'slbbuddy',
    doelgroep: 'lll',
    fase: 'onderwijs',
    title: 'SLB Buddy',
    status: 'idee',
    tagline: 'Focus op de student in begeleidingsgesprekken',
    desc: 'Ondersteunt de begeleider bij intake- en begeleidingsgesprekken: legt relevante informatie op een uniforme, efficiënte manier vast en maakt signalen voor hulpbehoeften direct inzichtelijk voor vervolgacties — zodat de professional zich op de student kan richten. (Regiobijeenkomsten MBO — thema Slimmer werken.)',
    sources: [
      { name: 'Gespreksverslagen', avail: false },
      { name: 'SIS', avail: true },
    ],
    categories: [
      {
        name: 'Registratie data',
        biv: 'midden',
        fields: ['Gespreksverslagen', 'Afgesproken acties', 'Hulpbehoefte-signalen'],
      },
    ],
    vormen: ['Individueel (synthetisch)'],
    methoden: ['Tekst-samenvatting (LLM)', 'Signaalextractie'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: false },
      { icon: '💬', label: 'Chat', active: true },
    ],
    links: [
      {
        icon: '💡',
        label: 'Idee — draag bij via Community',
        href: 'https://community-data-ai.npuls.nl/groups/view/44d20066-53a8-48c2-b4e9-be348e05d273/project-center-for-educational-data-analytics-ceda',
      },
    ],
  },
  {
    id: 'lesaanpasser',
    doelgroep: 'docent',
    fase: 'onderwijs',
    title: 'Slimme LesAanpasser',
    status: 'idee',
    tagline: 'Inclusief en doelgroepgericht lesmateriaal',
    desc: 'Helpt de docent lesmateriaal makkelijk aan te passen aan specifieke behoeften van studenten — taalniveau, leerstijl of toegankelijkheidseisen (bijv. dyslexie of een migratieachtergrond). (Regiobijeenkomsten MBO — thema Inclusief onderwijs.)',
    sources: [
      { name: 'Lesmateriaal-CMS', avail: false },
      { name: 'SIS', avail: true },
    ],
    categories: [
      {
        name: 'Onderwijs data',
        biv: 'midden',
        fields: ['Lesmateriaal', 'Toegankelijkheidskenmerken', 'Taalniveau'],
      },
      {
        name: 'Persoonseigenschappen',
        biv: 'hoog',
        fields: ['Ondersteuningsbehoefte', 'Taalachtergrond'],
      },
    ],
    vormen: ['Geaggregeerd'],
    methoden: ['Tekstvereenvoudiging (LLM)', 'Content-tagging'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: false },
      { icon: '💬', label: 'Chat', active: true },
    ],
    links: [
      {
        icon: '💡',
        label: 'Idee — draag bij via Community',
        href: 'https://community-data-ai.npuls.nl/groups/view/44d20066-53a8-48c2-b4e9-be348e05d273/project-center-for-educational-data-analytics-ceda',
      },
    ],
  },
  {
    id: 'skillsradar',
    doelgroep: 'docent',
    fase: 'arbeidsmarkt',
    title: 'SkillsRadar',
    status: 'idee',
    tagline: 'Mapping van arbeidsmarktbehoeften en onderwijsaanbod',
    desc: 'Mapt de behoeften van de arbeidsmarkt op het onderwijsaanbod, zodat praktijk-/beroepsgericht onderwijs kan inspelen op actuele ontwikkelingen en studenten beter voorbereid zijn op hun toekomstige beroep. (Regiobijeenkomsten MBO — thema Aansluiting arbeidsmarkt.)',
    sources: [
      { name: 'Kwalificatiedossiers (SBB)', avail: false },
      { name: 'Vacaturedata', avail: false },
      { name: 'DUO', avail: true },
    ],
    categories: [
      {
        name: 'Arbeidsmarkt data',
        biv: 'midden',
        fields: ['Gevraagde skills', 'Beroepsgroepen', 'Groei/krimp'],
      },
      { name: 'Onderwijs data', biv: 'laag', fields: ['Kwalificatiedossiers', 'Onderwijsaanbod'] },
    ],
    vormen: ['Geaggregeerd'],
    methoden: ['Skills-matching (NLP)', 'Trendanalyse'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: true },
      { icon: '💬', label: 'Chat', active: false },
    ],
    links: [
      {
        icon: '💡',
        label: 'Idee — draag bij via Community',
        href: 'https://community-data-ai.npuls.nl/groups/view/44d20066-53a8-48c2-b4e9-be348e05d273/project-center-for-educational-data-analytics-ceda',
      },
    ],
  },
  {
    id: 'iguideme',
    doelgroep: 'docent',
    fase: 'onderwijs',
    title: 'IguideME-koppeling',
    status: 'ontw',
    tagline: 'Gepersonaliseerde learning analytics',
    desc: 'Studenten zien hun eigen voortgang en vergelijken die met de groep; de docent krijgt zicht op begripsproblemen en betrokkenheid. CEDA ondersteunt de datakoppeling tussen IguideME en de instellingsbronnen.',
    sources: [
      { name: 'SIS', avail: true },
      { name: 'IguideME', avail: true },
      { name: 'LRS', avail: false },
    ],
    categories: [
      {
        name: 'Onderwijs data',
        biv: 'midden',
        fields: ['IguideME activiteiten', 'Opdrachten', 'Toetsscores', 'Vergelijking met cohort'],
      },
      { name: 'Registratie data', biv: 'laag', fields: ['Opleiding', 'Cohort'] },
    ],
    vormen: ['Individueel (synthetisch)'],
    methoden: ['Beschrijvende statistiek', 'Peer benchmarking'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: true },
      { icon: '💬', label: 'Chat', active: false },
    ],
    links: [{ icon: '🔗', label: 'IguideME documentatie', href: 'https://github.com/cedanl' }],
  },
  {
    id: 'studentprognose',
    doelgroep: 'manager',
    fase: 'werving',
    title: 'Studentprognose',
    status: 'beschikbaar',
    tagline: 'Instroomprognose eerstejaars',
    desc: 'Voorspelt maanden vooruit de verwachte eerstejaarsinstroom per opleiding, zodat de opleidingsdirecteur tijdig capaciteit, docentinzet en budget kan plannen. Ensemble van meerdere modellen, wekelijks bijgewerkt met Studielink- en SIS-data. Draait bij de instelling zelf.',
    sources: [
      { name: 'Studielink', avail: true },
      { name: 'SIS (Osiris/Eduarte)', avail: true },
      { name: 'CAMBO', avail: false },
    ],
    categories: [
      {
        name: 'Registratie data',
        biv: 'laag',
        fields: [
          'Vooraanmeldingen (Studielink)',
          'Individuele SIS-aanmeldingen',
          'Opleiding',
          'Aanmeldmoment',
        ],
      },
    ],
    vormen: ['Geaggregeerd'],
    methoden: ['Ensemble van voorspelmodellen', 'Tijdreeksanalyse', 'Betrouwbaarheidsinschatting'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: true },
      { icon: '💬', label: 'Chat', active: false },
    ],
    links: [
      {
        icon: '📦',
        label: 'GitHub: cedanl/studentprognose',
        href: 'https://github.com/cedanl/studentprognose',
      },
      {
        icon: '📖',
        label: 'Radboud Universiteit + Vox-artikel',
        href: 'https://github.com/cedanl/studentprognose',
      },
    ],
  },
  {
    id: 'staat',
    doelgroep: 'bestuurder',
    fase: 'evaluatie',
    title: 'Staat van de onderwijsinstelling',
    status: 'beschikbaar',
    tagline: 'Studiesucces-indicatoren per cohort',
    desc: "Berekent per cohort instroom, rendement (3/5/8 jr), uitval en switch op basis van gedecodeerde DUO 1CHO-bestanden — uniform, herhaalbaar en (informeel) te benchmarken tussen instellingen. Snel aanpasbaar als er landelijk nieuwe vragen opkomen.",
    sources: [
      { name: 'DUO 1CHO', avail: true },
      { name: 'DUO bekostiging', avail: true },
      { name: 'Dashboard-portal (PowerBI)', avail: true },
    ],
    categories: [
      {
        name: 'Onderwijs data',
        biv: 'midden',
        fields: ["Inschrijvingen per student", "Diploma's", 'Rendement', 'Uitval & switch'],
      },
      {
        name: 'Metadata',
        biv: 'laag',
        fields: ['Decoderingstabellen', 'DUO-bestandsbeschrijvingen'],
      },
    ],
    vormen: ['Geaggregeerd'],
    methoden: ['Cohortanalyse', 'Rendementsberekening', 'Benchmark'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: true },
      { icon: '💬', label: 'Chat', active: false },
    ],
    links: [
      {
        icon: '📦',
        label: 'GitHub: cedanl/staat-van-onderwijsinstelling',
        href: 'https://github.com/cedanl/staat-van-onderwijsinstelling',
      },
      {
        icon: '📖',
        label: 'Voorbeeld: Staat van Avans',
        href: 'https://github.com/cedanl',
      },
    ],
  },
  {
    id: 'selectie',
    doelgroep: 'bestuurder',
    fase: 'matching',
    title: 'Selectie-evaluatietool',
    status: 'ontw',
    tagline: 'Numerus fixus: selectie × studiesucces',
    desc: 'Koppelt selectiescores aan gevalideerd studiesucces en achtergrondkenmerken, zodat een beleidsmedewerker ziet of de selectieprocedure effectief én eerlijk is. Dashboard + PDF-rapport met kansengelijkheid expliciet in beeld. MVP-traject met Radboud en Universiteit Leiden.',
    sources: [
      { name: 'Selectie-administratie (Excel)', avail: true },
      { name: 'DUO 1CHO', avail: true },
    ],
    categories: [
      {
        name: 'Selectiedata',
        biv: 'midden',
        fields: ['Scores per instrument/criterium', 'Totaalscore'],
      },
      {
        name: 'Onderwijs data',
        biv: 'midden',
        fields: ['Inschrijving', 'Doorstroom jaar 2', 'Diploma'],
      },
      {
        name: 'Demografie',
        biv: 'hoog',
        fields: ['Geslacht', 'Leeftijd', 'Herkomst/nationaliteit (gevoelig)'],
      },
    ],
    vormen: ['Individueel (synthetisch)', 'Geaggregeerd'],
    methoden: ['Verschiltoets', 'Correlatie', 'Regressie', 'Kansengelijkheidsanalyse'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: true },
      { icon: '💬', label: 'Chat', active: false },
    ],
    links: [
      {
        icon: '📦',
        label: 'GitHub: cedanl/selectie-evaluatietool',
        href: 'https://github.com/cedanl/selectie-evaluatietool',
      },
      {
        icon: '📖',
        label: 'ETHO / Handboek Selectie HO',
        href: 'https://github.com/cedanl',
      },
    ],
  },
  {
    id: 'sectorvergelijking',
    doelgroep: 'onderzoeker',
    fase: 'arbeidsmarkt',
    title: 'Sector-vergelijking uitstroom',
    status: 'idee',
    tagline: 'Uitstroomprofielen per sector en opleiding',
    desc: 'Vergelijkt uitstroomprofielen per sector en opleiding: welke sectoren groeien, welke krimpen? Input voor strategische opleidingskeuzes en beleidsevaluatie op sectorniveau.',
    sources: [
      { name: 'CBS Microdata', avail: true },
      { name: 'DUO', avail: true },
      { name: 'UWV Data', avail: false },
    ],
    categories: [
      {
        name: 'Arbeidsmarkt data',
        biv: 'midden',
        fields: ['Sector (SBI)', 'Beroepsgroep', 'Groei/krimp indicatoren'],
      },
      { name: 'Registratie data', biv: 'laag', fields: ['Opleiding', 'Diplomajaar'] },
    ],
    vormen: ['Geaggregeerd'],
    methoden: ['Trendanalyse', 'Sectorindeling (SBI-codes)'],
    interfaces: [
      { icon: '📊', label: 'Dashboard', active: false },
      { icon: '💬', label: 'Chat', active: false },
    ],
    links: [
      {
        icon: '💡',
        label: 'Idee — draag bij via Community',
        href: 'https://community-data-ai.npuls.nl/groups/view/44d20066-53a8-48c2-b4e9-be348e05d273/project-center-for-educational-data-analytics-ceda',
      },
    ],
  },
];

// Alle databronnen voor het totaaloverzicht (status: beschikbaar|dev|niet)
export const ALLE_BRONNEN: Bron[] = [
  { name: 'SIS', type: 'Student Informatiesysteem (Eduarte/Osiris)', status: 'beschikbaar' },
  { name: 'Studielink', type: 'Vooraanmeldingen hbo/wo', status: 'beschikbaar' },
  { name: '1CHO', type: 'DUO — Centraal register HO', status: 'beschikbaar' },
  { name: 'DUO Open Data', type: 'Openbare onderwijsdata', status: 'beschikbaar' },
  { name: 'CBS Microdata', type: 'Statistiek Nederland', status: 'beschikbaar' },
  { name: 'IguideME', type: 'Learning analytics tool', status: 'beschikbaar' },
  { name: 'Verzuimregistratie', type: 'In of naast SIS', status: 'beschikbaar' },
  { name: 'LRS', type: 'Learning Record Store', status: 'dev' },
  { name: 'CAMBO', type: 'Aanmeldproces — on hold', status: 'dev' },
  { name: 'UWV Data', type: 'Arbeidsmarkt uitkeringsdata', status: 'dev' },
  { name: 'Kwalificatiedossiers (SBB)', type: 'Onderwijs↔arbeidsmarkt', status: 'niet' },
  { name: 'Welzijn check-in', type: 'Nog te ontsluiten', status: 'niet' },
];

// Waardestromen per doelgroep — geordende reeks stappen (links → rechts).
// tools = array van use-case-id's (leeg = nog geen tool, "kans").
export const STREAMS: Streams = {
  lll: [
    { label: 'Verkennen onderwijsproducten', tools: [] },
    { label: 'Matching', tools: ['slbbuddy'] },
    { label: 'Planner leerloopbaan', tools: ['samenwijzer_gids'] },
    { label: 'Programma-keuzes maken', tools: ['koerskiezer'] },
    { label: 'Leren', tools: [] },
    { label: 'Voortgang bewaken', tools: ['uitnodigingsregel'] },
    { label: 'Welzijn', tools: ['hallostudent'] },
    { label: 'Intrede arbeidsmarkt', tools: [] },
  ],
  docent: [
    { label: 'Ontwerpen modules', tools: [] },
    { label: 'Produceren leermiddelen', tools: ['lesaanpasser'] },
    { label: 'Uitvoeren van onderwijs', tools: [] },
    { label: 'Formatieve monitoring', tools: ['iguideme'] },
  ],
  manager: [
    { label: 'Ontwerpen curriculum', tools: ['skillsradar'] },
    { label: 'Werven', tools: ['studentprognose'] },
    { label: 'Matching', tools: ['selectie'] },
    { label: 'Onderwijs plannen', tools: [] },
    { label: 'Roosteren', tools: [] },
    { label: 'Aansluiting arbeidsmarkt', tools: [] },
    { label: 'Evalueren', tools: [] },
  ],
  bestuurder: [
    { label: 'Strategie', tools: [] },
    { label: 'Ontwerpen onderwijsportfolio', tools: [] },
    { label: 'Financiering (bekostiging)', tools: [] },
    { label: 'Kwaliteitszorg', tools: ['staat'] },
    { label: 'Onderwijsinnovatie', tools: [] },
    { label: 'Verbinden onderwijs en onderzoek', tools: [] },
    { label: 'Aansluiting samenleving', tools: [] },
    { label: 'Evalueren', tools: [] },
  ],
  onderzoeker: [
    { label: 'Nationaal portfolio', tools: [] },
    { label: 'Instroom vervolgonderwijs', tools: [] },
    { label: 'Doorstroom', tools: ['sectorvergelijking'] },
    { label: 'Financiering', tools: [] },
    { label: 'Onderwijskundig onderzoek', tools: [] },
    { label: 'Evaluatie', tools: [] },
  ],
};
