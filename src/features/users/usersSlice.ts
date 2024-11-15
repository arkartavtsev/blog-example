import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import { apiSlice } from '@/features/api/apiSlice'
import { selectCurrentUsername } from '@/features/auth/authSlice'


export interface User {
  id: string
  name: string
}


const emptyUsers: User[] = []


export const apiSliceWithUsers = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users'
    })
  })
})

export const selectUsersResult = apiSliceWithUsers.endpoints.getUsers.select()

export const selectAllUsers = createSelector(
  selectUsersResult,
  usersResult => usersResult?.data ?? emptyUsers
)

export const selectUserById = createSelector(
  selectAllUsers,
  (state: RootState, userId: string) => userId,
  (users, userId) => users.find(user => user.id === userId)
)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)

  if (currentUsername) {
    return selectUserById(state, currentUsername)
  }
}
