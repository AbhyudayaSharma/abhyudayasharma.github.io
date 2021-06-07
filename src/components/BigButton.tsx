import React from 'react';

import { Link } from 'gatsby';
import { btn } from '../scss/BigButton.module.scss';

interface Props {
  url: string;
  text: string;
}

export const BigButton: React.FC<Props> = (props) => {
  if (!props.url.startsWith('/')) {
    return (
      <a href={props.url} className={btn}>
        {props.text}
      </a>);
  } else {
    return (
      <Link to={props.url} className={btn}>
        {props.text}
      </Link>);
  }
};
