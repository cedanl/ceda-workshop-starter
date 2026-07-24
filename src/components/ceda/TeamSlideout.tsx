import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TeamMember {
  naam: string;
  rol: string;
  instelling: string;
  email?: string;
  linkedin?: string;
}

const TEAM: TeamMember[] = [
  { naam: 'Corneel den Hartogh', rol: 'Projectleider', instelling: 'SURF', email: 'corneel.denhartogh@surf.nl', linkedin: '#' },
  { naam: 'Theo Bakker', rol: 'Kansengelijkheid', instelling: 'Haagse Hogeschool', linkedin: '#' },
  { naam: 'Shirley Kalkers-Van de Ven', rol: 'Schooluitval dashboard', instelling: 'Graafschap College', linkedin: '#' },
  { naam: 'Steven Ramondt', rol: 'Uitnodigingsregel', instelling: 'ROC Mondriaan', linkedin: '#' },
  { naam: 'Amir Khodaie', rol: 'Studenttevredenheid / Instroomprognose', instelling: 'Radboud Universiteit', linkedin: '#' },
  { naam: 'Tomer Iwan', rol: '1CijferHO Package / Data Engineering', instelling: 'Vrije Universiteit', linkedin: '#' },
  { naam: 'Ash Sewnandan', rol: 'Data Engineering', instelling: 'Haagse Hogeschool', linkedin: '#' },
  { naam: 'Martine Jansen', rol: 'Wisselstroom package', instelling: 'Fontys Hogeschool', linkedin: '#' },
  { naam: 'Tony Ritzen', rol: 'Inschrijvingen dashboard', instelling: 'Universiteit Maastricht', linkedin: '#' },
  { naam: 'Bram Enning', rol: 'kernteam hub Studiedata & AI', instelling: '', linkedin: '#' },
];

function initials(naam: string): string {
  return naam
    .split(' ')
    .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

// Deterministic hue from name string (no Math.random).
function avatarHue(naam: string): number {
  let h = 0;
  for (let i = 0; i < naam.length; i++) h = (h * 31 + naam.charCodeAt(i)) & 0xffff;
  return h % 360;
}

function Avatar({ naam, size = 64 }: { naam: string; size?: number }) {
  const hue = avatarHue(naam);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `hsl(${hue} 55% 55%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 600,
        fontSize: size * 0.33,
        flexShrink: 0,
        border: '2px solid hsl(var(--border))',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      {initials(naam)}
    </div>
  );
}

export default function TeamSlideout() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const panelOpen = activeId !== null;
  const member = TEAM[activeId ?? lastId ?? 0];

  function openPanel(i: number) {
    setActiveId(i);
    setLastId(i);
  }

  function closePanel() {
    const id = activeId;
    setActiveId(null);
    if (id !== null) triggerRefs.current[id]?.focus();
  }

  useEffect(() => {
    if (panelOpen) closeBtnRef.current?.focus();
  }, [panelOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveId(null);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative">
      {/* Team grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {TEAM.map((m, i) => {
          const hue = avatarHue(m.naam);
          return (
            <div key={m.naam} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center">
              <button
                ref={(el) => { triggerRefs.current[i] = el; }}
                type="button"
                onClick={() => openPanel(i)}
                aria-label={`Bio van ${m.naam} bekijken`}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ceda-link focus-visible:ring-offset-2"
              >
                <Avatar naam={m.naam} size={72} />
              </button>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground leading-tight">{m.naam}</span>
                <span className="text-xs text-muted-foreground">{m.instelling}</span>
              </div>
              <div className="flex items-center gap-2">
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    aria-label={`LinkedIn van ${m.naam}`}
                    className="text-muted-foreground hover:text-ceda-link transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    aria-label={`E-mail ${m.naam}`}
                    className="text-muted-foreground hover:text-ceda-link transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[190] bg-black/40 transition-opacity duration-300',
          panelOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={closePanel}
        aria-hidden="true"
      />

      {/* Slide-out bio panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-panel-title"
        aria-hidden={!panelOpen}
        className={cn(
          'fixed inset-y-0 right-0 z-[200] w-full max-w-[400px] overflow-y-auto border-l border-border bg-popover shadow-2xl transition-transform duration-300 ease-out',
          panelOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {member && (
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

            <div className="mb-5 flex flex-col items-center gap-3 text-center">
              <Avatar naam={member.naam} size={96} />
              <div>
                <h2 id="team-panel-title" className="font-serif text-xl font-light text-foreground">
                  {member.naam}
                </h2>
                <p className="text-sm text-muted-foreground">{member.rol}</p>
                {member.instelling && (
                  <p className="text-xs text-muted-foreground mt-0.5">{member.instelling}</p>
                )}
              </div>
            </div>

            <p className="mb-6 text-[15px] leading-relaxed text-muted-foreground">
              {member.naam} draagt bij aan CEDA vanuit {member.instelling || 'het netwerk'}. Binnen het project richt {member.naam.split(' ')[0]} zich op {member.rol.toLowerCase()}.
            </p>

            <div className="flex flex-col gap-2">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={panelOpen ? 0 : -1}
                  className="flex items-center gap-2.5 rounded-lg border border-border px-3.5 py-2.5 text-sm text-ceda-link transition-colors hover:bg-muted"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  tabIndex={panelOpen ? 0 : -1}
                  className="flex items-center gap-2.5 rounded-lg border border-border px-3.5 py-2.5 text-sm text-ceda-link transition-colors hover:bg-muted"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  {member.email}
                </a>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
