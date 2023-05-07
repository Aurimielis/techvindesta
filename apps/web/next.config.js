//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next/plugins/with-nx');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  output: 'standalone',
};

module.exports = withNx(nextConfig);
