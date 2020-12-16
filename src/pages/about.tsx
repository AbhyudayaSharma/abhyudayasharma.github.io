import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { author } from '../../package.json';

const AboutRoute: FunctionComponent = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <Helmet title={`About Me - ${author.name}`} defer={false}/>
      <span role='img' aria-label='under construction' style={{ fontSize: '8rem', textAlign: 'center', width: '100%' }}>
        🚧
      </span>
      <p style={{ fontSize: '6rem', color: 'white' }}>
        This page is under construction
      </p>
    </div>
  );
};

export default AboutRoute;
