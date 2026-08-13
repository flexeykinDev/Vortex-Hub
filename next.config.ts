import type { NextConfig } from "next";

// Set NEXT_BASE_PATH in CI to the repo name (e.g. "/vortex-info") when
// deploying to GitHub Pages under a project subpath. Leave unset for local
// dev or a user/org page served from the domain root.
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
