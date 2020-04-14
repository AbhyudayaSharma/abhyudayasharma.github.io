/* eslint-disable @typescript-eslint/explicit-function-return-type */
// This is a JavaScript file, not TypeScript
import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Blogs from './blog/Blogs';

import './scss/Blog.scss';
import { Redirect, withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Heading from './md-renderers/Heading';
import Code from './md-renderers/Code';
import Image from './md-renderers/Image';
import Link from './md-renderers/Link';

const markdownRenderers = {
  heading: Heading,
  code: Code,
  image: Image,
  link: Link,
};

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: undefined,
      doRedirect: false,
    };
  }

  getMarkdown() {
    if (!this.state.blog) {
      if (this.state.doRedirect) {
        return <Redirect to='/404'/>;
      } else {
        return (
          <div>
            <p>Loading...</p>
          </div>
        );
      }
    } else {
      return (
        <article>
          <header>
            <h1 className='Blog-title'>{this.state.blog.title}</h1>
          </header>
          <section>
            <p className='Blog-date'>
              {this.state.blog.date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </section>
          <section>
            <ReactMarkdown source={this.state.blog.text} renderers={markdownRenderers}/>
          </section>
        </article>
      );
    }
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

  async componentDidUpdate(prevProps) {
    // the type definitions for react-router-dom are really bad in this case
    // so we cannot use TypeScript. I don't want to add another dependency
    // to prop-types for just one file. Better to disable these warnings as
    // only withRouter(Blog) is exported

    // do not render the blog twice on the first load
    // eslint-disable-next-line react/prop-types
    if (prevProps.match.params.path !== this.props.match.params.path) {
      return this.updateBlog();
    } else {
      return Promise.resolve();
    }
  }

  async componentDidMount() {
    return this.updateBlog();
  }

  /**
   * Updates the rendered blog. Use when the component state or props change.
   * @return {Promise<void>}
   */
  async updateBlog() {
    const blogs = await Blogs.getBlogs(false);
    // eslint-disable-next-line react/prop-types
    const params = this.props.match.params;
    for (const blog of blogs) {
      // eslint-disable-next-line react/prop-types
      if (blog.path === `${params.year}/${params.path}`) {
        blog.text = await (await fetch(blog.url)).text();
        this.setState({ blog: blog, doRedirect: false });
        return;
      }
    }
    this.setState({ blog: undefined, doRedirect: true });
  }
}

export default withRouter(Blog);
