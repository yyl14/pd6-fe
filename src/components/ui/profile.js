import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    position: 'relative',
    width: '100%',
  },
  imageAndLinks: {
    '&:hover $image': {
      opacity: '0.3',
    },
    '&:hover $overlapLinks': {
      opacity: '1',
      transition: 'transform 0.25s',
      transform: 'translateY(-20px)',
    },
  },
  image: {
    width: '100%',
    display: 'block',
    borderRadius: '50%',
    opacity: '1',
    zIndex: '-1',
  },
  overlapLinks: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: '1',
    opacity: '0',
    transition: 'opacity 0.25s',
    transform: 'translateY(25px)',
  },
  name: {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: 'gray',
    display: 'flex',
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
            <a href={FB_link} className={classes.Facebook_link}>
              <img src="../../../images/Facebook.png" alt="FacebookIcon" />
            </a>
            <a href={Github_link} className={classes.Github_link}>
              <img src="../../../images/Github.png" alt="GithubIcon" />
            </a>
            <a href={Linkedin_link} className={classes.Linkedin_link}>
              <img src="../../../images/Linkedin.png" alt="LinkedinIcon" />
            </a>
          </div>
          <img src={img_url} alt="pic" className={classes.image} />
        </div>
        <div className={classes}>
          <Typography variant="h6" className={classes.name}>
            {name}
          </Typography>
        </div>
        <div className={classes}>
          <Typography variant="body2" className={classes.description}>
            {description}
          </Typography>
        </div>
      </div>
    </>
  );
}
