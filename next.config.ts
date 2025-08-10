/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // ESSENCIAL para gerar a pasta /out
  eslint: {
    ignoreDuringBuilds: true,  // IGNORA ERROS DO ESLINT NA BUILD
  },
  // outras configs (se tiver)
}

module.exports = nextConfig
