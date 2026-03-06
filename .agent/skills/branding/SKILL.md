---
name: branding-concept-to-visuals
description: Take a product concept, brainstorm catchy brand names, check domain availability (prioritizing cheap options), and conceptualize the visual brand identity. Use when the user wants to name a new product, find a domain, or design a brand logo or identity.
---

# Branding and Domain Discovery

## Instructions

This skill guides the agent through the process of taking a rough product concept to a fully realized brand identity with an available domain name.

### Step 1: Concept & Brainstorming
Ask the user for:
- The core product concept
- Target audience
- Desired "vibe" or tone

Then, generate 10-15 simple, catchy brand names. Focus on modern naming trends (portmanteaus, dropped vowels, standard words with unique TLDs) that are likely to have cheap domain availability.

### Step 2: Domain Verification
Check the availability of the generated names across relevant TLDs (.com, .co, .io, .app, .net).
- Use `run_command` with tools like `whois` or `Resolve-DnsName` (on Windows) to check if a domain is registered.
- Alternatively, use `search_web` to see if the domains are parked or active.
- Filter out premium/expensive domains and present the best available options.

### Step 3: Brand Visual Conceptualization
Once the user selects a name:
- Propose color palettes and typography aligning with the product's vibe.
- Use the `generate_image` tool to create sample logo concepts, mood boards, or landing page mockups.
