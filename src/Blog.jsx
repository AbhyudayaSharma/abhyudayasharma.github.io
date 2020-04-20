/* eslint-disable @typescript-eslint/explicit-function-return-type */
// This is a JavaScript file, not TypeScript
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
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

import packageJson from '../package.json';

const markdownRenderers = {
  heading: Heading,
  code: Code,
  image: Image,
  link: Link,
};

const BlogState = {
  LOADING: 1,
  READY: 2,
  NOT_FOUND: 3,
  FETCH_ERROR: 4,
};

class Blog extends Component {
  static LOADING_TEXT = 'Loading…';
  static BLOG_FETCH_RETRY_COUNT = 3;

  constructor(props) {
    super(props);
    this.state = {
      blogState: BlogState.LOADING,
      blog: undefined,
    };
  }

  getMarkdown() {
    // this function should NOT modify the state of the component
    if (this.state.blogState === BlogState.LOADING) {
      return (<p>{Blog.LOADING_TEXT}</p>);
    } else if (this.state.blogState === BlogState.NOT_FOUND) {
      return <Redirect to='/404'/>;
    } else if (this.state.blogState === BlogState.READY) {
      return (
        <article>
          <Helmet>
            <title>{`${this.state.blog.title} - ${packageJson.author.name}'s blog`}</title>
          </Helmet>
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
    } else if (this.state.blogState === BlogState.FETCH_ERROR) {
      return (<p>Unable to load the blog. Please check your internet connection and refresh the page.</p>);
    } else {
      throw Error(`Invalid BlogState = ${this.state.blogState}.\n
        Valid states = ${JSON.stringify(BlogState, null, 2)}`);
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
    let blogFound = false;
    for (const blog of blogs) {
      // eslint-disable-next-line react/prop-types
      if (blog.path === `${params.year}/${params.path}`) {
        let tryCount = 0;
        blogFound = true;
        while (!this.state.blog && tryCount < Blog.BLOG_FETCH_RETRY_COUNT) {
          try {
            tryCount++;
            blog.text = await (await fetch(blog.url)).text();
            this.setState({ blog: blog, blogState: BlogState.READY });
            return;
          } catch (e) {
            console.error({
              error: e,
              tryCount: tryCount,
              maxTryCount: Blog.BLOG_FETCH_RETRY_COUNT,
              message: 'Error while fetching blog',
            });
          }
        }
        break;
      }
    }

    if (!blogFound) {
      this.setState({ blog: undefined, blogState: BlogState.NOT_FOUND });
    } else {
      // blog was found but we couldn't set the state, so there should've been some network error.
      this.setState({ blog: undefined, blogState: BlogState.FETCH_ERROR });
    }
  }
}

export default withRouter(Blog);
