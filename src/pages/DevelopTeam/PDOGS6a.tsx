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

export default function PDOGS6a() {
  const classes = useStyles();

  return (
    <>
      <SimpleBar title="PM" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/Kiyume.jpg"
            name="鄭允頎 Kiyume"
            description="PM, Webserver, Judge Core, Migration, DevOps"
            FB_link="http://fb.com/e9cf87fc"
            Github_link={null}
            Linkedin_link="http://www.linkedin.com/in/yunchi-cheng"
          />
        </div>
      </SimpleBar>
      <SimpleBar title="Design" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/wendee.png"
            name="徐遠志 wendee"
            description="Design, FE"
            FB_link="https://www.facebook.com/wendeezinha"
            Github_link="https://github.com/wendeehsu"
            Linkedin_link="https://www.linkedin.com/in/yuan-chih-hsu/"
          />
        </div>
      </SimpleBar>
      <SimpleBar title="Frontend" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/GaryHu.jpg"
            name="胡家愷 Gary1030"
            description="FE"
            FB_link={null}
            Github_link="https://github.com/gary1030"
            Linkedin_link="http://www.linkedin.com/in/gary-hu-2000"
          />
          <Profile
            img_url="../../../images/timicienio.jpg"
            name="陳以潼 timicienio"
            description="FE"
            FB_link="https://www.facebook.com/profile.php?id=100005076990283"
            Github_link="https://github.com/timicienio"
            Linkedin_link="http://www.linkedin.com/in/tmcn"
          />
        </div>
      </SimpleBar>
      <SimpleBar title="Backend" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/wsa.JPG"
            name="王紹安 wsa"
            description="Webserver"
            FB_link="https://www.facebook.com/profile.php?id=100008141530919"
            Github_link="http://github.com/wsa-2002"
            Linkedin_link="http://linkedin.com/in/benson-wang-a01ba91bb"
          />
        </div>
      </SimpleBar>
      <SimpleBar title="DevOps" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/fredred.jpg"
            name="祝浩文 fredred"
            description="DevOps"
            FB_link="https://www.facebook.com/fredred375"
            Github_link="https://github.com/fredred375"
            Linkedin_link="https://www.linkedin.com/in/fredred/"
          />
          <Profile
            img_url="../../../images/jtc.JPG"
            name="陳杰彤 jtc"
            description="DevOps, Judge Core"
            FB_link="https://www.facebook.com/jtongchenzip/"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/jtongchen/"
          />
        </div>
      </SimpleBar>
    </>
  );
}
