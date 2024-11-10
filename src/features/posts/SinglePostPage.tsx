import {
  useParams,
  Link
} from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { selectPostById } from './postsSlice'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'


export const SinglePostPage = () => {
  const { postId } = useParams()

  const currentUsername = useAppSelector(selectCurrentUsername)!
  const post = useAppSelector(
    (state) => selectPostById(state, postId!)
  )


  const canEdit = currentUsername === post?.user


  if (!post) {
    return (
      <section>
        <h2>
          Post not found!
        </h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>
          { post.title }
        </h2>

        <PostAuthor userId={ post.user } />
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
    </section>
  )
}