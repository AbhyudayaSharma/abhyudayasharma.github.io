import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';
import { author, homepage } from '../../package.json';

type SeoProps = Readonly<{
  metaDescription: string;
  title: string;
  image: URL;
  pageType: 'website' | 'article';
  url?: URL;
}>

interface PartialSeoProps extends Partial<SeoProps> {
  readonly url: URL;
}

const defaultTitle = `${author.name}'s Personal Website and Blog`;
const maxTitleLength = 60; // https://moz.com/learn/seo/title-tag
const maxDescriptionLength = 160; // https://moz.com/learn/seo/meta-description

const defaultProps: SeoProps = {
  metaDescription: defaultTitle,
  title: defaultTitle,
  image: new URL('/logo512.png', homepage),
  pageType: 'website',
};

export const Seo: React.FC<PartialSeoProps> = (partialProps) => {
  const props: Required<SeoProps> = {
    title: _.truncate(
      partialProps.title || defaultProps.title,
      { length: maxTitleLength, omission: '…' }
    ),
    metaDescription: _.truncate(
      partialProps.metaDescription || defaultProps.metaDescription,
      { length: maxDescriptionLength, omission: '…' }
    ),
    pageType: partialProps.pageType || defaultProps.pageType,
    image: partialProps.image || defaultProps.image,
    url: partialProps.url,
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
  ];

  const nameSplit = author.name.split(/\s+/);
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
      link={[
        {
          rel: 'canonical',
          href: props.url.href,
        },
      ]}
      meta={meta}
      defer={false}
      title={props.title}
      htmlAttributes={{ lang: 'en' }}
    />
  );
};