import { createAsyncThunk } from '@reduxjs/toolkit';
import { GroupApiService } from 'src/api/services/group-api';
import { Group } from 'src/models/group';

export namespace GroupDetailsActions {
  export const fetchGroupDetails = createAsyncThunk('groupDetails/fetch', (id: Group['id']) =>
    GroupApiService.getGroupById(id)
  );
}
