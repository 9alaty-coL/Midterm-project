import { FC, memo, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupsActions } from 'src/store/groups/dispatchers';
import { selectGroups, selectIsGroupLoading } from 'src/store/groups/selectors';
import { GroupPanel } from '../components/Group/GroupPanel/GroupPanel';

import { Tabs, Tab, Box } from "@mui/material"
import { useState } from "react"

const GroupPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups)
  const isLoading = useAppSelector(selectIsGroupLoading);

  useEffect(() => {
    dispatch(GroupsActions.fetchGroups());
  }, [dispatch])

  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  if (isLoading) {
    return <AppLoadingSpinner />
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label={<span style={{fontSize: 25}}>Your groups</span>}/>
          <Tab label={<span style={{fontSize: 25}}>Joined groups</span>}/>
        </Tabs>
      </Box>
      <GroupPanel groups={groups} show={tab === 0}/>
      <GroupPanel groups={groups.slice(0, groups.length - 2)} show={tab === 1}/>
    </Box>

  )
}

export const GroupPage = memo(GroupPageComponent);