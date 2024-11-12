import {
  type PayloadAction,
  createSlice,
  createSelector
} from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import { client } from '@/api/client'
import { createAppAsyncThunk } from '@/app/withTypes'

import { logout } from '@/features/auth/authSlice'


export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}

type NewPost = Pick<Post, 'title' | 'content' | 'user'>
type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

interface PostsState {
  posts: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}


const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
}


const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    postUpdated(
      state,
      action: PayloadAction<PostUpdate>
    ) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find(post => post.id === id)

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: ReactionName }>
    ) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, () => {
        return initialState
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  },

  selectors: {
    selectPostsStatus: (postsState) => postsState.status,
    selectPostsError: (postsState) => postsState.error,

    selectPostById: (
      postsState,
      postId: string
    ) => postsState.posts.find(post => post.id === postId)
  }
})


export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',

  async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')

    return response.data
  },

  {
    condition(arg, thunkApi) {
      const postsStatus = selectPostsStatus(thunkApi.getState())

      return postsStatus === 'idle'
    }
  }
)

export const addNewPost = createAppAsyncThunk(
  'posts/addNewPost',

  async (initialPost: NewPost) => {
    const response = await client.post<Post>('/fakeApi/posts', initialPost)

    return response.data
  }
)

export const selectAllPosts = (state: RootState) => state.posts.posts

export const selectPostsByUser = createSelector(
  [
    selectAllPosts,
    (state: RootState, userId: string) => userId
  ],
  (posts, userId) => posts.filter(post => post.user === userId)
)

export const {
  postUpdated,
  reactionAdded
} = postsSlice.actions

export const {
  selectPostsStatus,
  selectPostsError,
  selectPostById
} = postsSlice.selectors

export default postsSlice.reducer
