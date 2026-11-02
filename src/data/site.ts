// Single source of truth for dates, status and availability (spec §12).
export const site = {
  name: "Ansar Tleubayev",
  initials: "AT",
  title: "AI/ML Engineer",
  location: "Almaty, Kazakhstan",
  updated: "2026-11-02",
  status: "Seeking international internships and research roles",
  email: "ansartleubaev1@gmail.com",
  github: "https://github.com/iencislennon",
  linkedin: "https://www.linkedin.com/in/ansar-tleubayev/",
  description:
    "AI/ML engineer building agentic systems, applied machine learning pipelines and model optimization. Seeking international internships and research roles.",
  hero: {
    eyebrow: "AI/ML Engineer · Almaty, Kazakhstan · Open worldwide",
    h1: "I build AI systems that move from experiment to evidence.",
    body:
      "I work across agentic systems, applied machine learning and model optimization — designing measurable pipelines, reliable evaluations and deployable products.",
  },
  // Rendered only while verified. Numbers must stay out until every project metric has a source.
  proof: [
    "Multi-agent systems shipped as working demos",
    "Applied ML across climate, safety and decision support",
    "End-to-end ownership: data → model → API → deployment",
  ],
  range: [
    { area: "Model optimization", detail: "Custom Triton kernels, LoRA/NF4 training, GPU benchmarking" },
    { area: "Agentic systems", detail: "Multi-agent coordination, conflict detection, escalation to humans, FastAPI + WebSocket" },
    { area: "Applied forecasting", detail: "Leakage-aware time-series validation with scikit-learn" },
    { area: "Geospatial ML", detail: "Satellite-derived features, Random Forest downscaling, independent validation" },
  ],
  // Fill these in with verified entries; sections stay hidden while empty.
  experience: [] as { period: string; role: string; org: string; note?: string }[],
  recognition: [] as { title: string; detail: string; url?: string }[],
  resumePdf: "/resume/Ansar_Tleubayev_Resume.pdf",
};
export type Site = typeof site;
