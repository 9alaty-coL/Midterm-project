import { memo, FC } from 'react';
import { Link as RouterLink, useNavigate, NavigateFunction } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faUsersBetweenLines, faAddressCard } from "@fortawesome/free-solid-svg-icons"

import style from "./HomePage.module.css"

const HomePageComponent: FC = () => {
  const navigate : NavigateFunction = useNavigate();

  return (
    <div className={style['home-container']}>
      <h1 className={style['home-title']}>Home page</h1>
      <div className={style['home-btn-wrapper']}>
        {/* <Paper elevation={3} className={style['home-card']} onClick={() => navigate("/presentation")}>
          <span>Publics</span>
          <FontAwesomeIcon icon={faNewspaper} />
        </Paper> */}
        <Paper elevation={3} className={style['home-card']} onClick={() => navigate("/group")}>
          <span>Groups</span>
          <FontAwesomeIcon icon={faUsersBetweenLines} />
        </Paper>
        <Paper elevation={3} className={style['home-card']} onClick={() => navigate("/profile")}>
          <span>Profile</span>
          <FontAwesomeIcon icon={faAddressCard} />
        </Paper>
      </div>
    </div>
  )
}
  


export const HomePage = memo(HomePageComponent);
