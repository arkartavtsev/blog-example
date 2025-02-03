import { PageContent } from '@/components'

import { AddPostForm } from './AddPostForm'
import { PostsList } from './PostsList'


export const PostsMainPage = () => {
  return <>
    <PageContent title={ 'Posts' }>
      <AddPostForm />
      <PostsList />
    </PageContent>
  </>
}
