import { FC } from 'react'

import { useAppSelector } from '@/app/hooks'

import { selectAllUsers } from '@/features/users/usersSlice'

import {
  PageContent,
  User
} from '@/components'

import styles from './_Users.module.css'


export const Users: FC = () => {
  const users = useAppSelector(selectAllUsers)


  return <>
    <div className={ styles.root }>
      <PageContent title={ 'Users' }>
        <ul className={ 'reset-list' }>
          {
            users.map((user) => (
              <li
                key={ user.id }
                className={ styles.item }
              >
                <User data={ user } />
              </li>
            ))
          }
        </ul>
      </PageContent>
    </div>
  </>
}
