import { createAsyncThunk } from '@reduxjs/toolkit';
import { GroupApiService } from 'src/api/services/group-api';
import { Group } from 'src/models/group';

export namespace GroupsActions {
  export const fetchGroups = createAsyncThunk('groups/fetch', () =>
    GroupApiService.getGroups()
  );

  export const addUserToGroup = createAsyncThunk('groups/addUser', async (groupId: Group['id'], {rejectWithValue}) =>{
    try {
      await GroupApiService.addUser(groupId)
    } catch (error) {
      return rejectWithValue(error);
    }
  }
  );
}
