import { FC, memo, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/store';
import { UserActions } from 'src/store/profile/dispatchers';
import { selectIsUserLoading, selectProfile } from 'src/store/profile/selectors';

import { ProfileDetail } from "./ProfileDetail/ProfileDetail"

import { Avatar } from "@mui/material"

import style from "./ProfilePage.module.css";

const ProfilePageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile)
  const isLoading = useAppSelector(selectIsUserLoading)

  useEffect(() => {
    if (profile == null) {
      dispatch(UserActions.fetchProfile())
    }
  })
  if (isLoading) {
    return <AppLoadingSpinner />
  }

  if (profile == null) {
    return <h1>User not found</h1>
  }

  return (
    <div className={style['profile-container']}>
      <div className={style['profile-info-wrapper']}>
        <Avatar alt="User Avatar" src={profile.avatar} sx={{ width: 150, height: 150 }}/>
        <div className={style['profile-info']}>
          <span className={style['profile-name']}>{profile.lastName} {profile.firstName}</span>
          <span className={style['profile-content']}><b>Email:</b> {profile.email}</span>
        </div>
        <div className={style['profile-group']}>
          <span className={style['profile-content']}><b></b>Owner of {profile.owner.length} groups</span>
          <span className={style['profile-content']}>Co-Owner of {profile.co_owner.length} groups</span>
          <span className={style['profile-content']}>Has joined {profile.member.length} groups</span>          
        </div>
      </div>
      <ProfileDetail profile={profile} />
    </div>
  )
}

export const ProfilePage = memo(ProfilePageComponent);
