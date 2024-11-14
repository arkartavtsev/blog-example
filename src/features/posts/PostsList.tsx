import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import {
  type Post,
  useGetPostsQuery
} from '@/features/api/apiSlice'

import { Spinner } from '@/components/Spinner'
import { Author } from '@/components/Author'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'


interface PostExcerptProps {
  post: Post
}


const PostExcerpt = ({ post }: PostExcerptProps) => {
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
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    return posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  }, [posts])

  let content: React.ReactNode

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = <>
      <div className={classNames(
        'posts-container',
        { disabled: isFetching }
      )}>
        {
          sortedPosts.map((post) => (
            <PostExcerpt
              key={ post.id }
              post={ post }
            />
          ))
        }
      </div>
    </>
  } else if (isError) {
    content = <div>{ error.toString() }</div>
  }


  return (
    <section className="posts-list">
      <h2>Posts</h2>

      { content }
    </section>
  )
}
