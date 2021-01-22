import React from 'react';
import { Seo } from '../components/Seo';
import { author } from '../../package.json';

const AboutRoute: React.FC = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <Seo title={`About Me - ${author.name}`}/>
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
