import { FC, memo, useEffect } from 'react';
import { AppLoadingSpinner } from 'src/components/AppLoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupsActions } from 'src/store/groups/dispatchers';
import { selectGroups, selectIsGroupLoading } from 'src/store/groups/selectors';
import { GroupPanel } from '../components/Group/GroupPanel/GroupPanel';

import { Tabs, Tab, Box, Button } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useNavigate, NavigateFunction } from "react-router-dom"

const GroupPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups)
  const isLoading = useAppSelector(selectIsGroupLoading);

  useEffect(() => {
    dispatch(GroupsActions.fetchGroups());
  }, [dispatch])

  const navigate : NavigateFunction = useNavigate();

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
          <Tab label={<span style={{fontSize: 25}}>Created groups</span>}/>
          <Tab label={<span style={{fontSize: 25}}>Joined groups</span>}/>
          <Tab label={
            <div style={{width: 25, height: 25, borderRadius: "50px", border: '1px solid black', padding: 5}} onClick={() => navigate('/group/create')}>
              <FontAwesomeIcon icon={faPlus} style={{fontSize: 25}}/>
            </div>} />
        </Tabs>
      </Box>
      <GroupPanel groups={groups} show={tab === 0}/>
      <GroupPanel groups={groups.slice(0, groups.length - 2)} show={tab === 1}/>
    </Box>

  )
}

export const GroupPage = memo(GroupPageComponent);