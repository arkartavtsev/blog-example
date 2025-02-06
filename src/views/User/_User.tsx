import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { createSelector } from '@reduxjs/toolkit'

import type { TypedUseQueryStateResult } from '@reduxjs/toolkit/query/react'

import { useAppSelector } from '@/app/hooks'

import {
  type Post,
  useGetPostsQuery
} from '@/features/api/apiSlice'
import { selectUserById } from '@/features/users/usersSlice'

import {
  PageContent,
  Posts
} from '@/components'

import styles from './_User.module.css'


type GetPostSelectFromResultArg = TypedUseQueryStateResult<Post[], any, any>


const selectPostsForUser = createSelector(
  (res: GetPostSelectFromResultArg) => res.data,
  (res: GetPostSelectFromResultArg, userId: string) => userId,
  (data, userId) => data?.filter(post => post.user === userId)
)


export const User: FC = () => {
  const { userId } = useParams()
  
  const user = useAppSelector((state) => selectUserById(state, userId!))

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId!)
    })
  })


  return <>
    <div className={ styles.root }>
      <PageContent title={ user ? `${ user.name }'s posts` : `User not found!` }>
        {
          user && <>
            {
              postsForUser?.length ? <>
                <Posts data={ postsForUser } />
              </> : <>
                <p className={ styles.noPosts }>
                  There is&nbsp;no&nbsp;posts
                </p>
              </>
            }
          </>
        }
      </PageContent>
    </div>
  </>
}
