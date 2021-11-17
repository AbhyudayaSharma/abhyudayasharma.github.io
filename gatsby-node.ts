import { GatsbyNode } from 'gatsby';

export { createPages } from './lib/createPages';

// Taken from https://github.com/staffe/gatsby-plugin-split-css
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  stage,
}) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      optimization: {
        runtimeChunk: {
          name: 'webpack-runtime',
        },
        splitChunks: {
          name: false,
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(css|scss)$/,
              chunks: 'initial',
              enforce: true,
            },
          },
        },
      },
    });
  }
};
