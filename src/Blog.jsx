import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Blogs from './blog/Blogs';

import './scss/Blog.scss';
import { Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class Blog extends Component {
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
    // const path = this.props.match.params.path;
    // if (!this.props.path) {
    //   return <Redirect to='/404'/>;
    // }

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

  componentDidMount() {
    (async () => {
      const blogs = await Blogs.getBlogs();
      for (const blog of blogs) {
        if (blog.path === this.props.match.params.path) {
          const data = await (await fetch(blog.url)).text();
          console.log(data);
          this.setState({ text: data });
          return;
        }
      }
      this.setState({ text: null });
    })();
  }
}
