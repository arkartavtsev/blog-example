import { useLayoutEffect } from 'react'
import classnames from 'classnames'

import {
  useAppDispatch,
  useAppSelector
} from '@/app/hooks'

import { Author } from '@/components/Author'
import { TimeAgo } from '@/components/TimeAgo'

import {
  allNotificationsRead,
  selectAllNotifications
} from './notificationsSlice'


export const NotificationsList = () => {
  const dispatch = useAppDispatch()

  const notifications = useAppSelector(selectAllNotifications)


  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })


  return (
    <section className="notificationsList">
      <h2>Notifications</h2>

      {
        notifications.map((notification) => {
          return (
            <div
              key={ notification.id }
              className={classnames(
                'notification',
                { new: notification.isNew }
              )}
            >
              <div>
                <b>
                  <Author
                    userId={ notification.user }
                    showPrefix={ false }
                  />
                </b>

                { ` ${ notification.message }` }
              </div>

              <TimeAgo timestamp={ notification.date } />
            </div>
          )
        })
      }
    </section>
  )
}
