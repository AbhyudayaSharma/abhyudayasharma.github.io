import React, { Component } from 'react';
import Footer from './Footer';
import Blogs, { BlogMetadata } from './blog/Blogs';
import BlogListEntry from './BlogListEntry';

import './scss/BlogList.scss';

interface BlogListState {
  blogs: BlogMetadata[];
}

export default class BlogList extends Component<{}, BlogListState> {
  constructor(props: {}) {
    super(props);
    this.state = { blogs: [] };
  }

  componentDidMount(): void {
    Blogs.getBlogs().then(blogs => {
      this.setState({
        blogs: blogs,
      });
    });
  };

  render(): JSX.Element {
    return (
      <div className='BlogList'>
        <div/>
        <div>
          {this.state.blogs.map((blog, index) => <BlogListEntry {...blog} key={index}/>)}
        </div>
        <div/>
        <div className='BlogList-footer'>
          <Footer/>
        </div>
      </div>
    );
  }
}
