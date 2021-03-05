'use strict';

/* eslint-disable @typescript-eslint/no-var-requires */
require('source-map-support').install();
require('ts-node').register({ files: true });
module.exports = require('./lib/gatsby-config.ts');
