import { useParams } from 'react-router-dom'
import { createSelector } from '@reduxjs/toolkit'
import type { TypedUseQueryStateResult } from '@reduxjs/toolkit/query/react'

import { useAppSelector } from '@/app/hooks'
import {
  type Post,
  useGetPostsQuery
} from '@/features/api/apiSlice'

import {
  PageContent,
  Posts
} from '@/components'
import { selectUserById } from './usersSlice'


type GetPostSelectFromResultArg = TypedUseQueryStateResult<Post[], any, any>


const selectPostsForUser = createSelector(
  (res: GetPostSelectFromResultArg) => res.data,
  (res: GetPostSelectFromResultArg, userId: string) => userId,
  (data, userId) => data?.filter(post => post.user === userId)
)


export const UserPage = () => {
  const { userId } = useParams()

  const user = useAppSelector((state) => selectUserById(state, userId!))

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId!)
    })
  })


  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    )
  }

  return (
    <PageContent title={ `${ user.name }'s posts` }>
      <Posts data={ postsForUser || [] } />
    </PageContent>
  )
}
