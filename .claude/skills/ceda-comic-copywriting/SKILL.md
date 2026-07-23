---
name: ceda-comic-copywriting
description: Write website and marketing copy in the CEDA Comic house voice. Dry, concrete, understated office humor (the deadpan comic-strip tone from the CEDA site) that deflates jargon instead of adding it. Use whenever writing or editing user-facing copy such as headlines, taglines, hero text, section intros, button labels, card descriptions, empty states, error messages, about pages, or any short marketing prose. Trigger on "write copy", "write a tagline/headline", "make this punchier", "rewrite this section", "needs a hook", "sounds too corporate/salesy", "in the CEDA voice", and Dutch equivalents ("schrijf een kop", "maak dit pakkender", "dit klinkt te wollig/commercieel"). Reach for it even when the user just pastes a bland sentence and asks to improve it.
---

# CEDA Comic copywriting: the house voice

This skill captures the voice used on the CEDA site: dry, concrete, understated. It reads like a smart colleague who has seen how the work actually goes and describes it plainly, with a straight face. The humor comes from recognition, not from jokes.

It is a *voice*, not a template. Apply the techniques below to whatever you are writing; do not paste the example lines verbatim into unrelated copy.

## The one idea behind all of it

Most copy oversells. This voice does the opposite: it undersells, and trusts the reader to notice the substance underneath. A team that says "Gratis. Want opnieuw hetzelfde bouwen is geen sport." sounds more capable than one that says "Wij bieden krachtige, herbruikbare open-source oplossingen." The first one has seen the work. The second one has seen a brochure.

So the job is not to be funny. The job is to be **honest and specific**, and let the dryness do the rest.

## Works together with the voice-filter

The [[voice-filter]] skill removes AI-writing patterns (em dashes, hollow intensifiers, hype words, framing sentences). This skill adds the CEDA voice on top. Order: write in this voice, then run the result through the voice-filter. They pull the same direction — plain, concrete, no performance.

## The seven techniques

### 1. Concrete beats abstract, always

The single biggest lever. A specific, true detail is funnier and more credible than any adjective. Name the actual thing.

Input: We work with messy, fragmented educational data.
Output: Wij halen inzicht uit onderwijsdata. Ook uit die ene spreadsheet die niemand meer durft te openen.

Input: Our tools save institutions significant development time.
Output: Herbruikbare tools voor instellingen. Gratis. Want opnieuw hetzelfde bouwen is geen sport.

The test: could this sentence describe any company? If yes, it is too abstract. Add the detail only your reader would recognize.

### 2. The deadpan tag

End a block with a short, dry aside that undercuts the setup. It lands because it arrives flat, right after something ordinary. One per section, not per line — the effect dies from repetition.

- "Waar de data-mensen samenkomen. Koffie niet inbegrepen."
- "Alle code. Open. Ja, ook de lelijke stukken."
- "Het grotere plan. Wij zijn een tandwiel. Een leuk tandwiel."

The tag is usually a fragment. Do not explain it. If you feel the urge to add "en dat is precies waarom...", stop — the explanation kills it.

### 3. Reframe: "Geen X. Wel Y."

State what it is *not*, then what it is. This deflates hype and sharpens the actual claim. Use it to kill a buzzword by naming the plainer real thing beside it.

Input: A modern, powerful analytics dashboard for education.
Output: Geen dashboard om het dashboard. Wel open tooling, analyse en benchmarks, gebouwd door en voor het onderwijs.

Use sparingly — it is a strong move and loses force if every paragraph does it.

### 4. Self-aware honesty

Admit the unglamorous truth. Saying "wij zijn een tandwiel" or "ook de lelijke stukken" builds more trust than any confidence claim, because the reader knows it is true and rarely hears anyone say it. Humility reads as competence here.

### 5. Short sentences. Fragments for the beat.

Vary length, but lean short. A fragment after a full sentence gives the deadpan a place to land: "Gratis. Want opnieuw hetzelfde bouwen is geen sport." Read it aloud — if it has no rhythm, it has no joke.

### 6. Punch at the situation, never the person

The comedy targets the mess — 14 systems, 6 formats, the wheel reinvented for the tenth time — not any individual, and never the reader. It is kind, not cynical. Cynicism reads as contempt; recognition reads as "you get it." Stay on the recognition side.

Input (too cynical): Managers ask for dashboards they will never open.
Output: "Kunnen we dit meten?" Ja. De data staat alleen in 14 systemen. In 6 formaten. Veel plezier.

### 7. No hype, no exclamation marks

No "bruisend", "toonaangevend", "krachtig", "naadloos", "cutting-edge", "revolutionair". No enthusiasm punctuation. Confidence here is quiet. If a sentence needs an exclamation mark to sell, the sentence is not doing the work.

## Dosage

The voice is seasoning, not the meal. A page where every line strains for a dry punchline is exhausting and starts to feel smug. Aim for roughly **one deadpan moment per section**, resting on straight, informative sentences in between. The flat baseline is what makes the dry line land.

## Where this voice does NOT belong

Switch it off for anything where a reader could be confused or let down by a joke:

- Legal, privacy, consent, and safety text — plain and complete, no winking.
- Error messages that block someone — say what happened and what to do, dryness optional and never at the user's expense.
- Accessibility text (alt text, aria-labels) — describe, do not perform.
- Genuinely serious or sensitive subjects — drop the deadpan entirely and write straight.

When in doubt on these, write it plain. A missed joke costs nothing; a joke in the wrong place costs trust.

## Quick self-check before shipping

1. Is there a concrete, specific detail a real reader would recognize? (If it's all abstractions, technique 1.)
2. Does each section rest on plain sentences, with at most one dry beat? (If every line strains, cut some.)
3. Any hype words or exclamation marks? (Cut them.)
4. Does the humor land on the situation, not the reader? (If it punches down, reframe.)
5. Run it through [[voice-filter]] for em dashes and AI patterns.
