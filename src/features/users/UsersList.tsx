import { Link } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'

import { selectAllUsers } from './usersSlice'

import { User } from '@/components'


export const UsersList = () => {
  const users = useAppSelector(selectAllUsers)


  return (
    <section>
      <h2>Users</h2>

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
    </section>
  )
}
