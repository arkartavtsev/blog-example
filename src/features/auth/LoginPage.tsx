import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector
} from '@/app/hooks'

import { selectAllUsers } from '@/features/users/usersSlice'

import { login } from './authSlice'


interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement
}

interface LoginPageFormElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields
}


export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<LoginPageFormElements>) => {
    e.preventDefault()

    const username = e.currentTarget.elements.username.value

    await dispatch(login(username))
    navigate('/posts')
  }

  const usersOptions = users.map((user) => (
    <option
      key={ user.id }
      value={ user.id }
    >
      { user.name }
    </option>
  ))

  return (
    <section>
      <h2>
        Log in
      </h2>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="username">
          Choose the user to log in:
        </label>
        <select
          id="username"
          name="username"
          required
        >
          <option value=""/>
          { usersOptions }
        </select>

        <button>
          Log In
        </button>
      </form>
    </section>
  )
}
