import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@/features/auth/authSlice'
import usersReducer from '@/features/users/usersSlice'
import postsReducer from '@/features/posts/postsSlice'
import notificationsReducer from '@/features/notifications/notificationsSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    notifications: notificationsReducer
  }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
