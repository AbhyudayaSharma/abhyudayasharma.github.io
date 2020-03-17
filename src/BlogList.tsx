import React, { Component } from 'react';
import Footer from './Footer';
import Blogs, { BlogMetadata } from './blog/Blogs';
import BlogListEntry from './BlogListEntry';

import './scss/BlogList.scss';
import Header from './Header';

interface BlogListState {
  blogs: BlogMetadata[];
}

export default class BlogList extends Component<{}, BlogListState> {
  constructor(props: {}) {
    super(props);
    this.state = { blogs: [] };
  }

  async componentDidMount(): Promise<void> {
    const blogs = await Blogs.getBlogs();
    this.setState({ blogs: blogs });
  };

  render(): JSX.Element {
    return (
      <div className='BlogList'>
        <Header/>
        <div className='BlogList-content'>
          {this.state.blogs.map((blog, index) => <BlogListEntry {...blog} key={index}/>)}
        </div>
        <div className='BlogList-footer'>
          <Footer/>
        </div>
      </div>
    );
  }
}
