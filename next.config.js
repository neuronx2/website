const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/website/' : '',
  images: {
    unoptimized: true,
  },
};