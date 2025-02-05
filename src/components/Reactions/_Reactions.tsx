import { FC } from 'react'
import classNames from 'classnames'

import type { ReactionName } from '@/features/posts/postsSlice'
import type { ComponentProps } from './_Reactions.types'

import { useAddReactionMutation } from '@/features/api/apiSlice'

import styles from './_Reactions.module.css'


const ReactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}


export const Reactions: FC<ComponentProps> = ({
  className,
  post
}) => {
  const [ addReaction ] = useAddReactionMutation()


  return <>
    <div className={ classNames(className, styles.root) }>
      {
        Object.entries(ReactionEmoji).map(
          ([ stringName, emoji ]) => {
            const reaction = stringName as ReactionName
      
            return (
              <button
                key={ reaction }
                className={ classNames(styles.button, 'muted-button') }
                type={ 'button' }
                onClick={ () => addReaction({ postId: post.id, reaction }) }
              >
                { emoji } { post.reactions[reaction] }
              </button>
            )
          }
        )
      }
    </div>
  </>
}
