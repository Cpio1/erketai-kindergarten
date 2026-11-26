import type { NextConfig } from "next";
import { basePath } from "./lib/site-url";

/*
  GitHub Pages үшін статикалық экспорт:
  сайт https://erketai-sad.edu.kz/ өз доменінде (basePath бос) орналасады.
*/
const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
