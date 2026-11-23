# PostHog SuperDay prep

Hi, I'm Isa :) This is everything I did to prepare for the SuperDay.

I heard it's not easy to get an offer and I haven't programmed in JS in a while, so wanted to make sure I came prepared.

**[Open the interactive runbook →](https://isathepigeon.github.io/posthog-superday/)**

---

## 1. I got PostHog running locally and didn't use it

Remember when I asked you on slack about my OOM failure? Feels like yesterday!

I forked the repo and cloned it locally. My old Samsung has only 8GB of RAM, so I moved it onto a Google Cloud VM I already had sitting around from another project. It runs Ubuntu and I increased memory to 16GB.

From there: `flox activate`, then `hogli start`:

![PostHog dev stack running in phrocs on a Google Cloud VM](vm-local-dev.png)

In the end I didn't use this. As you guys suggested it was not needed as the cloud version suffices and this local stack was not the shortest path to what I was trying to exercise.

Getting it to run was great to understand the architecture.

## 2. I built a small site and broke it on purpose

I have a personal website I had already installed Posthog on since my first interview. For the SuperDay, I came up with two tickets:

1. I added `disable_session_recording: true` in the init, which stops session replay while leaving everything else working.
2. I renamed an event, which kills a saved chart while the rest of the app stays healthy.

Then I investigated them as if I had no idea what was wrong. I ran a commit on the clean version so I can use `git diff` to show what I had broken, and `git checkout` to undo it.

The lab files are in [`lab/`](lab/).

## 3. I ran a day, not a ticket

I have a different artifact where I had multiple tickets to prioritize following your public handbooks, deliberately more work than fits.

These were the two I decided to pick up in one day. An Enterprise customer tagged `churn_risk` losing session recordings mid usability study, and a `top_20` Enterprise customer whose weekly active users dropped 30% with a board meeting at 16:00.

I asked Claude to build this artifact just so I could "Mark Done" on which Step: fully reading and summarizing ticket, first reply to all, time-estimating, investigating, hypothesis, final reply to user and escalation/hand-over message.

## What I learned that I did not expect

**A deadline is not necessarily a priority.** It tells you when to start, not what to do first. You estimate the work, double it, subtract from the deadline. Before that time, the hours belong to whatever is actively losing data.

**The SLA clock measures the first reply, not the fix.** But from experience, you have to be careful to not only keep the metric by always giving people "empty" acknowledgements while never dirtying your hands to fix their issue.

**"We didn't change anything" is scope, not a lie.** The person writing didn't change anything. Someone on their team might have.

---

## Stack

Vanilla HTML, CSS and JavaScript, no build step. State lives in `localStorage`.
