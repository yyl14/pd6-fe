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
      <SimpleBar title="PM & Team Lead" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/Kiyume.jpg"
            name="鄭允頎 Kiyume"
            description="PM"
            FB_link="http://fb.com/e9cf87fc"
            Github_link={null}
            Linkedin_link="http://www.linkedin.com/in/yunchi-cheng"
          />
          <Profile
            img_url="../../../images/wsa.JPG"
            name="王紹安 wsa"
            description="BE"
            FB_link="https://www.facebook.com/profile.php?id=100008141530919"
            Github_link="http://github.com/wsa-2002"
            Linkedin_link="http://linkedin.com/in/benson-wang-a01ba91bb"
          />
          <Profile
            img_url="../../../images/GaryHu.jpg"
            name="胡家愷 Gary Hu"
            description="FE"
            FB_link="https://www.facebook.com/gary.hu.5680"
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
            description="DevOps"
            FB_link="https://www.facebook.com/jtongchenzip/"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/jtongchen/"
          />
          <Profile
            img_url="../../../images/pupss95315.jpg"
            name="徐芊綺 pupss95315"
            description="Design"
            FB_link="https://www.facebook.com/profile.php?id=100000937182479"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/%E8%8A%8A%E7%B6%BA-%E5%BE%90-b1b417200/"
          />
        </div>
      </SimpleBar>
      <SimpleBar title="Frontend" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/donkey.jpg"
            name="李昀宸 Donkey"
            description="FE"
            FB_link="https://www.facebook.com/profile.php?id=100003185348130"
            Github_link="https://github.com/Donkey0322"
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/miachou.jpg"
            name="周昀蓉 Mia Chou"
            description="FE"
            FB_link="https://www.facebook.com/profile.php?id=100019019568778"
            Github_link={null}
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/claire.jpg"
            name="林芷妤 Claire"
            description="FE"
            FB_link={null}
            Github_link={null}
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/jerrymk.png"
            name="盧沛宏 jerrymk"
            description="FE"
            FB_link={null}
            Github_link="https://github.com/jrymk"
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/wayne.jpeg"
            name="楊東韋 Wayne"
            description="FE"
            FB_link="https://www.facebook.com/wayne.yang.50309?mibextid=LQQJ4d"
            Github_link={null}
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/sophieku.jpeg"
            name="古昭璿 Sophie Ku"
            description="FE, Design"
            FB_link="https://www.facebook.com/profile.php?id=100006727273723&mibextid=LQQJ4d"
            Github_link={null}
            Linkedin_link={null}
          />
        </div>
      </SimpleBar>
      <SimpleBar title="Backend" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/lyc.jpg"
            name="賴羿蓁 lyc"
            description="BE"
            FB_link={null}
            Github_link={null}
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/johnny.jpg"
            name="吳政霖 Johnny"
            description="BE"
            FB_link="https://www.facebook.com/johnny.wu.71216"
            Github_link={null}
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/waynechang.jpg"
            name="詹文淵 Wayne"
            description="BE"
            FB_link="https://www.facebook.com/profile.php?id=100005546977889"
            Github_link={null}
            Linkedin_link={null}
          />
        </div>
      </SimpleBar>
      <SimpleBar title="Design" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/joannachen.jpg"
            name="陳巧蓉 Joanna Chen"
            description="Design"
            FB_link="https://www.facebook.com/profile.php?id=100009621255256"
            Github_link={null}
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/jensenyang.jpg"
            name="楊景丞 Jensen Yang"
            description="Design"
            FB_link="https://www.facebook.com/jensen.yang.102"
            Github_link="https://github.com/jensenyang2004"
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/sophieku.jpeg"
            name="古昭璿 Sophie Ku"
            description="FE, Design"
            FB_link="https://www.facebook.com/profile.php?id=100006727273723&mibextid=LQQJ4d"
            Github_link={null}
            Linkedin_link={null}
          />
        </div>
      </SimpleBar>
      <SimpleBar title="DevOps" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/ansonwang.jpg"
            name="王裕勳 Anson Wang"
            description="DevOps"
            FB_link={null}
            Github_link="https://github.com/ansonWang0125"
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/maxyhwu.jpeg"
            name="吳宇璇 maxyhwu"
            description="DevOps"
            FB_link="https://www.facebook.com/maxyhwu/"
            Github_link="https://github.com/maxyhwu"
            Linkedin_link="https://www.linkedin.com/in/maxyhwu/"
          />
          <Profile
            img_url="../../../images/yym.jpg"
            name="葉又銘 yym"
            description="DevOps"
            FB_link="https://www.facebook.com/profile.php?id=100010253504873"
            Github_link="https://github.com/YouMingYeh"
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/xwx.jpg"
            name="許文鑫 xwx"
            description="DevOps"
            FB_link={null}
            Github_link={null}
            Linkedin_link={null}
          />
        </div>
      </SimpleBar>
      <SimpleBar title="Quality Assurance" noIndent>
        <div className={classes.profile}>
          <Profile
            img_url="../../../images/hc0518.jpg"
            name="張禾家 hc0518"
            description="QA"
            FB_link="https://www.facebook.com/profile.php?id=100009524808646"
            Github_link={null}
            Linkedin_link={null}
          />
          <Profile
            img_url="../../../images/johnnkc.jpg"
            name="吳家俊 johnnkc"
            description="QA"
            FB_link="https://www.facebook.com/profile.php?id=100004229174326"
            Github_link={null}
            Linkedin_link="https://www.linkedin.com/in/john-ng-b5a480226"
          />
        </div>
      </SimpleBar>
    </>
  );
}
