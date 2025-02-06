import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector
} from '@/app/hooks'

import { selectAllUsers } from '@/features/users/usersSlice'
import { login } from '@/features/auth/authSlice'

import { PageContent } from '@/components'

import styles from './_Login.module.css'


interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement
}

interface LoginPageFormElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields
}


export const Login: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const users = useAppSelector(selectAllUsers)


  const handleSubmit = async (evt: React.FormEvent<LoginPageFormElements>) => {
    evt.preventDefault()

    const username = evt.currentTarget.elements.username.value

    await dispatch(login(username))

    navigate('/posts')
  }


  return <>
    <div className={ styles.root }>
      <PageContent title={ 'Log\u00A0in' }>
        <form onSubmit={ handleSubmit }>
          <label htmlFor={ 'username' }>
            Choose the user to&nbsp;log&nbsp;in:
          </label>
          
          <select
            id={ 'username' }
            name={ 'username' }
            required
          >
            <option value='' />

            {
              users.map((user) => (
                <option
                  key={ user.id }
                  value={ user.id }
                >
                  { user.name }
                </option>
              ))
            }
          </select>
  
          <button type={ 'submit' }>
            Log&nbsp;In
          </button>
        </form>
      </PageContent>
    </div>
  </>
}
