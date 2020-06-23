import React, { Component, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import Blogs, { BlogMetadata } from './blog/Blogs';

import 'katex/dist/katex.min.css';
import './scss/Blog.scss';

import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Heading from './md-renderers/Heading';
import Code from './md-renderers/Code';
import InlineCode from './md-renderers/InlineCode';
import Image from './md-renderers/Image';
import Link from './md-renderers/Link';
import { BlockMath, InlineMath } from './md-renderers/Math';

import { author } from '../package.json';
import Blockquote from './md-renderers/Blockquote';
import ThematicBreak from './md-renderers/ThematicBreak';

const markdownRenderers = {
  heading: Heading,
  code: Code,
  image: Image,
  link: Link,
  math: BlockMath,
  inlineMath: InlineMath,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  thematicBreak: ThematicBreak,
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

  constructor(props: BlogProps) {
    super(props);
    this.state = {
      contentState: BlogContentState.LOADING,
      blog: undefined,
    };
  }

  private generateBlogFromMarkdown(): ReactNode {
    if (!this.state.blog) {
      throw new Error('Blog unset when trying to render it.');
    }

    return (
      <article>
        <Helmet>
          <title>{`${this.state.blog.title} - ${author.name}'s blog`}</title>
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
        <section role='document'>
          <ReactMarkdown source={this.state.blog.text} renderers={markdownRenderers} plugins={markdownPlugins}/>
        </section>
      </article>
    );
  }

  /**
   * Returns the content of the blog.
   */
  private getBlogContent(): ReactNode {
    // this function should NOT modify the state of the component
    switch (this.state.contentState) {
      case BlogContentState.LOADING:
        return (<p>{Blog.LOADING_TEXT}</p>);
      case BlogContentState.NOT_FOUND:
        return <Redirect to='/404'/>;
      case BlogContentState.FETCH_ERROR:
        return (<p>Unable to load the blog. Please check your internet connection and refresh the page.</p>);
      case BlogContentState.READY:
        return this.generateBlogFromMarkdown();
      default:
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
    const blogs = await Blogs.getBlogs(false) as BlogData[];
    const params = this.props.match.params;
    const path = `${params.year}/${params.path}`;
    const blog = blogs.find(blog => blog.path === path);

    if (!blog) {
      this.setState({ contentState: BlogContentState.NOT_FOUND });
      return;
    }

    try {
      const response = await fetch(blog.url);
      if (!response.ok) {
        console.error({ message: 'Fetching blog failed', response });
        this.setState({ contentState: BlogContentState.FETCH_ERROR });
      }
      blog.text = await response.text();
      this.setState({ blog: blog, contentState: BlogContentState.READY });
    } catch (e) {
      console.error({ message: 'Fetching blog failed', error: e });
      this.setState({ contentState: BlogContentState.FETCH_ERROR });
    }
  }
}

export default withRouter(Blog);
