import {
  type PayloadAction,
  createSlice,
  nanoid
} from '@reduxjs/toolkit'
import { sub } from 'date-fns'


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

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>


const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
}

const initialState: Post[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: initialReactions
  }, {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: initialReactions
  }
]


const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    postAdded: {
      reducer(
        state,
        action: PayloadAction<Post>
      ) {
        state.push(action.payload)
      },
      prepare(
        title: string,
        content: string,
        userId: string
      ) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            user: userId,
            reactions: initialReactions,
            title,
            content
          }
        }
      }
    },

    postUpdated(
      state,
      action: PayloadAction<PostUpdate>
    ) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)

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
      const existingPost = state.find(post => post.id === postId)

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },

  selectors: {
    selectAllPosts: (postsState) => postsState,

    selectPostById: (
      postsState,
      postId: string
    ) => postsState.find(post => post.id === postId)
  }
})


export const {
  postAdded,
  postUpdated,
  reactionAdded
} = postsSlice.actions

export const {
  selectAllPosts,
  selectPostById
} = postsSlice.selectors

export default postsSlice.reducer
