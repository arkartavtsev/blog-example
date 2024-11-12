import { useAppSelector } from '@/app/hooks'
import { selectUserById } from '@/features/users/usersSlice'


interface AuthorProps {
  userId: string
  showPrefix?: boolean
}


export const Author = ({
  userId,
  showPrefix = true
}: AuthorProps) => {
  const author = useAppSelector(
    (state) => selectUserById(state, userId)
  )


  return <>
    <span>
      { showPrefix && 'by ' }
      { author?.name ?? 'Unknown author' }
    </span>
  </>
}
