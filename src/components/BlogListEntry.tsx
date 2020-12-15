import React, { Component } from 'react';
import { BlogMetadata } from '../blog/Blogs';

import './scss/BlogListEntry.scss';
import { Link } from 'react-router-dom';

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default class BlogListEntry extends Component<BlogMetadata, {}> {
  render(): JSX.Element {
    return (
      <div className='BlogListEntry'>
        <div className='BlogListEntry-content'>
          <h1 className='BlogListEntry-h1'>
            <Link to={`/blog/${this.props.path}`}>
              {this.props.title}
            </Link>
          </h1>
          <div className='BlogListEntry-date'>
            <span role='img' aria-label='date'>📅</span>&nbsp;
            {this.props.date.toLocaleDateString('en-US', dateOptions)}
          </div>
          <div className='BlogListEntry-tag-container'>
            {this.props.tags.map((tag, index) => <div className='BlogListEntry-tag' key={index}>{tag}</div>)}
          </div>
          <p>
            {this.props.description}
          </p>
        </div>
      </div>
    );
  }
}
