import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPagesBuild ? "/psicologia-entrelinhas" : "",
  trailingSlash: true,
};

export default nextConfig;
