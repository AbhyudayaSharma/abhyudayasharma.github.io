import React, { Component } from 'react';
import { BlogMetadata } from './blog/Blogs';

import './scss/BlogListEntry.scss';

export default class BlogListEntry extends Component<BlogMetadata, {}> {
  render(): JSX.Element {
    return (
      <div className='BlogListEntry'>
        <h1 className='BlogListEntry-h1'>
          <a href={this.props.url}>
            {this.props.title}
          </a>
        </h1>
        <div className='BlogListEntry-date'>
          Published on {this.props.date.toDateString()}
        </div>
        <div className='BlogListEntry-tag-container'>
          {this.props.tags.map((tag, index) => <div className='BlogListEntry-tag' key={index}>{tag}</div>)}
        </div>
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
}
