import { FC } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import styles from './_User.module.css'

import type { ComponentProps } from './_User.types'


export const User: FC<ComponentProps> = ({
  className,
  data
}) => {
  const { id, name } = data 


  return <>
    <Link
      className={ classNames(className, styles.root) }
      to={ `/users/${ id }` }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        aria-hidden="true"
      >
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>

      { name }
    </Link>
  </>
}
