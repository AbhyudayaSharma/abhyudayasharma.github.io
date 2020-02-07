import React, { FunctionComponent } from 'react';

const aboutMe: FunctionComponent<{}> = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <span role='img' aria-label='under construction' style={{ fontSize: '8rem', textAlign: 'center', width: '100%' }}>
        🚧
      </span>
      <p style={{ fontSize: '6rem', color: 'white' }}>
        This page is under construction
      </p>
    </div>
  );
};

export default aboutMe;
