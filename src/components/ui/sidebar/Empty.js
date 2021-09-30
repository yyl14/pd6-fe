import React from 'react';

import { Drawer } from '@material-ui/core';

export default function Empty({ classNames, open }) {
  return (
    <div>
      <Drawer
        open={false}
        // className={classNames.drawer}
        // variant="permanent"
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classNames.drawerPaper }}
      />
    </div>
  );
}
