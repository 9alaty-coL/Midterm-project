import { FC, memo, useEffect } from 'react';
import { useAppDispatch } from 'src/store';
import { GroupsActions } from 'src/store/groups/dispatchers';
import { CreateGroup } from '../components/GroupCreate/GroupCreate';

const GroupCreatePageComponent: FC = () => {
  return <CreateGroup/>
}

export const GroupCreatePage = memo(GroupCreatePageComponent);