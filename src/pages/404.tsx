import React from 'react';
import { PageProps } from 'gatsby';
import { wrapContent } from '../utils/utils-react';

const NotFoundRoute: React.FC<PageProps> = (props) => wrapContent(props, (
  <div style={{ color: '#fff', textAlign: 'center' }}>
    <h1 style={{ fontSize: '4rem', fontWeight: 100 }}>
      ¯\_(ツ)_/¯<br />
       Error 404 &mdash; Page not found<br />
    </h1>
    <p style={{ fontSize: '2rem' }}>
      URL: <code>{props.path}</code>
    </p>
  </div>
));

export default NotFoundRoute;
