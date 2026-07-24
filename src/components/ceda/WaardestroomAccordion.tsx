import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  DOELGROEPEN,
  STREAMS,
  USE_CASES,
  type UseCase,
  type UseCaseSource,
  type UseCaseStatus,
  type BivLevel,
} from '@/data/ceda';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface StatusMeta {
  label: string;
  dot: string;
  nameText: string;
  badgeBg: string;
  badgeFg: string;
}

const STATUS_META: Record<UseCaseStatus, StatusMeta> = {
  beschikbaar: {
    label: 'Beschikbaar',
    dot: 'bg-ceda-success',
    nameText: 'text-ceda-status-available-fg',
    badgeBg: 'bg-ceda-status-available-bg',
    badgeFg: 'text-ceda-status-available-fg',
  },
  ontw: {
    label: 'In ontwikkeling',
    dot: 'bg-ceda-warn',
    nameText: 'text-ceda-status-dev-fg',
    badgeBg: 'bg-ceda-status-dev-bg',
    badgeFg: 'text-ceda-status-dev-fg',
  },
  idee: {
    label: 'Idee',
    dot: 'bg-ceda-idea',
    nameText: 'text-ceda-idea-foreground',
    badgeBg: 'bg-ceda-status-idea-bg',
    badgeFg: 'text-ceda-idea-foreground',
  },
};

const BIV_META: Record<BivLevel, { bg: string; fg: string; label: string }> = {
  laag: { bg: 'bg-ceda-biv-low-bg', fg: 'text-ceda-biv-low-fg', label: 'BIV laag' },
  midden: { bg: 'bg-ceda-biv-mid-bg', fg: 'text-ceda-biv-mid-fg', label: 'BIV midden' },
  hoog: { bg: 'bg-ceda-biv-high-bg', fg: 'text-ceda-biv-high-fg', label: 'BIV hoog' },
};

function vormNote(vorm: string | undefined): string {
  if (vorm === 'Individueel (synthetisch)') return '🔒 Privacy geborgd via synthetische data';
  if (vorm === 'Geaggregeerd') return '📊 Op groepsniveau, geen herleidbare persoonsgegevens';
  return '';
}

function SupplierChip({ source }: { source: UseCaseSource }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        source.avail
          ? 'bg-ceda-chip-on-bg text-ceda-chip-on-foreground'
          : 'bg-ceda-chip-off-bg text-ceda-chip-off-foreground opacity-80'
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 flex-none rounded-full',
          source.avail ? 'bg-ceda-success' : 'bg-border'
        )}
        aria-hidden="true"
      />
      {source.name}
    </span>
  );
}

function ToolButton({
  uc,
  isActive,
  onOpen,
  onShow,
  onHide,
}: {
  uc: UseCase;
  isActive: boolean;
  onOpen: (id: string, el: HTMLElement) => void;
  onShow: (id: string, el: HTMLElement) => void;
  onHide: () => void;
}) {
  const meta = STATUS_META[uc.status];
  return (
    <button
      type="button"
      onClick={(e) => onOpen(uc.id, e.currentTarget)}
      onMouseEnter={(e) => onShow(uc.id, e.currentTarget)}
      onMouseLeave={onHide}
      onFocus={(e) => onShow(uc.id, e.currentTarget)}
      onBlur={onHide}
      aria-pressed={isActive}
      aria-label={`${uc.title} — ${meta.label}. Hover voor preview, klik voor details.`}
      className={cn(
        'block w-full rounded-lg border bg-card px-3.5 py-2.5 text-left text-[15px] font-bold leading-tight transition-all',
        'hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ceda-link focus-visible:ring-offset-2',
        meta.nameText,
        isActive
          ? 'border-ceda-primary shadow-md shadow-ceda-primary/20'
          : 'border-border hover:border-ceda-primary hover:shadow-md hover:shadow-ceda-primary/10'
      )}
    >
      {uc.title}
    </button>
  );
}

function EmptyTile() {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl border border-dashed border-border px-4 py-4 text-center opacity-75">
      <span className="text-xs font-semibold text-muted-foreground">Leeg / kans</span>
      <span className="text-[11px] text-muted-foreground">Nog geen tool — hier ligt een kans</span>
    </div>
  );
}

export default function WaardestroomAccordion() {
  const [openDg, setOpenDg] = useState<string>('lll');
  const [hover, setHover] = useState<{ id: string; rect: DOMRect } | null>(null);
  const [popStyle, setPopStyle] = useState<{ left: number; top: number } | null>(null);
  const [panelId, setPanelId] = useState<string | null>(null);
  const [lastPanelId, setLastPanelId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'omschrijving' | 'data'>('omschrijving');
  const [openCats, setOpenCats] = useState<Set<number>>(new Set([0]));
  const [vormIndex, setVormIndex] = useState(0);

  const popRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const panelOpen = panelId !== null;
  const uc = USE_CASES.find((u) => u.id === (panelId ?? lastPanelId)) ?? null;
  const panelDg = uc ? DOELGROEPEN.find((d) => d.id === uc.doelgroep) : undefined;

  function toggleDg(id: string) {
    setOpenDg((prev) => (prev === id ? '' : id));
    setHover(null);
  }

  function showPop(id: string, el: HTMLElement) {
    setHover({ id, rect: el.getBoundingClientRect() });
  }

  function hidePop() {
    setHover(null);
  }

  function openPanel(id: string, el: HTMLElement) {
    triggerRef.current = el;
    setHover(null);
    setPanelId(id);
    setLastPanelId(id);
    setActiveTab('omschrijving');
    setOpenCats(new Set([0]));
    setVormIndex(0);
  }

  function closePanel() {
    setPanelId(null);
    triggerRef.current?.focus();
  }

  function toggleCat(index: number) {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (!hover) {
      setPopStyle(null);
      return;
    }
    const pop = popRef.current;
    if (!pop) return;
    const pw = pop.offsetWidth;
    const ph = pop.offsetHeight;
    const margin = 12;
    let left = hover.rect.left + hover.rect.width / 2 - pw / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - pw - margin));
    let top = hover.rect.bottom + 10;
    if (top + ph > window.innerHeight - margin) {
      const above = hover.rect.top - ph - 10;
      top = above >= margin ? above : Math.max(margin, window.innerHeight - ph - margin);
    }
    setPopStyle({ left, top });
  }, [hover]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setHover(null);
        setPanelId(null);
      }
    }
    function onScroll() {
      setHover(null);
    }
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  useEffect(() => {
    if (panelOpen) closeBtnRef.current?.focus();
  }, [panelOpen]);

  return (
    <div className="relative mx-auto max-w-[1200px] px-4 pb-8 md:px-8 flex flex-col gap-3">
      {/* Status legend */}
      <div className="mb-1 flex flex-wrap gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ceda-success" aria-hidden="true" />{' '}
          Beschikbaar
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ceda-warn" aria-hidden="true" /> In
          ontwikkeling
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ceda-idea" aria-hidden="true" /> Idee
        </span>
      </div>

      {/* Accordion */}
      {DOELGROEPEN.map((dg) => {
        const isOpen = openDg === dg.id;
        const steps = STREAMS[dg.id] ?? [];

        return (
          <div key={dg.id} className="rounded-xl border border-border overflow-hidden">
            {/* Header */}
            <button
              type="button"
              onClick={() => toggleDg(dg.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-5 py-4 bg-card hover:bg-muted/60 transition-colors text-left"
            >
              <div className="flex flex-1 min-w-0 flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">
                  {dg.label}
                  {dg.sub && (
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                      {dg.sub}
                    </span>
                  )}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-1">{dg.inzicht}</span>
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

            {/* Waardestroom steps */}
            {isOpen && (
              <div className="border-t border-border">
                <div className="overflow-x-auto overflow-y-visible px-5 pb-6 pt-5">
                  <div className="flex min-w-min flex-col items-stretch gap-6 min-[900px]:flex-row min-[900px]:gap-0">
                    {steps.map((step, i) => {
                      const tools = step.tools
                        .map((id) => USE_CASES.find((u) => u.id === id))
                        .filter((u): u is UseCase => Boolean(u));
                      return (
                        <div key={`${step.label}-${i}`} className="contents">
                          <div className="flex w-full flex-col min-[900px]:w-[220px] min-[900px]:flex-none">
                            <div className="mb-3 flex items-center gap-2 min-[900px]:min-h-[40px]">
                              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ceda-primary text-[11px] font-semibold tabular-nums text-ceda-primary-foreground">
                                {i + 1}
                              </span>
                              <span className="text-xs font-semibold leading-tight text-foreground">
                                {step.label}
                              </span>
                            </div>
                            <div className="flex flex-col gap-2">
                              {tools.length ? (
                                tools.map((tool) => (
                                  <ToolButton
                                    key={tool.id}
                                    uc={tool}
                                    isActive={panelId === tool.id}
                                    onOpen={openPanel}
                                    onShow={showPop}
                                    onHide={hidePop}
                                  />
                                ))
                              ) : (
                                <EmptyTile />
                              )}
                            </div>
                          </div>
                          {i < steps.length - 1 && (
                            <div
                              className="flex h-8 w-full flex-none items-center justify-center text-border select-none min-[900px]:h-auto min-[900px]:w-10 min-[900px]:items-start min-[900px]:justify-center min-[900px]:pt-2"
                              aria-hidden="true"
                            >
                              <span className="rotate-90 text-2xl leading-none min-[900px]:rotate-0">
                                →
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Hover popover */}
      {hover &&
        (() => {
          const hoveredUc = USE_CASES.find((u) => u.id === hover.id);
          if (!hoveredUc) return null;
          const meta = STATUS_META[hoveredUc.status];
          const shortDesc =
            hoveredUc.desc.length > 130
              ? `${hoveredUc.desc.slice(0, 130).trim()}…`
              : hoveredUc.desc;
          return (
            <div
              ref={popRef}
              role="tooltip"
              aria-hidden={!popStyle}
              className={cn(
                'pointer-events-none fixed z-[180] w-[300px] max-w-[calc(100vw-24px)] rounded-xl border border-border bg-popover p-4 shadow-xl transition-opacity duration-150',
                popStyle ? 'opacity-100' : 'opacity-0'
              )}
              style={
                popStyle ? { left: popStyle.left, top: popStyle.top } : { left: -9999, top: -9999 }
              }
            >
              <span
                className={cn(
                  'mb-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold',
                  meta.badgeBg,
                  meta.badgeFg
                )}
              >
                {meta.label}
              </span>
              <div className={cn('text-[15px] font-bold leading-tight', meta.nameText)}>
                {hoveredUc.title}
              </div>
              <div className="text-xs text-muted-foreground">{hoveredUc.tagline}</div>
              <p className="mb-2.5 mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {shortDesc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {hoveredUc.sources.slice(0, 3).map((s) => (
                  <SupplierChip key={s.name} source={s} />
                ))}
              </div>
              <p className="mt-3 border-t border-border pt-2.5 text-[11px] text-muted-foreground">
                Klik voor het volledige detailpaneel
              </p>
            </div>
          );
        })()}

      {/* Slide-out detail panel */}
      <div
        className={cn(
          'fixed inset-0 z-[190] bg-black/40 transition-opacity duration-300',
          panelOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={closePanel}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="ceda-panel-title"
        aria-hidden={!panelOpen}
        className={cn(
          'fixed inset-y-0 right-0 z-[200] w-full max-w-[440px] overflow-y-auto border-l border-border bg-popover shadow-2xl transition-transform duration-300 ease-out',
          panelOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {uc && (
          <div className="relative p-7">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closePanel}
              aria-label="Sluiten"
              tabIndex={panelOpen ? 0 : -1}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ceda-link"
            >
              ✕
            </button>
            <p className="mb-4 pr-9 text-xs text-muted-foreground">
              {panelDg?.label} / {uc.title}
            </p>
            <h3
              id="ceda-panel-title"
              className="mb-2 text-pretty font-serif text-xl font-light leading-snug text-foreground"
            >
              {uc.title}
            </h3>
            <span
              className={cn(
                'mb-6 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold',
                STATUS_META[uc.status].badgeBg,
                STATUS_META[uc.status].badgeFg
              )}
            >
              {STATUS_META[uc.status].label}
            </span>

            <div
              role="tablist"
              aria-label="Detail-tabs"
              className="mb-7 flex border-b border-border"
            >
              {(['omschrijving', 'data'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  tabIndex={panelOpen ? 0 : -1}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    '-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                    activeTab === tab
                      ? 'border-ceda-primary text-ceda-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab === 'omschrijving' ? 'Omschrijving' : 'Data & methoden'}
                </button>
              ))}
            </div>

            {activeTab === 'omschrijving' && (
              <div role="tabpanel">
                <p className="mb-6 text-[15px] leading-relaxed text-foreground">{uc.desc}</p>
                <div className="flex flex-col gap-2">
                  {uc.links.map((l) => (
                    <a
                      key={l.href + l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={panelOpen ? 0 : -1}
                      className="flex items-center gap-2.5 rounded-lg border border-border px-3.5 py-2.5 text-sm text-ceda-link transition-colors hover:bg-muted"
                    >
                      <span aria-hidden="true">{l.icon}</span>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div role="tabpanel" className="flex flex-col gap-7">
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Databronnen
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {uc.sources.map((s) => (
                      <SupplierChip key={s.name} source={s} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Datacategorieën
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {uc.categories.map((c, i) => {
                      const open = openCats.has(i);
                      const biv = BIV_META[c.biv];
                      return (
                        <div
                          key={c.name}
                          className="overflow-hidden rounded-lg border border-border"
                        >
                          <button
                            type="button"
                            tabIndex={panelOpen ? 0 : -1}
                            onClick={() => toggleCat(i)}
                            aria-expanded={open}
                            className="flex w-full items-center justify-between gap-3 bg-muted px-3.5 py-2.5 text-left transition-colors hover:bg-muted/70"
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="text-sm font-medium text-foreground">{c.name}</span>
                              <span
                                className={cn(
                                  'rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                                  biv.bg,
                                  biv.fg
                                )}
                              >
                                {biv.label}
                              </span>
                            </span>
                            <span
                              className={cn(
                                'text-xs text-muted-foreground transition-transform',
                                open && 'rotate-180'
                              )}
                              aria-hidden="true"
                            >
                              ▼
                            </span>
                          </button>
                          {open && (
                            <div className="flex flex-col gap-1 px-3.5 py-3">
                              {c.fields.map((f) => (
                                <span
                                  key={f}
                                  className="flex items-center gap-2 text-sm leading-relaxed text-muted-foreground before:text-border before:content-['·']"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Data vorm
                  </p>
                  <div className="flex gap-2">
                    {uc.vormen.map((v, i) => (
                      <button
                        key={v}
                        type="button"
                        tabIndex={panelOpen ? 0 : -1}
                        onClick={() => setVormIndex(i)}
                        className={cn(
                          'flex-1 rounded-md border px-2.5 py-2 text-center text-xs font-medium transition-colors',
                          i === vormIndex
                            ? 'border-ceda-primary bg-ceda-primary text-ceda-primary-foreground'
                            : 'border-border bg-muted text-muted-foreground hover:bg-muted/70'
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    {vormNote(uc.vormen[vormIndex])}
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Statistische methode
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {uc.methoden.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1.5 text-xs text-foreground"
                      >
                        ⚙︎ {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Interface
                  </p>
                  <div className="flex gap-2.5">
                    {uc.interfaces.map((f) => (
                      <div
                        key={f.label}
                        className={cn(
                          'flex-1 rounded-md border px-3 py-2.5 text-center text-xs',
                          f.active
                            ? 'border-ceda-link bg-ceda-link/10 text-ceda-link'
                            : 'border-border text-muted-foreground'
                        )}
                      >
                        <div className="mb-1 text-lg" aria-hidden="true">
                          {f.icon}
                        </div>
                        <div className="font-medium">{f.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
