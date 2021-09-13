import React from 'react';
import { Button } from '@material-ui/core';

function About() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '15vh',
        left: '20vw',
        textAlign: 'center',
      }}
    >
      <h1>About</h1>
      <Button color="primary">PDOGS 6</Button>
      <Button color="primary">PDOGS 4S</Button>
      <Button color="primary">PDOGS 4.0</Button>
      <Button color="primary">PDOGS 1.0 &amp; 2.0</Button>
    </div>
  );
}

export default About;
