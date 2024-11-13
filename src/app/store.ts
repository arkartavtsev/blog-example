import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '@/features/api/apiSlice'
import authReducer from '@/features/auth/authSlice'
import usersReducer from '@/features/users/usersSlice'
import postsReducer from '@/features/posts/postsSlice'
import notificationsReducer from '@/features/notifications/notificationsSlice'

import { listenerMiddleware } from './listenerMiddleware'


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    notifications: notificationsReducer
  },
  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
    .concat(apiSlice.middleware)
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
