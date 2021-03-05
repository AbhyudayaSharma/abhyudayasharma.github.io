import React from 'react';
import { PageProps } from 'gatsby';

import { Seo } from '../components/Seo';
import { wrapContent } from '../utils/utils-react';
import { getPageUrl } from '../utils/utils-common';

import packageJson from '../../package.json';

const AboutRoute: React.FC<PageProps> = (props) => {
  return wrapContent(props,
    <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <Seo title={`About Me - ${packageJson.author.name}`} url={getPageUrl(props)} />
      <span role='img' aria-label='under construction' style={{ fontSize: '8rem', textAlign: 'center', width: '100%' }}>
        🚧
      </span>
      <p style={{ fontSize: '4rem', color: 'white' }}>
        This page is under construction
      </p>
    </div>
  );
};

export default AboutRoute;
