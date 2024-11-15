import { useAddReactionMutation } from '@/features/api/apiSlice'

import type {
  Post,
  ReactionName
} from './postsSlice'


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
  const [ addReaction ] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([stringName, emoji]) => {
      const reaction = stringName as ReactionName

      return (
        <button
          key={ reaction }
          type="button"
          className="muted-button reaction-button"
          onClick={ () => addReaction({ postId: post.id, reaction }) }
        >
          { emoji } { post.reactions[reaction] }
        </button>
      )
    }
  )

  return <div>{ reactionButtons }</div>
}
