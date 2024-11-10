import React from 'react'

import {
  useAppDispatch,
  useAppSelector
} from '@/app/hooks'
import {
  type Post,
  postAdded
} from './postsSlice'

import { selectAllUsers } from '@/features/users/usersSlice'


interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  postAuthor: HTMLSelectElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}


export const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const form = e.currentTarget
    const { elements } = form

    const title = elements.postTitle.value
    const content = elements.postContent.value
    const userId = elements.postAuthor.value

    dispatch(postAdded(title, content, userId))

    form.reset()
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
      <h2>Add a New Post</h2>
      
      <form onSubmit={ handleSubmit }>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          defaultValue=""
          required
        />

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue=""
          required
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="postAuthor"
          required
        >
          <option value="" />
          { usersOptions }
        </select>

        <button>Save Post</button>
      </form>
    </section>
  )
}
