import React from 'react';

import { Link } from 'gatsby';
import { Blog } from '../common/Blog';
import { feedUrl } from '../../lib/createFeed';
import { DateComponent } from '../utils/utils-react';

import {
  content,
  date,
  description,
  entry,
  header as headerClass,
  tag as tagClass,
  tagContainer,
  title,
  feedIcon,
  feedIconLink,
} from '../scss/BlogList.module.scss';

export interface BlogListHeaderProps {
  value: string;
}

export interface BlogListProps {
  header?: string;
  publicOnly: boolean;
  blogs: Array<Blog>;
}

export const BlogListEntry: React.FC<Blog> = (props) => {
  const { frontmatter, url } = props;
  return (
    <div className={entry}>
      <div className={content}>
        <Link to={url} className={title}>
          {frontmatter.title}
        </Link>
        <div className={date}>
          <span role='img' aria-label='date'>📅</span>&nbsp;
          <DateComponent date={frontmatter.date}/>
        </div>
        <div className={tagContainer}>
          {frontmatter.tags.sort().map((tag, index) => <div className={tagClass} key={index}>{tag}</div>)}
        </div>
        <p className={description}>
          {frontmatter.description}
        </p>
      </div>
    </div>
  );
};

export const BlogListHeader: React.FC<BlogListHeaderProps> = ({ value }) => {
  return (
    <div className={entry}>
      <div className={headerClass}>
        <h1>
          {value}
        </h1>
        <a href={feedUrl.pathname} className={feedIconLink} draggable={false}>
          <img src='/feed-icon.svg' alt='Feed icon' className={feedIcon} draggable={false} />
        </a>
      </div>
    </div>
  );
};

export const BlogList: React.FC<BlogListProps> = ({ header, blogs, publicOnly }) => {
  const displayable = publicOnly ? blogs.filter(blog => blog.frontmatter.isPublic) : blogs;

  return (
    <>
      {header && <BlogListHeader value={header} />}
      {displayable.map(
        (blog, index) => <BlogListEntry {...blog} key={index} />
      )}
    </>
  );
};
