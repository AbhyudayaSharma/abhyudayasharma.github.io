import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import Blogs, { BlogMetadata } from './blog/Blogs';
import BlogListEntry from './BlogListEntry';
import packageJson from '../package.json';

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

  getBlogList(): JSX.Element | JSX.Element[] {
    if (this.state.blogs.length) {
      return this.state.blogs.map((blog, index) => <BlogListEntry {...blog} key={index}/>);
    } else {
      return (
        <div>
          <p className = 'BlogList-loading'>Loading...</p>
        </div>
      );
    }
  }

  render(): JSX.Element {
    return (
      <div className='BlogList'>
        <Helmet>
          <title>{`${packageJson.author.name}'s Blog`}</title>
        </Helmet>
        <Header/>
        <div className='BlogList-content'>
          {this.getBlogList()}
        </div>
        <div className='BlogList-footer'>
          <Footer/>
        </div>
      </div>
    );
  }
}
