import { FC } from 'react'
import {
  useParams,
  Link
} from 'react-router-dom'
import classNames from 'classnames'

import { useAppSelector } from '@/app/hooks'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { useGetPostQuery } from '@/features/api/apiSlice'

import {
  PageContent,
  Reactions
} from '@/components'
import { Spinner } from '@/components/Spinner'
import { Author } from '@/components/Author'
import { TimeAgo } from '@/components/TimeAgo'

import styles from './_Post.module.css'


export const Post: FC = () => {
  const { postId } = useParams()

  const currentUsername = useAppSelector(selectCurrentUsername)!

  const {
    data: post,
    isFetching,
    isSuccess,
    isError
  } = useGetPostQuery(postId!)

  const canEdit = currentUsername === post?.user


  return <>
    <div className={ styles.root }>
      <PageContent
        title={ isError ? 'Post not found!' : post?.title }
        subtitle={
          ( post?.user && post?.date ) && <>
            <Author userId={ post.user } />
            <TimeAgo timestamp={ post.date } />
          </>
        }
      >
        { isFetching && <Spinner text={ 'Loading...' } /> }

        {
          isSuccess && <>
            <p className={ styles.text }>
              { post.content }
            </p>

            <Reactions post={ post } />

            {
              canEdit && <>
                <Link
                  className={ classNames('button', styles.editButton) }
                  to={ `/editPost/${ post.id }` }
                >
                  Edit Post
                </Link>
              </>
            }
          </>
        }
      </PageContent>
    </div>
  </>
}
