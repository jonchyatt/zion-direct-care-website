# Firecrawl MCP Server Guide

A comprehensive guide to the Firecrawl MCP (Model Context Protocol) server tools for web scraping, crawling, and data extraction.

---

## Table of Contents

1. [Overview](#overview)
2. [Tools Reference](#tools-reference)
   - [firecrawl_scrape](#1-firecrawl_scrape)
   - [firecrawl_map](#2-firecrawl_map)
   - [firecrawl_search](#3-firecrawl_search)
   - [firecrawl_crawl](#4-firecrawl_crawl)
   - [firecrawl_check_crawl_status](#5-firecrawl_check_crawl_status)
   - [firecrawl_extract](#6-firecrawl_extract)
   - [firecrawl_agent](#7-firecrawl_agent)
   - [firecrawl_agent_status](#8-firecrawl_agent_status)
3. [Quick Reference Table](#quick-reference-table)
4. [Common Workflows](#common-workflows)

---

## Overview

Firecrawl is a powerful web scraping and data extraction service. The MCP server provides access to Firecrawl's capabilities through several specialized tools, each designed for different use cases.

**Key Capabilities:**
- Single page scraping with multiple output formats
- Website mapping and URL discovery
- Web search with optional content extraction
- Multi-page crawling
- Structured data extraction using LLM
- Autonomous web research agent

---

## Tools Reference

### 1. firecrawl_scrape

**Purpose:** Scrape content from a single URL with advanced options. This is the most powerful, fastest, and most reliable scraper tool.

**Best For:**
- Single page content extraction
- When you know exactly which page contains the information
- Getting page content in various formats

**Not Recommended For:**
- Multiple pages (use `batch_scrape` or `crawl`)
- Unknown pages (use `search`)
- Structured data (use `extract`)

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string (required) | The URL to scrape |
| `formats` | array | Output formats: `markdown`, `html`, `rawHtml`, `screenshot`, `links`, `summary`, `changeTracking`, `branding`, or `json` with schema |
| `onlyMainContent` | boolean | Extract only the main content, excluding headers/footers |
| `includeTags` | array | HTML tags to include |
| `excludeTags` | array | HTML tags to exclude |
| `waitFor` | number | Milliseconds to wait before scraping |
| `maxAge` | number | Cache duration in ms (use for 500% faster scrapes) |
| `mobile` | boolean | Emulate mobile device |
| `actions` | array | Browser actions to perform (click, scroll, wait, etc.) |
| `proxy` | string | Proxy type: `basic`, `stealth`, or `auto` |
| `location` | object | Geographic location settings |

#### Output Formats

- **markdown**: Clean markdown content
- **html**: Processed HTML
- **rawHtml**: Unprocessed HTML
- **screenshot**: Page screenshot (can specify viewport, quality, fullPage)
- **links**: All links on the page
- **summary**: AI-generated summary
- **changeTracking**: Track changes over time
- **branding**: Extract brand identity (colors, fonts, typography, spacing, UI components)
- **json**: Structured data with custom schema and optional prompt

#### Browser Actions

Actions can be chained to interact with the page before scraping:

| Action | Description |
|--------|-------------|
| `wait` | Wait for specified milliseconds |
| `click` | Click an element (requires selector) |
| `scroll` | Scroll up or down |
| `write` | Type text into an input |
| `press` | Press a keyboard key |
| `screenshot` | Take a screenshot at this point |
| `scrape` | Scrape content at this point |
| `executeJavascript` | Run custom JavaScript |
| `generatePDF` | Generate PDF of the page |

#### Example

```json
{
  "url": "https://example.com/article",
  "formats": ["markdown", "screenshot"],
  "onlyMainContent": true,
  "maxAge": 172800000
}
```

---

### 2. firecrawl_map

**Purpose:** Discover all indexed URLs on a website. Use this to find pages before deciding what to scrape.

**Best For:**
- Discovering URLs on a website
- Finding specific sections of a website
- Getting a sitemap

**Not Recommended For:**
- When you already know the specific URL (use `scrape`)
- When you need page content (use `scrape` after mapping)

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string (required) | The website URL to map |
| `search` | string | Filter URLs by search term |
| `limit` | number | Maximum number of URLs to return |
| `ignoreQueryParameters` | boolean | Ignore URL query parameters |
| `includeSubdomains` | boolean | Include subdomain URLs |
| `sitemap` | string | Sitemap handling: `include`, `skip`, or `only` |

#### Example

```json
{
  "url": "https://example.com",
  "search": "blog",
  "limit": 100
}
```

---

### 3. firecrawl_search

**Purpose:** Search the web and optionally extract content from search results. The most powerful web search tool available.

**Best For:**
- Finding information across multiple websites
- When you don't know which website has the information
- Research tasks requiring the most relevant content

**Not Recommended For:**
- Filesystem searches
- When you already know the website (use `scrape`)
- Comprehensive coverage of a single site (use `map` or `crawl`)

#### Search Operators

| Operator | Functionality | Example |
|----------|---------------|---------|
| `""` | Exact match | `"Firecrawl"` |
| `-` | Exclude keyword | `-bad`, `-site:example.com` |
| `site:` | Limit to specific site | `site:docs.example.com` |
| `inurl:` | URL must contain word | `inurl:api` |
| `allinurl:` | URL must contain all words | `allinurl:api docs` |
| `intitle:` | Title must contain word | `intitle:guide` |
| `allintitle:` | Title must contain all words | `allintitle:api guide` |
| `related:` | Related sites | `related:example.com` |
| `imagesize:` | Exact image dimensions | `imagesize:1920x1080` |
| `larger:` | Minimum image size | `larger:1920x1080` |

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string (required) | Search query (supports operators) |
| `limit` | number | Maximum results to return |
| `location` | string | Geographic location for results |
| `sources` | array | Sources to search: `web`, `images`, `news` |
| `scrapeOptions` | object | Options for scraping search results |
| `tbs` | string | Time-based search filter |
| `filter` | string | Additional search filters |

#### Example (Without Scraping - Preferred)

```json
{
  "query": "React documentation 2025",
  "limit": 5,
  "sources": [{"type": "web"}]
}
```

#### Example (With Scraping)

```json
{
  "query": "latest AI research papers",
  "limit": 5,
  "scrapeOptions": {
    "formats": ["markdown"],
    "onlyMainContent": true
  }
}
```

**Optimal Workflow:** Search first without formats, then use `scrape` on relevant results.

---

### 4. firecrawl_crawl

**Purpose:** Start a crawl job to extract content from multiple related pages on a website.

**Best For:**
- Extracting content from multiple related pages
- Comprehensive coverage of a section of a website
- Getting all blog posts, documentation, etc.

**Not Recommended For:**
- Single pages (use `scrape`)
- When token limits are a concern (use `map` + `scrape`)
- When you need fast results (crawling can be slow)

**Warning:** Crawl responses can be very large and may exceed token limits. Use conservative `limit` and `maxDiscoveryDepth` values.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string (required) | Starting URL for the crawl |
| `limit` | number | Maximum pages to crawl |
| `maxDiscoveryDepth` | number | How deep to follow links |
| `allowExternalLinks` | boolean | Follow links to other domains |
| `allowSubdomains` | boolean | Include subdomain pages |
| `includePaths` | array | URL paths to include |
| `excludePaths` | array | URL paths to exclude |
| `ignoreQueryParameters` | boolean | Treat URLs with different params as same |
| `deduplicateSimilarURLs` | boolean | Skip similar URLs |
| `sitemap` | string | Sitemap handling: `skip`, `include`, `only` |
| `maxConcurrency` | number | Parallel requests limit |
| `delay` | number | Delay between requests (ms) |
| `scrapeOptions` | object | Options for scraping each page |
| `webhook` | string/object | Webhook URL for notifications |

#### Example

```json
{
  "url": "https://example.com/blog",
  "maxDiscoveryDepth": 2,
  "limit": 20,
  "allowExternalLinks": false,
  "deduplicateSimilarURLs": true,
  "scrapeOptions": {
    "formats": ["markdown"],
    "onlyMainContent": true
  }
}
```

**Returns:** Operation ID - use `firecrawl_check_crawl_status` to monitor progress.

---

### 5. firecrawl_check_crawl_status

**Purpose:** Check the status and progress of a crawl job.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string (required) | The crawl operation ID |

#### Example

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Returns:** Status, progress percentage, and results (if completed).

---

### 6. firecrawl_extract

**Purpose:** Extract structured information from web pages using LLM capabilities. Supports both cloud AI and self-hosted LLM extraction.

**Best For:**
- Extracting specific structured data (prices, names, details)
- When you need data in a specific JSON format
- Consistent data extraction across multiple pages

**Not Recommended For:**
- Getting full page content (use `scrape`)
- When you're not looking for specific structured data

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `urls` | array (required) | URLs to extract from |
| `prompt` | string | Instructions for the LLM |
| `schema` | object | JSON schema defining the output structure |
| `allowExternalLinks` | boolean | Follow external links |
| `enableWebSearch` | boolean | Use web search for context |
| `includeSubdomains` | boolean | Include subdomain pages |

#### Example

```json
{
  "urls": ["https://example.com/product1", "https://example.com/product2"],
  "prompt": "Extract product information including name, price, and description",
  "schema": {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "price": { "type": "number" },
      "description": { "type": "string" },
      "inStock": { "type": "boolean" }
    },
    "required": ["name", "price"]
  }
}
```

---

### 7. firecrawl_agent

**Purpose:** Autonomous web data gathering agent. Describe what data you want, and the agent searches, navigates, and extracts it automatically.

**Best For:**
- Complex data gathering when you don't know the exact URLs
- Research tasks requiring multiple sources
- Finding data in hard-to-reach places

**Not Recommended For:**
- Simple single-page scraping (use `scrape`)
- When you already know the exact URL (use `scrape` or `extract`)

**Key Advantages Over Extract:**
- No URLs required - just describe what you need
- Autonomously searches and navigates the web
- Faster and more cost-effective for complex tasks
- Higher reliability for varied queries

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `prompt` | string (required) | Natural language description of data needed (max 10,000 chars) |
| `urls` | array | Optional URLs to focus the agent on |
| `schema` | object | JSON schema for structured output |

#### Example (No URLs)

```json
{
  "prompt": "Find the top 5 AI startups founded in 2024 and their funding amounts",
  "schema": {
    "type": "object",
    "properties": {
      "startups": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "funding": { "type": "string" },
            "founded": { "type": "string" }
          }
        }
      }
    }
  }
}
```

#### Example (With URLs)

```json
{
  "urls": ["https://docs.example.com", "https://example.com/pricing"],
  "prompt": "Compare the features and pricing information from these pages"
}
```

**Returns:** Extracted data matching your prompt/schema, plus credits used.

---

### 8. firecrawl_agent_status

**Purpose:** Check the status of an agent job.

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string (required) | The agent operation ID |

#### Possible Statuses

- **processing**: Agent is still working
- **completed**: Extraction finished successfully
- **failed**: An error occurred

#### Example

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## Quick Reference Table

| Need | Tool | Notes |
|------|------|-------|
| Single page content | `scrape` | Fastest, most reliable |
| List all URLs on a site | `map` | Use before scraping multiple pages |
| Web search | `search` | Supports operators, optional scraping |
| Multiple pages from one site | `crawl` | Can be slow, watch token limits |
| Check crawl progress | `check_crawl_status` | Returns results when done |
| Structured data from known URLs | `extract` | Define schema for consistent output |
| Complex research (unknown URLs) | `agent` | Autonomous, no URLs needed |
| Check agent progress | `agent_status` | Returns results when done |

---

## Common Workflows

### Workflow 1: Research a Topic

1. Use `search` to find relevant pages
2. Review search results
3. Use `scrape` on the most relevant URLs

### Workflow 2: Scrape an Entire Blog

1. Use `map` to discover all blog post URLs
2. Filter URLs to just blog posts
3. Use `crawl` with conservative limits, or
4. Use `scrape` on individual URLs for more control

### Workflow 3: Extract Product Data

1. Use `map` to find all product page URLs
2. Use `extract` with a schema to pull structured data

### Workflow 4: Unknown Research Task

1. Use `agent` with a detailed prompt describing what you need
2. Check status with `agent_status`
3. Agent autonomously finds and extracts the information

### Workflow 5: Monitor a Page for Changes

1. Use `scrape` with `changeTracking` format
2. Compare results over time

### Workflow 6: Design Analysis

1. Use `scrape` with `branding` format
2. Extract colors, fonts, typography, spacing, UI components
