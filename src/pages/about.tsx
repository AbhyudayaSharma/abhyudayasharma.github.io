import React, { Component, ReactNode } from 'react';
import { PageProps } from 'gatsby';

import { Seo } from '../components/Seo';
import { wrapContent } from '../utils/utils-react';
import { getPageUrl } from '../utils/utils-common';

import { container, ciphertext, noJs } from '../scss/about.module.scss';
import packageJson from '../../package.json';

import { ProtectedEmail } from '../components/ProtectedEmail';

class EmailFallback extends Component {
  render(): ReactNode {
    return '[email protected]';
  }
}

const AboutRoute: React.FC<PageProps> = (props) => {
  const hint = 'base64 -d | tr \'A-Za-z\' \'N-ZA-Mn-za-m\'';
  return wrapContent(props,
    <>
      <Seo title={`About Me - ${packageJson.author.name}`} url={getPageUrl(props)} />
      <p>
        Hi there! I&#39;m Abhyudaya, a Computer Science Masters student at Brown University.
        I enjoy programming in C, Java, Python, and TypeScript. I previously worked as a software engineer at Dell. I was also
        a Google Summer of Code student in 2019 with the Jenkins project and worked on improving the performance of the Role Strategy
        Plugin. Most software I write is open-source and is available on <a href='https://github.com/AbhyudayaSharma'>GitHub</a>.
      </p>
      <p style={{ marginBottom: '0.5rem' }}>
        If you would like to contact me, please feel free to send me an email at:
      </p>
      {<ProtectedEmail fallback={<EmailFallback />} />}
      <noscript>
        <div className={noJs}>
          <p>
            It appears that JavaScript is disabled in your browser. I hide my email address using JavaScript to
            prevent spam from bots that may crawl this website. You can either enable JavaScript or recover it from
            this text:
          </p>
          <pre className={ciphertext}>
            <code>
              SnJ5eSBxYmFyLCBsYmggcGVucHhycSBndXIgcHZjdXJlISBVcmVyIHZmIHpsIHJ6bnZ5OiBmdW5lem5ub3VsaHFubG5AdHpudnkucGJ6LiBBYmogZ3VuZyBsYmggeGFiaiB6bCByem52eSwgcHVycHggYmhnIGd1dmYgamJhcXJlc2h5IGl2cXJiOiB1Z2djZjovL2pqai5sYmhnaG9yLnBiei9qbmdwdT9pPXRZenBUeGlXLXIwCg==
            </code>
          </pre>
          <p>
            The plaintext was first encrypted using <a href='https://en.wikipedia.org/wiki/ROT13'>ROT13</a> and
            then converted to <a href='https://en.wikipedia.org/wiki/Base64'>Base64</a>.<br />
            Hint: <code>{hint}</code>
          </p>
        </div>
      </noscript>
    </>, container
  );
};

export default AboutRoute;
