import {
  FC,
  useLayoutEffect
} from 'react'
import classnames from 'classnames'

import {
  useAppDispatch,
  useAppSelector
} from '@/app/hooks'

import {
  allNotificationsRead,
  useGetNotificationsQuery,
  selectMetadataEntities
} from '@/features/notifications/notificationsSlice'

import { PageContent } from '@/components'
import { Author } from '@/components/Author'
import { TimeAgo } from '@/components/TimeAgo'

import styles from './_Notifications.module.css'


export const Notifications: FC = () => {
  const dispatch = useAppDispatch()

  const { data: notifications = [] } = useGetNotificationsQuery()
  const notificationsMetadata = useAppSelector(selectMetadataEntities)


  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })


  return <>
    <div className={ styles.root }>
      <PageContent title={ 'Notifications' }>
        <ul className={ 'reset-list' }>
          {
            notifications.map((notification) => {
              const metadata = notificationsMetadata[notification.id]
  
              return (
                <div
                  key={ notification.id }
                  className={classnames(
                    styles.notification,
                    metadata.isNew && styles.new
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
        </ul>
      </PageContent>
    </div>
  </>
}
