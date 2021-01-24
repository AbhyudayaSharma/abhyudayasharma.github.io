import path from 'path';
import { homepage } from '../package.json';
import { GatsbyConfig } from 'gatsby';

const gatsbyConfig: GatsbyConfig = {
  siteMetadata: {
    siteUrl: homepage,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, '..', 'src', 'images')
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      /* eslint-disable @typescript-eslint/camelcase */
      options: {
        short_name: 'Abhyudaya Sharma\'s Website and Blog',
        name: 'Abhyudaya Sharma\'s Website and Blog',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          },
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ],
        start_url: '/',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      },
      /* eslint-enable @typescript-eslint/camelcase */
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: path.join(__dirname, '..', 'src', 'blog'),
      },
    },
    {
      resolve: 'gatsby-plugin-ts',
      options: {
        codegen: false,
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
        ],
        remarkPlugins: [
          require('remark-math'),
          require('remark-html-katex'),
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-nprogress',
  ],
};

export default gatsbyConfig;
