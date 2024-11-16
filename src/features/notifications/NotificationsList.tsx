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
  useGetNotificationsQuery,
  selectMetadataEntities
} from './notificationsSlice'


export const NotificationsList = () => {
  const dispatch = useAppDispatch()

  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationsMetadata = useAppSelector(selectMetadataEntities)


  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })


  return (
    <section className="notificationsList">
      <h2>Notifications</h2>

      {
        notifications.map((notification) => {
          const metadata = notificationsMetadata[notification.id]

          return (
            <div
              key={ notification.id }
              className={classnames(
                'notification',
                { new: metadata.isNew }
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
