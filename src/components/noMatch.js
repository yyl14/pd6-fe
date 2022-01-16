import React from 'react';
import Icon from './ui/icon';

function NoMatch() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 'calc(100vh - 195px)',
      }}
    >
      <Icon.Logo fill="#000" stroke="#000" style={{ width: '18vw' }} />
      <h1 style={{ width: 'fit-content' }}>
        404 not found.
        <br />
        Wow, much emptiness.
      </h1>
    </div>
  );
}

export default NoMatch;
