import { FC } from 'react'

import { PageContent } from '@/components'

import { AddPostForm } from './AddPostForm'
import { PostsList } from './PostsList'

import styles from './_Posts.module.css'


export const Posts: FC = () => {
  return <>
    <div className={ styles.root }>
      <PageContent title={ 'Posts' }>
        <AddPostForm />

        <PostsList />
      </PageContent>
    </div>
  </>
}
