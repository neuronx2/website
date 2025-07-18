const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/website/' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};