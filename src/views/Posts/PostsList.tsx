import { useMemo } from 'react'
import classNames from 'classnames'

import { useGetPostsQuery } from '@/features/api/apiSlice'

import { Posts } from '@/components'
import { Spinner } from '@/components/Spinner'


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
        <Posts data={ sortedPosts } />
      </div>
    </>
  } else if (isError) {
    content = <div>{ error.toString() }</div>
  }


  return content
}
