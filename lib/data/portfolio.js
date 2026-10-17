export const FEATURED = [
  {
    id: 'veris-platform',
    title: 'Veris Data Platform',
    description: 'Internal analytics platform serving 50+ researchers. Built end-to-end with FastAPI, React, and AWS Lambda — from data ingestion to a self-serve query interface.',
    tags: ['Engineering', 'Product'],
    accent: '#2E3F5C',
    link: null,
    highlights: [
      { label: 'Users',       value: '50+ analysts' },
      { label: 'Stack',       value: 'FastAPI · React · Lambda' },
      { label: 'Cost impact', value: '–40% query costs' },
    ],
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'AWS Lambda', 'PostgreSQL', 'dbt'],
    content: [
      'Veris Insights runs on proprietary survey data — tens of thousands of responses collected annually from talent acquisition professionals across Fortune 500 companies. When I joined, that data lived in a patchwork of spreadsheets, Snowflake queries, and ad-hoc Python scripts. Analysts spent more time wrangling data than interpreting it.',
      'I designed and built a unified internal platform to change that. The backend is a FastAPI service that exposes a structured query layer over the cleaned data warehouse, with a React frontend that lets analysts filter, cross-tab, and export without writing a single line of SQL.',
      'The most impactful piece was a self-serve cohort builder — analysts can define a population (e.g. "enterprise companies, >5K employees, tech sector") and instantly pull benchmark distributions across any question in the survey library. What used to take a half-day now takes under five minutes.',
      'Later I led the migration from Snowflake to PostgreSQL, which cut our data warehouse costs by 40% with no perceptible change in query performance at our data volume.',
    ],
  },
  {
    id: 'llm-pipeline',
    title: 'LLM Research Pipeline',
    description: 'GPT-4 powered system that processes proprietary survey data to surface talent acquisition trends. Reduced analyst turnaround from days to hours.',
    tags: ['Engineering', 'AI'],
    accent: '#4A5240',
    link: null,
    highlights: [
      { label: 'Turnaround', value: 'Days → hours' },
      { label: 'Model',      value: 'GPT-4 + fine-tuned embeddings' },
      { label: 'Input',      value: '10K+ survey responses' },
    ],
    stack: ['Python', 'OpenAI API', 'LangChain', 'FastAPI', 'PostgreSQL', 'pgvector'],
    content: [
      'Every quarter, Veris publishes benchmark reports for our client base — curated insights drawn from thousands of survey responses. Writing these reports was the highest-leverage work our researchers did, and also the most time-consuming.',
      'I built a pipeline that automates the first draft. Survey responses are embedded and clustered to surface latent themes, then passed to GPT-4 with structured prompts that produce draft insight paragraphs grounded in the actual data. Researchers review, edit, and publish — rather than starting from a blank page.',
      'The hardest part was grounding. LLMs hallucinate, and a talent research report citing made-up statistics is worse than no report. We solved this with a retrieval step: every claim the model makes is matched back to specific respondent quotes and statistics, which are attached as footnotes. Researchers can verify every sentence.',
      'End result: first-draft turnaround went from 2–3 days of analyst time to 3–4 hours, with researchers consistently rating the draft quality as "good starting point" or better.',
    ],
  },
  {
    id: 'benchmarking-tool',
    title: 'Benchmarking Tool',
    description: 'MongoDB-backed product that lets Fortune 500 talent teams compare hiring metrics against industry peers. Grew to 30+ enterprise accounts.',
    tags: ['Product'],
    accent: '#5C3D2E',  // walnut
    link: null,
  },
]

export const POSTS = [
  {
    id: 'post-gong',
    type: 'Project',
    title: 'Mining 10K Sales Calls with Gong',
    date: 'Sep 2024',
    description: 'How we used Gong\'s API and a few hundred lines of Python to extract recruiting trend signals from sales call transcripts.',
    tags: ['Engineering', 'AI'],
    link: null,
    content: [
      'Our sales team runs hundreds of calls a month with talent acquisition leaders. Those calls are a goldmine — prospects talk candidly about their pain points, their current vendors, their budgets. But nobody had time to listen to them all.',
      'Gong records and transcribes every call. I wrote a pipeline that pulls transcripts via the Gong API, chunks them by speaker turn, and runs each chunk through a classifier trained to flag talent-acquisition-relevant content (vs. generic sales talk, pricing discussion, scheduling, etc.).',
      'The flagged segments get embedded and stored in pgvector. From there, researchers can query: "What are TA leaders at enterprise tech companies saying about AI tools this quarter?" and get back a ranked list of verbatim quotes with speaker context.',
      'It has become one of the most-used internal research tools we have — faster signal than a survey and more candid than an interview.',
    ],
  },
  {
    id: 'post-wx-1',
    title: 'Why the Great Plains Still Surprise Us',
    type: 'Weather',
    date: 'Aug 2024',
    description: 'A look at why convective initiation in the dryline environment remains one of the hardest short-range forecasting problems.',
    tags: ['Weather'],
    link: null,
  },
  {
    id: 'post-photo-europe',
    type: 'Photography',
    title: 'Italy: Light and Gradient',
    date: 'Jul 2024',
    description: 'A selection from a two-week trip through Tuscany and Umbria — golden hour on terracotta, fog in the valleys.',
    tags: ['Photography'],
    link: null,
  },
  {
    id: 'post-snowflake',
    type: 'Project',
    title: 'Migrating Off Snowflake',
    date: 'Jun 2024',
    description: 'The architectural decisions behind moving a 50+ analyst platform from Snowflake to PostgreSQL — and what we\'d do differently.',
    tags: ['Engineering'],
    link: null,
  },
  {
    id: 'post-mba',
    type: 'Writing',
    title: 'Why I Went Back to School',
    date: 'Sep 2025',
    description: 'Reflections on leaving a job I loved to start an MBA — and what I hope to do with it.',
    tags: ['Writing'],
    link: null,
  },
]

export const CONTENT = [
  {
    id: 'veris-platform',
    title: 'Veris Data Platform',
    description: 'Internal analytics platform serving 50+ researchers. Built end-to-end with FastAPI, React, and AWS Lambda — from data ingestion to a self-serve query interface.',
    tags: ['Engineering', 'Product'],
    accent: '#2E3F5C',
    link: null,
    highlights: [
      { label: 'Users',       value: '50+ analysts' },
      { label: 'Stack',       value: 'FastAPI · React · Lambda' },
      { label: 'Cost impact', value: '–40% query costs' },
    ],
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'AWS Lambda', 'PostgreSQL', 'dbt'],
    content: [
      'Veris Insights runs on proprietary survey data — tens of thousands of responses collected annually from talent acquisition professionals across Fortune 500 companies. When I joined, that data lived in a patchwork of spreadsheets, Snowflake queries, and ad-hoc Python scripts. Analysts spent more time wrangling data than interpreting it.',
      'I designed and built a unified internal platform to change that. The backend is a FastAPI service that exposes a structured query layer over the cleaned data warehouse, with a React frontend that lets analysts filter, cross-tab, and export without writing a single line of SQL.',
      'The most impactful piece was a self-serve cohort builder — analysts can define a population (e.g. "enterprise companies, >5K employees, tech sector") and instantly pull benchmark distributions across any question in the survey library. What used to take a half-day now takes under five minutes.',
      'Later I led the migration from Snowflake to PostgreSQL, which cut our data warehouse costs by 40% with no perceptible change in query performance at our data volume.',
    ],
  }
]