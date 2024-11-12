import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector
} from '@/app/hooks'
import {
  fetchPosts,
  selectPostById,
  selectPostIds,
  selectPostsStatus,
  selectPostsError
} from './postsSlice'

import { Spinner } from '@/components/Spinner'
import { Author } from '@/components/Author'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'


interface PostExcerptProps {
  postId: string
}


const PostExcerpt = ({ postId }: PostExcerptProps) => {
  const post = useAppSelector(
    (state) => selectPostById(state, postId)
  )

  return (
    <article
      className="post-excerpt"
      key={ post.id }
    >
      <h3>
        <Link to={ `/posts/${ post.id }` }>
          { post.title }
        </Link>
      </h3>

      <Author userId={ post.user } />
      <TimeAgo timestamp={ post.date } />

      <p className="post-content">
        { post.content.substring(0, 100) }
      </p>

      <ReactionButtons post={ post } />
    </article>
  )
}


export const PostsList = () => {
  const dispatch = useAppDispatch()

  const postStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)

  const orderedPostIds = useAppSelector(selectPostIds)

  let content: React.ReactNode


  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt
        key={ postId }
        postId={ postId }
      />
    ))
  } else if (postStatus === 'rejected') {
    content = <div>{ postsError }</div>
  }


  useEffect(() => {
    dispatch(fetchPosts())
  }, [ dispatch ])


  return (
    <section className="posts-list">
      <h2>Posts</h2>

      { content }
    </section>
  )
}
