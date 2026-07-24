import { useState } from 'react';
import { DOELGROEPEN, STREAMS, USE_CASES, type UseCase } from '@/data/ceda';
import { cn } from '@/lib/utils';

const ucById = Object.fromEntries(USE_CASES.map((uc) => [uc.id, uc]));

const STATUS_LABEL: Record<string, string> = {
  beschikbaar: 'Beschikbaar',
  ontw: 'In ontwikkeling',
  idee: 'Idee',
};

const STATUS_CLS: Record<string, string> = {
  beschikbaar: 'bg-ceda-status-available-bg text-ceda-status-available-fg',
  ontw: 'bg-ceda-status-dev-bg text-ceda-status-dev-fg',
  idee: 'bg-ceda-status-idea-bg text-muted-foreground',
};

const BIV_CLS: Record<string, string> = {
  laag: 'bg-ceda-biv-low-bg text-ceda-biv-low-fg',
  midden: 'bg-ceda-biv-mid-bg text-ceda-biv-mid-fg',
  hoog: 'bg-ceda-biv-high-bg text-ceda-biv-high-fg',
};

const BIV_LABEL: Record<string, string> = {
  laag: 'Laag gevoelig',
  midden: 'Middel gevoelig',
  hoog: 'Hoog gevoelig',
};

function DetailPanel({
  uc,
  onClose,
}: {
  uc: UseCase;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay (mobile) */}
      <div
        className="fixed inset-0 z-[190] bg-black/40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Details: ${uc.title}`}
        className={cn(
          'fixed inset-y-0 right-0 z-[200] w-full max-w-[440px] overflow-y-auto',
          'border-l border-border bg-popover shadow-2xl',
          'transition-transform duration-300 ease-out translate-x-0',
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  'inline-block text-[11px] font-semibold rounded-full px-2.5 py-0.5 mb-2',
                  STATUS_CLS[uc.status],
                )}
              >
                {STATUS_LABEL[uc.status]}
              </span>
              <h2 className="font-serif text-xl font-light text-foreground leading-tight">
                {uc.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{uc.tagline}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="flex-none flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ceda-link"
            >
              ✕
            </button>
          </div>

          {/* Beschrijving */}
          <p className="text-[14px] leading-relaxed text-muted-foreground mb-6">
            {uc.desc}
          </p>

          {/* Databronnen */}
          {uc.sources.length > 0 && (
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Databronnen
              </p>
              <div className="flex flex-col gap-1.5">
                {uc.sources.map((src) => (
                  <div key={src.name} className="flex items-center gap-2">
                    <span
                      className={cn(
                        'h-2 w-2 flex-none rounded-full',
                        src.avail ? 'bg-ceda-success' : 'bg-border',
                      )}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-foreground">{src.name}</span>
                    {!src.avail && (
                      <span className="text-xs text-muted-foreground">— te koppelen</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categorieën & BIV */}
          {uc.categories.length > 0 && (
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Datavelden & gevoeligheid
              </p>
              <div className="flex flex-col gap-3">
                {uc.categories.map((cat) => (
                  <div key={cat.name} className="rounded-lg border border-border bg-muted/30 px-3 py-3">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-foreground">{cat.name}</span>
                      <span
                        className={cn(
                          'text-[10px] font-semibold rounded-full px-2 py-0.5',
                          BIV_CLS[cat.biv],
                        )}
                      >
                        {BIV_LABEL[cat.biv]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.fields.map((f) => (
                        <span
                          key={f}
                          className="text-[11px] rounded-full border border-border bg-background px-2 py-0.5 text-muted-foreground"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Methoden */}
          {uc.methoden.length > 0 && (
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Methoden
              </p>
              <div className="flex flex-wrap gap-1.5">
                {uc.methoden.map((m) => (
                  <span
                    key={m}
                    className="text-xs rounded-full border border-border bg-card px-2.5 py-1 text-foreground"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {uc.links.length > 0 && (
            <div className="flex flex-col gap-2 mt-4">
              {uc.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-lg border border-border px-3.5 py-2.5 text-sm text-ceda-link transition-colors hover:bg-muted"
                >
                  <span>{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function UseCaseCard({
  uc,
  active,
  onClick,
}: {
  uc: UseCase;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-left rounded-xl border bg-card p-5 transition-all duration-150',
        'hover:border-ceda-primary hover:shadow-[0_4px_16px_rgba(221,120,75,0.12)] hover:-translate-y-0.5',
        active
          ? 'border-ceda-primary shadow-[0_4px_20px_rgba(221,120,75,0.18)]'
          : 'border-border',
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-semibold text-foreground leading-snug">{uc.title}</h3>
        <span
          className={cn(
            'flex-none text-[10px] font-semibold rounded-full px-2 py-0.5',
            STATUS_CLS[uc.status],
          )}
        >
          {STATUS_LABEL[uc.status]}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{uc.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {uc.sources.slice(0, 2).map((src) => (
          <span
            key={src.name}
            className="text-[10px] rounded-full border border-border px-2 py-0.5 text-muted-foreground"
          >
            {src.name}
          </span>
        ))}
        {uc.sources.length > 2 && (
          <span className="text-[10px] text-muted-foreground">+{uc.sources.length - 2}</span>
        )}
      </div>
    </button>
  );
}

function EmptyStep({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
      <div className="mb-3 text-3xl" aria-hidden="true">
        💡
      </div>
      <p className="text-sm font-semibold text-foreground mb-1">Nog geen tool</p>
      <p className="text-xs text-muted-foreground max-w-[280px]">
        <strong>{label}</strong> is een kans. Heb jij een idee? Draag bij via de CEDA community.
      </p>
      <a
        href="https://community-data-ai.npuls.nl/groups/view/44d20066-53a8-48c2-b4e9-be348e05d273/project-center-for-educational-data-analytics-ceda"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-ceda-link hover:bg-muted transition-colors"
      >
        Naar de community →
      </a>
    </div>
  );
}

export default function WaardestroomTool() {
  const [activeDg, setActiveDg] = useState<string>('lll');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeUc, setActiveUc] = useState<UseCase | null>(null);

  const steps = STREAMS[activeDg] ?? [];
  const currentStep = steps[activeStep] ?? steps[0];
  const stepUCs = (currentStep?.tools ?? [])
    .map((id) => ucById[id])
    .filter(Boolean) as UseCase[];

  function selectDg(id: string) {
    setActiveDg(id);
    setActiveStep(0);
    setActiveUc(null);
  }

  function selectStep(i: number) {
    setActiveStep(i);
    setActiveUc(null);
  }

  function selectUc(uc: UseCase) {
    setActiveUc((prev) => (prev?.id === uc.id ? null : uc));
  }

  return (
    <div id="waardestroom" className="border-t border-border">
      {/* Doelgroep tabs */}
      <div className="bg-muted/30 border-b border-border overflow-x-auto scrollbar-none">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 flex gap-1 py-2">
          {DOELGROEPEN.map((dg) => (
            <button
              key={dg.id}
              type="button"
              onClick={() => selectDg(dg.id)}
              className={cn(
                'whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ceda-link',
                activeDg === dg.id
                  ? 'bg-ceda-primary text-ceda-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background',
              )}
            >
              {dg.label}
              {dg.sub && (
                <span className="ml-1 text-xs opacity-70">{dg.sub}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Waardestroom steps */}
      <div className="border-b border-border overflow-x-auto scrollbar-none sticky top-[63px] z-[85] bg-background">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 flex">
          {steps.map((step, i) => {
            const hasTools = step.tools.length > 0;
            return (
              <button
                key={i}
                type="button"
                onClick={() => selectStep(i)}
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap px-4 py-3.5 text-sm font-medium transition-colors',
                  'border-b-2 -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ceda-link',
                  activeStep === i
                    ? 'border-ceda-primary text-ceda-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {step.label}
                {hasTools && (
                  <span
                    className={cn(
                      'flex-none h-1.5 w-1.5 rounded-full',
                      activeStep === i ? 'bg-ceda-primary' : 'bg-ceda-success',
                    )}
                    aria-label="heeft tool"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main: cards + detail panel */}
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8">
        {/* Step header */}
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h3 className="font-serif text-xl font-light text-foreground">
            {currentStep?.label}
          </h3>
          <span className="text-sm text-muted-foreground">
            {stepUCs.length} {stepUCs.length === 1 ? 'tool' : 'tools'}
          </span>
        </div>

        {/* Cards grid */}
        {stepUCs.length === 0 ? (
          <EmptyStep label={currentStep?.label ?? ''} />
        ) : (
          <div
            className={cn(
              'grid gap-4',
              activeUc
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {stepUCs.map((uc) => (
              <UseCaseCard
                key={uc.id}
                uc={uc}
                active={activeUc?.id === uc.id}
                onClick={() => selectUc(uc)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail panel */}
      {activeUc && (
        <DetailPanel uc={activeUc} onClose={() => setActiveUc(null)} />
      )}
    </div>
  );
}
