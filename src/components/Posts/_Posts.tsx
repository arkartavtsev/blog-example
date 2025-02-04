import { FC } from 'react'
import { Link } from 'react-router-dom'

import type { ComponentProps } from './_Posts.types'

import { Author } from '../Author'
import { TimeAgo } from '../TimeAgo'
import { ReactionButtons } from '@/features/posts/ReactionButtons'

import styles from './_Posts.module.css'


export const Posts: FC<ComponentProps> = ({
  data
}) => {
  return <>
    <div className={ styles.root }>
      {
        data.map((post) => (
          <article
            key={ post.id }
            className={ styles.post }
          >
            <h3 className={ styles.postTitle }>
              <Link to={ `/posts/${ post.id }` }>
                { post.title }
              </Link>
            </h3>

            <div className={ styles.postMeta }>
              <Author userId={ post.user } />

              <TimeAgo timestamp={ post.date } />
            </div>
      
            <p className={ styles.postText }>
              { post.content }
            </p>
      
            <ReactionButtons post={ post } />
          </article>
        ))
      }
    </div>
  </>
}
