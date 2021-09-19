import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    position: 'relative',
    width: '222px',
    height: '187.78px',
    marginBottom: '19px',
    textAlign: 'center',
  },
  imageAndLinks: {
    width: '222px',
    '&:hover $image': {
      opacity: '0.3',
      transition: 'opacity 0.3s',
    },
    '&:hover $overlapLinks': {
      opacity: '1',
      transition: ['transform 0.25s', 'opacity 0.25s'],
      transform: 'translateY(55px)',
    },
  },
  image: {
    width: '134px',
    height: '134px',
    display: 'block',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '8.65px',
    opacity: '1',
    zIndex: '-1',
  },
  overlapLinks: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1',
    opacity: '0',
    transition: ['transform 0.25s', 'opacity 0.25s'],
    transform: 'translateY(80px)',
  },
  socialLink: {
    margin: '5px',
  },
  name: {
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Profile({
  name, img_url, description, Github_link, FB_link, Linkedin_link,
}) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainContent}>
        <div className={classes.imageAndLinks}>
          <div className={classes.overlapLinks}>
            {FB_link && (
              <a href={FB_link} className={classes.socialLink}>
                <img src="../../../images/Facebook.png" alt="FacebookIcon" />
              </a>
            )}
            {Github_link && (
              <a href={Github_link} className={classes.socialLink}>
                <img src="../../../images/Github.png" alt="GithubIcon" />
              </a>
            )}
            {Linkedin_link && (
              <a href={Linkedin_link} className={classes.socialLink}>
                <img src="../../../images/Linkedin.png" alt="LinkedinIcon" />
              </a>
            )}
          </div>
          <div className={classes.image} style={{ backgroundImage: `url(${img_url})` }} />
        </div>
        <div className={classes.name}>
          <Typography variant="h6">{name}</Typography>
        </div>
        <div className={classes.description}>
          <Typography variant="body2">{description}</Typography>
        </div>
      </div>
    </>
  );
}
