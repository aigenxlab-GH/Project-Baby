# Archived: fabricated-content generators — DO NOT RUN

These one-off scripts hardcode product review bodies written in a fabricated
first-person testing voice, for example:

- "We tested six diaper pails side-by-side in a 10x12 nursery over two weeks"
- "in our testing, babies who previously took 45+ minutes to settle..."
- invented expert bylines such as "Dr. Rachel Foster, Certified Infant Sleep Educator"

None of it was true. This content was published to Sanity, and removing it took
two separate cleanup passes (see git history, August 2026). The scripts are kept
only as a record of where that content came from.

None were referenced by package.json. Running any of them would re-introduce
fabricated claims and fake medical credentials onto a YMYL health site.

If you need to generate product content, write it from real specifications and
cite real sources. See src/config/authors.ts for the honesty rule.
