import { useAppSelector } from '@/app/hooks'

import { selectAllUsers } from './usersSlice'

import {
  PageContent,
  User
} from '@/components'


export const UsersList = () => {
  const users = useAppSelector(selectAllUsers)


  return (
    <PageContent title={ 'Users' }>
      <ul className='reset-list'>
        {
          users.map((user) => (
            <li key={ user.id }>
              <User data={ user } />
            </li>
          ))
        }
      </ul>
    </PageContent>
  )
}
