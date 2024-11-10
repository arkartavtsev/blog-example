import { useAppDispatch } from '@/app/hooks'

import type {
  Post,
  ReactionName
} from './postsSlice'

import { reactionAdded } from './postsSlice'


interface ReactionButtonsProps {
  post: Post
}


const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}


export const ReactionButtons = ({ post }: ReactionButtonsProps) => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([stringName, emoji]) => {
      const reaction = stringName as ReactionName

      return (
        <button
          key={ reaction }
          type="button"
          className="muted-button reaction-button"
          onClick={ () => dispatch(reactionAdded({ postId: post.id, reaction })) }
        >
          { emoji } { post.reactions[reaction] }
        </button>
      )
    }
  )

  return <div>{ reactionButtons }</div>
}
