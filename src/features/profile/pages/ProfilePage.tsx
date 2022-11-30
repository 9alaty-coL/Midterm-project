import { FC, memo, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/store';
import { UserActions } from 'src/store/profile/dispatchers';
import { selectIsUserLoading, selectProfile } from 'src/store/profile/selectors';

import style from "./ProfilePage.module.css";

const ProfilePageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector(selectProfile)
  const isLoading = useAppSelector(selectIsUserLoading)
  useEffect(() => {
    if (me == null) {
      dispatch(UserActions.fetchProfile())
    }
  })
  if (isLoading) {
    return <AppLoadingSpinner />
  }

  if (me == null) {
    return <h1>User not found</h1>
  }

  return <div className={style['profile']}>
    <img src={me.avatar} />
    <div className={style['info']}>
    <span className={style['title']}>First name: </span>{me.firstName}
    </div>
    <div className={style['info']}>
    <span className={style['title']}>Last name: </span>{me.lastName}
    </div>
    <div className={style['info']}>
    <span className={style['title']}>Email: </span>{me.email}
    </div>
    <div className={style['info']}>
    <span className={style['title']}>Nam sinh: </span>{me.yearOfBirth}
    </div>
    <div className={style['info']}>
    <span className={style['title']}>Dia chi: </span>{me.address}
    </div>
  </div>
}

export const ProfilePage = memo(ProfilePageComponent);
