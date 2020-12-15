import { PageProps } from 'gatsby';
import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { author } from '../../package.json';
import { wrapContent } from '../utils';

const blogRoute: FunctionComponent<PageProps> = (props) => {
  return (
    <>
      <Helmet title={`${author.name}'s Blog`} defer={false} />
      {wrapContent(props,
        <p>
          Hello world
        </p>
      )}
    </>
  );
};

export default blogRoute;
