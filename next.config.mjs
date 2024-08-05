import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;  // Отключаем кэширование на стороне клиента для отладки
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
