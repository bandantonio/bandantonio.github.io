---
title: Google Season of Docs 2021 - Results
date: 2021-11-18 23:00
tags:
- google
- season of docs
- documentation
---

![Season of Docs 2021](/images/2021/season-of-docs-logo.png)

Hi everyone.

In this article, I would like to share the results of my third consecutive year in Season of Docs. This time I was lucky enough to join the [Redocly](https://redoc.ly/gsod#technical-writer-hiring-update) team to work on the OpenAPI-CLI project.

## Completed Work

1. **Updated OpenAPI-CLI Overview page**
 
 This update brought readers a more clear and concise overview of the OpenAPI-CLI tool and its main features.

 * Revised the page to be more consistent and organized following the DRY principle (DRY: Do not repeat yourself)
 * Updated structure of the document to be better oriented for the first-time readers
 * Removed information about installation as redundant (this information was added to the full-fledged quick start guide)

 Links to PR: [PR#334](https://github.com/Redocly/openapi-cli/pull/334)
 
 Public links: [Redocly OpenAPI CLI](https://redoc.ly/docs/cli/)

1. **Created installation guide**
 
 This update brought a fully-revised page that outlines all the possible installation variants to make it easier for a complete newcomer to start working with the OpenAPI-CLI as quickly as possible. The guide now combines installation methods depending on their type (local or global) listing the recommended ones at the top of the page.

 Links to PR: [PR#337](https://github.com/Redocly/openapi-cli/pull/337)

 Public links: [Installing OpenAPI CLI](https://redoc.ly/docs/cli/installation/)

1. **Created quick start guide**
 
 This update brought a brand new page that guides a newcomer through a set of basic workflow, showing common use cases and usage of commands.

 Links to PR: [PR#342](https://github.com/Redocly/openapi-cli/pull/342)

 Public links: [Redocly OpenAPI CLI quickstart guide](https://redoc.ly/docs/cli/quickstart/)

1. **Organized and unified OpenAPI CLI commands documentation**

 This update brought a fully-revised section related to OpenAPI CLI commands.

 * Revised all the pages to be more consistent and organized following the DRY principle (DRY: Do not repeat yourself)
 * Updated structure of the pages to provide more information about usage and available parameters
 * Tested all the commands to reveal undocumented parameters, features, and use cases

 Links to PR: [PR#345](https://github.com/Redocly/openapi-cli/pull/345), [PR#350](https://github.com/Redocly/openapi-cli/pull/350), [PR#351](https://github.com/Redocly/openapi-cli/pull/351), [PR#353](https://github.com/Redocly/openapi-cli/pull/353), [PR#360](https://github.com/Redocly/openapi-cli/pull/360), [PR#361](https://github.com/Redocly/openapi-cli/pull/361), [PR#383](https://github.com/Redocly/openapi-cli/pull/383), [PR#384](https://github.com/Redocly/openapi-cli/pull/384)

 Public links: [Redocly OpenAPI CLI commands](https://redoc.ly/docs/cli/commands/), [`bundle`](https://redoc.ly/docs/cli/commands/bundle/), [`join`](https://redoc.ly/docs/cli/commands/join/), [`lint`](https://redoc.ly/docs/cli/commands/lint/), [`login`](https://redoc.ly/docs/cli/commands/login/), [`logout`](https://redoc.ly/docs/cli/commands/logout/), [`preview-docs`](https://redoc.ly/docs/cli/commands/preview-docs/), [`push`](https://github.com/Redocly/openapi-cli/pull/363), [`split`](https://redoc.ly/docs/cli/commands/split/), [`stats`](https://redoc.ly/docs/cli/commands/stats/)

## Not Completed Work

1. **OpenAPI CLI guides**
 
 **Reason:** big scope of work according to the proposal. Due to the huge number of activities described in the proposal, during one of the Fortnightly catch-up meetings, it was decided to de-prioritize updates to OpenAPI CLI guides and focus on ongoing activities instead.

1. **OpenAPI CLI Resources**

 **Reason:** due to the huge number of activities described in the proposal, during one of the Fortnightly catch-up meetings, it was decided to consider updating the Resources section as an "out-of-scope" stage and take a closer look after the Google Season of Docs program.

## Challenges, Achievements

### Challenges

1. Outdated and irrelevant documentation.

 The problems are mainly related to the following:

 1. The documentation is open and everyone can contribute to it.
 1. High load of in-house technical writers (and other dedicated persons) that leaves documentation tasks of low impact without proper attention.

1. Overlapping documentation. Some documents were created in different parts of the website and had overlapping sections. For example, installation and configuration. There were also documents with redirects. All these aspects made documentation harder to read, understand, and find.
1. No local environment for documentation. There was no way to deploy a local version of the documentation which complicated documentation development. The existing solution using the Development portal required additional configuration, copy-pasting between source and portal repositories, and it was not flexible enough to deal with minor documentation changes.
1. Time zones. Redocly team members work from different locations across the globe which resulted in limited time slots for active communication and review processes. In some cases, this lack of time was making the documentation development process a bit nervous.

### Achievements

1. Creation of Quick Start Guide

 It is one of the most valuable achievements during this season. Not only this single document brought order to chaos in terms of incomes and outcomes but also allowed to walk the reader through the basic usage of OpenAPI CLI and its main capabilities.

1. Unification of OpenAPI CLI commands pages

 All the commands pages were unified based on a single structure. With this update, users can get familiar with all the usage options faster, check examples, and common use cases.

1. A new hire for a Technical Writer

 At the end of the program, the Redocly team posted a new [job opportunity for a Technical Writer](https://redoc.ly/careers#technical-writer) confirming the importance of documentation and all the improvements made into it during the Season of Docs.

## Experience evaluations, Lessons

### Experience evaluations

* **Mentors**

 I was happy to work with my mentors. The team organized the work around me, they reacted to my proposals, allocated additional resources and team members with the required skills when I was looking for extra information, so that I can complete almost all the activities I defined in my proposal. We had bi-weekly meetings where we were able to quickly discuss the progress, react to changes, and align with the scheduled milestones. This was a great experience and I'm glad that we managed to complete the major part of the work despite some tricky challenges I mentioned earlier.

* **Project**

 I was already familiar with Redocly OpenAPI-CLI and I knew some of the documentation's weak points before the start of the season. This knowledge helped me to prepare a detailed proposal and bring valuable improvements to the documentation. I was excited to make Redocly great again!

* **Participation in Season of Docs**

 This was my **third** consecutive Season of Docs with a great open-source organization and only one proposal sent. During this season, Redocly showed me that even a carefully-crafted proposal is only a plan. Real-world priorities can switch your focus to a small set of issues that bring 80% of success when resolved. This time, the season was unique in terms of writing experience, styling, and consistency. Technical aspects were covered by the Redocly team so it was easier for me to concentrate on creating valuable documents. And again, knowledge sharing, building community contacts, learning from each other, understanding the problems of open-source organizations, as well as seeing smiles on faces of the team members when they are telling you that "This is exactly that kind of documentation improvements we were looking for" is a truly priceless experience.

### Lessons

1. Open-source organizations are in need of good documentation no less or even more than commercial organizations.
1. Open-source organizations know well the price of poorly-written or non-existing documentation.
1. Even the smallest contribution to the documentation of the open-source project is priceless and respected.
1. Your karma is getting better when you contribute to open-source documentation.
1. All the people who work in open-source organizations are great!