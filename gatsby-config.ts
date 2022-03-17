import path from 'path';
import packageJson from './package.json';

import { serializeFeed, feedQuery, feedUrl } from './lib/createFeed';
import { GatsbyConfig } from 'gatsby';

const gatsbyConfig: GatsbyConfig = {
  siteMetadata: {
    title: packageJson.description,
    siteUrl: packageJson.homepage,
    description: packageJson.description,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve('src', 'images'),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        short_name: 'Abhyudaya Sharma\'s Website and Blog',
        name: 'Abhyudaya Sharma\'s Website and Blog',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
        start_url: '/',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: path.resolve('src', 'blog'),
      },
    },
    'gatsby-remark-images',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              quality: 70,
              maxWidth: 1024,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              languagePrefix: 'language-', // set by mdx: https://mdxjs.com/guides/syntax-highlighting
            },
          },
        ],
        remarkPlugins: [],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            language: 'en',
            match: '^/blog$',
            query: feedQuery,
            title: feedUrl.host,
            output: feedUrl.pathname,
            serialize: serializeFeed,
            description: `${packageJson.author.name}'s Blog`,
            site_url: new URL('/blog', packageJson.homepage).href,
            feed_url: feedUrl.href,
          },
        ],
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-nprogress',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-split-css',
  ],
};

export default gatsbyConfig;
