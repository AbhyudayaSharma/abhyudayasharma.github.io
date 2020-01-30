/* eslint-disable @typescript-eslint/explicit-function-return-type */
// This is a JavaScript file, not TypeScript
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Blogs from './blog/Blogs';

import './scss/Blog.scss';
import { Redirect, withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  getMarkdown() {
    if (this.state.text === null) {
      return <Redirect to='/404'/>;
    }
    return <ReactMarkdown source={this.state.text}/>;
  }

  render() {
    return (
      <div className='Blog'>
        <Header/>
        <div className='Blog-text'>
          {this.getMarkdown()}
        </div>
        <Footer/>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    // the type definitions for react-router-dom are really bad in this case
    // so we cannot use TypeScript. I don't want to add another dependency
    // to prop-types for just one file. Better to disable these warnings as
    // only withRouter(Blog) is exported

    // eslint-disable-next-line react/prop-types
    if (prevProps.match.params.path !== this.props.match.params.path) {
      this.updateBlog();
    }
  }

  componentDidMount() {
    this.updateBlog();
  }

  async updateBlog() {
    const blogs = await Blogs.getBlogs();
    // eslint-disable-next-line react/prop-types
    const params = this.props.match.params;
    for (const blog of blogs) {
      // eslint-disable-next-line react/prop-types
      if (blog.path === `${params.year}/${params.path}`) {
        const data = await (await fetch(blog.url)).text();
        this.setState({ text: data });
        return;
      }
    }
    this.setState({ text: null });
  }
}

export default withRouter(Blog);
