# 0001 - Define ADR Structure and Format for Project

Date: 2025-06-10  
Status: accepted  
Tags: [infra]

## Context

As the Docodylus project evolves, we encounter architectural and infrastructure decisions that merit clear documentation. Without a consistent format or location for these records, contributors may struggle to understand the rationale behind past choices or the context in which they were made.

## Decision

We will record architectural decision records (ADRs) using the [MADR format](https://adr.github.io/madr/) in the `docs/adr/` directory of this repository. Each ADR will:

- Be stored as an individual Markdown file
- Use a numeric prefix for chronological ordering (e.g., `0001-title.md`)
- Include frontmatter metadata for `status`, `date`, and optionally `tags`
- Be manually added to the MkDocs navigation for now

Future work may introduce tooling to automate navigation, rendering, or indexing.

## Consequences

- Establishes a durable and discoverable pattern for project-specific ADRs
- Keeps decision history close to the source code and accessible via the documentation site
- Enables future extension with MADR-compatible tools or viewers without format migration
