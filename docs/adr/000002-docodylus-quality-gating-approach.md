---
status: accepted
date: 2025-06-17T17:30
decision-makers:
    - iain
consulted: 
informed: 
---

# Docodylus Quality-Gating Approach<!-- short title, representative of solved problem and found solution -->

## Context and Problem Statement
### Definitions
| **Term**             | **Definition**                                                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **canonical branch** | A branch from which build artifacts are generated. At the time of this decision, these are `develop` (for pre-release) and `main` (for release).       |
| **trunk branch**     | Another term for a canonical branch, emphasizing its role in the <abbr title="Continuous integration">CI</abbr> process.                                                        |
| **feature branch**   | A branch for in-progress work. Can refer to local or remote (`origin`) branches and is not limited to features alone.               |
| **vettable**         | A commit that is reasonably expected to pass all quality checks when they are eventually performed (_e.g._, it has passed preliminary advisory-only checks).                                 |
| **vetted**           | A commit (or set of commits) that has passed all relevant quality checks, including unit tests, type checks, coverage, and linting. |


### Problem Statements
* We want to ensure that changes that reach the canonical branches are vetted such that the canonical branches represent a series of valid states with no invalid states interposed
* We want a clearly defined distinction between a "vetted" domain and an "unvetted" domain
* We want to do that while allowing the developers the greatest possible freedom to define their own processes in the local environment.
* We want to facilitate collaboration via GitHub
* We want the developer not to be surprised when a set of changes fails
* We want to preserve the option to support tooling via `conventional commits` in future

### Scope
This ADR governs the CI boundary — the point at which unvetted local work transitions into a vetted, canonical history. Separate decisions will address the CD pipeline.

## Considered Options
* Vetted/Unvetted boundary is the commit, enforced by git hooks
* Vetted/Unvetted boundary is the push, supported by git hooks
* Vetted/Unvetted boundary is the pull request, enforced by GitHub Actions and custom checks

* conventional commits enforced per-commit via Git hooks
* conventional commits enforced per-PR via squash-and-merge

## Decision Outcome
Chosen option:
* Advisory checks only in the local environment via Git hooks (`pre-push`), with an "off-ramp" for devs to abort an unvettable push
* Provide the dev with the option to abort a push if checks fail, but allow them to proceed with the push if that's what they intended
* Strict quality gating and enforcement of conventions like `conventional commits` at the PR boundary only, aided by GitHub Actions and custom checks.
* Enforce only-valid-commits in canonical branches via restricting merges to `squash-and-merge` type

### Consequences
* Good, because: greatest possible freedom for the developer to arrive at a valid set of changes via a series of commits
* Good, because: allows developers to push unvetted changes to `origin` for collaboration with team members
* Good, because: allows developers to abort a push if they did not intend to push unvettable changes to the `remote`
* Good, because: reliable and enduring distinction between vetted and unvetted domains, with a clear and singular mechanism for moving commits between these states
* Good, because: avoids false sense of security created by git hooks which are unreliable because:
    * partial staging of files
    * most quality check tools operating on the file-system view of a file, rather than what will be committed
    * the existence  of the `--no-verify` flag allowing local checks to be bypassed by any developer
* Good, because: restricts to a controllable set of users the ability to temporarily relax constraints (repo admins can ignore branch protection rules, e.g.)
* Good, because: canonical branches represent a series of vetted states with no unvetted states interposed (squash-and-merge)
* Bad, because: relying on squash-and-merge creates different commit histories in the canonical and feature branches, potentially creating merge difficulties if a one-branch-per-PR pattern is not adopted
* Bad, because: possible increased load on GitHub Actions if devs are not using other avenues to perform local checks
* Bad, because: possibly slower due to GitHub Actions overhead -- can possibly mitigate by blocking checks on draft PRs so quality gating only occurs after a PR has been marked "ready for review"
