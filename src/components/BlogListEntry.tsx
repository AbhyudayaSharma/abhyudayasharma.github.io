import React from 'react';
import { Link } from 'gatsby';
import { BlogMetadata } from '../common/BlogMetadata';
import { formatDate } from '../utils/utils-common';

import '../scss/BlogListEntry.scss';

export const BlogListEntry: React.FC<BlogMetadata> = (props) => {
  return (
    <div className='BlogListEntry'>
      <div className='BlogListEntry-content'>
        <h1 className='BlogListEntry-h1'>
          <Link to={props.url}>
            {props.title}
          </Link>
        </h1>
        <div className='BlogListEntry-date'>
          <span role='img' aria-label='date'>📅</span>&nbsp;
          <time>
            {formatDate(props.date)}
          </time>
        </div>
        <div className='BlogListEntry-tag-container'>
          {props.tags.map((tag, index) => <div className='BlogListEntry-tag' key={index}>{tag}</div>)}
        </div>
        <p>
          {props.description}
        </p>
      </div>
    </div>
  );
};
