import { makeStyles } from '@material-ui/core';

import SimpleBar from '@/components/ui/SimpleBar';
import Profile from '@/components/ui/profile';

const useStyles = makeStyles(() => ({
  profile: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function PDOGS1() {
  const classes = useStyles();

  return (
    <>
      <SimpleBar title="System" noIndent>
        <Profile
          img_url="../../../images/doge.png"
          name="李孟修 flf2ko"
          description=""
          FB_link={null}
          Github_link={null}
          Linkedin_link={null}
        />
      </SimpleBar>
      <SimpleBar title="Image" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/doge.png"
            name="孫羽君 illeanore"
            description=""
            FB_link={null}
            Github_link={null}
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/doge.png"
            name="洪蕾曜 yaohappy"
            description=""
            FB_link={null}
            Github_link={null}
            Linkedin_link={null}
          />
        </div>
      </SimpleBar>
    </>
  );
}
