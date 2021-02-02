import React from 'react';
import { PageProps } from 'gatsby';
import { Home } from '../components/Home';
import { getPageUrl } from '../utils/utils-common';

const IndexRoute: React.FC<PageProps> = (props) => {
  return (
    <Home pageUrl={getPageUrl(props)} />
  );
};

export default IndexRoute;
