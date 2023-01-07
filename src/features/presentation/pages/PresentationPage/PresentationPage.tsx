import { FC, memo, useEffect, useState } from 'react';
import { PresentationCard } from '../../components/PresentationPage/PresentationCard/PresentationCard'
import { NewCard } from '../../components/PresentationPage/NewCard/NewCard'

import { PublicPresent } from '../../components/PresentationPage/PublicPresent/PublicPresent'
import { PrivatePresent } from '../../components/PresentationPage/PrivatePresent/PrivatePresent'

import { Box, Tabs, Tab, Divider } from "@mui/material"

import style from "./PresentationPage.module.css";

const PresentationPageComponent: FC = () => {
    const [tab, setTab] = useState(0)
    const [publicCount, setPublicCount] = useState(0)
    const [groupCount, setGroupCount] = useState(0)

    return (

        <div className={style['presentation-container']}>
            <Box sx={{ borderColor: 'divider', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px', width: '70vw'}}>
                <Tabs value={tab} onChange={(event: any, num: number) => setTab(num) } sx={{width: '400px'}}>
                    <Tab label="Public" className={style['tab-label']} />
                    <Tab label="Group" className={style['tab-label']} />    
                </Tabs>
                <Divider orientation='vertical' variant="middle" flexItem />
                <NewCard type={tab === 0 ? "public" : "group"} publicCount={publicCount} groupCount={groupCount}/>
            </Box>
            <PublicPresent tab={tab} setPublicCount={setPublicCount}/>
            <PrivatePresent tab={tab} setGroupCount={setGroupCount}/>
        </div>
    )
}

export const PresentationPage = memo(PresentationPageComponent);
