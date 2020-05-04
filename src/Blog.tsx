import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import Blogs, { BlogMetadata } from './blog/Blogs';

import 'katex/dist/katex.min.css';
import './scss/Blog.scss';

import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Heading from './md-renderers/Heading';
import Code from './md-renderers/Code';
import Image from './md-renderers/Image';
import Link from './md-renderers/Link';
import { BlockMath, InlineMath } from './md-renderers/Math';

import { author } from '../package.json';

const markdownRenderers = {
  heading: Heading,
  code: Code,
  image: Image,
  link: Link,
  math: BlockMath,
  inlineMath: InlineMath,
};

const markdownPlugins = [
  require('remark-math'),
];

enum BlogContentState {
  LOADING,
  READY,
  NOT_FOUND,
  FETCH_ERROR,
}

interface BlogParamProps {
  readonly year: string;
  readonly path: string;
}

interface BlogData extends BlogMetadata {
  text?: string;
}

export type BlogProps = RouteComponentProps<BlogParamProps>;

export interface BlogState {
  contentState: BlogContentState;
  blog?: BlogData;
}

class Blog extends Component<BlogProps, BlogState> {
  private static readonly LOADING_TEXT = 'Loading…';
  private static readonly BLOG_FETCH_RETRY_COUNT = 3;

  constructor(props: BlogProps) {
    super(props);
    this.state = {
      contentState: BlogContentState.LOADING,
      blog: undefined,
    };
  }

  /**
   * Returns the content of the blog.
   */
  private getBlogContent(): JSX.Element {
    // this function should NOT modify the state of the component
    if (this.state.contentState === BlogContentState.LOADING) {
      return (<p>{Blog.LOADING_TEXT}</p>);
    } else if (this.state.contentState === BlogContentState.NOT_FOUND) {
      return <Redirect to='/404'/>;
    } else if (this.state.contentState === BlogContentState.READY) {
      return (
        <article>
          <Helmet>
            <title>{`${this.state.blog?.title} - ${author.name}'s blog`}</title>
          </Helmet>
          <header>
            <h1 className='Blog-title'>{this.state.blog?.title}</h1>
          </header>
          <section>
            <p className='Blog-date'>
              {this.state.blog?.date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </section>
          <section>
            <ReactMarkdown source={this.state.blog?.text} renderers={markdownRenderers}
              plugins={markdownPlugins}/>
          </section>
        </article>
      );
    } else if (this.state.contentState === BlogContentState.FETCH_ERROR) {
      return (<p>Unable to load the blog. Please check your internet connection and refresh the page.</p>);
    } else {
      throw Error(`Invalid BlogState = ${this.state.contentState}.\n
        Valid states = ${JSON.stringify(BlogContentState, null, 2)}`);
    }
  }

  render(): JSX.Element {
    return (
      <div className='Blog'>
        <Header/>
        <div className='Blog-text'>
          {this.getBlogContent()}
        </div>
        <Footer/>
      </div>
    );
  }

  async componentDidUpdate(prevProps: BlogProps): Promise<void> {
    // do not render the blog twice on the first load
    if (prevProps.match.params.path !== this.props.match.params.path) {
      return this.updateBlog();
    } else {
      return Promise.resolve();
    }
  }

  async componentDidMount(): Promise<void> {
    return this.updateBlog();
  }

  /**
   * Updates the rendered blog. Use when the component state or props change.
   */
  private async updateBlog(): Promise<void> {
    const blogs = (await Blogs.getBlogs(false)) as BlogData[];
    const params = this.props.match.params;
    const path = `${params.year}/${params.path}`;
    let blogFound = false;
    for (const blog of blogs) {
      if (blog.path === path) {
        let tryCount = 0;
        blogFound = true;
        while (!this.state.blog && tryCount < Blog.BLOG_FETCH_RETRY_COUNT) {
          try {
            tryCount++;
            blog.text = await (await fetch(blog.url)).text();
            this.setState({ blog: blog, contentState: BlogContentState.READY });
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
      this.setState({ blog: undefined, contentState: BlogContentState.NOT_FOUND });
    } else {
      // blog was found but we couldn't set the state, so there should've been some network error.
      this.setState({ blog: undefined, contentState: BlogContentState.FETCH_ERROR });
    }
  }
}

export default withRouter(Blog);
