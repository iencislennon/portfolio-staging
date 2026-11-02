import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const link = z.object({ label: z.string(), href: z.string().url() });

const metric = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  context: z.string().min(1),
  source: z.string().min(1, "every metric needs a source"),
  sourceUrl: z.string().url().optional(),
});

const figure = z.object({
  id: z.string().min(1),
  alt: z.string().min(10, "images need meaningful alt text"),
});

const projects = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/projects" }),
  schema: z
    .object({
      title: z.string(),
      year: z.number().int(),
      status: z.enum(["live", "code", "research", "progress"]),
      role: z.string().min(3),
      team: z.string().min(3),
      category: z.string(),
      summary: z.string().min(20),
      blurb: z.string().min(20).max(160),
      problem: z.string().min(20),
      contribution: z.array(z.string()).default([]),
      stack: z.array(z.string()).min(3).max(5),
      links: z.array(link).default([]),
      metrics: z.array(metric).default([]),
      accent: z.string(),
      coverImage: figure.optional(),
      architectureImage: figure.optional(),
      limitations: z.array(z.string()).default([]),
      nextSteps: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().int(),
    })
    .superRefine((p, ctx) => {
      // Spec §11.2: build fails if a featured project is missing trust-critical fields.
      if (!p.featured) return;
      const need = (ok: boolean, path: string, msg: string) =>
        ok || ctx.addIssue({ code: "custom", path: [path], message: `featured project: ${msg}` });
      need(!!p.coverImage, "coverImage", "cover image (with alt) is required");
      need(!!p.architectureImage, "architectureImage", "architecture image (with alt) is required");
      need(p.contribution.length > 0, "contribution", "personal contribution is required");
      need(p.links.length > 0, "links", "at least one link is required");
      need(p.metrics.length > 0, "metrics", "at least one sourced metric is required");
      need(p.limitations.length > 0, "limitations", "limitations are required");
    }),
});

export const collections = { projects };
