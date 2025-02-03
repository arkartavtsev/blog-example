import { Link } from 'react-router-dom'

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
              <Link to={ `/users/${ user.id }` }>
                <User>
                  { user.name }
                </User>
              </Link>
            </li>
          ))
        }
      </ul>
    </PageContent>
  )
}
