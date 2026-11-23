# PostHog SuperDay prep

Hi, I'm Isa. This is everything I did to get ready for a SuperDay as a support engineer at PostHog.

None of it was asked for. I wanted to arrive already knowing what a support ticket feels like from the inside, so I built myself a day of them.

**[Open the interactive runbook →](https://isathepigeon.github.io/posthog-superday/)**

---

## 1. I got PostHog running myself

I forked the repo and cloned it. The build died on my laptop, which only has 8GB of RAM, so I moved it onto a Google Cloud VM I already had from another project. Ubuntu 24.04, 16GB.

From there: `flox activate`, then `hogli start`. 31 processes, all the logs in one terminal UI.

![PostHog dev stack running in phrocs on a Google Cloud VM](vm-local-dev.png)

In the end I ran the actual exercises against PostHog Cloud, which is what the team suggested in the SuperDay Slack channel. The local stack was not the shortest path to what I was trying to learn.

But getting it up taught me the architecture, and that mattered more than I expected. When I later had to reason about where a session recording can get lost, I already knew what sits between the browser and the dashboard: the capture endpoint, the queue, the service that assembles sessions, storage, and only then the UI. Knowing that chain is what let me tell "delayed" apart from "lost".

## 2. I built a small site and broke it on purpose

I needed a customer, so I played one. I put a fake shop page on my own site's project and planted real bugs in it, one per ticket.

**`disable_session_recording: true`** in the init. Session replay stops; everything else keeps working. That split, one product dead and the rest alive, is the signature of a disabled setting rather than an outage.

**A renamed event.** `product_added_to_cart` became `cart_item_added`. Every saved chart pointing at the old name flatlines while the app stays perfectly healthy and nobody complains.

Then I investigated them as if I had no idea what was wrong. Committing the clean version first meant `git diff` showed exactly what I had broken and `git checkout` undid it in one command. The lab files are in [`lab/`](lab/).

## 3. I ran a day, not a ticket

Two tickets, deliberately more work than fits in the time:

- **Dana**, Enterprise, tagged `churn_risk`. Session recordings stopped for her whole team, mid usability study, three days already lost.
- **Priya**, Enterprise, tagged `top_20`. Weekly active users dropped 30% over a weekend, with a board meeting at 16:00 and that chart in the deck.

I triaged them against the handbook's actual rules: response targets by plan, the tags that have to be resolved or handed over by end of rotation, paid before community. Then I wrote the acknowledgements, worked the investigations, and wrote the final replies and the handover.

Both root causes found. The write-ups are in the runbook.

## What I got out of this

**Tags don't always mean priority.** Both my tickets were Enterprise, so `churn_risk` and `top_20` couldn't break the tie. What they decide is handling: who else needs looping in.

**Most of what I learned came from being wrong first.** I had the two tickets filed as "one is losing data, the other just has a deadline" until I noticed that at triage time the data loss is the customer's claim, not a verified fact, and that if the second customer's tracking is still broken she is losing records by the hour too. The two tickets were far closer than my first pass made them look.

**Which led to the thing I actually use now:** before ranking anything, spend fifteen minutes finding out what you are ranking. A cheap check changes the size of the problem.

**I also stopped taking "we didn't change anything" as evidence**, including in my own notes. It is scope, not a lie: the person writing didn't change anything.

---

## How this was made

I built the exercise with Claude: the tickets, the queue, the runbook page. The investigations, the triage and all the customer replies are mine. Where Claude got something wrong I pushed back, and a few of those corrections are the most useful things in here.

## Stack

Vanilla HTML, CSS and JavaScript, no build step. State lives in `localStorage`.
