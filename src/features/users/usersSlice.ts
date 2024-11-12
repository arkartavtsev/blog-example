import {
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit'

import { client } from '@/api/client'
import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'

import { selectCurrentUsername } from '@/features/auth/authSlice'


interface User {
  id: string
  name: string
}


const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()


const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  }
})


export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors((state: RootState) => state.users)

export const fetchUsers = createAppAsyncThunk(
  'users/fetchUsers',

  async () => {
    const response = await client.get<User[]>('/fakeApi/users')
    
    return response.data
  }
)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)

  if (currentUsername) {
    return selectUserById(state, currentUsername)
  }
}

export default usersSlice.reducer
