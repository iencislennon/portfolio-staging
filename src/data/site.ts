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
  experience: [
    { period: "Jun 2026", role: "AI Engineer", org: "Protocol Control Bot, Almaty", note: "Deployed an AI Telegram assistant for government workflows; designed PostgreSQL-based multi-tenant data ingestion pipelines; owned CI/CD, infrastructure configuration and monitoring." },
    { period: "Apr 2026 – Jun 2026", role: "AI Engineer", org: "Tyin.ai, Almaty", note: "Built generative components for a multi-agent pipeline, scraping and LLM orchestration, and evaluated model outputs." },
    { period: "Sep 2025 – Oct 2026", role: "ML Engineer", org: "CAIR, Almaty", note: "Fine-tuned GLM-4-9B with LoRA on GPUs via RunPod." },
  ] as { period: string; role: string; org: string; note?: string }[],
  recognition: [
    { title: "6th place, CYCNET Capture The Flag", detail: "cybersecurity competition" },
  ] as { title: string; detail: string; url?: string }[],
  education: { degree: "B.Sc. Information Systems", school: "SDU University, Almaty", expected: "Expected 2029", honor: "Full tuition grant" },
  resumePdf: "/resume/Ansar_Tleubayev_Resume.pdf",
};
export type Site = typeof site;
