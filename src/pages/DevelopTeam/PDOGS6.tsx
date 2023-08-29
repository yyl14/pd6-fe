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

export default function PDOGS6() {
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
          <Profile
            img_url="../../../images/wpbag.jpg"
            name="巫芊瑩 wpbag"
            description="Design"
            FB_link="https://www.facebook.com/wpbag/"
            Github_link="https://github.com/yin1218"
            Linkedin_link="http://www.linkedin.com/in/wpbag"
          />
          <Profile
            img_url="../../../images/DerekLu.jpg"
            name="盧德原 Derek Lu"
            description="Design"
            FB_link="https://www.facebook.com/derekdylu"
            Github_link="https://derekdylu.github.io/"
            Linkedin_link="https://www.linkedin.com/in/derekdylu"
          />
        </div>
      </SimpleBar>
      <SimpleBar title="Frontend" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/timicienio.jpg"
            name="陳以潼 timicienio"
            description="FE"
            FB_link="https://www.facebook.com/profile.php?id=100005076990283"
            Github_link="https://github.com/timicienio"
            Linkedin_link="http://www.linkedin.com/in/tmcn"
          />
          <Profile
            img_url="../../../images/GaryHu.jpg"
            name="胡家愷 Gary1030"
            description="FE"
            FB_link={null}
            Github_link="https://github.com/gary1030"
            Linkedin_link="http://www.linkedin.com/in/gary-hu-2000"
          />
          <Profile
            img_url="../../../images/HuangFu.jpg"
            name="皇甫立翔 HuangFu"
            description="FE"
            FB_link="https://www.facebook.com/Peter.HaungFu/"
            Github_link="https://github.com/peterhuangfu"
            Linkedin_link="https://www.linkedin.com/in/li-hsiang-huang-fu-0b1825184/"
          />
          <Profile
            img_url="../../../images/Ray.jpg"
            name="李旻叡 Ray"
            description="FE"
            FB_link="https://www.facebook.com/profile.php?id=100003519372915"
            Github_link="https://github.com/raymanlee89"
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/pochunwu.jpg"
            name="吳泊諄 Po-Chun Wu"
            description="FE"
            FB_link="https://www.facebook.com/profile.php?id=100027240108806"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/pochunwu2000/"
          />
          <Profile
            img_url="../../../images/erica.jpg"
            name="鄭安芸 erica"
            description="FE"
            FB_link="https://www.facebook.com/profile.php?id=100006123196027"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/an-yun-cheng"
          />
          <Profile
            img_url="../../../images/DaphneHou.JPG"
            name="侯維書 Daphne Hou"
            description="FE"
            FB_link="https://www.facebook.com/daphne.hou.9/"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/daphne-hou-2016ab220/"
          />
          <Profile
            img_url="../../../images/amberliu.JPG"
            name="劉亞絜 amberliu"
            description="FE"
            FB_link="https://www.facebook.com/profile.php?id=100006116703389"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/amber-liu-2b05651a2/"
          />
          <Profile
            img_url="../../../images/wilson.jpg"
            name="徐懷山 wilson"
            description="FE"
            FB_link="https://www.facebook.com/Hsu.Wilson0915/"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/wilson-hsu-4976b31b7/"
          />
          <Profile
            img_url="../../../images/Duge.jpg"
            name="盧慶原 Duge"
            description="FE"
            FB_link="https://www.facebook.com/DuckChingYuan"
            Github_link="https://github.com/duge03705022"
            Linkedin_link={null}
          />
        </div>
      </SimpleBar>
      <SimpleBar title="Backend" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/chessy.png"
            name="徐嘉琪 Chessy"
            description="Webserver"
            FB_link="https://www.facebook.com/profile.php?id=100001355608650"
            Github_link={null}
            Linkedin_link="http://linkedin.com/in/chessyhsu"
          />
          <Profile
            img_url="../../../images/sheeeeeeeep.JPG"
            name="鄭揚 Sheeeeeeeep"
            description="Webserver, Migration"
            FB_link="https://www.facebook.com/sheep1129588/"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/yangcheng1229/"
          />
          <Profile
            img_url="../../../images/pollyho.jpg"
            name="何品諭 pollyho"
            description="Webserver"
            FB_link="https://www.facebook.com/profile.php?id=100005192733634"
            Github_link={null}
            Linkedin_link="http://www.linkedin.com/in/pinyuho"
          />
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
