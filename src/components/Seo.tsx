import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';

import packageJson from '../../package.json';

type SeoProps = Readonly<{
  metaDescription: string;
  title: string;
  image: URL;
  pageType: 'website' | 'article';
  isCanonical: boolean;
  url?: URL;
}>;

interface PartialSeoProps extends Partial<SeoProps> {
  readonly url: URL;
}

const defaultTitle = `${packageJson.author.name}'s Personal Website and Blog`;
const maxTitleLength = 60; // https://moz.com/learn/seo/title-tag
const maxDescriptionLength = 160; // https://moz.com/learn/seo/meta-description

const defaultProps: SeoProps = {
  metaDescription: defaultTitle,
  title: defaultTitle,
  image: new URL('/logo512.png', packageJson.homepage),
  pageType: 'website',
  isCanonical: true,
};

export const Seo: React.FC<PartialSeoProps> = (partialProps) => {
  const props: Required<SeoProps> = {
    title: _.truncate(
      partialProps.title ?? defaultProps.title,
      { length: maxTitleLength, omission: '…' }
    ),
    metaDescription: _.truncate(
      partialProps.metaDescription ?? defaultProps.metaDescription,
      { length: maxDescriptionLength, omission: '…' }
    ),
    pageType: partialProps.pageType ?? defaultProps.pageType,
    image: partialProps.image ?? defaultProps.image,
    url: partialProps.url,
    isCanonical: partialProps.isCanonical ?? defaultProps.isCanonical,
  };

  let meta: JSX.IntrinsicElements['meta'][] = [
    {
      name: 'description',
      content: props.metaDescription,
    },
    // Open graph protocol: https://ogp.me/
    {
      name: 'og:title',
      content: props.title,
    },
    {
      name: 'og:type',
      content: props.pageType,
    },
    {
      name: 'og:image',
      content: props.image.href,
    },
    {
      name: 'og:url',
      content: props.url.href,
    },
    {
      name: 'og:description',
      content: props.metaDescription,
    },
    // Twitter cards: https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:description',
      content: props.metaDescription,
    },
    {
      name: 'twitter:title',
      content: props.title,
    },
  ];

  const nameSplit = packageJson.author.name.split(/\s+/);
  if (props.pageType === 'article') {
    meta = meta.concat([
      {
        name: 'og:author:first_name',
        content: nameSplit[0],
      },
      {
        name: 'og:author:last_name',
        content: nameSplit[1],
      },
    ]);
  }

  return (
    <Helmet
      link={props.isCanonical
        ? [{
            rel: 'canonical',
            href: props.url.href,
          }]
        : undefined}
      meta={meta}
      defer={false}
      title={props.title}
      htmlAttributes={{ lang: 'en' }}
    />
  );
};
