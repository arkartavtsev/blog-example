import { createSlice } from '@reduxjs/toolkit'

import { client } from '@/api/client'
import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'

import { selectCurrentUsername } from '@/features/auth/authSlice'


interface User {
  id: string
  name: string
}


const initialState: User[] = []


const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload
      })
  },

  selectors: {
    selectAllUsers: (usersState) => usersState,

    selectUserById: (
      usersState,
      userId: string | null
    ) => usersState.find(user => user.id === userId)
  }
})


export const {
  selectAllUsers,
  selectUserById
} = usersSlice.selectors

export const fetchUsers = createAppAsyncThunk(
  'users/fetchUsers',

  async () => {
    const response = await client.get<User[]>('/fakeApi/users')
    
    return response.data
  }
)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)

  return selectUserById(state, currentUsername)
}

export default usersSlice.reducer
