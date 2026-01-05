# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a documentation and reference workspace for web scraping, data extraction, and automation workflows. It is not a traditional software project with source code.

## Enabled Plugins

The workspace has the following Claude Code plugins enabled:
- **GitHub** - Repository and PR management
- **Commit Commands** - Git utilities (`/commit`, `/commit-push-pr`)
- **Playwright** - Browser automation and testing
- **Firebase** - Backend services and hosting
- **Ralph Wiggum** - Loop-based development technique

## Available MCP Tools

### Firecrawl (Web Scraping & Data Extraction)
See `firecrawl mcp server guide.md` for detailed documentation. Key tools:
- `firecrawl_scrape` - Single page content extraction
- `firecrawl_map` - Discover URLs on a website
- `firecrawl_search` - Web search with optional scraping
- `firecrawl_crawl` - Multi-page crawling
- `firecrawl_extract` - Structured data extraction with schemas
- `firecrawl_agent` - Autonomous web research agent

### Playwright (Browser Automation)
- `browser_navigate`, `browser_click`, `browser_type` - Page interactions
- `browser_snapshot` - Accessibility snapshots (preferred over screenshots)
- `browser_take_screenshot` - Visual captures
- `browser_evaluate` - JavaScript execution

### Firebase
- Project management and configuration
- App creation and SDK setup
- Security rules management
- Firestore, Realtime Database, Hosting, Storage initialization

## Common Workflows

**Web Research**: Use `firecrawl_search` to find pages, then `firecrawl_scrape` on relevant results.

**Site Mapping**: Use `firecrawl_map` to discover URLs, then scrape or extract from specific pages.

**Structured Extraction**: Use `firecrawl_extract` with a JSON schema to pull consistent data from multiple pages.

**Autonomous Research**: Use `firecrawl_agent` when you don't know which URLs contain the information needed.
