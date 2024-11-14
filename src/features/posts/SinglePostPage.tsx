import {
  useParams,
  Link
} from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { useGetPostQuery } from '@/features/api/apiSlice'

import { Spinner } from '@/components/Spinner'
import { Author } from '@/components/Author'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'


export const SinglePostPage = () => {
  const { postId } = useParams()

  const currentUsername = useAppSelector(selectCurrentUsername)!

  const {
    data: post,
    isFetching,
    isSuccess,
    isError
  } = useGetPostQuery(postId!)

  const canEdit = currentUsername === post?.user


  return (
    <section>
      { isFetching && <Spinner text="Loading..." /> }

      {
        isSuccess && <>
          <article className="post">
            <h2>
              { post.title }
            </h2>

            <Author userId={ post.user } />
            <TimeAgo timestamp={ post.date } />

            <p className="post-content">
              { post.content }
            </p>

            <ReactionButtons post={ post } />

            {
              canEdit && <>
                <Link
                  className="button"
                  to={ `/editPost/${ post.id }` }
                >
                  Edit Post
                </Link>
              </>
            }
          </article>
        </>
      }

      {
        isError && <>
          <h2>
            Post not found!
          </h2>
        </>
      }
    </section>
  )
}
