const webpack = require('webpack');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Server-side specific configurations
    if (isServer) {
      config.module.rules.push(
        {
          test: /[\\/]node_modules[\\/]@sap-cloud-sdk[\\/]/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        },
        {
          test: /[\\/]node_modules[\\/]@sap-ai-sdk[\\/]/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        }
      );

      // Server-side specific aliases
      config.resolve.alias = {
        ...config.resolve.alias,
        '@sap-cloud-sdk': path.resolve(__dirname, 'node_modules/@sap-cloud-sdk'),
        '@sap-ai-sdk': path.resolve(__dirname, 'node_modules/@sap-ai-sdk'),
      };
    }

    // Client-side specific configurations
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url/'),
        zlib: require.resolve('browserify-zlib'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        assert: require.resolve('assert/'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        'process/browser': require.resolve('process/browser'),
        buffer: require.resolve('buffer/'),
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }

    return config;
  },
  serverExternalPackages: ['@sap-cloud-sdk', '@sap-ai-sdk']
};

module.exports = nextConfig;