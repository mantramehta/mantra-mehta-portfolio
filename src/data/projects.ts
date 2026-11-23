// Every fact here was verified against the public repositories (Nov 2026).
// StaySphere: github.com/mantramehta/StaySphere (README, package.json, utils/, routes/, tests/)
// Genomic ML: github.com/mantramehta/CSC590_FinalProject_MantraMehta (Code/, Results_CSV/)

export type Shot = { src: string; alt: string; caption: string; width: number; height: number };

export const staysphere = {
  slug: "staysphere",
  name: "StaySphere",
  tagline: "Full-stack accommodation marketplace with an AI travel concierge",
  summary:
    "Describe a stay in plain English, such as “a mountain stay in India under $200”, and StaySphere returns real, ranked listings with a reason for each match. The model only interprets the request. The backend controls the search, so every recommendation is a real listing that respects the user’s budget and destination.",
  repo: "https://github.com/mantramehta/StaySphere",
  demo: "https://staysphere-f4xw.onrender.com",
  demoNote: "Hosted on Render’s free tier, so the first request after inactivity can take about a minute.",
  stack: ["React 19", "TypeScript", "Vite", "Node.js", "Express 5", "MongoDB", "Gemini API", "Joi", "Passport.js", "Mapbox", "Cloudinary"],
  cover: {
    src: "/projects/staysphere/ai-search.webp",
    alt: "StaySphere AI travel concierge returning three castle listings under $500 with match reasons",
    caption: "AI concierge: “A castle under $500 a night” returns real listings with reasons.",
    width: 1310,
    height: 1224,
  } satisfies Shot,
  shots: [
    {
      src: "/projects/staysphere/homepage.webp",
      alt: "StaySphere home page with hero image and feature highlights",
      caption: "Home page",
      width: 1800,
      height: 881,
    },
    {
      src: "/projects/staysphere/listings.webp",
      alt: "StaySphere listings page with search, category filters, and listing cards",
      caption: "Explore stays with search and 11 category filters",
      width: 1800,
      height: 889,
    },
    {
      src: "/projects/staysphere/listing-details.webp",
      alt: "StaySphere listing details page with map and reviews",
      caption: "Listing details with Mapbox map and reviews",
      width: 1006,
      height: 1235,
    },
    {
      src: "/projects/staysphere/mobile-ai-search.webp",
      alt: "StaySphere AI search on a mobile screen",
      caption: "AI search on mobile",
      width: 489,
      height: 1054,
    },
  ] satisfies Shot[],
  highlights: [
    { value: "26", label: "unit tests", detail: "node:test, mocked fetch, no network" },
    { value: "15/15", label: "live eval cases passed", detail: "incl. off-topic & prompt injection" },
    { value: "71/71", label: "returned listings verified", detail: "every ID found in MongoDB" },
    { value: "0", label: "constraint violations", detail: "budget or destination" },
  ],
  evalNote:
    "Single live run on Oct 27, 2026 with gemini-3.5-flash-lite against 56 listings. LLM output can vary between runs.",
  evalRows: [
    ["Preferences matched expectations (budget, location, category, combined, no constraints, impossible, unsupported, prompt injection)", "13 / 13"],
    ["Off-topic and instruction-extraction prompts rejected", "2 / 2"],
    ["Returned listing IDs found in MongoDB", "71 / 71"],
    ["Results breaking a budget or destination limit", "0"],
    ["Gemini response time", "median 971 ms, slowest 1347 ms"],
  ],
  pipeline: [
    { title: "Validate prompt", body: "Joi rejects empty or >300-character input before any AI call.", tag: "Joi" },
    { title: "Extract preferences", body: "Gemini returns a fixed JSON shape: destination, budget, categories, keywords, unsupported.", tag: "Gemini" },
    { title: "Re-validate output", body: "Joi re-checks the model’s output against the Mongoose category enum and strips unknown fields. Invalid output is rejected.", tag: "Joi" },
    { title: "Hard filters", body: "Budget and destination become MongoDB query constraints, with regex input escaped.", tag: "MongoDB" },
    { title: "Deterministic ranking", body: "Category +3, title keyword +2, description keyword +1. Top 12 results, ties broken by price.", tag: "Express" },
    { title: "Explain", body: "Reasons are built only from stored listing data, never from model text.", tag: "React" },
  ],
  decisions: [
    {
      title: "No AI-generated database queries",
      body: "The model fills in a form and Express decides how to search. Even a successful prompt injection can only change filter values.",
    },
    {
      title: "Validate twice",
      body: "A JSON response schema shapes the output and Joi verifies it on the server, because a provider’s guarantees don’t replace server-side validation.",
    },
    {
      title: "Honest explanations",
      body: "Requests the app can’t filter by, like dates or guest counts, are shown back to the user instead of being silently ignored.",
    },
    {
      title: "Graceful failure",
      body: "An 8-second timeout and typed errors (422 off-topic, 429 rate-limited, 502 invalid output, 503 unavailable). Regular search keeps working without AI.",
    },
    {
      title: "Cost protection",
      body: "Rate limits of 5/min per visitor, plus app-wide limits of 12/min and 400/day, keep usage below the Gemini free-tier quota.",
    },
    {
      title: "Simple by design",
      body: "No RAG, vector database, LangChain, or SDK: one fetch call to one REST endpoint.",
    },
  ],
  engineering: [
    ["Server-side authorization", "Listing ownership and review authorship are enforced in Express middleware, never by hiding UI."],
    ["Persistent sessions", "Passport sessions stored in MongoDB via connect-mongo survive server restarts."],
    ["Image lifecycle", "Multer streams uploads to Cloudinary; replaced or deleted images are removed there too."],
    ["Location pipeline", "Express geocodes each listing with Mapbox and stores a GeoJSON point for the React map."],
    ["Consistent API errors", "Every failure uses one { error: { code, message } } shape with the right HTTP status."],
    ["One production service", "Express serves both the JSON API and the compiled React app, with a fallback for deep links."],
  ],
  evolution: [
    ["V1", "Server-rendered Express + EJS marketplace with auth, reviews, uploads, and maps"],
    ["V2", "Migrated the UI to React, TypeScript, Vite, and React Router on top of a JSON API"],
    ["V3", "Added the AI travel concierge with validated structured output, deterministic ranking, tests, and live evaluation"],
  ],
  limitations: [
    "Keyword matching is plain text. Synonyms help recall but can lower precision: “houseboat” also returned lakeside stays.",
    "Listings don’t store amenities, guest capacity, or availability, so those requests can’t be filtered.",
    "Rate-limit counters live in memory, which suits one server. Multiple instances would need a shared store such as Redis.",
    "Automated tests cover the AI and ranking logic. Auth, listings, and the UI are verified with build, lint, and manual checks.",
  ],
};

export type MetricRow = {
  dataset: string;
  label: string;
  dims: "100 SNPs" | "10,000 SNPs + missing";
  model: "LogReg" | "RandomForest" | "XGBoost";
  cvAucMean: number;
  cvAucStd: number;
  testAcc: number;
  testF1: number;
  testAuc: number;
};

// Copied verbatim from Results_CSV/metrics_*.csv
const raw: [string, string, MetricRow["dims"], MetricRow["model"], number, number, number, number, number][] = [
  ["4-wayAdditive_100feat", "4-way additive", "100 SNPs", "LogReg", 0.9673, 0.0036, 0.9567, 0.9574, 0.9906],
  ["4-wayAdditive_100feat", "4-way additive", "100 SNPs", "RandomForest", 0.9854, 0.0101, 0.9533, 0.9539, 0.9925],
  ["4-wayAdditive_100feat", "4-way additive", "100 SNPs", "XGBoost", 0.986, 0.0068, 0.96, 0.9605, 0.9937],
  ["4-wayAdditive_10000feat_with_NA", "4-way additive", "10,000 SNPs + missing", "LogReg", 0.9498, 0.0106, 0.87, 0.8687, 0.9488],
  ["4-wayAdditive_10000feat_with_NA", "4-way additive", "10,000 SNPs + missing", "RandomForest", 0.9866, 0.0056, 0.94, 0.9392, 0.9805],
  ["4-wayAdditive_10000feat_with_NA", "4-way additive", "10,000 SNPs + missing", "XGBoost", 0.9868, 0.0023, 0.9367, 0.9365, 0.9784],
  ["2-wayEpi_100feat", "2-way epistatic", "100 SNPs", "LogReg", 0.4511, 0.0404, 0.4867, 0.4762, 0.4921],
  ["2-wayEpi_100feat", "2-way epistatic", "100 SNPs", "RandomForest", 0.523, 0.0303, 0.5267, 0.5359, 0.5318],
  ["2-wayEpi_100feat", "2-way epistatic", "100 SNPs", "XGBoost", 0.5767, 0.0605, 0.64, 0.6447, 0.694],
  ["2-wayEpi_10000feat_with_NA", "2-way epistatic", "10,000 SNPs + missing", "LogReg", 0.4847, 0.051, 0.47, 0.4382, 0.4825],
  ["2-wayEpi_10000feat_with_NA", "2-way epistatic", "10,000 SNPs + missing", "RandomForest", 0.5109, 0.0343, 0.5167, 0.5307, 0.5166],
  ["2-wayEpi_10000feat_with_NA", "2-way epistatic", "10,000 SNPs + missing", "XGBoost", 0.5158, 0.0492, 0.5033, 0.5017, 0.5268],
  ["2Additive_2-wayEpi_10000feat_with_NA", "2 additive + 2-way epistatic", "10,000 SNPs + missing", "LogReg", 0.4935, 0.0728, 0.48, 0.5063, 0.4945],
  ["2Additive_2-wayEpi_10000feat_with_NA", "2 additive + 2-way epistatic", "10,000 SNPs + missing", "RandomForest", 0.4882, 0.0519, 0.51, 0.5017, 0.5545],
  ["2Additive_2-wayEpi_10000feat_with_NA", "2 additive + 2-way epistatic", "10,000 SNPs + missing", "XGBoost", 0.4764, 0.0273, 0.54, 0.5577, 0.5574],
  ["4-wayHeterogeneous_10000feat_with_NA", "4-way heterogeneous", "10,000 SNPs + missing", "LogReg", 0.5193, 0.0307, 0.5333, 0.5395, 0.5516],
  ["4-wayHeterogeneous_10000feat_with_NA", "4-way heterogeneous", "10,000 SNPs + missing", "RandomForest", 0.5684, 0.0803, 0.5667, 0.5357, 0.5781],
  ["4-wayHeterogeneous_10000feat_with_NA", "4-way heterogeneous", "10,000 SNPs + missing", "XGBoost", 0.5471, 0.0694, 0.5833, 0.5819, 0.6371],
];

export const genomicMetrics: MetricRow[] = raw.map(
  ([dataset, label, dims, model, cvAucMean, cvAucStd, testAcc, testF1, testAuc]) => ({
    dataset, label, dims, model, cvAucMean, cvAucStd, testAcc, testF1, testAuc,
  }),
);

const REPO = "https://github.com/mantramehta/CSC590_FinalProject_MantraMehta";

export const genomic = {
  slug: "genomic-ml",
  name: "Genomic ML Research",
  tagline: "Modeling complex binary-class associations in simulated SNP data",
  context: "M.S. graduate project · CSU Dominguez Hills · Fall 2025",
  summary:
    "A reproducible scikit-learn pipeline comparing Logistic Regression, Random Forest, and XGBoost on simulated genotype data. It covers four genetic architectures, from purely additive to epistatic and heterogeneous, at both 100 SNPs and 10,000 SNPs with missing values. The goal: find where linear models break down and how much tree ensembles recover.",
  repo: REPO,
  report: `${REPO}/blob/main/Final-report/Mehta_Mantra_CSC590_Final-Report.pdf`,
  stack: ["Python", "scikit-learn", "XGBoost", "pandas", "NumPy", "matplotlib"],
  cover: {
    src: "/projects/genomic/roc_2-wayEpi_100feat.webp",
    alt: "ROC curves on the 2-way epistatic 100-SNP dataset: XGBoost AUC 0.69, Random Forest 0.53, Logistic Regression 0.49",
    caption: "ROC on 2-way epistatic, 100 SNPs: only XGBoost clearly beats chance.",
    width: 926,
    height: 938,
  } satisfies Shot,
  figures: [
    {
      src: "/projects/genomic/roc_4-wayAdditive_100feat.webp",
      alt: "ROC curves on the 4-way additive 100-SNP dataset, all three models near AUC 0.99",
      caption: "4-way additive, 100 SNPs: every model separates the classes.",
      width: 926,
      height: 938,
    },
    {
      src: "/projects/genomic/roc_2-wayEpi_100feat.webp",
      alt: "ROC curves on the 2-way epistatic 100-SNP dataset",
      caption: "2-way epistatic, 100 SNPs: XGBoost 0.69 vs. LogReg 0.49.",
      width: 926,
      height: 938,
    },
    {
      src: "/projects/genomic/roc_4-wayHeterogeneous_10000feat_with_NA.webp",
      alt: "ROC curves on the 4-way heterogeneous 10,000-SNP dataset with missing values",
      caption: "4-way heterogeneous, 10,000 SNPs: signal mostly lost.",
      width: 930,
      height: 938,
    },
    {
      src: "/projects/genomic/featimp_XGBoost_2-wayEpi_100feat.webp",
      alt: "Top 15 XGBoost feature importances on the 2-way epistatic 100-SNP dataset",
      caption: "XGBoost top-15 feature importances, 2-way epistatic.",
      width: 1280,
      height: 960,
    },
  ] satisfies Shot[],
  method: [
    ["Data", "8 simulated SNP datasets across 4 genetic architectures, each with a binary Class label. Results below cover the 6 sets with saved metrics."],
    ["Preprocessing", "Most-frequent imputation for missing genotypes and StandardScaler(with_mean=False), all inside one sklearn Pipeline."],
    ["Feature selection", "For the 10,000-SNP sets, Mutual Information SelectKBest(k=200) runs inside the pipeline, so it is re-fit within every CV fold and avoids selection leakage."],
    ["Models", "Logistic Regression; Random Forest (400 trees); XGBoost (400 trees, depth 5, lr 0.1, subsample 0.9)."],
    ["Evaluation", "70/30 stratified split, 5-fold stratified CV ROC-AUC on train, then test accuracy, F1, and ROC-AUC. Seed 42 throughout."],
    ["Artifacts", "Per-dataset metrics CSVs, overlaid ROC curves, RF/XGBoost feature-importance plots, and MI score rankings."],
  ],
  findings: [
    {
      title: "Additive signal is easy, even at scale",
      body: "On 4-way additive data, all three models reach test AUC 0.99 at 100 SNPs, and Random Forest and XGBoost hold 0.98 at 10,000 SNPs after MI selection (Logistic Regression 0.95).",
    },
    {
      title: "Interactions defeat linear models",
      body: "On 2-way epistatic data with 100 SNPs, Logistic Regression sits at chance (0.49). XGBoost reaches 0.69, the clearest gain from a tree ensemble in the study.",
    },
    {
      title: "High dimensionality erases the advantage",
      body: "With 10,000 SNPs and missing values, the epistatic, hybrid, and heterogeneous sets stay between 0.48 and 0.64 test AUC. Marginal MI filtering can’t see SNPs whose effect only appears jointly.",
    },
  ],
  limitations: [
    "Simulated data only, so results describe these architectures, not real cohorts.",
    "One stratified train/test split per dataset; CV spread is reported alongside test metrics.",
    "The 4-way heterogeneous 100-SNP set has no saved metrics in the repository, so it is omitted here.",
  ],
};

export const secondaryProjects = [
  {
    name: "LL(1) Calculator Parser",
    description:
      "Table-driven LL(1) predictive parser in C with a hand-written scanner, a 10×12 parse table covering 19 productions, an explicit stack-machine driver, and line-accurate lexical and syntax errors.",
    stack: ["C", "Compilers", "FIRST/FOLLOW sets"],
    repo: "https://github.com/mantramehta/ll1-calculator-parser",
  },
];

export const planned = [
  {
    name: "VoiceGuard AI",
    subtitle: "Voice Agent Evaluation Platform",
  },
  {
    name: "AgentTrace AI",
    subtitle: "Agentic and RAG Evaluation Platform",
  },
];
