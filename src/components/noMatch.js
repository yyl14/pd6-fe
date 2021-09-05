import React from 'react';
import placeholderImg from './ui/icon/doge.png';

function NoMatch() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '15vh',
        left: '20vw',
        textAlign: 'center',
      }}
    >
      <img src={placeholderImg} style={{ width: '18vw' }} alt="404dog" />
      <h1>404 Not Found... 💩</h1>
    </div>
  );
}

export default NoMatch;
