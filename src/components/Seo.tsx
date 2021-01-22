import React from 'react';
import { author } from '../../package.json';
import { Helmet } from 'react-helmet';

interface SeoProps {
  metaDescription: string;
  title: string;
}

const defaultTitle = `${author.name}'s Personal Website and Blog`;

const defaultProps: SeoProps = {
  metaDescription: defaultTitle,
  title: defaultTitle,
};

export const Seo: React.FC<Partial<SeoProps>> = (props) => {
  return (
    <Helmet defer={false}
      title={props.title || defaultProps.title}
      htmlAttributes={{ lang: 'en' }}>
      <meta name='description' content={props.metaDescription || defaultProps.metaDescription}/>
    </Helmet>
  );
};
