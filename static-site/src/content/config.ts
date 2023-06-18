import { defineCollection, z } from "astro:content"

const zPositionSerialized = z.object({
  x: z.number(),
  y: z.number(),
})

const zNodeSerialized = z.object({
  id: z.number(),
  action: z.string(),
  output: z.string(),
})

const zEdgeSerialized = z.object({
  i: z.number(),
  o: z.number(),
})

// must be kept synced with the TS types in shared/index.ts
const zRecipeSerialized = z.object({
  id: z.number(),
  title: z.string(),
  desc: z.string(),
  size: z.string(),
  tags: z.array(z.string()),
  data: z.object({
    nodes: z.array(zNodeSerialized),
    edges: z.array(zEdgeSerialized),
    positions: z.record(z.string(), zPositionSerialized),
  }),
})

const recipesCollection = defineCollection({
  type: "data",
  schema: zRecipeSerialized,
})

export const collections = {
  recipes: recipesCollection,
}
