import { createAsyncThunk } from '@reduxjs/toolkit';
import { GroupApiService } from 'src/api/services/group-api';

export namespace GroupsActions {
  export const fetchGroups = createAsyncThunk('groups/fetch', () =>
    GroupApiService.getGroups()
  );
}
