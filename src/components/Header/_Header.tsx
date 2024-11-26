import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './_Header.module.css'

import {
  useAppDispatch,
  useAppSelector
} from '@/app/hooks'

import { logout } from '@/features/auth/authSlice'
import { selectCurrentUser } from '@/features/users/usersSlice'
import {
  selectUnreadNotificationsCount,
  fetchNotificationsWebsocket,
  useGetNotificationsQuery
} from '@/features/notifications/notificationsSlice'

import {
  Container,
  User
} from '@/components'


export const Header: FC = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectCurrentUser)
  const numUnreadNotifications = useAppSelector(selectUnreadNotificationsCount)


  const fetchNewNotifications = () => {
    dispatch(fetchNotificationsWebsocket())
  }

  const onLogoutClicked = () => {
    dispatch(logout())
  }


  useGetNotificationsQuery()


  return <>
    <header className={ styles.root }>
      <Container>
        <p className={ styles.title }>
          Blog Example
        </p>

        {
          (user) && <>
            <div className={ styles.content }>
              <nav className={ styles.nav }>
                <Link
                  className={ styles.navLink }
                  to="/posts"
                >
                  Posts
                </Link>
                
                <Link
                  className={ styles.navLink }
                  to="/users"
                >
                  Users
                </Link>

                <Link
                  className={ styles.navLink }
                  to="/notifications"
                >
                  Notifications

                  {
                    (numUnreadNotifications > 0) && <>
                      <span className={ styles.bage }>
                        { numUnreadNotifications }
                      </span>
                    </>
                  }
                </Link>

                <button
                  className="button small"
                  type="button"
                  onClick={ fetchNewNotifications }
                >
                  Refresh Notifications
                </button>
              </nav>

              <div className={ styles.user }>
                <Link
                  className={ styles.userLink }
                  to={ `/users/${ user.id }` }
                >
                  <User>
                    { user.name }
                  </User>
                </Link>

                <button
                  className="button small"
                  type="button"
                  onClick={ onLogoutClicked }
                >
                  Log Out
                </button>
              </div>
            </div>
          </>
        }

      </Container>
    </header>
  </>
}
