import path from "node:path";
import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.resolve(process.cwd()),
  basePath: isGitHubPagesBuild ? "/psicologia-entrelinhas" : "",
  trailingSlash: true,
};

export default nextConfig;
