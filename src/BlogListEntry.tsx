import React, { Component } from 'react';
import { BlogMetadata } from './blog/blogs';

export default class BlogListEntry extends Component<BlogMetadata, {}> {
  render(): JSX.Element {
    return (
      <div>
        <h1>
          <a href={this.props.url}>
            {this.props.title}
          </a>
        </h1>
        <ul>
          {this.props.tags.map((tag, index) => <li key={index}>{tag}</li>)}
        </ul>
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
}
