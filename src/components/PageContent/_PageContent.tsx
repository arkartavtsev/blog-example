import { FC } from 'react'

import type { ComponentProps } from './_PageContent.types.ts'

import { Container } from '../Container'

import styles from './_PageContent.module.css'


export const PageContent: FC<ComponentProps> = ({
  children,
  title,
  subtitle
}) => {
  return <>
    <main className={ styles.root }>
      <Container>
        {
          ( title || subtitle ) && <>
            <div className={ styles.header }>
              {
                title && <>
                  <h1 className={ styles.title }>
                    { title }
                  </h1>
                </>
              }

              {
                subtitle && <>
                  <p className={ styles.subtitle }>
                    { subtitle }
                  </p>
                </>
              }
            </div>
          </>
        }

        { children }
      </Container>
    </main>
  </>
}
