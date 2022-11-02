import preact from "@astrojs/preact"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  site: "https://SpencerWhitehead7.github.io",
  base: "/graph-chef/static-site",
})
