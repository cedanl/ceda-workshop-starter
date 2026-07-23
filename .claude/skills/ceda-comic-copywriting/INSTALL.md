# CEDA Comic copywriting — install guide

The deadpan comic-strip house voice from the CEDA site, packaged as an installable skill. Install it once and it works across **all** your projects, not just this repo.

The installable file is [`package/ceda-comic-copywriting.skill`](package/ceda-comic-copywriting.skill).

## What it does

Rewrites and drafts user-facing copy (headlines, taglines, hero text, card descriptions, button labels) in a dry, concrete, understated voice that deflates jargon instead of piling it on. See [`SKILL.md`](SKILL.md) for the full method.

## Install it (pick one)

### Option A — Save button (easiest, Claude Desktop / Claude.ai)

1. Download `package/ceda-comic-copywriting.skill` from this repo.
2. Open it in Claude. A skill card appears with a **Save skill** button.
3. Click **Save skill**. It's now on your account and available in every conversation.

> The Save button only shows if your organization allows personal skills. If you don't see it, use Option B.

### Option B — Copy into your personal skills folder (works everywhere, incl. Claude Code)

A `.skill` file is just a zip. Unpack it into your personal skills folder so it loads in every project:

```bash
# from the folder where you downloaded the .skill file
unzip ceda-comic-copywriting.skill -d ~/.claude/skills/
```

That creates `~/.claude/skills/ceda-comic-copywriting/SKILL.md`. Restart Claude Code (or reload) and it's live.

To confirm it landed:

```bash
ls ~/.claude/skills/ceda-comic-copywriting/
```

## Use it

- **On demand:** type `/ceda-comic-copywriting`
- **Automatically:** it triggers when you ask Claude to "write a tagline," "make this punchier," or say something "sounds too corporate." Works in Dutch too ("maak dit pakkender," "dit klinkt te wollig").

## Pairs with the voice-filter

Write in this voice first, then run the result through the `voice-filter` skill to strip any leftover AI-writing patterns (em dashes, hype words). They pull the same direction: plain, concrete, no performance.

## Update the skill

The source of truth is [`SKILL.md`](SKILL.md) in this repo. If you improve the voice, edit that file and re-package:

```bash
# requires the skill-creator's packager
python3 -m scripts.package_skill /path/to/ceda-comic-copywriting
```

Then commit the refreshed `package/ceda-comic-copywriting.skill`.
