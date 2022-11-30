import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserApiService } from 'src/api/services/user-api';
import { UpdateAccount } from 'src/models/account';
import { User } from 'src/models/user';

export namespace UserActions {
  export const fetchUser = createAsyncThunk('user/fetch', (id: User['id']) =>
    UserApiService.fetchUserById(id)
  );

  export const fetchProfile = createAsyncThunk('user/fetchProfile', () =>
    UserApiService.fetchProfile()
  );

  export const updateProfile = createAsyncThunk('user/updateProfile', (data: UpdateAccount) =>
    UserApiService.updateUserInfo(data.id, data)
  )
}
