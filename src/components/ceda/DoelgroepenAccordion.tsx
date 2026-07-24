import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DOELGROEPEN } from '@/data/ceda';

/**
 * CEDA Doelgroepen Accordion
 *
 * Vervangt de pill-tabs switcher. Vijf uitklapbare kaarten met persona-afbeelding,
 * centrale inzichten (WIE/WIL/WANT/MAAR) en thema-chips. Slechts één tegelijk open;
 * klikken op de open kaart sluit hem (toggle).
 */

const PERSONA_IMAGES: Record<string, string> = {
  lll: 'https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Student-1.png',
  docent: 'https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Docent-1.png',
  manager: 'https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Opleidind.png',
  bestuurder: 'https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Bestuurder-1.png',
  onderzoeker: 'https://doe-meer-met-studiedata.nl/wp-content/uploads/2020/11/Onderzoeker-1.png',
};

interface Inzicht {
  wie: string;
  wil: string;
  want: string;
  maar: string;
}

const CENTRALE_INZICHTEN: Record<string, Inzicht[]> = {
  lll: [
    {
      wie: 'De leven-lang-lerende',
      wil: 'zicht op haar eigen voortgang en ontwikkeling',
      want: 'dat helpt haar bewuste keuzes te maken over haar leerloopbaan',
      maar: 'studiedata is versnipperd over meerdere systemen en niet toegankelijk voor de lerende zelf',
    },
    {
      wie: 'De begeleider',
      wil: 'vroeg signaleren welke deelnemers risico lopen op uitval',
      want: 'tijdig ingrijpen vergroot de kans op studiesucces',
      maar: 'er zijn geen gedeelde dashboards en coachinformatie wordt niet ontsloten voor anderen',
    },
    {
      wie: 'De leven-lang-lerende',
      wil: 'weten of haar eerdere werkervaring erkend wordt voor een verkorte leerroute',
      want: 'dit bepaalt welk traject voor haar past',
      maar: 'het EVC-proces is tijdrovend en ondoorzichtig voor de deelnemer',
    },
  ],
  docent: [
    {
      wie: 'De docent',
      wil: 'weten welke studenten dreigen achter te lopen vóórdat ze afhaken',
      want: 'vroeg ingrijpen vergroot studiesucces aanzienlijk',
      maar: 'dashboarddata is verouderd of niet beschikbaar op vakniveau',
    },
    {
      wie: 'De docent',
      wil: 'zijn lesmateriaal aanpassen op basis van wat studenten daadwerkelijk begrijpen',
      want: 'effectief onderwijs vraagt om continue terugkoppeling',
      maar: 'LMS-data is technisch aanwezig maar niet vertaald naar bruikbare onderwijsinzichten',
    },
    {
      wie: 'De ondersteuner',
      wil: 'studenten die bovengemiddeld veel begeleiding vragen vroegtijdig herkennen',
      want: 'dat signaleert bredere studie- of welzijnsproblematiek',
      maar: 'data over studieadviesgesprekken is niet gekoppeld aan studieresultaten',
    },
  ],
  manager: [
    {
      wie: 'De manager',
      wil: 'dagelijks inzicht in hoe zijn opleiding presteert op studeerbaarheid en rendement',
      want: 'dat bepaalt zijn prioriteiten en bijsturing',
      maar: 'managementinformatie is wekelijks of maandelijks en sluit niet aan op specifieke vragen',
    },
    {
      wie: 'De directeur',
      wil: 'handmatige rapportageprocessen automatiseren om haar team te ontlasten',
      want: 'medewerkers verliezen uren aan dataverzameling in plaats van onderwijs',
      maar: 'de benodigde data zit verspreid in meerdere systemen zonder koppeling',
    },
    {
      wie: 'De manager',
      wil: 'instroom- en uitvalcijfers tijdig zien om capaciteitsplanning aan te passen',
      want: 'te laat signaleren leidt tot financiële en organisatorische problemen',
      maar: 'prognosedata is niet beschikbaar op opleidingsniveau of met voldoende vooruitblik',
    },
  ],
  bestuurder: [
    {
      wie: 'De bestuurder',
      wil: 'sector-brede vergelijkingen maken om zijn instelling te positioneren',
      want: 'beleidskeuzes vereisen context buiten de eigen instelling',
      maar: 'vergelijkbare data van andere instellingen is niet beschikbaar of niet gestandaardiseerd',
    },
    {
      wie: 'De beleidsmaker',
      wil: 'aantonen dat een maatregel effect heeft gehad',
      want: 'verantwoording aan toezichthouder en financier is verplicht',
      maar: 'nulmetingen worden zelden vooraf ingericht en effecten zijn moeilijk isoleerbaar',
    },
    {
      wie: 'De bestuurder',
      wil: 'keuzes over krimp en groei van opleidingen onderbouwen met arbeidsmarktdata',
      want: 'demografische en economische trends bepalen de toekomst van opleidingen',
      maar: 'arbeidsmarktprognoses en instroomprogoses zijn gescheiden systemen zonder koppeling',
    },
  ],
  onderzoeker: [
    {
      wie: 'De onderzoeker',
      wil: 'meerdere instellingen combineren in één dataset',
      want: 'sectorbreed onderzoek vraagt om vergelijkbare, geaggregeerde data',
      maar: 'koppeling van bestanden stuit op AVG-drempels en ontbrekende standaarden',
    },
    {
      wie: 'De minister',
      wil: 'actuele data over uitval en doorstroom om beleidsinterventies te onderbouwen',
      want: 'urgentie vraagt om recente informatie om snel te kunnen handelen',
      maar: 'beschikbare datasets zijn een tot twee jaar oud op het moment van publicatie',
    },
    {
      wie: 'De onderzoeker',
      wil: 'haar bevindingen reproduceren en overdragen aan andere instellingen',
      want: 'wetenschappelijk onderzoek vraagt om open, gedeelde methodieken',
      maar: 'dataverwerkingspipelines zijn zelden gedocumenteerd of beschikbaar gesteld',
    },
  ],
};

function InzichtCard({ inzicht }: { inzicht: Inzicht }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3.5">
      <p className="text-[13px] leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">{inzicht.wie}</span>
        {' '}wil{' '}
        <span className="text-foreground">{inzicht.wil}</span>
        {', '}
        <span className="italic">want</span>
        {' '}{inzicht.want},{' '}
        <span className="font-medium text-foreground">maar</span>
        {' '}{inzicht.maar}.
      </p>
    </div>
  );
}

export default function DoelgroepenAccordion() {
  const [activeDg, setActiveDg] = useState<string>('lll');

  function toggleDg(id: string) {
    setActiveDg((prev) => (prev === id ? '' : id));
  }

  return (
    <div
      id="doelgroepen"
      className="mx-auto max-w-[1200px] px-4 pb-8 md:px-8 flex flex-col gap-3"
    >
      {DOELGROEPEN.map((d) => {
        const isOpen = d.id === activeDg;
        const inzichten = CENTRALE_INZICHTEN[d.id] ?? [];

        return (
          <div key={d.id} className="rounded-xl border border-border overflow-hidden">
            {/* Accordion header */}
            <button
              type="button"
              onClick={() => toggleDg(d.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-4 py-3 bg-card hover:bg-muted/60 transition-colors text-left"
            >
              <img
                src={PERSONA_IMAGES[d.id]}
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover flex-none border border-border"
              />
              <div className="flex flex-1 min-w-0 flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">{d.label}</span>
                {d.sub && (
                  <span className="text-xs text-muted-foreground">{d.sub}</span>
                )}
              </div>
              <span
                className={cn(
                  'flex-none text-xs text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>

            {/* Accordion body */}
            {isOpen && (
              <div className="border-t border-border px-4 py-5 md:px-8">
                {/* Inzicht tekst + themas */}
                <p className="mb-4 max-w-[860px] text-[15px] leading-relaxed text-muted-foreground">
                  {d.inzicht}
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {d.themas.map((t) => (
                    <span
                      key={t}
                      className="whitespace-nowrap rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Centrale inzichten */}
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Centrale inzichten
                </p>
                <div className="flex flex-col gap-2">
                  {inzichten.map((inzicht, i) => (
                    <InzichtCard key={i} inzicht={inzicht} />
                  ))}
                </div>

                {/* Link naar tools */}
                <a
                  href="/praktijk"
                  className="mt-5 inline-flex items-center gap-1 text-sm text-ceda-link hover:underline"
                >
                  Bekijk tools & databronnen →
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
