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
    if (prevProps.match.params.path !== this.props.match.params.path) {
      this.updateBlog();
    }
  }

  componentDidMount() {
    this.updateBlog();
  }

  async updateBlog() {
    const blogs = await Blogs.getBlogs();
    for (const blog of blogs) {
      if (blog.path === this.props.match.params.path) {
        const data = await (await fetch(blog.url)).text();
        this.setState({ text: data });
        console.log('Blog updated');
        return;
      }
    }
    this.setState({ text: null });
  }
}

export default withRouter(Blog);
