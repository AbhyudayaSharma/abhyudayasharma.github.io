import React, { FunctionComponent } from 'react';

import '../scss/renderers.scss';

interface ImageProps {
  alt?: string;
  src: string;
}

const Image: FunctionComponent<ImageProps> = (props: ImageProps) => {
  return (
    <a href={props.src}>
      <img src={props.src} alt={props.alt} className='md-img'/>
    </a>
  );
};

export default Image;
