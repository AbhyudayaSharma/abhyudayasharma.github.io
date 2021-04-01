import React from 'react';
import { PageProps } from 'gatsby';
import { isString, isNumber, isObject } from 'lodash';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { wrapContainer } from '../scss/utils.module.scss';

/**
 * Wraps a top-level component between the header and the footer.
 */
export const wrapContent = (props: PageProps, element: JSX.Element | JSX.Element[], divClassName: string | undefined = undefined): JSX.Element => {
  return (
    <div className={wrapContainer}>
      <Header {...props}>
        {undefined}
      </Header>
      <div className={divClassName}>
        {element}
      </div>
      <Footer />
    </div>
  );
};

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

/**
 * Converts a @link Date} to a string of date format `YYYY-MM-dd`.
 * @param date date to convert to string
 * @return date string of the format `YYYY-MM-dd`
 */
const toYyyyMmDd = (date: Date): string => {
  if (isNaN(date.getDate())) {
    throw new Error(`Invalid date: ${date}`);
  }

  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString(); // months are 0-indexed (January is 0)
  const year = date.getFullYear().toString();
  day = day.length === 1 ? `0${day}` : day;
  month = month.length === 1 ? `0${month}` : month;
  return `${year}-${month}-${day}`;
};

export const DateComponent: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <time dateTime={toYyyyMmDd(date)}>
      {date.toLocaleDateString('en-us', dateOptions)}
    </time>
  );
};

export function innerText(children: React.ReactNode | undefined | null): string {
  if (!children) {
    return '';
  }

  if (Array.isArray(children)) {
    return children.map(innerText).reduce((prev, current) => prev + current, '');
  }

  if (isString(children) || isNumber(children)) {
    return children.toString();
  }

  if (isObject(children)) {
    return innerText((children as React.ReactElement).props?.children);
  }

  throw new Error(`Unsupported children type: ${typeof children}; Children = ${children}`);
}
