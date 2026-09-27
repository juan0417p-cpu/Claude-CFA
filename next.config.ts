import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Por defecto un formulario puede enviar máximo 1 MB. Subimos el límite
      // para poder mandar varias fotos de preguntas en una misma sesión.
      bodySizeLimit: "30mb",
    },
  },
};

export default nextConfig;
