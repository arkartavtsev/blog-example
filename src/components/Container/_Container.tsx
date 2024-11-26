import { FC } from 'react'
import classNames from 'classnames'

import type { ComponentProps } from './_Container.types.ts'


export const Container: FC<ComponentProps> = ({
  className,
  children
}) => {
  return <>
    <div className={ classNames(className, 'medium-container') }>
      { children }
    </div>
  </>
}
