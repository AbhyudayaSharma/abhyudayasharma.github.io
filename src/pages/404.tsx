import React from 'react';
import { PageProps } from 'gatsby';
import { wrapContent } from '../utils/utils-react';
import { Seo } from '../components/Seo';
import { getPageUrl } from '../utils/utils-common';

const pageTitle = '404 - Page not found';

const NotFoundRoute: React.FC<PageProps> = (props) => wrapContent(props, (
  <>
    <Seo url={getPageUrl(props)} isCanonical={false} metaDescription={pageTitle} title={pageTitle} />
    <div style={{ color: '#fff', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 100 }}>
        ¯\_(ツ)_/¯<br />
       Error 404 &mdash; Page not found<br />
      </h1>
      <p style={{ fontSize: '2rem' }}>
        URL: <code>{props.path}</code>
      </p>
    </div>
  </>
));

export default NotFoundRoute;
