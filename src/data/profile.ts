// Source of truth: professional resume and github.com/mantramehta (verified Nov 2026).

export const profile = {
  name: "Mantra Mehta",
  role: "Software Engineer",
  headline: "Software Engineer building reliable AI-powered applications.",
  summary:
    "3+ years across backend, full-stack, and AI-enabled SaaS. I ship LLM features with validated outputs, tests, and measured results.",
  about: [
    "I’m a software engineer in Los Angeles who builds the backend and full-stack systems behind AI-enabled products.",
    "At Freshworks I worked on search, ranking, and recommendation services in Python and FastAPI. At Treevah I build Node.js, React, and PostgreSQL features, including work on an asynchronous document-summarization workflow that integrates Azure OpenAI.",
    "What I care about most is the engineering around the model: strict schemas, server-side validation, graceful failure, and evaluations that show whether a feature actually works.",
  ],
  photo: { src: "/mantra-mehta.webp", width: 640, height: 640 },
  location: "Los Angeles, CA",
  email: "mehtamantra31@gmail.com",
  github: "https://github.com/mantramehta",
  linkedin: "https://www.linkedin.com/in/mantra-mehta/",
};

export const focusAreas = [
  "Backend & API engineering",
  "Full-stack SaaS",
  "LLM integrations",
  "Search & ranking",
  "Recommendation systems",
];

export const education = {
  degree: "M.S. Computer Science",
  school: "California State University, Dominguez Hills",
  place: "Carson, CA",
  period: "Jan 2023 – Dec 2025",
  gpa: "3.89 / 4.00",
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Treevah LLC",
    role: "Software Engineer",
    period: "Mar 2026 – Present",
    location: "Remote, USA",
    current: true,
    bullets: [
      "Contribute to an asynchronous document-summarization workflow that integrates Azure OpenAI, using Node.js, Express, and PostgreSQL to support multiple file formats, persisted processing states, and 2-second status polling.",
      "Delivered a full-stack Link Item feature across PostgreSQL, Sequelize, REST APIs, and React, so validated web links are organized and previewed alongside uploaded files.",
      "Implement server-side subscription limits for workspace creation and template adoption, combining ownership checks, standardized API errors, and client-side entitlement controls.",
      "Integrate public-template APIs with shared workspace views, and build isolated React/Redux temporary workspace state that keeps in-session edits without changing persisted user data.",
    ],
    stack: ["Node.js", "Express", "Azure OpenAI", "PostgreSQL", "Sequelize", "React", "Redux"],
  },
  {
    company: "Freshworks",
    role: "Software Engineer",
    period: "Aug 2020 – Dec 2022",
    location: "India",
    bullets: [
      "Built Python and FastAPI backend services with REST APIs, PostgreSQL, and Redis, including API contract definitions and request handling.",
      "Developed Elasticsearch and BM25 search services and integrated Sentence-BERT and FAISS semantic retrieval to improve ranking and query relevance.",
      "Developed recommendation APIs using collaborative and content-based filtering with scikit-learn and XGBoost across two production paths, supported by Kafka and Celery event pipelines that moved processing out of synchronous requests.",
      "Deployed Dockerized backend services on AWS (Kubernetes, EC2, S3, RDS) and worked with engineering and platform teams on testing, CI/CD, and observability using pytest, GitHub Actions, Prometheus, Grafana, and CloudWatch.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Elasticsearch", "FAISS", "Kafka", "AWS"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI & ML",
    items: [
      "LLM integration",
      "Azure OpenAI",
      "Gemini structured outputs",
      "LLM evaluation",
      "Sentence-BERT",
      "Recommendation systems",
      "scikit-learn",
      "XGBoost",
      "MLflow",
    ],
  },
  {
    group: "Backend & APIs",
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "REST API design",
      "Auth & sessions",
      "Async & background processing",
      "Kafka",
      "Celery",
    ],
  },
  {
    group: "Data & Search",
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "BM25", "FAISS", "Semantic search"],
  },
  {
    group: "Frontend",
    items: ["React", "TypeScript", "Redux", "Vite", "React Router", "Responsive UI"],
  },
  {
    group: "Cloud & Reliability",
    items: [
      "AWS (EC2, S3, RDS)",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "CloudWatch",
      "pytest",
    ],
  },
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "C"],
  },
];
