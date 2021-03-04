import React from 'react';
import { Link } from 'gatsby';
import { BlogFrontmatter } from '../common/BlogFrontmatter';
import { formatDate, validateBlogFrontmatter } from '../utils/utils-common';

import * as styles from '../scss/BlogList.module.scss';

export interface BlogListHeaderProps {
  value: string;
}

export interface BlogListProps {
  header?: string;
  publicOnly: boolean;
  blogs: Array<Partial<BlogFrontmatter>>;
}

export const BlogListEntry: React.FC<BlogFrontmatter> = (props) => {
  return (
    <div className={styles.entry}>
      <div className={styles.content}>
        <Link to={props.url} className={styles.title}>
          {props.title}
        </Link>
        <div className={styles.date}>
          <span role='img' aria-label='date'>📅</span>&nbsp;
          <time>
            {formatDate(props.date)}
          </time>
        </div>
        <div className={styles.tagContainer}>
          {props.tags.map((tag, index) => <div className={styles.tag} key={index}>{tag}</div>)}
        </div>
        <p className={styles.description}>
          {props.description}
        </p>
      </div>
    </div>
  );
};

export const BlogListHeader: React.FC<BlogListHeaderProps> = ({ value }) => {
  return (
    <div className={styles.header}>
      <h1>
        {value}
      </h1>
    </div>
  );
};

export const BlogList: React.FC<BlogListProps> = ({ header, blogs, publicOnly }) => {
  const validated = blogs.map(frontmatter => validateBlogFrontmatter(frontmatter));
  const displayable = publicOnly ? validated.filter(frontmatter => frontmatter.isPublic) : validated;

  return (
    <>
      {header && <BlogListHeader value={header}/>}
      {displayable.map(
        (frontmatter, index) => <BlogListEntry {...frontmatter} key={index} />
      )}
    </>
  );
};
