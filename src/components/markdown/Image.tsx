import React from 'react';

interface ImageProps {
  alt?: string;
  src: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <a href={props.src}>
      <img src={props.src} alt={props.alt} className='md-img'/>
    </a>
  );
};
