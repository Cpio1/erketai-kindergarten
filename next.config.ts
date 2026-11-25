import type { NextConfig } from "next";
import { basePath } from "./lib/site-url";

/*
  GitHub Pages үшін статикалық экспорт:
  сайт https://cpio1.github.io/erketai-kindergarten/ адресінде орналасады.
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
